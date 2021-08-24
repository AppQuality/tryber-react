interface UserLoginData {
  username: string;
  password: string;
}

type UserAction = {
  type: string;
  data?: LoginData;
  error?: string;
};

type UserState = {
  user?: UserData;
  loading: boolean;
  error?: string;
};
type UserDispatchType = (args: UserAction) => UserAction;
