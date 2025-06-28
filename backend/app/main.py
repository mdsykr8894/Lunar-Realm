from fastapi import FastAPI
from .api.api_v1.router import api_router
from .models import user
from .db.db import Base, engine
from .core.startup import init_super_admin
from .core.config import settings
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Lunar Realm Backend",
    description="Lunar Realm Backend API",
    version="0.1.0",
)

init_super_admin()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,  
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="")

@app.get("/")
def read_root():
    return {"message": "Welcome to Lunar Realm Backend API"}

