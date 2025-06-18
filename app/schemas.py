from typing import Optional

from pydantic import BaseModel

from app.models.models import Applicability


class ProcessCreate(BaseModel):
    name: str
    category_id: int
    applicability: Applicability


class ProcessRead(ProcessCreate):
    id: int


class ScoreInput(BaseModel):
    process_id: int
    level_general: int
    level_detailed: int
    level_extension: Optional[int] = None
