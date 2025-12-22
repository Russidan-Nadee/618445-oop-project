export type TransactionAction = 'borrow' | 'return';

export interface Transaction {
   id: number;
   action: TransactionAction;
   actionDate: string; // ISO date string
   note: string | null;
   userId: number;
   assetId: number;
}

export interface BorrowAssetPayload {
   userId: number;
   assetId: number;
   note?: string;
}

export interface ReturnAssetPayload {
   userId: number;
   assetId: number;
   note?: string;
}
