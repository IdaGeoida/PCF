from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.models.models import Process
from app.schemas import ProcessCreate, ProcessRead

router = APIRouter(prefix="/processes")

@router.post("/", response_model=ProcessRead)
def create_process(p: ProcessCreate, db: Session = Depends(get_db)):
    db_obj = Process(**p.model_dump())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=List[ProcessRead])
def list_processes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Process).offset(skip).limit(limit).all()
