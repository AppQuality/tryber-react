import { User } from "../../types";
import React from "react";

export interface UserInfoProps {
  showLogin: boolean;
  onLogin?: () => void;
  isLoading?: boolean;
  user?: User;
}

export interface HeaderProps {
  isLoading?: boolean;
  user?: User;
  logo?: React.ReactNode;
  showLogin?: boolean;
}
