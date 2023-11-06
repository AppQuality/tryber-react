import { tryberApi } from ".";

tryberApi.enhanceEndpoints({
  endpoints: {
    postUsersMePayments: {
      invalidatesTags: ["UserPayments"],
    },
    getUsersMePayments: {
      providesTags: ["UserPayments"],
    },
    getUsersMe: {
      providesTags: (result, error, arg, meta) => {
        if (
          result &&
          !error &&
          "fields" in arg &&
          arg.fields?.includes("pending_booty") &&
          arg.fields?.includes("booty_threshold")
        ) {
          return ["UserPendingBooty", "UserBootyThreshold", "User"];
        }
        return ["User"];
        // {fields: "pending_booty,booty_threshold"}
      },
    },
  },
});

export { tryberApi };
