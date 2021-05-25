import config from "../config.json";
import { operations } from "./schema";

class HttpError extends Error {
  statusCode: number;
  statusText: string;
  constructor(status: number, statusText: string, message: string) {
    super(`${status}: ${statusText} - ${message}`);
    this.name = "HttpError";
    this.statusCode = status;
    this.statusText = statusText;
    this.message = message;
  }
}

const API = {
  login: (
    credentials: operations["post-authenticate"]["requestBody"]["content"]["application/json"]
  ) => {
    return fetch(`${config.api}/authenticate`, {
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
  },
  campaigns: (token: string) => {
    return fetch(`${config.api}/campaigns`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    }).then((res) => res.json());
  },
  me: async (token?: string) => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    if (token) {
      requestHeaders.set("Authorization", "Bearer " + token);
    }
    const res = await fetch(`${config.api}/users/me`, {
      method: "GET",
      headers: requestHeaders,
    });
    if (res.ok) {
      return await res.json();
    } else {
      const json = await res.json();
      throw new HttpError(res.status, res.statusText, json.err);
    }
  },
  signup: async (
    data: operations["post-users"]["requestBody"]["content"]["application/json"]
  ) => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    const res = await fetch(`${config.api}/users`, {
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
  },
};

export default API;
