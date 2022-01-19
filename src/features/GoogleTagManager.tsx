import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: 0,
    tester_id: 0,
    is_admin_page: false,
  },
};

export default ({
  title,
  children,
  isAdminPage = false,
}: {
  title: string;
  children: React.ReactNode;
  isAdminPage?: boolean;
}) => {
  const { user } = useSelector((state: GeneralState) => ({
    user: {
      id: state.user.user?.id,
      role: state.user.user?.role,
      wp_user_id: state.user.user?.wp_user_id,
    },
  }));
  const helmet = () => {
    return (
      <Helmet>
        <title>{title} - Tryber</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={title} />
      </Helmet>
    );
  };
  if (user?.role && user?.wp_user_id) {
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
