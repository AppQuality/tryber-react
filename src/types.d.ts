import {
  aqBootstrapTheme,
  SelectType,
} from "@appquality/appquality-design-system";
import { components, operations } from "src/utils/schema";

export type CrowdRoutes =
  | "getting-started"
  | "getting-started/signup"
  | "getting-started/confirmation"
  | "login"
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
  type HttpError = HttpError;
  type ApiOperations = operations;
  type ApiComponents = components;
  type SupportedLanguages = "es" | "it" | "en";
  type SelectOptionType = SelectType.Option;
  type OrderType = "DESC" | "ASC";

  var react_env: {
    REACT_APP_ENVIRONMENT: string;
    REACT_APP_VERSION: string;
  };
}
