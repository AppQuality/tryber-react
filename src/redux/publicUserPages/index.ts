import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface PublicUserState {
  isPublic: boolean;
  token?: string;
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
    setUserTokenPublic: (state, action) => {
      state.token = action.payload;
      state.isPublic = true;
    },
    resetUserToken: (state) => {
      state.token = undefined;
      state.isPublic = false;
    },
  },
});

export const { resetUserToken, setUserTokenPublic } =
  publicUserPagesSlice.actions;

export default publicUserPagesSlice.reducer;
