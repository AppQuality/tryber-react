import userStore from "../../redux/user";

export const FiscalProfileReport = () => {
  const { user } = userStore();
  return <div>{user ? VerifiedFiscalProfile : UnVerifiedFiscalProfile}</div>;
};

const VerifiedFiscalProfile = () => {
  return <div></div>;
};
const UnVerifiedFiscalProfile = () => {
  return <div></div>;
};
