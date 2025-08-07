# GameGrabber - React + Vite + Express

A modern web application built with React, Vite, and Express for tracking free game giveaways.

## Prerequisites

- Node.js (v18 or higher)
- npm

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run in Development Mode

#### Option 1: Full Development Mode (Recommended)
Runs both the Express server and Vite dev server concurrently:

```bash
npm run dev:full
```

#### Option 2: Separate Processes
Run the Express server and Vite dev server separately:

```bash
# Terminal 1: Start Express server
npm run dev

# Terminal 2: Start Vite dev server
npm run client:dev
```

### 3. Build for Production

```bash
npm run build
```

### 4. Run Production Build

```bash
npm start
```

## Available Scripts

- `npm run dev` - Starts Express server in development mode
- `npm run client:dev` - Starts Vite dev server for client development
- `npm run dev:full` - Starts both Express server and Vite dev server concurrently
- `npm run build` - Builds both client and server for production
- `npm start` - Runs the production build
- `npm run check` - Runs TypeScript type checking
- `npm run db:push` - Pushes database schema changes

## Project Structure

```
├── client/                 # React frontend
│   ├── src/               # Source code
│   └── index.html         # HTML template
├── server/                # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database utilities
│   └── vite.ts            # Vite integration
├── shared/                # Shared types and schemas
└── attached_assets/       # Static assets
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
DATABASE_URL=your_database_url_here
SESSION_SECRET=your_session_secret_here
```

## Features

- Real-time free game giveaway tracking
- Modern React UI with Tailwind CSS
- Express backend with TypeScript
- Database integration with Drizzle ORM
- Session management
- Responsive design

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Express, TypeScript, Drizzle ORM
- **Database**: PostgreSQL (via Neon)
- **Authentication**: Passport.js
- **Styling**: Tailwind CSS with custom components

## Vercel Deployment

### ✅ Yes, this project can be hosted on Vercel!

This project has been configured for Vercel deployment with:
- **Frontend**: Static React app (client/dist)
- **Backend**: Serverless API functions (api/index.js)
- **API routes**: Mock endpoints for development

### 🚀 Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Alternative**: Connect your GitHub repository to Vercel dashboard for automatic deployments

### 📁 Vercel Configuration Files

- `vercel.json`: Vercel deployment configuration
- `api/index.js`: Serverless API function
- `client/dist/`: Static React build output

### 🔄 API Endpoints (Vercel)

When deployed to Vercel, these endpoints will be available:
- `GET /api/health` - Health check
- `GET /api/games` - Games data
- `GET /api/giveaways` - Giveaways data

### 📝 Notes for Production

- The current API endpoints are mock data for demonstration
- For production use, integrate with your actual database
- Consider using Vercel's Edge Functions for better performance
- Environment variables can be set in Vercel dashboard

## Windows Compatibility

This project has been configured to work seamlessly on Windows with:
- Cross-platform environment variable handling using `cross-env`
- Windows-compatible npm scripts
- Proper path resolution for Windows file systems