import { useState } from "react";

export default function useToken() {
  const getToken = (): string | null => {
    return sessionStorage.getItem("token");
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (data: string) => {
    sessionStorage.setItem("token", data);
    setToken(data);
  };

  return {
    setToken: saveToken,
    token,
  };
}
