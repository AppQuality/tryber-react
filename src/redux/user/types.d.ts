type User = undefined | UserData;

interface UserStatus {
  refresh: () => void;
  login: (data: UserLoginData) => void;
  getProfile: () => void;
  deleteUser: () => void;
  updateDeletionReason: (v: string) => void;
  getFiscalProfile: () => void;
  user: User;
  isLoading: boolean;
  isProfileLoading: boolean;
  error: HttpError;
}

interface UserLoginData {
  username: string;
  password: string;
}

type UserAction = {
  type: string;
  data?: FetchProfileData | UserDeletionData | object;
  error?: HttpError;
};

type FetchProfileData = {
  fiscalProfile: any;
  baseProfile: any;
};

type UserDeletionData = {
  reason: string;
};

type UserState = {
  user?: UserData;
  fiscalData?: UserFiscalData;
  loading: boolean;
  loadingProfile: boolean;
  deletionReason?: string;
  error?: string;
};
type UserDispatchType = (args: UserAction) => UserAction;
