FROM python:3.13-slim

WORKDIR /app

# Skopiuj tylko plik z zależnościami
COPY requirements.txt .

# Zainstaluj wszystkie pakiety
RUN pip install --no-cache-dir -r requirements.txt

# Skopiuj resztę aplikacji
COPY . .

EXPOSE 8000

# Domyślne polecenie uruchomienia
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
