import { useEffect, useState } from "react";
import { User, UserStatus } from "../types";
import API from "../utils/api";

export const useUser = (): UserStatus => {
  const [user, setUser] = useState<User>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await API.me();
        setUser(user);
      } catch (err) {
        if (err.statusCode === 403) {
          // user logged out, proceed
        } else {
          alert(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return {
    user: user,
    isLoading: loading,
  };
};
