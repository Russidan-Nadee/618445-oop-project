import { fetcher } from '@/lib/fetcher';
import { Log } from '@/types/logs';

/**
 * Logs API
 * ใช้เรียก backend ที่เกี่ยวกับประวัติการทำรายการ
 * หมายเหตุ: ห้ามใส่ base URL ที่นี่
 * เพราะ fetcher จัดการให้แล้ว
 */

// GET /logs
export async function getLogs(): Promise<Log[]> {
   return fetcher<Log[]>('/logs');
}

// GET /logs/user/:userId
export async function getLogsByUserId(
   userId: number
): Promise<Log[]> {
   return fetcher<Log[]>(`/logs/user/${userId}`);
}

// GET /logs/target/:targetId
export async function getLogsByTargetId(
   targetId: number
): Promise<Log[]> {
   return fetcher<Log[]>(`/logs/target/${targetId}`);
}
