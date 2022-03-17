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
        {t("Not sure how to request your booty?")}
      </Title>
      <Text className="aq-mt-2 aq-mb-3">
        {t("Learn more about how we handle payment requests.")}
      </Text>
      <Button
        forwardedAs="a"
        href={`${t("/per-saperne-di-piu-pagamenti-privacy/")}`}
        type="info"
        size="block"
        flat
      >
        {t("Learn more")}
      </Button>
    </Card>
  );
};
