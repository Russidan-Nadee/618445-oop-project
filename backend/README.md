# Backend - Asset Management System

NestJS API server for the Asset Management System

## Overview

This backend uses the **NestJS** framework with **Prisma ORM** to manage the organization's asset database. It provides RESTful APIs for the frontend application.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: NestJS 11
- **ORM**: Prisma 6.19.1
- **Database**: PostgreSQL (Supabase)
- **Validation**: class-validator, class-transformer
- **Testing**: Jest

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or use Supabase)

## Installation

```bash
# Install dependencies
npm install

# Setup environment variables
# Copy .env.example to .env and update DATABASE_URL
cp .env.example .env
```

## Setup Database

```bash
# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```
Backend will run at `http://localhost:3001` with auto-reload on changes

### Production Mode
```bash
npm run build
npm run start:prod
```

## Project Structure

```
src/
├── asset-type/
│   ├── asset-type.controller.ts    # Endpoints
│   ├── asset-type.service.ts       # Business logic
│   ├── asset-type.module.ts
│   └── dto/
│       └── create-asset-type.dto.ts
│
├── assets/
│   ├── assets.controller.ts
│   ├── assets.service.ts
│   ├── assets.module.ts
│   └── dto/
│       ├── create-asset.dto.ts
│       └── update-asset.dto.ts
│
├── transactions/
│   ├── transactions.controller.ts
│   ├── transactions.service.ts
│   ├── transactions.module.ts
│   └── dto/
│       └── create-transaction.dto.ts
│
├── user/
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.module.ts
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   └── entities/
│       └── user.entity.ts
│
├── log/
│   ├── log.controller.ts
│   ├── log.service.ts
│   └── log.module.ts
│
├── prisma/
│   ├── prisma.service.ts          # Database service
│   └── prisma.module.ts
│
├── app.module.ts                  # Root module
└── main.ts                        # Entry point
```

## API Endpoints

### Asset Type Management
- `GET /asset-type` - Get all asset types
- `GET /asset-type/:id` - Get specific asset type
- `POST /asset-type` - Create new asset type
- `PATCH /asset-type/:id` - Update asset type
- `DELETE /asset-type/:id` - Delete asset type

### Asset Management
- `GET /assets` - Get all assets
- `GET /assets/:id` - Get specific asset
- `POST /assets` - Create new asset
- `PATCH /assets/:id` - Update asset
- `DELETE /assets/:id` - Delete asset

### User Management
- `GET /user` - Get all users
- `GET /user/:id` - Get specific user
- `POST /user` - Create new user
- `PATCH /user/:id` - Update user
- `DELETE /user/:id` - Delete user

### Transaction Management
- `GET /transactions` - Get all transactions
- `GET /transactions/:id` - Get specific transaction
- `POST /transactions` - Record new transaction
- `PATCH /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

### Log Management
- `GET /log` - Get activity logs
- `GET /log/:id` - Get specific log entry

See [API Documentation](./docs/) for more details

## Environment Variables

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# Supabase (if using)
SUPABASE_URL="https://your-project-id.supabase.co"

# Node Environment
NODE_ENV="development"
```

## Available Scripts

```bash
# Development
npm run start:dev      # Run with watch mode
npm run start:debug    # Run with debug mode

# Production
npm run build          # Build for production
npm run start:prod     # Run production build

# Linting & Formatting
npm run lint           # Run ESLint
npm run format         # Format code with Prettier

# Testing
npm run test           # Run unit tests
npm run test:watch     # Run tests with watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run E2E tests
```

## Database Schema

### Asset
- `id` - Primary key
- `name` - Asset name
- `serialNumber` - Serial number
- `status` - Status (AVAILABLE, BORROWED, BROKEN, DISABLED)
- `purchaseDate` - Purchase date
- `typeId` - Foreign key to AssetType

### AssetType
- `id` - Primary key
- `name` - Type name

### User
- `id` - Primary key
- `email` - Email address
- `name` - User name
- `role` - Role (ADMIN, STAFF, USER)

### Transaction
- `id` - Primary key
- `assetId` - Foreign key to Asset
- `userId` - Foreign key to User
- `transactionType` - Type (BORROW, RETURN)
- `date` - Transaction date

### Log
- `id` - Primary key
- `userId` - Foreign key to User
- `action` - Action performed
- `timestamp` - Timestamp

## Prisma Commands

```bash
# Create new migration
npx prisma migrate dev --name <migration-name>

# Apply migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

## Development Tips

- Use Prisma Studio (`npx prisma studio`) to view and edit database data via GUI
- Verify `.env` file has correct `DATABASE_URL`
- Use `npm run lint` to check code before committing
- Write unit tests for services

## Troubleshooting

**Error: Can't reach database**
- Check `DATABASE_URL` in `.env`
- Verify database server is running

**Error: Prisma migration failed**
- Run `npx prisma migrate reset` for development database only
- Check `schema.prisma` for errors

**Error: Port already in use**
- Default backend port is 3001
- Change port in `main.ts` or stop process using port 3001
