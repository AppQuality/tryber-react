import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "src/store";

export interface FeaturesState {
  flags: string[];
}

const initialState: FeaturesState = {
  flags: [],
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    setFeaturesFlags: (state, action) => {
      state.flags = action.payload;
    },
  },
});

export const useFeaturesFlags = () => {
  const { flags } = useAppSelector((state) => state.features);
  return flags;
};

export const { setFeaturesFlags } = featuresSlice.actions;

export default featuresSlice.reducer;
