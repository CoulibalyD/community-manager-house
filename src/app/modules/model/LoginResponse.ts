export interface LoginResponse {
  email: string;
  token: string;
  role: string;
  firstName?: string;
  lastName?: string;
}
