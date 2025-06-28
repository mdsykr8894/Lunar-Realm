from fastapi import APIRouter
from app.api.api_v1.endpoints.public import auth
from app.api.api_v1.endpoints.admin import users, super_admin_users


api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(super_admin_users.router)
