import { fetcher } from '@/lib/fetcher';
import {
   User,
   CreateUserPayload,
   UpdateUserPayload,
} from '@/types/users';

/**
 * Users API
 * ใช้เรียก backend ที่เกี่ยวกับ users ทั้งหมด
 * หมายเหตุ: ห้ามใส่ base URL ที่นี่
 * เพราะ fetcher จัดการให้แล้ว
 */

// GET /users
export async function getUsers(): Promise<User[]> {
   return fetcher<User[]>('/users');
}

// GET /users/:id
export async function getUserById(id: number): Promise<User> {
   return fetcher<User>(`/users/${id}`);
}

// POST /users
export async function createUser(
   data: CreateUserPayload
): Promise<User> {
   return fetcher<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
   });
}

// PATCH /users/:id
export async function updateUser(
   id: number,
   data: UpdateUserPayload
): Promise<User> {
   return fetcher<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
   });
}

// DELETE /users/:id
export async function deleteUser(id: number): Promise<void> {
   return fetcher<void>(`/users/${id}`, {
      method: 'DELETE',
   });
}

// GET /users/email/:email
export async function getUserByEmail(email: string): Promise<User | null> {
   return fetcher<User | null>(`/users/email/${email}`);
}
