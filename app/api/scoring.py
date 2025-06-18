from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import ScoreInput
from app.core.db import get_db
from app.core.scoring import calculate_scores
from typing import List            # ← dodaj ten import


router = APIRouter()

@router.post("/scoring/")
def score(scores: List[ScoreInput], db: Session = Depends(get_db)):
    return calculate_scores(db, scores)
