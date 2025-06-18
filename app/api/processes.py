# app/api/processes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List            # ← dodaj ten import
from app.models.models import Process as ProcessModel
from app.schemas import ProcessCreate, ProcessRead
from app.core.db import get_db

router = APIRouter()

@router.post("/processes/", response_model=ProcessRead)
def create_process(p: ProcessCreate, db: Session = Depends(get_db)):
    db_p = ProcessModel(**p.dict())
    db.add(db_p)
    db.commit()
    db.refresh(db_p)
    return db_p

@router.get("/processes/", response_model=List[ProcessRead])  # teraz List jest zdefiniowane
def list_processes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(ProcessModel).offset(skip).limit(limit).all()
