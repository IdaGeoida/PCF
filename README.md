# PCF

This project contains a FastAPI backend with a small React frontend. Docker is
used to provide the runtime infrastructure and PostgreSQL database. Alembic is
used for database migrations.

## Requirements

- **Python**: 3.13 or newer. The provided `Dockerfile` installs the backend
  dependencies from `requirements.txt` using Python 3.13.
- **Docker** and **docker-compose**: required for running the application stack
  locally.
- **Node.js**: a recent Node.js LTS (18+) is required once the frontend is
  installed. The `frontend` directory contains the React code.

## Running the stack

1. Start the database and backend services:

   ```bash
   docker-compose up --build
   ```

2. Apply database migrations after the containers are running:

   ```bash
   docker-compose exec web alembic upgrade head
   ```

3. Start the frontend development server (requires Node.js):

   ```bash
   cd frontend
   npm install
   npm start
   ```

The backend will be available at [http://localhost:8000](http://localhost:8000)
and the frontend at [http://localhost:3000](http://localhost:3000) when using the
Create React App defaults.

## Usage notes

- The FastAPI application entry point is [`app/main.py`](app/main.py). API
  routes are defined under [`app/api`](app/api/).
- Database models are in [`app/models`](app/models/), and migrations live under
  [`alembic`](alembic/).
- The React application bootstraps from
  [`frontend/src/App.tsx`](frontend/src/App.tsx).

This repository assumes a working Docker and Node setup to run both backend and
frontend locally.
