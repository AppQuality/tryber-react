interface LoginData {
  username: string;
  password: string;
}

type MenuAction = {
  type: string;
};

type MenuState = {
  open: boolean;
};
type MenuDispatchType = (args: MenuAction) => MenuAction;
