import useUser from "../redux/user";
import {
  Container,
  Title,
  Spinner,
  SpinnerWrapper,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export default ({ children }: { children: React.ReactNode }) => {
  const { user, error, isLoading } = useUser();
  const { t } = useTranslation();

  if (!user && error) {
    if (error.statusCode === 403) {
      window.location.href = "/";
    } else {
      alert(error.message);
    }
  }

  if (isLoading || !user) {
    return (
      <Container className="aq-py-3">
        <SpinnerWrapper>
          <Spinner />
          <Title size="xs" as="h5">
            {t("Loading")}
          </Title>
        </SpinnerWrapper>
      </Container>
    );
  }

  return <>{children}</>;
};
