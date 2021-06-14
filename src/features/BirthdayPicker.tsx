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
  return (
    <>
      <FormLabel>{t("Date of birth")}</FormLabel>
      <Datepicker
        id={name}
        onChange={(v: { value: Date }) => onChange(v.value)}
      />
    </>
  );
};

export default BirthdayPicker;
