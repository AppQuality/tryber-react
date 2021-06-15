import { Datepicker, FormLabel } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const BirthdayPicker = ({
  name,
  initialValue,
  onChange,
}: {
  name: string;
  initialValue: any;
  onChange: any;
}) => {
  const { t } = useTranslation();
  const now = new Date();

  return (
    <>
      <FormLabel>{t("Date of birth")}</FormLabel>
      <Datepicker
        id={name}
        maxDate={
          new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())
        }
        setText={t("Set")}
        cancelText={t("Cancel")}
        onChange={(v: { value: Date }) => onChange(v.value)}
      />
    </>
  );
};

export default BirthdayPicker;
