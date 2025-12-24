export type TransactionAction = 'borrow' | 'return';

export interface Transaction {
   id: number;
   action: TransactionAction;
   actionDate: string;
   note: string | null;
   userId: number;
   assetId: number;
   user?: {
      id: number;
      fullName: string;
      email: string;
      role: string;
   };
   asset?: {
      id: number;
      name: string;
      serialNumber: string;
      status: string;
   };
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
