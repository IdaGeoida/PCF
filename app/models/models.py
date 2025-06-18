import enum
from sqlalchemy import Column, Enum as SQLEnum, ForeignKey, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Applicability(enum.Enum):
    MZ = "MZ"
    WP = "WP"
    NZ = "NZ"

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

class Process(Base):
    __tablename__ = "processes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    applicability = Column(SQLEnum(Applicability), nullable=False)

