# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start dev server (uses Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture Overview

This is a **Next.js 16** app (App Router) for discovering developer events (hackathons, meetups, conferences).

### Tech Stack
- **Next.js 16** with React 19 and React Compiler enabled
- **Tailwind CSS v4** with `tw-animate-css` for animations
- **shadcn/ui** (new-york style) - add components via `npx shadcn@latest add <component>`
- **PostHog** for analytics (client-side page view tracking)
- **OGL** for WebGL shader-based visual effects

### Key Configuration
- `next.config.ts`: React Compiler and Turbopack file system cache enabled
- `components.json`: shadcn/ui configured with RSC support, uses `@/components/ui` alias
- Path alias `@/*` maps to project root

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `app/providers/` - Client-side context providers (PostHog)
- `components/` - Reusable UI components
- `lib/utils.ts` - shadcn/ui utility function (`cn` for class merging)
- `lib/constants.ts` - App data/types (event listings with `EventItem` type)
- `public/icons/` - SVG icons, `public/images/` - Event images

### Styling Patterns
- Global styles in `app/globals.css` define custom CSS utilities:
  - `@utility flex-center` - Flexbox centering
  - `@utility text-gradient` - Gradient text effect
  - `@utility glass` - Glassmorphism effect
  - `@utility card-shadow` - Card shadow
- Component-specific styles use `@layer components` with BEM-like IDs (`#event-card`, `#explore-btn`)
- CSS variables for theming defined in `:root`

### Component Patterns
- `LightRays` - WebGL shader component using OGL, renders animated light rays background
- Client components marked with `"use client"` directive
- Events data imported from `@/lib/constants` and rendered via `EventCard` component
