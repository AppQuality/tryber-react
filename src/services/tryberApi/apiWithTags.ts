import { tryberApi } from ".";

tryberApi.enhanceEndpoints({
  endpoints: {
    postUsersMePayments: {
      invalidatesTags: [
        "UserPayments",
        "UserPendingBooty",
        "UserBootyThreshold",
      ],
    },
    getUsersMePayments: {
      providesTags: ["UserPayments"],
    },
    getUsersMe: {
      providesTags: (result, error, arg, meta) => {
        return [
          "User",
          ...(arg.fields?.includes("pending_booty")
            ? ["UserPendingBooty" as const]
            : []),
          ...(arg.fields?.includes("booty_threshold")
            ? ["UserBootyThreshold" as const]
            : []),
        ];
      },
    },
  },
});

export { tryberApi };
