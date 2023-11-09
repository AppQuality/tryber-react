import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import { useGetUsersMeQuery } from "src/services/tryberApi";

const GoogleTagManager = ({
  title,
  children,
  isAdminPage = false,
}: {
  title: string;
  children: React.ReactNode;
  isAdminPage?: boolean;
}) => {
  const { data: user } = useGetUsersMeQuery({});

  TagManager.dataLayer({
    dataLayer: {
      role: user?.role ?? "unknown",
      wp_user_id: user?.wp_user_id ?? 0,
      tester_id: user?.id ?? 0,
      is_admin_page: isAdminPage,
    },
  });

  return (
    <>
      <Helmet>
        <title>{title} - Tryber</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={title} />
      </Helmet>
      {children}
    </>
  );
};

export default GoogleTagManager;
