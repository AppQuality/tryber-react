import { operations } from "../schema";

export const login = (
  credentials: operations["post-authenticate"]["requestBody"]["content"]["application/json"]
) => {
  return fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.token) {
        return { token: data.token };
      }
      return { token: false, error: data };
    });
};

export const signup = async (
  data: operations["post-users"]["requestBody"]["content"]["application/json"]
) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return res.json();
  } else {
    let d = await res.json();
    if (d.message) {
      throw new Error(d.message);
    }
    throw new Error("There was an error");
  }
};
