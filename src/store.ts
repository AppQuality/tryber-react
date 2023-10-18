import {
  configureStore,
  combineReducers,
  PreloadedState,
} from "@reduxjs/toolkit";
import { tryberApi } from "src/services/tryberApi";
import oldReducers from "src/redux/reducer";
import bugFormReducer from "src/pages/BugForm/bugFormSlice";
import previewSelectionFormReducer from "src/pages/PreviewSelectionForm/previewSelectionFormSlice";
import userDevicesReducer from "src/pages/Devices/userDevicesSlice";
import publicUserPageReducer from "./redux/publicUserPages";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

const rootReducer = combineReducers({
  ...oldReducers,
  bugForm: bugFormReducer,
  previewSelectionForm: previewSelectionFormReducer,
  userDevices: userDevicesReducer,
  [tryberApi.reducerPath]: tryberApi.reducer,
  publicUserPages: publicUserPageReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tryberApi.middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
