frontend/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx              # dashboard
│  │
│  ├─ assets/
│  │  ├─ page.tsx           # list assets
│  │  ├─ create/
│  │  │  └─ page.tsx
│  │  └─ [id]/
│  │     ├─ page.tsx        # asset detail
│  │     └─ edit/
│  │        └─ page.tsx
│  │
│  ├─ asset-types/
│  │  ├─ page.tsx
│  │  └─ create/
│  │     └─ page.tsx
│  │
│  ├─ users/
│  │  ├─ page.tsx
│  │  └─ [id]/
│  │     └─ page.tsx
│  │
│  ├─ transactions/
│  │  ├─ page.tsx           # history
│  │  ├─ borrow/
│  │  │  └─ page.tsx
│  │  └─ return/
│  │     └─ page.tsx
│  │
│  └─ logs/
│     └─ page.tsx           # read-only
│
├─ lib/
│  ├─ api/
│  │  ├─ assets.ts
│  │  ├─ asset-types.ts
│  │  ├─ users.ts
│  │  ├─ transactions.ts
│  │  └─ logs.ts
│  │
│  └─ fetcher.ts            # base fetch
│
├─ components/
│  ├─ assets/
│  │  ├─ AssetTable.tsx
│  │  └─ AssetForm.tsx
│  │
│  ├─ users/
│  ├─ transactions/
│  │
│  └─ common/
│     ├─ Button.tsx
│     └─ Modal.tsx
│
├─ types/
│  ├─ asset.ts
│  ├─ user.ts
│  └─ transaction.ts
│
└─ public/
