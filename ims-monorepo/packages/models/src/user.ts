export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff' | 'viewer';
  createdAt: string; 
  updatedAt: string;
}

export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type UserUpdateInput = Partial<UserCreateInput> & { id: string };