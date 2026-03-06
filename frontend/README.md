# Frontend - Asset Management System

Next.js application for displaying and managing assets in the Asset Management System

## Overview

This frontend uses **Next.js 16** with **React 19** to build a simple and user-friendly UI, connected to the backend API.

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Language**: TypeScript

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Frontend will run at `http://localhost:3000` with hot reload

### Production Mode
```bash
npm run build
npm run start
```

## Project Structure

```
app/
├── globals.css              # Global styles
├── layout.tsx              # Root layout
├── page.tsx                # Home/Dashboard page
├── assets/
│   └── page.tsx            # Assets management page
└── history/
    └── page.tsx            # Transaction history page

components/
├── common/                 # Shared components (Button, Input, etc.)
├── features/
│   ├── assets/
│   │   ├── AssetTable.tsx          # Assets table
│   │   └── CreateAssetDialog.tsx   # Create asset form
│   ├── auth/
│   │   └── EmailGate.tsx           # Email authentication
│   └── dashboard/
│       ├── AssetSummary.tsx        # Summary cards
│       ├── BorrowedTrend.tsx       # Chart
│       └── RecentTransactions.tsx  # Recent transactions list
└── layout/
    ├── Header.tsx          # Top header
    └── Sidebar.tsx         # Navigation sidebar

lib/
├── api/
│   ├── assets.ts           # Assets API calls
│   ├── asset-types.ts      # Asset types API calls
│   ├── transactions.ts     # Transactions API calls
│   ├── users.ts            # Users API calls
│   └── logs.ts             # Logs API calls
└── fetcher.ts              # HTTP client

types/
├── asset.ts                # Asset type definitions
├── assetType.ts            # AssetType type definitions
├── transaction.ts          # Transaction type definitions
├── users.ts                # User type definitions
└── logs.ts                 # Log type definitions

config/
└── menu.ts                 # Navigation menu configuration

public/                     # Static assets
```

## Pages

### Dashboard (/)
- Display main page with:
  - Asset summary information
  - Asset borrowing trend chart
  - Recent transaction list

### Assets (/assets)
- View asset list
- Create new asset
- Edit/delete assets
- Search and filter assets

### History (/history)
- View asset borrowing and return history
- Check borrowing/return status

## API Integration

Frontend connects to backend API through files in `lib/api/`

Example:
```typescript
// Fetch assets
const response = await fetch('/api/assets');
const assets = await response.json();
```

**Base URL**: `http://localhost:3001` (for development)

## Environment Variables

No environment variables needed for development (backend API points to localhost:3001 by default)

To change backend URL for production, create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

## Available Scripts

```bash
# Development
npm run dev            # Start development server

# Production
npm run build          # Build for production
npm run start          # Start production server

# Linting
npm run lint           # Run ESLint
```

## Components

### Common Components
- `Button` - Basic button component
- `Input` - Input field component
- `Dialog` - Modal dialog component
- `Table` - Data table component

### Feature Components

**Assets**
- `AssetTable` - Table displaying asset list
- `CreateAssetDialog` - Form for creating new asset

**Dashboard**
- `AssetSummary` - Summary cards
- `BorrowedTrend` - Trend chart
- `RecentTransactions` - Recent transactions list

**Layout**
- `Header` - Top header
- `Sidebar` - Navigation sidebar

## Styling

Uses **Tailwind CSS** for styling throughout the application

- Global styles: `app/globals.css`
- Component styles: Tailwind class names in JSX

## Development Tips

- Use browser DevTools to debug
- Check Network tab to view API calls
- Use `npm run lint` to check code
- Refer to Recharts documentation for complex charts

## Troubleshooting

**Error: Cannot GET /api/***
- Verify backend server is running (`npm run start:dev` in backend folder)
- Verify backend port is 3001

**Error: Module not found**
- Run `npm install` again
- Check import paths

**Port 3000 already in use**
- Stop process using port 3000
- Or change port with `npm run dev -- -p 3001`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org)
