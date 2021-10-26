import {
  Container,
  Title,
  Spinner,
  SpinnerWrapper,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useLocalizeRoute } from "../hooks/useLocalizedRoute";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

export default ({ children }: { children: React.ReactNode }) => {
  const history = useHistory();
  const homeRoute = useLocalizeRoute("");
  const {
    error,
    loading,
  }: {
    error?: any;
    loading?: boolean;
  } = useSelector(
    (state: GeneralState) => ({
      loading: state.user.loading,
      error: state.user.error,
    }),
    shallowEqual
  );

  const { t } = useTranslation();

  if (loading || typeof loading === "undefined") {
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
  if (error) {
    if (error.statusCode === 403) {
      history.push(homeRoute);
    } else {
      alert(error.message);
    }
    return null;
  }

  return <>{children}</>;
};
