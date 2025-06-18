from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.models.models import Process
from app.schemas import ProcessCreate, ProcessRead

router = APIRouter(prefix="/processes")

@router.post("/", response_model=ProcessRead)
def create_process(p: ProcessCreate, db: Session = Depends(get_db)):
    obj = Process(**p.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("/", response_model=List[ProcessRead])
def list_processes(db: Session = Depends(get_db)):
    return db.query(Process).all()
