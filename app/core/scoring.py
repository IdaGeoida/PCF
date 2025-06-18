from typing import List, Dict
from sqlalchemy.orm import Session

from app.models.models import Process, Applicability
from app.schemas import ScoreInput


def calculate_scores(db: Session, scores: List[ScoreInput]) -> Dict:
    per_process: Dict[int, float] = {}
    for s in scores:
        proc = db.get(Process, s.process_id)
        if not proc or proc.applicability == Applicability.NZ:
            continue
        values = [s.level_general, s.level_detailed]
        if s.level_extension is not None:
            values.append(s.level_extension)
        per_process[s.process_id] = sum(values) / len(values)
    overall = sum(per_process.values()) / len(per_process) if per_process else 0
    return {"overall": overall, "by_process": per_process}
