import { Datepicker, FormLabel } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const now = new Date();

  return (
    <>
      <FormLabel htmlFor={name} label={t("Date of birth")} />
      <Datepicker
        id={name}
        locale={i18n.language}
        maxDate={
          new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())
        }
        placeholder={t("Select your birth date")}
        setText={t("Set")}
        cancelText={t("Cancel")}
        onCancel={onCancel}
        onChange={(v: { value: Date }) =>
          onChange(
            new Date(
              Date.UTC(
                v.value.getFullYear(),
                v.value.getMonth(),
                v.value.getDate()
              )
            )
          )
        }
      />
    </>
  );
};

export default BirthdayPicker;
