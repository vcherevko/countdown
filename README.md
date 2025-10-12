# Countdown to Target Age

A modern web application that calculates and displays a real-time countdown to a specific age based on your date of birth.

## Tech Stack

- **Svelte 5** - Modern reactive UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Docker** - Containerized deployment
- **Nginx** - Production web server

## Features

- Calculate countdown to any target age
- Real-time countdown timer with millisecond precision
- Multiple display formats (days, hours, minutes, seconds)
- Pause/Resume functionality
- Reset countdown
- Input validation
- Responsive design
- Beautiful gradient UI

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Docker (optional, for containerized deployment)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Development with ngrok (for Telegram Mini Apps)

To test the app as a Telegram Mini App, you need to expose your local dev server with HTTPS:

1. Install ngrok from [https://ngrok.com/download](https://ngrok.com/download)

2. Sign up at [https://dashboard.ngrok.com/signup](https://dashboard.ngrok.com/signup)

3. Authenticate ngrok with your token:
```bash
ngrok config add-authtoken YOUR_TOKEN_HERE
```

4. Start the dev server:
```bash
npm run dev
```

5. In a separate terminal, start ngrok tunnel:
```bash
ngrok http 5173
```

6. Get your public HTTPS URL from ngrok:
```bash
curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"[^"]*"' | grep https
```

7. Use the HTTPS URL in your Telegram bot settings

Note: The vite.config.ts is already configured to allow ngrok domains (`.ngrok-free.dev`).

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Docker Deployment

### Build and Run with Docker Compose

```bash
docker-compose up -d
```

The application will be available at [http://localhost:3001](http://localhost:3001)

### Manual Docker Build

```bash
docker build -t countdown-app .
docker run -p 3001:80 countdown-app
```

### Stop Docker Container

```bash
docker-compose down
```

## Project Structure

```
countdown-svelte/
├── src/
│   ├── components/          # Svelte components
│   │   ├── CountdownForm.svelte
│   │   ├── CountdownDisplay.svelte
│   │   └── ControlButtons.svelte
│   ├── lib/
│   │   ├── types.ts        # TypeScript interfaces
│   │   └── utils.ts        # Utility functions
│   ├── stores/
│   │   └── countdown.ts    # Svelte store for state management
│   ├── App.svelte          # Root component
│   └── main.ts             # Application entry point
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose configuration
└── package.json
```

## How It Works

1. Enter your date of birth
2. Enter your target age
3. Select display format (days, hours, minutes, or seconds)
4. Click "Start Countdown"
5. Watch the real-time countdown to your target age
6. Use Pause/Resume to control the countdown
7. Click Reset to start over

## Technical Details

- **State Management**: Uses Svelte writable stores for reactive state
- **Type Safety**: Full TypeScript support with strict type checking
- **Timestamp-based**: Stores dates as timestamps for reliable serialization
- **Reactive Updates**: 1-second interval updates using setInterval
- **Scoped Styles**: Component-scoped CSS with Svelte

## License

MIT
