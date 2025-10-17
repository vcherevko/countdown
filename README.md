# Countdown to Target Age

A modern web application for creating and managing multiple countdown timers to track important dates and milestones.

## Tech Stack

- **Svelte 5** - Modern reactive UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Docker** - Containerized deployment
- **Nginx** - Production web server

## Features

- **Multiple Countdowns** - Create and manage multiple countdown timers
- **Persistent Storage** - All countdowns are saved in localStorage
- **Real-time Updates** - Live countdown with second-level precision
- **Digital Flip Counter** - Modern flip-style animated digits with smooth transitions
- **Custom Titles** - Give each countdown a meaningful name (up to 50 characters)
- **Display Formats** - Choose between Days, Hours, Minutes, or Seconds display
- **Edit & Delete** - Modify or remove countdowns anytime
- **Delete Confirmation** - Custom modal to prevent accidental deletions
- **Empty State** - Beautiful empty state with icon and call-to-action
- **Sorting** - Automatically sorted by time remaining (closest deadline first)
- **Input Validation** - Smart form validation with helpful error messages
- **Responsive Design** - Mobile-first design that works on all screen sizes
- **Telegram Mini App** - Fully integrated with Telegram Web App API

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
│   ├── components/              # Svelte components
│   │   ├── __tests__/               # Component tests
│   │   │   └── FlipCounter.test.ts      # FlipCounter component tests
│   │   ├── ConfirmDialog.svelte    # Reusable confirmation modal
│   │   ├── CountdownEditPage.svelte # Add/edit countdown form
│   │   ├── CountdownItem.svelte     # Individual countdown card
│   │   ├── CountdownList.svelte     # Main list view with empty state
│   │   └── FlipCounter.svelte       # Animated flip counter display
│   ├── lib/
│   │   ├── storage/            # Storage abstraction layer
│   │   │   ├── ICountdownStorage.ts      # Storage interface
│   │   │   ├── LocalCountdownStorage.ts  # localStorage implementation
│   │   │   └── index.ts                  # Storage factory
│   │   ├── __tests__/               # Unit tests
│   │   │   └── utils.test.ts            # Utility function tests
│   │   ├── types.ts           # TypeScript interfaces
│   │   └── utils.ts           # Utility functions
│   ├── stores/
│   │   ├── __tests__/               # Store tests
│   │   │   └── countdown.test.ts        # Countdown store tests
│   │   └── countdown.ts       # Svelte store for state management
│   ├── App.svelte             # Root component with routing
│   └── main.ts                # Application entry point
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # Docker Compose configuration
└── package.json
```

## How It Works

1. **List View** - See all your countdowns at a glance, sorted by urgency
2. **Add Countdown** - Click "+ Add New" or "Create Countdown" button
3. **Fill Form** - Enter a title, date of birth, target age, and display format
4. **Live Updates** - Watch all countdowns update in real-time every second
5. **Edit** - Click the edit icon (✏️) to modify any countdown
6. **Delete** - Click the delete icon (🗑️) and confirm to remove a countdown
7. **Persistence** - All data is automatically saved to localStorage

## Technical Details

### Architecture
- **Storage Abstraction**: Interface-based storage layer for easy replacement (localStorage → API/DB)
- **State Management**: Centralized Svelte stores with derived stores for sorting
- **Component-based**: Modular component architecture with clear separation of concerns
- **Type Safety**: Full TypeScript support with strict type checking

### Key Features
- **Reactive Updates**: All countdowns update simultaneously every second using setInterval
- **Flip Animation**: CSS 3D transforms with animationend event synchronization for smooth transitions
- **Timestamp-based**: Dates stored as millisecond timestamps for reliability
- **UUID Generation**: Unique IDs using timestamp + random string
- **Derived Stores**: Automatic sorting by time remaining (closest deadline first)
- **Form Validation**: Real-time validation with user-friendly error messages
- **Scoped Styles**: Component-scoped CSS prevents style conflicts
- **Component Testing**: Comprehensive test coverage with Vitest

### Data Flow
1. User actions trigger store methods (add/update/delete)
2. Store updates both in-memory state and localStorage
3. Reactive subscriptions automatically update UI
4. Interval timer updates time remaining for all countdowns
5. Derived store recomputes sorted list on every change

## License

MIT
