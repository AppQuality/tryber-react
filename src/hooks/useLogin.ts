import { useState } from "react";

export function useLogin() {
  const [login, setLogin] = useState(false);

  return { login: login, setLogin: setLogin };
}
