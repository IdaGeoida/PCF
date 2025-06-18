FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt ./
RUN apt-get update \
    && apt-get install -y build-essential rustc cargo \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get purge -y build-essential rustc cargo \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
