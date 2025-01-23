# Deployment Guide

## Docker Compose Steps with `./MemoryMint`

1. **Make the script executable**:

   First, grant execute permissions to the `MemoryMint` script to ensure it can be run as a program:

   ```bash
   chmod +x ./MemoryMint
   ```

2. **Run the script to navigate to the `src` directory and initiate Docker Compose**:

   Execute the `MemoryMint` script, which will change your current directory to `src` and start Docker Compose to set up the necessary containers:

   ```bash
   ./MemoryMint
   ```

3. **Access your application**:

   Once the Docker Compose process is running, you can access your application by navigating to `http://localhost:5173/` in your web browser.

## Building Frontend or Backend Separately

- **Build the frontend**:

  To build the frontend component of the application, use the following Docker command, specifying the frontend Dockerfile:

  ```bash
  docker build -t your-frontend -f Dockerfile.frontend .
  ```

- **Build the backend**:

  To build the backend component of the application, use the following Docker command, specifying the backend Dockerfile:

  ```bash
  docker build -t your-backend -f Dockerfile.backend .
  ```


This Docker Compose file defines three services: frontend, backend, and db.
## Services:
#### 1. frontend:
    - Builds the frontend service from the Dockerfile located in the ./frontend directory.
    - Maps port 5173 on the host to port 5173 in the container.
    - Mounts the ./frontend directory to /app in the container.
   - Ensures the node_modules directory in the container is not overwritten.
    - Sets the VITE_API_URL environment variable to http://localhost:5000.
    - Depends on the backend service.
 
#### 2. backend:
    - Builds the backend service from the Dockerfile located in the ./backend directory.
    - Maps port 5000 on the host to port 5000 in the container.
    - Mounts the ./backend directory to /app in the container.
    - Sets environment variables for database connection (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD).
    - Depends on the db service.
 
#### 3. db:
    - Uses the postgres:16 image to create a PostgreSQL database service.
    - Maps port 5433 on the host to port 5432 in the container.
    - Sets environment variables for PostgreSQL configuration (POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD).
    - Uses a named volume (postgres_data) to persist database data.
 
### Volumes:
 
 - postgres_data: A named volume used to persist PostgreSQL data.

## Running The App Anywhere!

In order to run the application anywhere within your user profile you will need to add an alias to the file relative to your root directoy.

To do this simply navigate to you `~/.bashrc` or `~/.zshrc` depending on your shell, and add the following line:

```sh
alias MemoryMint="~/Desktop/MemoryMint/MemoryMint" // or whatever the path to the sourcecode is
```
