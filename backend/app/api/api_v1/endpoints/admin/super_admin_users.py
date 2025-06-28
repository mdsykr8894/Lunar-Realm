# app/api/api_v1/endpoints/admin/super_admin_users.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .....db.db import get_db
from .....models.user import User, RoleEnum
from .....schemas.user import UserOut, UserUpdate
from .....auth.auth import require_role
from .....services.user_service import (
    get_user_by_id,
    delete_user,
    update_user,
    get_user_by_username
)

router = APIRouter(
    prefix="/super-admin/users",
    tags=["super-admin-users"],
    dependencies=[Depends(require_role([RoleEnum.super_admin]))]
)

@router.get("/", response_model=list[UserOut])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).filter(User.is_deleted == False).all()

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if not user or user.is_deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserOut)
def update_user_route(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.super_admin]))
):
    updated_data = user_update.dict(exclude_unset=True)
    user = update_user(db, user_id, updated_data, current_user)

    if not user:
        raise HTTPException(status_code=404, detail="User not found or cannot be updated")

    return user

@router.delete("/{user_id}")
def delete_user_route(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.super_admin]))
):
    user = delete_user(db, user_id, current_user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found or cannot be deleted")
    
    return {"detail": "User soft-deleted successfully"}
