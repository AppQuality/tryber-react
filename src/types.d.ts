import {
  aqBootstrapTheme,
  SelectType,
} from "@appquality/appquality-design-system";
import { operations, components } from "src/utils/schema";

export type CrowdRoutes =
  | "getting-started"
  | "my-dashboard"
  | "personal-equipment"
  | "my-bugs"
  | "experience-points"
  | "";

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
  type UserData = any;
  type UserFiscalData =
    operations["get-users-me-fiscal"]["responses"]["200"]["content"]["application/json"];
  type HttpError = HttpError;
  type ApiOperations = operations;
  type ApiComponents = components;
  type SupportedLanguages = "es" | "it" | "en";
  type SelectOptionType = SelectType.Option;
}
