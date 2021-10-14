import HttpError from "../utils/HttpError";
import { aqBootstrapTheme } from "@appquality/appquality-design-system";

export type CrowdRoutes =
  | "getting-started"
  | "my-dashboard"
  | "personal-equipment"
  | "my-bugs"
  | "experience-points"
  | "";

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
  onboarding_completed?: boolean;
}

export type User = undefined | UserData;

export interface UserStatus {
  refresh?: () => void;
  login?: (data: UserLoginData) => void;
  user: User;
  isLoading: boolean;
  error: HttpError;
}

declare global {
  type Theme = typeof aqBootstrapTheme;
}
