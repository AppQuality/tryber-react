import { Field } from "formik";
import { FieldProps, Select } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const PCData = ({ edit }: { edit: boolean }) => {
  const { t } = useTranslation();
  const options = [
    {
      label: "Gaming",
      value: "Gaming",
    },
    {
      label: "Notebook",
      value: "Notebook",
    },
  ];
  return (
    <>
      <Field name="device" disabled={edit}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: FieldProps) => (
          <Select
            name={field.name}
            label={t("Computer type")}
            options={options}
            value={field.value}
          />
        )}
      </Field>
    </>
  );
};
export default PCData;
