export type UserRole = 'ADMIN' | 'STAFF' | 'USER';

export interface User {
   id: number;
   fullName: string;
   email: string;
   role: UserRole;
}

export interface CreateUserPayload {
   fullName: string;
   email: string;
   role: UserRole;
}

export interface UpdateUserPayload {
   fullName?: string;
   email?: string;
   role?: UserRole;
}
