import { useGetUsersMeQuery } from "src/services/tryberApi";
import * as Sentry from "@sentry/react";
import i18n from "src/i18n";

const SentryWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useGetUsersMeQuery({
    fields: "id, email, username, wp_user_id, role",
  });

  Sentry.setUser({
    id: user?.id ?? 0,
    email: user?.email ?? "unknown",
    username: user?.username ?? "unknown",
    wp_user_id: user?.wp_user_id ?? 0,
    role: user?.role ?? "unknown",
  });

  Sentry.setTag("page_locale", i18n.language);

  return <>{children}</>;
};

export default SentryWrapper;
