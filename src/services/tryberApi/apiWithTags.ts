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
          ...(arg.fields?.includes("languages")
            ? ["UserLanguages" as const]
            : []),
          ...(arg.fields?.includes("certifications")
            ? ["UserCertifications" as const]
            : []),
        ];
      },
    },
    patchUsersMe: {
      invalidatesTags: ["User"],
    },
    putUsersMeLanguages: {
      invalidatesTags: ["UserLanguages"],
    },
    deleteUsersMeCertificationsByCertificationId: {
      invalidatesTags: ["UserCertifications"],
    },
    postUsersMeCertifications: {
      invalidatesTags: ["UserCertifications"],
    },
  },
});

export { tryberApi };
