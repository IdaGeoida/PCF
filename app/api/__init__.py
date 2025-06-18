# app/api/__init__.py

from fastapi import APIRouter
from .processes import router as processes_router
from .scoring import router as scoring_router

router = APIRouter()
router.include_router(processes_router)        # ścieżki /processes
router.include_router(scoring_router)          # ścieżki /scoring
