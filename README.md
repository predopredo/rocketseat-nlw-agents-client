# NLW Agents - Client

A React-based web application developed during the RocketSeat NLW (Next Level Week) event.

## Tech Stack

- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.3
- **Styling**: Tailwind CSS 4.1.11
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: TanStack Query 5.82.0
- **Routing**: React Router DOM 7.6.3
- **Icons**: Lucide React
- **Code Quality**: Biome (formatter/linter)
- **Git Hooks**: Husky

## Project Structure

```
src/
├── components/
│   └── ui/          # shadcn/ui components
├── pages/           # Route components
├── lib/             # Utilities and configurations
└── app.tsx          # Main app with routing setup
```

## Key Patterns

- **Component Architecture**: shadcn/ui with Radix primitives
- **Routing**: React Router with nested routes
- **State Management**: TanStack Query for server state
- **Styling**: Tailwind CSS with CSS variables
- **Type Safety**: Strict TypeScript configuration

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

- **TypeScript**: Strict null checks enabled
- **Path Aliases**: `@/*` maps to `./src/*`
- **Code Formatting**: Biome with ultracite preset
- **Tailwind**: CSS variables for theming

## Development

- **Hot Reload**: Vite dev server
- **Type Checking**: TypeScript compiler
- **Code Quality**: Biome for formatting and linting
- **Git Hooks**: Husky for pre-commit checks
