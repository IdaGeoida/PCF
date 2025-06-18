# PCF Self-Assessment

This project contains a FastAPI backend with a React frontend used to score PCF processes.

## Backend

```bash
# build containers and start services
docker compose up --build -d

# run migrations inside the web service
docker compose exec web alembic upgrade head
```

The API is available at `http://localhost:8000` and documentation at `http://localhost:8000/docs`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The React app will be served on `http://localhost:5173`.

