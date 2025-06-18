# app/core/db.py

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 1. URL do bazy (poza Dockerem użyj localhost)
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://pguser:pgpass@localhost:5432/pcfdb"
)

# 2. Silnik i fabryka sesji
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# 3. Dependency FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
