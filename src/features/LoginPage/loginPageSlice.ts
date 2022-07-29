import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginPageState {
  isLoginPage: boolean;
}

const initialState: LoginPageState = {
  isLoginPage: false,
};

const loginPageSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setIsLoginPage(state, action: PayloadAction<boolean>) {
      state.isLoginPage = action.payload;
    },
  },
});

const { actions, reducer } = loginPageSlice;
export const { setIsLoginPage } = actions;
export default reducer;
