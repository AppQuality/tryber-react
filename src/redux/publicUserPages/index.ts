import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface PublicUserState {
  isPublic: boolean;
}

// Define the initial state using that type
const initialState: PublicUserState = {
  isPublic: false,
};

export const publicUserPagesSlice = createSlice({
  name: "publicUserPages",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserTokenPublic: (state) => {
      state.isPublic = true;
    },
    setUserTokenPrivate: (state) => {
      state.isPublic = false;
    },
  },
});

export const { setUserTokenPrivate, setUserTokenPublic } =
  publicUserPagesSlice.actions;

export default publicUserPagesSlice.reducer;
