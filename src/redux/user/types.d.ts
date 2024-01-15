type User = undefined | UserData;

interface UserStatus {
  login: (data: UserLoginData) => void;
  getFiscalProfile: () => void;
  updateFiscalProfile: (data: UserData) => void;
  deletion: {
    deletionReason?: string;
    deleteUser: (lang: string) => void;
    updateDeletionReason: (v: string) => void;
    isDeleteModalOpen: boolean;
    openDeleteModal: () => void;
    closeDeleteModal: () => void;
  };
}

interface UserLoginData {
  username: string;
  password: string;
}

type UserAction = {
  type: string;
  data?: any;
  error?: HttpError;
};

type DeleteCertificationData = {
  newCertifications: ApiComponents["schemas"]["Certification"][];
};

type FetchProfileData = {
  fiscalProfile: any;
  baseProfile: any;
};

type UserDeletionData = {
  reason: string;
};

type UserFiscalData = {
  data?: ApiOperations["get-users-me-fiscal"]["responses"]["200"]["content"]["application/json"];
  loading: boolean;
};

type UserState = {
  user?: UserData;
  fiscal: UserFiscalData;
  loading: boolean;
  loadingProfile: boolean;
  customUserFields?: ApiOperations["get-customUserFields"]["responses"]["200"]["content"]["application/json"];
  deletionReason?: string;
  error?: string;
  isDeleteModalOpen: boolean;
};

type UserDispatchType = (args: UserAction) => UserAction;
