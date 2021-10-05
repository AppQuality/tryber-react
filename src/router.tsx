import { ComponentType } from "react";
import {
  Dashboard,
  Devices,
  ExperiencePoints,
  GettingStarted,
  MyBugs,
} from "./pages";
export type appPages =
  | "dashboard"
  | "devices"
  | "experiencePoints"
  | "gettingStarted"
  | "myBugs";
export interface AppRoute {
  path: string;
  component: ComponentType<any>;
}
export type AppRoutes = {
  [p in appPages]: AppRoute;
};

export const crowdRoutes: AppRoutes = {
  dashboard: {
    path: "my-dashboard",
    component: Dashboard,
  },
  devices: {
    path: "personal-equipment",
    component: Devices,
  },
  experiencePoints: {
    path: "experience-points",
    component: ExperiencePoints,
  },
  gettingStarted: {
    path: "getting-started",
    component: GettingStarted,
  },
  myBugs: {
    path: "my-bugs",
    component: MyBugs,
  },
};
