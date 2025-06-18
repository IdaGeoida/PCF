from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.models.models import Process, Applicability
from app.schemas import ScoreInput

router = APIRouter(prefix="/scoring")

@router.post("/")
def score(payload: List[ScoreInput], db: Session = Depends(get_db)):
    results = {}
    for item in payload:
        proc = db.get(Process, item.process_id)
        if not proc or proc.applicability == Applicability.NZ:
            continue
        values = [item.level_general, item.level_detailed]
        if item.level_extension is not None:
            values.append(item.level_extension)
        results[item.process_id] = sum(values) / len(values)
    overall = sum(results.values()) / len(results) if results else 0
    return {"overall": overall, "by_process": results}
