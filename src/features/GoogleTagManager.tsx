import { Helmet } from "react-helmet";
import TagManager from "react-gtm-module";
import UserStore from "../redux/user";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: 0,
    tester_id: 0,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

const GoogleTagManager = ({
  title,
  children,
  isAdminPage = false,
}: {
  title: string;
  children: React.ReactNode;
  isAdminPage?: boolean;
}) => {
  const { user } = UserStore();
  const helmet = () => {
    return (
      <Helmet>
        <title>{title} - AppQuality Crowd</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={title} />
      </Helmet>
    );
  };
  if (user) {
    tagManagerArgs.dataLayer = {
      role: user.role,
      wp_user_id: user.wp_user_id,
      tester_id: user.id,
      is_admin_page: isAdminPage,
    };
  }

  TagManager.dataLayer(tagManagerArgs);
  return (
    <>
      {helmet()}
      {children}
    </>
  );
};

export default GoogleTagManager;
