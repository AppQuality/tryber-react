import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
  closeDeleteModal,
  deleteUser,
  getFiscalProfile,
  loginUser,
  openDeleteModal,
  updateDeletionReason,
  updateFiscalProfile,
} from "./actionCreators";

const useReducer = (): UserStatus => {
  const {
    deletionReason,
    deleteModalOpen,
  }: {
    deletionReason?: string;
    deleteModalOpen: boolean;
  } = useSelector(
    (state: GeneralState) => ({
      deletionReason: state.user.deletionReason,
      deleteModalOpen: state.user.isDeleteModalOpen,
    }),
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    login: (data: UserLoginData) => dispatch(loginUser(data)),
    getFiscalProfile: () => dispatch(getFiscalProfile()),
    updateFiscalProfile: (data) => dispatch(updateFiscalProfile(data)),
    deletion: {
      deletionReason: deletionReason,
      deleteUser: (currentLanguage: string) =>
        dispatch(deleteUser(currentLanguage)),
      updateDeletionReason: (reason: string) =>
        dispatch(updateDeletionReason(reason)),
      isDeleteModalOpen: deleteModalOpen,
      openDeleteModal: () => dispatch(openDeleteModal()),
      closeDeleteModal: () => dispatch(closeDeleteModal()),
    },
  };
};

export default useReducer;
