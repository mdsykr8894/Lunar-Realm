from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
import enum

class RoleEnum(str, enum.Enum):
    user = "user"
    admin = "admin"
    super_admin = "super_admin"

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: RoleEnum
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]
    is_deleted: bool
    deleted_at: Optional[datetime]
    deleted_by: Optional[int]

    class Config:
        from_attributes = True
        
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    role: Optional[RoleEnum] = None 

class UserLogin(BaseModel):
    username: str
    password: str
