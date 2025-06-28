from sqlalchemy.orm import Session
from ..models.user import User, RoleEnum
from ..schemas.user import UserCreate, UserOut
from ..auth.hashing import get_password_hash
from ..utils.soft_delete import perform_soft_delete
from typing import Optional

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user: UserCreate) -> User:
    hashed_pw = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw,
        role=RoleEnum.user
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, updated_data: dict, current_admin: User) -> Optional[User]:
    user = get_user_by_id(db, user_id)

    if not user or user.is_deleted:
        return None

    if current_admin.role == RoleEnum.admin and user.role in [RoleEnum.admin, RoleEnum.super_admin]:
        return None

    if "role" in updated_data:
        if current_admin.role != RoleEnum.super_admin:
            return None  

        new_role = updated_data["role"]
        if new_role not in RoleEnum.__members__:
            return None  

        user.role = RoleEnum[new_role]  

    for key, value in updated_data.items():
        if key != "role" and hasattr(user, key):
            setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user



def delete_user(db: Session, user_id: int, current_user: User) -> Optional[User]:
    user = get_user_by_id(db, user_id)

    if not user or user.is_deleted:
        return None

    if user.role == RoleEnum.super_admin:
        return None

    if current_user.role == RoleEnum.admin and user.role == RoleEnum.admin:
        return None

    perform_soft_delete(db, user, current_user.id)
    return user
