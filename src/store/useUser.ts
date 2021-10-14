import { useEffect, useState } from "react";
import { User, UserStatus } from "../types";
import HttpError from "../utils/HttpError";
import API from "../utils/api";

export const useUser = (): UserStatus => {
  const [user, setUser] = useState<User>(undefined);
  const [error, setError] = useState<HttpError | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await API.me();
        setUser(user);
      } catch (err: unknown) {
        const error = err as HttpError;
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return {
    user: user,
    isLoading: loading,
    error: error,
  };
};
