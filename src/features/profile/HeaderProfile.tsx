import { useTranslation } from "react-i18next";
import UserStore from "../../redux/user";
import { BSCol, BSGrid, PageTitle } from "@appquality/appquality-design-system";

export const HeaderProfile = () => {
  const { t } = useTranslation();
  const { user, isProfileLoading } = UserStore();
  return (
    <>
      <BSGrid>
        <BSCol size="col-3">
          <img src={user.image}></img>
        </BSCol>
        <BSCol size="col-5">
          <PageTitle size="small" subtitle={"T" + user.id}>
            {user.name}
          </PageTitle>
        </BSCol>
        <BSCol size="col-4"></BSCol>
      </BSGrid>
    </>
  );
};
