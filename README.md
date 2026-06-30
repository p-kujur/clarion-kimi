# Clarion Knowledge Base

A dedicated knowledge base and fullstack platform for **Clarion Education & Skill Pvt. Ltd.** It features markdown-based notes with wiki-style linking, structured for easy discovery and learning.

## Features

- Clean UI matching Clarion's branding
- Per-user contact submissions via tRPC + MySQL

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v3 + shadcn/ui
- tRPC 11 + Hono + Drizzle ORM + MySQL
- React Router v7

## Quick Start

1. Clone / extract this project
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in `DATABASE_URL`
4. Run database migrations: `npx drizzle-kit push`
6. Run the dev server: `npm run dev`
7. Build for production: `npm run build`

## Project Structure

```
.
├── api/                # tRPC routers, Hono server
├── contracts/          # Shared tRPC types
├── db/                 # Drizzle schema, migrations, seed
├── public/             # Static assets
├── src/
│   ├── components/     # UI components
│   ├── hooks/          # Custom hooks
│   └── App.tsx         # Root component
```

## Design

- Primary: `#1E3A8A` (Deep Blue)
- Secondary: `#F47B20` (Orange)
- Background: `#ffffff` (White)
- Typography: Outfit & Roboto
