import apifetch from "../apifetch";

export const changePassword = async ({
  token,
  oldPass,
  newPass,
}: {
  token?: string;
  oldPass: string;
  newPass: string;
}) => {
  return apifetch({
    endpoint: "/users/me",
    method: "PATCH",
    token: token,
    body: { oldPassword: oldPass, password: newPass },
  });
};
