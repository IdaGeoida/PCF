# PCF Self-Assessment

## Backend
```bash
docker compose up --build -d
docker compose exec web alembic upgrade head
```
The Dockerfile installs build-essential and rustc temporarily so Pydantic can compile.
API docs at `http://localhost:8000/docs`.

## Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:5173`.
