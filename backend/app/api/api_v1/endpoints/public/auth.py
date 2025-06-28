from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from .....auth.auth import get_current_user
from .....models.user import User
from .....schemas.user import UserCreate, UserLogin, UserOut
from .....services.user_service import create_user, get_user_by_username
from .....auth.hashing import verify_password
from .....auth.jwt import create_access_token, decode_access_token
from .....db.db import get_db
from .....core.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user_by_username = get_user_by_username(db, user.username)
    if existing_user_by_username:
        raise HTTPException(status_code=400, detail="Username already registered")

    existing_user_by_email = db.query(User).filter(User.email == user.email).first()
    if existing_user_by_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    return create_user(db, user)


from fastapi.responses import JSONResponse
from fastapi import Response

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, user.username)

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if db_user.is_deleted:
        raise HTTPException(status_code=403, detail="Account has been deleted")

    if not db_user.is_active:
        raise HTTPException(status_code=403, detail="Account is inactive")

    access_token = create_access_token(
        data={"sub": str(db_user.id)},
        token_type="access"
    )

    refresh_token = create_access_token(
        data={"sub": str(db_user.id)},
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        token_type="refresh"
    )

    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60, 
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60 * 24 * settings.REFRESH_TOKEN_EXPIRE_DAYS,
        path="/"
    )
    return response

@router.post("/refresh")
def refresh_token(request: Request, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="No refresh token")

    payload = decode_access_token(refresh_token)
    if payload is None or payload.get("token_type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_access_token = create_access_token(
        {"sub": str(user.id)},
        token_type="access"
    )

    response = JSONResponse(content={"message": "Access token refreshed"})
    response.set_cookie(
        key="access_token",
        value=new_access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60,
        path="/"
    )
    return response

@router.post("/logout")
def logout():
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return response

@router.get("/me", response_model=UserOut)
def read_profile(current_user: User = Depends(get_current_user)):
    return current_user

