import HttpError from "../utils/HttpError";

export interface UserData {
  id: number;
  wp_user_id: number;
  role: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  image: string;
  verified?: boolean;
  isAdmin?: boolean;
  onboarding_complete?: boolean;
}

export type User = undefined | UserData;

export interface UserStatus {
  refresh?: () => void;
  login?: (data: UserLoginData) => void;
  user: User;
  isLoading: boolean;
  error: HttpError;
}
