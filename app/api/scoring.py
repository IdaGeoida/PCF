from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.scoring import calculate_scores
from app.schemas import ScoreInput

router = APIRouter(prefix="/scoring")

@router.post("/")
def score(scores: List[ScoreInput], db: Session = Depends(get_db)):
    return calculate_scores(db, scores)
