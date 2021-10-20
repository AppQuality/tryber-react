import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  refreshUser,
  loginUser,
  getProfile,
  updateProfile,
  getFiscalProfile,
} from "./actionCreators";

export default (): UserStatus => {
  const {
    user,
    loading,
    loadingProfile,
    error,
  }: {
    user: UserData;
    loading: boolean;
    loadingProfile: boolean;
    error?: string;
  } = useSelector(
    (state: GeneralState) => ({
      user: state.user.user,
      loading: state.user.loading,
      loadingProfile: state.user.loadingProfile,
      error: state.user.error,
    }),
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    refresh: () => dispatch(refreshUser()),
    login: (data: UserLoginData) => dispatch(loginUser(data)),
    getProfile: () => dispatch(getProfile()),
    updateProfile: (data: UserData) => dispatch(updateProfile(data)),
    getFiscalProfile: () => dispatch(getFiscalProfile()),
    user: user,
    isLoading: loading,
    isProfileLoading: loadingProfile,
    error: error,
  };
};
