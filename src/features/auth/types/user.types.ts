export interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string | null;
  isOAuth: boolean;
}

export interface LoginResponse {
  redirectUrl: string | null;
  refreshToken: string;
  token: string;
  user: User;
}
