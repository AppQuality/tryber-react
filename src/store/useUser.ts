import { useEffect, useState } from "react";
import { User } from "../types";
import API from "../utils/api";

export const useUser = () => {
  const [user, setUser] = useState<User>(undefined);
  useEffect(() => {
    const getUser = async () => {
      const user = await API.me();
      setUser(user);
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

  return user;
};
