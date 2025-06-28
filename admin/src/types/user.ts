export type Role = "user" | "admin" | "super_admin";

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  deleted_by?: number;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
  role?: Role;
}
