import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import API from "../../utils/api";
import { useState } from "react";

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
      type="info"
      flat
      size="block"
      disabled={seen}
      onClick={() => expirePopup(id)}
    >
      {t("I understand, don't show this again")}
    </Button>
  );
};
