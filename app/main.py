from fastapi import FastAPI
from app.api import router

app = FastAPI(title="PCF Self-Assessment")
app.include_router(router)   # nie ma prefixu, żeby docs były pod /docs

@app.get("/")
def read_root():
    return {"status": "ok"}
