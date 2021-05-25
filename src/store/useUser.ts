import { useEffect, useState } from "react";
import { User, UserStatus } from "../types";
import API from "../utils/api";

export const useUser = (): UserStatus => {
  const [user, setUser] = useState<User>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await API.me();
      setUser(user);
      setLoading(false);
    };

    try {
      getUser();
    } catch (err) {
      if (err.statusCode === 403) {
        // user logged out, proceed
      } else {
        alert(err.message);
      }
    }
  }, []);

  return {
    user: user,
    isLoading: loading,
  };
};
