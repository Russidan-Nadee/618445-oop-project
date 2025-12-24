const API_BASE = 'http://localhost:3000';

export async function fetcher<T>(
   path: string,
   options?: RequestInit
): Promise<T> {
   try {
      const res = await fetch(`${API_BASE}${path}`, {
         ...options,
         headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
         },
      });

      if (!res.ok) {
         // พยายามอ่าน Error Message จาก Backend ถ้ามี
         const errorData = await res.json().catch(() => ({}));
         throw new Error(errorData.message || `API error: ${res.status}`);
      }

      return await res.json();
   } catch (error) {
      console.error("Fetcher Error:", error);
      throw error;
   }
}