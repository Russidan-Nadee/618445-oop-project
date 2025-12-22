// base URL ของ backend
const API_BASE = 'http://localhost:3000'

/**
 * fetcher
 * ใช้เรียก API backend กลางของ frontend
 * - ต่อ base URL ให้อัตโนมัติ
 * - ตั้ง header เป็น JSON
 * - เช็ค error ให้
 * - แปลง response เป็น JSON
 */

export async function fetcher<T>(
   path: string,
   options?: RequestInit
): Promise<T> {
   // เรียก API จริง
   const res = await fetch(API_BASE + path, {
      // backend ของคุณรับ JSON
      headers: {
         'Content-Type': 'application/json',
      },
      ...options,
   })

   // ถ้า status ไม่ใช่ 2xx ให้ถือว่า error
   if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
   }

   // แปลง response เป็น JSON แล้วส่งกลับ
   return res.json()
}
