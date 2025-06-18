from fastapi import FastAPI
from .api import router

app = FastAPI(title="PCF Self-Assessment")
app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {"status": "ok"}
