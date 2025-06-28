// src/services/users.ts

import api from "../api/api";

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/admin/users");
  return data;
};

// Fetch single user by ID
export const fetchUserById = async (userId: number): Promise<User> => {
  const { data } = await api.get(`/admin/users/${userId}`);
  return data;
};

// Create new user
export const createUser = async (payload: UserCreate): Promise<User> => {
  const { data } = await api.post("/admin/users", payload);
  return data;
};

// Update existing user
export const updateUser = async (
  userId: number,
  payload: UserUpdate
): Promise<User> => {
  const { data } = await api.put(`/admin/users/${userId}`, payload);
  return data;
};

// Delete user
export const deleteUser = async (
  userId: number
): Promise<{ detail: string }> => {
  const { data } = await api.delete(`/admin/users/${userId}`);
  return data;
};

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
