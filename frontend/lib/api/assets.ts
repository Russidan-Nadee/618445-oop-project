import { fetcher } from "../fetcher";
import { Asset } from '@/types/asset';

/**
 * Assets API
 * ใช้เรียก backend ที่เกี่ยวกับ assets ทั้งหมด
 * หมายเหตุ: ห้ามใส่ base URL ที่นี่
 * เพราะ fetcher จัดการให้แล้ว
 */

// GET /assets
export async function getAssets(): Promise<Asset[]> {
   return fetcher<Asset[]>('/assets');
}

// GET /assets/:id
export async function getAssetById(id: number): Promise<Asset> {
   return fetcher<Asset>(`/assets/${id}`);
}

// GET /assets?typeId=:id
export async function getAssetsByTypeId(typeId: number): Promise<Asset[]> {
   return fetcher<Asset[]>(`/assets?typeId=${typeId}`);
}

// POST /assets
export async function createAsset(data: Omit<Asset, 'id'>): Promise<Asset> {
   return fetcher<Asset>('/assets', { method: 'POST', body: JSON.stringify(data) });
}

// PATCH /assets/:id
export async function updateAsset(id: number, data: Partial<Omit<Asset, 'id'>>): Promise<Asset> {
   return fetcher<Asset>(`/assets/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

// DELETE /assets/:id
export async function deleteAsset(id: number): Promise<void> {
   return fetcher(`/assets/${id}`, { method: 'DELETE' });
}