import { Header } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import localizedUrl from "src/utils/localizedUrl";
import menuStore from "../redux/menu";

const SiteHeader = ({ route }: { route: string }) => {
  const menu = menuStore();
  const { isOpen, toggle } = menu;
  const { data: user, isLoading } = useGetUsersMeQuery({
    fields: "wp_user_id,id,name,surname,username,role,email,image",
  });
  const { i18n, t } = useTranslation();

  const homeUrl = i18n.language === "en" ? "/" : `/${i18n.language}/`;
  const history = useHistory();
  return (
    <Header
      onLogin={
        route === "home"
          ? () => history.push(localizedUrl("/login"))
          : undefined
      }
      isLoading={isLoading}
      logoUrl={homeUrl}
      user={
        user
          ? {
              wp_user_id: user?.wp_user_id || 0,
              id: user?.id || 0,
              name: user?.name || "",
              surname: user?.surname || "",
              role: user?.role || "unknown",
              username: user?.username || "",
              email: user?.email || "",
              image: user?.image || "",
            }
          : undefined
      }
      isMenuOpen={isOpen}
      toggleMenu={toggle}
      loginText={t("login")}
    />
  );
};

export default SiteHeader;
