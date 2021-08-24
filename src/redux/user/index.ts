import { UserStatus, UserData } from "../../types";

import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { refreshUser, loginUser } from "./actionCreators";

export default (): UserStatus => {
  const {
    user,
    loading,
    error,
  }: { user: UserData; loading: boolean; error?: string } = useSelector(
    (state: GeneralState) => ({
      user: state.user.user,
      loading: state.user.loading,
      error: state.user.error,
    }),
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    refresh: () => dispatch(refreshUser()),
    login: (data: UserLoginData) => dispatch(loginUser(data)),
    user: user,
    isLoading: loading,
    error: error,
  };
};
