export interface UserData {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  image: string;
}

export type User = undefined | UserData;

export interface UserStatus {
  user: User;
  isLoading: boolean;
}
