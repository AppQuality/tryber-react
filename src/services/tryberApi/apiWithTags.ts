import { tryberApi } from ".";

tryberApi.enhanceEndpoints({
  endpoints: {
    postUsersMePayments: {
      invalidatesTags: ["UserPayments"],
    },
    getUsersMePayments: {
      providesTags: ["UserPayments"],
    },
  },
});

export { tryberApi };
