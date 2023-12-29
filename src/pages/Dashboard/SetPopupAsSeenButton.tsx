import { Button } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../../utils/api";

export default ({ id }: { id: number }) => {
  const [seen, setSeen] = useState(false);
  const { t } = useTranslation();
  const expirePopup = (id: number) => {
    API.myPopupsById({ popupId: id })
      .catch((e) => {
        if (e.statusCode !== 404) {
          alert(e.message);
        }
      })
      .finally(() => {
        setSeen(true);
      });
  };
  return (
    <Button
      forwardedAs="a"
      kind="link"
      flat
      size="block"
      disabled={seen}
      onClick={() => expirePopup(id)}
    >
      {t("I understand, don't show this again")}
    </Button>
  );
};
