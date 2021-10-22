import apifetch from "../apifetch";

export const deleteUser = async ({
  token,
  reason,
}: {
  token?: string;
  reason: string;
}) => {
  return apifetch({
    endpoint: "/users/me",
    method: "DELETE",
    token: token,
    body: { reason },
  });
};
