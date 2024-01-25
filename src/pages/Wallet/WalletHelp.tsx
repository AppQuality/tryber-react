import {
  Button,
  Card,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export const WalletHelp = () => {
  const { t } = useTranslation();

  return (
    <Card shadow>
      <Title size="xs" color="info">
        {t("__WALLET_CARD-GUIDES_TITLE MAX: 35")}
      </Title>
      <Text className="aq-mt-2 aq-mb-3">
        {t("__WALLET_CARD-GUIDES_PARAGRAPH MAX: 60")}
      </Text>
      <Button
        forwardedAs="a"
        href={t("Wallet help article", {
          ns: "links",
        })}
        kind="info"
        size="block"
        target="_blank"
        flat
      >
        {t("__WALLET_CARD-GUIDES_CTA MAX: 20")}
      </Button>
    </Card>
  );
};
