import { Datepicker, FormLabel } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const BirthdayPicker = ({
  name,
  initialValue,
  onCancel,
  onChange,
}: {
  name: string;
  initialValue?: Date;
  onCancel: ({ value }: { value: Date }) => void;
  onChange: any;
}) => {
  const { t, i18n } = useTranslation();
  const now = new Date();
  const maxDate = new Date(
    Date.UTC(now.getFullYear() - 18, now.getMonth(), now.getDate())
  );

  return (
    <>
      <FormLabel htmlFor={name} label={t("DATE_OF_BIRTH:::BitrhdayPicker")} />
      <Datepicker
        value={initialValue}
        id={name}
        locale={i18n.language}
        maxDate={maxDate}
        placeholder={t("Select your birth date")}
        setText={t("Set")}
        cancelText={t("Cancel")}
        onCancel={onCancel}
        onChange={(v: { value: Date }) => {
          const date = v.value
            ? new Date(
                Date.UTC(
                  v.value.getFullYear(),
                  v.value.getMonth() - 1,
                  v.value.getDate()
                )
              )
            : maxDate;
          if (isNaN(date.getTime())) return;
          onChange(date);
        }}
      />
    </>
  );
};

export default BirthdayPicker;
