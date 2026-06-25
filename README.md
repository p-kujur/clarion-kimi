# Clarion Knowledge Base

A dedicated knowledge base and fullstack platform for **Clarion Education & Skill Pvt. Ltd.** It features markdown-based notes with wiki-style linking, structured for easy discovery and learning.

## Features

- Markdown editor with live preview (GFM: tables, code blocks, task lists)
- Wiki-style `[[links]]` between notes
- D3 force-directed knowledge graph view over all notes
- Clean UI matching Clarion's branding
- Per-user persistence via tRPC + MySQL; localStorage fallback when unauthenticated
- Custom starter notes highlighting Clarion's impact, initiatives, and philosophy

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v3 + shadcn/ui
- tRPC 11 + Hono + Drizzle ORM + MySQL
- Kimi OAuth 2.0 authentication
- D3.js (knowledge graph)
- `react-markdown` + `remark-gfm`
- React Router v7

## Quick Start

1. Clone / extract this project
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in `DATABASE_URL` and Kimi OAuth credentials
4. Run database migrations: `npx drizzle-kit push`
5. (Optional) Seed starter notes for a specific user: `npx tsx db/seed.ts <userId>`
6. Run the dev server: `npm run dev`
7. Build for production: `npm run build`

## Project Structure

```
.
├── api/                # tRPC routers, Hono server, Kimi OAuth, notes router
├── contracts/          # Shared tRPC types
├── db/                 # Drizzle schema, migrations, seed
├── public/             # Static assets
├── src/
│   ├── components/     # UI components
│   ├── hooks/          # Custom hooks
│   ├── config.ts       # UI strings and starter notes
│   ├── store.ts        # localStorage fallback store
│   └── App.tsx         # Root component
```

## Design

- Primary: `#1E3A8A` (Deep Blue)
- Secondary: `#F47B20` (Orange)
- Background: `#ffffff` (White)
- Typography: Outfit & Roboto
