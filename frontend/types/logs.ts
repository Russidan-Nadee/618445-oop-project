export type LogAction = 'BORROW_ASSET' | 'RETURN_ASSET';

export type UserRole = 'ADMIN' | 'STAFF' | 'USER';

export interface LogUser {
   id: number;
   fullName: string;
   role: UserRole;
}

export interface Log {
   id: number;
   action: LogAction;
   targetId: number;
   timestamp: string; // ISO date string
   userId: number;
   user: LogUser;
}
