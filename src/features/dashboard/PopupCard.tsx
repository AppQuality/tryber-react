import { Card, Button } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PopupContainer from "./PopupContainer";

export default () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Card>
      <PopupContainer
        onClose={() => setOpen(false)}
        open={open}
        showExpired={true}
      />
      <Button flat type="info" size="block" onClick={() => setOpen(!open)}>
        {t("What's new")}
      </Button>
    </Card>
  );
};
