# Countdown to Target Age

A tiny web app that counts down the time until you reach a certain age.

## Features

- Calculate countdown to any target age
- Multiple display formats (days, hours, minutes, seconds)
- Pause/resume functionality
- Clean, modern, responsive design
- Mobile-friendly interface

## Running Locally

Simply open `index.html` in your web browser.

## Running with Docker

### Prerequisites

- Docker installed on your machine
- Docker Compose (optional, but recommended)

### Option 1: Using Docker Compose (Recommended)

1. Build and start the container:
```bash
docker-compose up -d
```

2. Access the application:
Open your browser and navigate to `http://localhost:3000`

3. Stop the container:
```bash
docker-compose down
```

### Option 2: Using Docker Commands

1. Build the Docker image:
```bash
docker build -t countdown-app .
```

2. Run the container:
```bash
docker run -d -p 3000:80 --name countdown-app countdown-app
```

3. Access the application:
Open your browser and navigate to `http://localhost:3000`

4. Stop and remove the container:
```bash
docker stop countdown-app
docker rm countdown-app
```

### Customizing the Port

To run on a different port, change the port mapping:
```bash
docker run -d -p 8080:80 --name countdown-app countdown-app
```
Then access at `http://localhost:8080`

## Troubleshooting

- **Port already in use**: Change the host port (e.g., use `8080:80` instead of `3000:80`)
- **Container not starting**: Check logs with `docker logs countdown-app`
- **Changes not reflected**: Rebuild the image with `docker-compose up -d --build`
