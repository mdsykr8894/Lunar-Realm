from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .....db.db import get_db
from .....models.user import User, RoleEnum
from .....schemas.user import UserCreate, UserOut, UserUpdate
from .....auth.auth import require_role
from .....services.user_service import create_user, delete_user as service_delete_user, get_user_by_username
from .....services.user_service import update_user as service_update_user



router = APIRouter(
    prefix="/admin/users",
    tags=["admin-users"],
    dependencies=[Depends(require_role([RoleEnum.admin, RoleEnum.super_admin]))]
)

@router.post("/", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user_by_username = get_user_by_username(db, user.username)
    if existing_user_by_username:
        raise HTTPException(status_code=400, detail="Username already registered")

    existing_user_by_email = db.query(User).filter(User.email == user.email).first()
    if existing_user_by_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    return create_user(db, user)

@router.get("/", response_model=list[UserOut])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).filter(User.is_deleted == False).all()

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id, User.is_deleted == False).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.admin, RoleEnum.super_admin]))
):
    updated_data = user_update.dict(exclude_unset=True)
    user = service_update_user(db, user_id, updated_data, current_user)

    if not user:
        raise HTTPException(status_code=403, detail="Not allowed to update this user or user not found")

    return user

@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.admin, RoleEnum.super_admin]))
):
    user = service_delete_user(db, user_id, current_user)
    if not user:
        raise HTTPException(status_code=403, detail="Not allowed to delete this user or user not found")
    
    return {"detail": "User soft-deleted successfully"}
