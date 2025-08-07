# Overview

Game Grabber: GameFreebie Tracker is a retro-themed web application that displays real-time free game giveaways from various platforms like Steam, Epic Games, and GOG. The app features an 8-bit aesthetic with pixel fonts and neon colors, allowing users to browse, filter, and claim free games and digital content. It fetches data from the GamerPower API and provides filtering capabilities by platform, type (game/loot/beta), and sorting options.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing (Home page and giveaway details)
- **State Management**: TanStack Query (React Query) for server state management with caching
- **Styling**: Tailwind CSS with custom 8-bit/retro theme using CSS variables and pixel fonts
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessibility
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules for consistent type checking across the stack
- **API Design**: RESTful endpoints serving JSON data
- **Middleware**: Express middleware for logging, JSON parsing, and error handling
- **Development**: Hot module reloading with Vite integration in development mode

## Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Caching Strategy**: In-memory caching for giveaway data with 5-minute TTL to reduce external API calls
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Database Provider**: Neon serverless PostgreSQL (configured but not actively used in current implementation)

## Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Basic session infrastructure configured with connect-pg-simple for PostgreSQL sessions
- **Future Extensibility**: Foundation laid for user accounts and personalized features

## External Service Integrations
- **Primary Data Source**: GamerPower API for fetching giveaway information
- **API Endpoints**: 
  - `/api/giveaways` with filtering parameters (platform, type, sort)
  - `/api/giveaway/{id}` for individual giveaway details
- **Error Handling**: Comprehensive error handling for API failures with user-friendly fallbacks
- **Rate Limiting**: Caching layer to prevent excessive API calls and respect external service limits

## Key Design Patterns
- **Separation of Concerns**: Clear separation between client, server, and shared code
- **Type Safety**: End-to-end TypeScript with Zod schemas for runtime validation
- **Responsive Design**: Mobile-first approach with retro gaming aesthetics
- **Performance**: Image optimization, lazy loading, and efficient state management
- **Accessibility**: Semantic HTML and ARIA attributes through Radix UI components

# External Dependencies

## Core Framework Dependencies
- React ecosystem (React 18, React DOM, TypeScript)
- Express.js for server-side API handling
- Vite for build tooling and development server

## Database and ORM
- PostgreSQL as the target database
- Drizzle ORM for type-safe database operations
- Neon serverless PostgreSQL for cloud database hosting
- connect-pg-simple for PostgreSQL session storage

## UI and Styling
- Tailwind CSS for utility-first styling
- Shadcn/ui component library built on Radix UI
- Google Fonts (Press Start 2P) for retro pixel font aesthetic
- Class Variance Authority for component variant management

## State Management and Data Fetching
- TanStack React Query for server state management and caching
- Wouter for lightweight client-side routing
- React Hook Form with Hookform Resolvers for form handling

## Development and Build Tools
- TypeScript for static type checking
- ESBuild for server-side bundling
- PostCSS with Autoprefixer for CSS processing
- Replit-specific plugins for development environment integration

## External APIs
- GamerPower API (gamerpower.com) for giveaway data
- No API key required for basic giveaway endpoints
- Rate limiting handled through application-level caching