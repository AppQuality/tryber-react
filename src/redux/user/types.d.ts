type User = undefined | UserData;

interface UserStatus {
  refresh: () => void;
  login: (data: UserLoginData) => void;
  getProfile: () => void;
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
  data?: object | FetchProfileData;
  error?: HttpError;
};

type FetchProfileData = {
  fiscalProfile: any;
  baseProfile: any;
};

type UserState = {
  user?: UserData;
  fiscalData?: UserFiscalData;
  loading: boolean;
  loadingProfile: boolean;
  error?: string;
};
type UserDispatchType = (args: UserAction) => UserAction;
