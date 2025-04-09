export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: number;
  isActive?: boolean;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
