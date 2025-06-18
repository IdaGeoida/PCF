from typing import List
from app.schemas import ScoreInput
from app.models.models import Process, Applicability

def calculate_scores(db, scores: List[ScoreInput]):
    # filtrujemy NZ
    valid = []
    for s in scores:
        proc = db.query(Process).get(s.process_id)
        if proc.applicability == Applicability.NZ:
            continue
        general = s.level_general
        detailed = s.level_detailed
        ext = s.level_extension or 0
        # średnia dla procesu
        avg = (general + detailed + ext) / ((3 if s.level_extension is not None else 2))
        valid.append(avg)
    overall = sum(valid) / len(valid) if valid else 0
    return {"overall": overall, "by_process": dict(zip([s.process_id for s in scores], valid))}
