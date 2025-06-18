from typing import Optional
from pydantic import BaseModel
from enum import Enum

class Applicability(str, Enum):
    MZ = 'MZ'
    WP = 'WP'
    NZ = 'NZ'

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
