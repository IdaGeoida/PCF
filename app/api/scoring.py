from collections import defaultdict
from typing import List, Dict, Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.models.models import Process, Applicability
from app.schemas import ScoreInput

router = APIRouter(prefix="/scoring")


def _score_average(score: ScoreInput) -> float:
    values = [score.level_general, score.level_detailed]
    if score.level_extension is not None:
        values.append(score.level_extension)
    return sum(values) / len(values)


@router.post("/")
def compute_scoring(scores: List[ScoreInput], db: Session = Depends(get_db)) -> Dict[str, Any]:
    by_process_values: Dict[int, List[float]] = defaultdict(list)

    for s in scores:
        process = db.query(Process).get(s.process_id)
        if not process:
            raise HTTPException(status_code=404, detail=f"Process {s.process_id} not found")
        if process.applicability == Applicability.NZ:
            continue
        by_process_values[process.id].append(_score_average(s))

    if not by_process_values:
        return {"overall": 0.0, "by_process": {}}

    by_process_avg = {pid: sum(vals) / len(vals) for pid, vals in by_process_values.items()}
    total_sum = sum(sum(vals) for vals in by_process_values.values())
    total_count = sum(len(vals) for vals in by_process_values.values())
    overall = total_sum / total_count if total_count else 0.0

    return {"overall": overall, "by_process": by_process_avg}
