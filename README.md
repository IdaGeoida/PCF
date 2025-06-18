# PCF Self-Assessment

This project includes a FastAPI backend with a React frontend used to score PCF processes. Docker is used for local development along with Alembic migrations.

## Requirements

- **Python** 3.13 or newer (see `requirements.txt`)
- **Docker** and **docker compose** for container management
- **Node.js** 18+ once the frontend is installed

## Backend

```bash
# build containers and start services
docker compose up --build -d

# run migrations inside the web service
docker compose exec web alembic upgrade head
```

The API will be available at `http://localhost:8000` and documentation at `http://localhost:8000/docs`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The React app runs on `http://localhost:5173`.

## Usage notes

- Entry point: [`app/main.py`](app/main.py)
- API routes under [`app/api`](app/api/)
- Models in [`app/models`](app/models/)
- Frontend root at [`frontend/src/App.tsx`](frontend/src/App.tsx)

