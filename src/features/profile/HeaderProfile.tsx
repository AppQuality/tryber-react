import { useTranslation } from "react-i18next";
import UserStore from "../../redux/user";
import {
  BSCol,
  BSGrid,
  PageTitle,
  Title,
} from "@appquality/appquality-design-system";
import { StarFill, BookmarkCheckFill, Mailbox } from "react-bootstrap-icons";
import { aqBootstrapTheme } from "@appquality/appquality-design-system";

export const HeaderProfile = () => {
  const { t } = useTranslation();
  const { user, isProfileLoading } = UserStore();
  return (
    <>
      <BSGrid>
        <BSCol size="col-3">
          <img className="avatar" src={user.image}></img>
        </BSCol>
        <BSCol size="col-5">
          <PageTitle size="small" subtitle={"T" + user.id}>
            {`${user.name} ${user.surname}`}
          </PageTitle>
          <div>
            <StarFill color={aqBootstrapTheme.palette.warning} />{" "}
            <strong>{user.total_exp_pts}</strong> pt
          </div>
          <div>
            <BookmarkCheckFill color={aqBootstrapTheme.palette.secondary} />{" "}
            <strong>{user.attended_cp}</strong> {t("Campagne completate")}
          </div>
        </BSCol>
        <BSCol size="col-4">
          <div>
            <Title size="s">{t("Stato email")}</Title>
          </div>
          <div>
            <Mailbox color={aqBootstrapTheme.palette.info} />{" "}
            {t("Conferma l'email")}
          </div>
        </BSCol>
      </BSGrid>
    </>
  );
};
