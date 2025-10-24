// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { stringify } from "qs";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "tryberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    paramsSerializer: (params) => stringify(params, { encodeValuesOnly: true }),

    prepareHeaders: (headers, { getState }) => {
      const { publicUserPages } = getState() as {
        publicUserPages: { isPublic: boolean; token?: string };
      };

      if (publicUserPages.isPublic && publicUserPages.token) {
        headers.set("apikey", publicUserPages.token);
      }

      if (process.env.REACT_APP_DEFAULT_TOKEN) {
        const token = process.env.REACT_APP_DEFAULT_TOKEN;
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "UserPayments",
    "UserLanguages",
    "UserPendingBooty",
    "UserBootyThreshold",
    "UserCertifications",
    "UserTasks",
    "User",
    "UserTaskMedia",
  ],
  endpoints: () => ({}), // auto generated npm run generate-api
});
