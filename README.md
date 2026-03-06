# Asset Management System

A comprehensive Asset Management System application designed for organizations to efficiently track and manage their assets. Built with modern technologies for managing administrators, staff, and regular users.

## Objectives

- **Asset Management** - Record asset data, categories, and status
- **Track Borrowing & Returns** - Maintain history of asset borrowing and returns
- **User Management** - Define access permissions (Admin, Staff, User roles)
- **Activity Logging** - Track access history and data changes

## Key Features

- ✅ CRUD operations for Assets, Asset Types, Users, and Transactions
- ✅ Role-based access control system
- ✅ Asset status tracking (AVAILABLE, BORROWED, BROKEN, DISABLED)
- ✅ Dashboard with summary information
- ✅ Change history and activity logs
- ✅ API Documentation

## Tech Stack

### Backend
- **Framework**: NestJS 11
- **ORM**: Prisma 6.19.1
- **Database**: PostgreSQL (Supabase)
- **Language**: TypeScript

### Frontend
- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Language**: TypeScript

## Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **PostgreSQL** database (using Supabase)

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Setup Environment Variables

Create `.env` file in the `backend/` folder (see `.env.example` for reference)

```bash
SUPABASE_URL="your-supabase-url"
DATABASE_URL="your-postgresql-connection-string"
```

### 3. Setup Database

```bash
# Navigate to backend folder
cd backend

# Run Prisma migrations
npx prisma migrate dev
```

### 4. Start Development Servers

**Backend** (Terminal 1):
```bash
cd backend
npm run start:dev
# Backend will run at http://localhost:3001
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
# Frontend will run at http://localhost:3000
```

## Project Structure

```
618445-oop-project/
├── backend/
│   ├── src/
│   │   ├── asset-type/          # Asset Type Management
│   │   ├── assets/              # Assets Management
│   │   ├── transactions/        # Transaction/Borrow History
│   │   ├── user/                # User Management
│   │   ├── log/                 # Activity Logs
│   │   ├── prisma/              # Prisma Service
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma        # Database Schema
│   │   └── migrations/
│   ├── docs/                    # API Documentation
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx            # Dashboard
│   │   ├── assets/             # Assets Page
│   │   └── history/            # History Page
│   ├── components/
│   │   ├── common/             # Shared Components
│   │   ├── features/           # Feature Components
│   │   └── layout/             # Layout Components
│   ├── lib/
│   │   ├── api/                # API Calls
│   │   └── fetcher.ts
│   ├── types/                  # TypeScript Types
│   └── package.json
│
└── README.md (ไฟล์นี้)
```

## API Documentation

API documentation can be found in `backend/docs/`:
- [api.md](backend/docs/api.md) - API Overview
- [assets.api.md](backend/docs/assets.api.md) - Assets Endpoints
- [asset-types.api.md](backend/docs/asset-types.api.md) - Asset Types Endpoints
- [transactions.api.md](backend/docs/transactions.api.md) - Transactions Endpoints
- [users.api.md](backend/docs/users.api.md) - Users Endpoints
- [logs.api.md](backend/docs/logs.api.md) - Logs Endpoints

## Available Scripts

### Backend

```bash
npm run start         # Start production server
npm run start:dev     # Start development server with watch
npm run build         # Build for production
npm run lint          # Run ESLint
npm run test          # Run unit tests
npm run test:cov      # Run tests with coverage
```

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Database Models

### Asset
- ทรัพย์สินที่ต้องจัดการ
- มีหมวดหมู่ (AssetType)
- มีสถานะ (AVAILABLE, BORROWED, BROKEN, DISABLED)

### AssetType
- หมวดหมู่ของทรัพย์สิน

### User
- ผู้ใช้งานระบบ
- มีบทบาท (ADMIN, STAFF, USER)

### Transaction
- บันทึกการยืมและการคืนทรัพย์สิน

### Log
- บันทึกกิจกรรมและการเปลี่ยนแปลงข้อมูล

## Author

**Russidan Nadee**  
GitHub: https://github.com/Russidan-Nadee

## License

UNLICENSED

## Note

This is a course project for Object-Oriented Programming (OOP) and is complete for submission.
