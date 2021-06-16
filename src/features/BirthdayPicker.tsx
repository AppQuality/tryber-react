import { Datepicker, FormLabel } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const BirthdayPicker = ({
  name,
  initialValue,
  onCancel,
  onChange,
}: {
  name: string;
  initialValue: any;
  onCancel: ({ value }: { value: Date }) => void;
  onChange: any;
}) => {
  const { t } = useTranslation();
  const now = new Date();

  return (
    <>
      <FormLabel>{t("Date of birth")}</FormLabel>
      <Datepicker
        id={name}
        locale={i18next.language}
        maxDate={
          new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())
        }
        placeholder={t("Select your birth date")}
        setText={t("Set")}
        cancelText={t("Cancel")}
        onCancel={onCancel}
        onChange={(v: { value: Date }) => onChange(v.value)}
      />
    </>
  );
};

export default BirthdayPicker;
