import {
  aqBootstrapTheme,
  SelectType,
} from "@appquality/appquality-design-system";
import { operations } from "utils/schema";

export type CrowdRoutes =
  | "getting-started"
  | "my-dashboard"
  | "personal-equipment"
  | "my-bugs"
  | "experience-points"
  | "";

export type UserData =
  operations["get-users-me"]["responses"]["200"]["content"]["application/json"];

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
  type UserData =
    operations["get-users-me"]["responses"]["200"]["content"]["application/json"];
  type UserFiscalData =
    operations["get-users-me-fiscal"]["responses"]["200"]["content"]["application/json"];
  type HttpError = HttpError;
  type SelectOptionType = SelectType.Option;
}
