import { useGetUsersMeQuery } from "src/services/tryberApi";

export const useFeaturesFlags = () => {
  const { data, isLoading } = useGetUsersMeQuery({
    fields: "surname",
  });
  const flags = data?.surname === "pippo" ? [] : ["wallet"];
  return { flags, isLoading };
};
