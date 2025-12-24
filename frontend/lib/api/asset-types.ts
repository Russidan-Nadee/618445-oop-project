import { fetcher } from '@/lib/fetcher'
import { AssetType } from '@/types/asset-type'

/**
 * Asset Types API
 * ใช้เรียก backend ที่เกี่ยวกับ asset-types ทั้งหมด
 * หมายเหตุ: ห้ามใส่ base URL ที่นี่
 * เพราะ fetcher จัดการให้แล้ว
 */

// GET /asset-types
export async function getAssetTypes(): Promise<AssetType[]> {
   return fetcher<AssetType[]>('/asset-types')
}

// GET /asset-types/:id
export async function getAssetTypeById(id: number): Promise<AssetType> {
   return fetcher<AssetType>(`/asset-types/${id}`)
}

// POST /asset-types
export async function createAssetType(
   data: { name: string }
): Promise<AssetType> {
   return fetcher<AssetType>('/asset-types', {
      method: 'POST',
      body: JSON.stringify(data),
   })
}

// PATCH /asset-types/:id
export async function updateAssetType(
   id: number,
   data: { name: string }
): Promise<AssetType> {
   return fetcher<AssetType>(`/asset-types/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
   })
}

// DELETE /asset-types/:id
export async function deleteAssetType(id: number): Promise<void> {
   return fetcher<void>(`/asset-types/${id}`, {
      method: 'DELETE',
   })
}
