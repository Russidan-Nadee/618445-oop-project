import { fetcher } from '@/lib/fetcher';
import {
   Transaction,
   BorrowAssetPayload,
   ReturnAssetPayload,
} from '@/types/transaction';

/**
 * Transactions API
 * ใช้เรียก backend ที่เกี่ยวกับการยืม-คืนทรัพย์สิน
 * หมายเหตุ: ห้ามใส่ base URL ที่นี่
 * เพราะ fetcher จัดการให้แล้ว
 */

// POST /transactions/borrow
export async function borrowAsset(
   data: BorrowAssetPayload
): Promise<Transaction> {
   return fetcher<Transaction>('/transactions/borrow', {
      method: 'POST',
      body: JSON.stringify(data),
   });
}

// POST /transactions/return
export async function returnAsset(
   data: ReturnAssetPayload
): Promise<Transaction> {
   return fetcher<Transaction>('/transactions/return', {
      method: 'POST',
      body: JSON.stringify(data),
   });
}

// GET /transactions
export async function getTransactions(): Promise<Transaction[]> {
   return fetcher<Transaction[]>('/transactions');
}

// GET /transactions/user/:id
export async function getTransactionsByUserId(
   userId: number
): Promise<Transaction[]> {
   return fetcher<Transaction[]>(`/transactions/user/${userId}`);
}

// GET /transactions/asset/:id
export async function getTransactionsByAssetId(
   assetId: number
): Promise<Transaction[]> {
   return fetcher<Transaction[]>(`/transactions/asset/${assetId}`);
}
