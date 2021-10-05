import { ComponentType, useEffect } from "react";
import {
  Dashboard,
  Devices,
  ExperiencePoints,
  GettingStarted,
  MyBugs,
} from "./pages";
import { Route } from "react-router-dom";
export type appPages =
  | "dashboard"
  | "devices"
  | "experiencePoints"
  | "gettingStarted"
  | "myBugs";
export interface AppRoute {
  path: string;
  component?: ComponentType<any>;
}
export type AppRoutes = {
  [p in appPages]: AppRoute;
};

export const crowdRoutes: AppRoutes = {
  dashboard: {
    path: "my-dashboard",
  },
  devices: {
    path: "personal-equipment",
  },
  experiencePoints: {
    path: "experience-points",
  },
  gettingStarted: {
    path: "getting-started",
  },
  myBugs: {
    path: "my-bugs",
  },
};

export const AppRouter = () => {
  // assign components
  crowdRoutes.dashboard.component = Dashboard;
  crowdRoutes.devices.component = Devices;
  crowdRoutes.experiencePoints.component = ExperiencePoints;
  crowdRoutes.gettingStarted.component = GettingStarted;
  crowdRoutes.myBugs.component = MyBugs;

  const routes = Object.keys(crowdRoutes) as (keyof AppRoutes)[];
  const base = "/:locale(en|it|es)?";
  return (
    <>
      {routes.map((route) => (
        <Route
          path={`${base}/${crowdRoutes[route].path}`}
          component={crowdRoutes[route].component}
          key={crowdRoutes[route].path}
        />
      ))}
    </>
  );
};
