# PCF Project

This repository contains a FastAPI backend and a small React frontend.

## Environment requirements

- **Python 3.13+** (defined in the [Dockerfile](./Dockerfile))
- **Docker** and **docker-compose** for running the stack
- **Node.js** for the React frontend

## Getting started

### Backend

1. Build and start the services:

```bash
docker-compose up --build
```

2. Apply database migrations after the containers are running:

```bash
docker-compose exec web alembic upgrade head
```

### Frontend

1. Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm start
```

The application will be served on `http://localhost:5173/` by default.

## Project structure

- [`app/main.py`](./app/main.py) – FastAPI entry point
- [`app/models`](./app/models) – database models
- [`app/api`](./app/api) – API routes
- [`alembic`](./alembic) – database migrations

Use Docker for the simplest setup. If you prefer a local Python environment,
install the requirements from `requirements.txt` before running the commands
above.
