import apifetch from "src/utils/apifetch";

export const getLevelInfo = async (
  token?: string
): Promise<
  // TODO Remove
  {
    id: number;
    name: string;
    reach: number;
    hold: number;
  }[]
> => {
  return apifetch({
    endpoint: "/levels",
    token: token,
  });
};
