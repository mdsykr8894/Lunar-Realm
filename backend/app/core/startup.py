from sqlalchemy.orm import Session
from ..models.user import User, RoleEnum
from ..auth.hashing import get_password_hash
from ..db.db import SessionLocal
from .config import settings

def init_super_admin():
    db: Session = SessionLocal()

    username = settings.SUPERADMIN_USERNAME
    email = settings.SUPERADMIN_EMAIL
    password = settings.SUPERADMIN_PASSWORD

    existing_user = db.query(User).filter(User.role == RoleEnum.super_admin).first()
    if existing_user:
        print(f"✅ Super Admin already exists: {existing_user.username}")
        db.close()
        return

    super_admin = User(
        username=username,
        email=email,
        hashed_password=get_password_hash(password),
        role=RoleEnum.super_admin,
        is_active=True
    )
    db.add(super_admin)
    db.commit()
    db.refresh(super_admin)
    print(f"🚀 Super Admin created: {super_admin.username}")
    db.close()
