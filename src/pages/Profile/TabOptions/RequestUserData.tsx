import { CSSGrid, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { HalfColumnButton } from "src/features/HalfColumnButton";
import siteWideMessageStore from "src/redux/siteWideMessages";
import WPAPI from "src/utils/wpapi";

const RequestUserData = () => {
  const { t, i18n } = useTranslation();
  const { add } = siteWideMessageStore();
  return (
    <div className="ask-your-data">
      <Title size="xs" className="aq-mb-2">
        {t("Request your data")}
      </Title>
      <Text className="aq-mb-3">
        {t(
          "Your data are safe with us. You can ask them anytime you need. Upon your request, we will provide you a copy of your personal data at the email associated to your Tester ID."
        )}
      </Text>
      <CSSGrid min="50%" gutter="0" fill="true">
        <HalfColumnButton
          kind="primary"
          size="block"
          type="submit"
          flat={true}
          onClick={async () => {
            WPAPI.requestUserData(i18n.language)
              .then(() => {
                add({
                  message: t(
                    "We've received your request. You'll get an email in a few days."
                  ),
                  type: "success",
                });
              })
              .catch((e) => {
                const { message } = e as HttpError;
                if (message === "GENERIC_ERROR") {
                  add({
                    message: t("There was an error"),
                    type: "danger",
                  });
                } else {
                  add({
                    message: message,
                    type: "danger",
                  });
                }
              });
          }}
        >
          {t("Request data")}
        </HalfColumnButton>
      </CSSGrid>
    </div>
  );
};

export default RequestUserData;
