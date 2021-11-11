import { useFormikContext, Field as FormikField, FieldProps } from "formik";
import {
  Radio,
  FormGroup,
  Select,
  FormLabel,
  Input,
  Text,
  ErrorMessage,
  PlacesAutocomplete,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { ChangeEvent } from "react";
import CitySelect from "src/features/profile/CitySelect";

const FiscalTypeArea = () => {
  const { values, setValues, setFieldTouched } =
    useFormikContext<FiscalFormValues>();
  const { t, i18n } = useTranslation();
  return (
    <>
      <FormikField name="fiscalTypeRadio">
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: FieldProps) => (
          <FormGroup>
            <Radio
              name={field.name}
              checked={field.value === "italian"}
              id="italian"
              label={t("Italian")}
              onChange={() => {
                form.setTouched({
                  ...form.touched,
                  fiscalTypeRadio: true,
                  type: true,
                });
                form.setValues((prevState: FiscalFormValues) => ({
                  ...prevState,
                  fiscalTypeRadio: "italian",
                }));
              }}
            />
            <Radio
              name={field.name}
              checked={field.value === "non-italian"}
              id="notItalian"
              label={t("Not italian")}
              onChange={() => {
                form.setTouched({
                  ...form.touched,
                  fiscalTypeRadio: true,
                  type: true,
                });
                form.setValues((prevState: FiscalFormValues) => ({
                  ...prevState,
                  fiscalTypeRadio: "non-italian",
                  type: "non-italian",
                }));
              }}
            />
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>
      {values.fiscalTypeRadio === "italian" && (
        <>
          <FormikField name="fiscalTypeSelect">
            {({
              field, // { name, value, onChange, onBlur }
              form,
            }: FieldProps) => {
              return (
                <FormGroup>
                  <Select
                    name={field.name}
                    label={t("Fiscal Type")}
                    value={
                      field.value
                        ? { value: field.value, label: "" }
                        : { value: "", label: "" }
                    }
                    onBlur={(e: ChangeEvent) => {
                      form.setFieldTouched(field.name);
                    }}
                    onChange={(v) => {
                      if (v == null) {
                        v = { label: "", value: "" };
                      }
                      field.onChange(v.value);
                      form.setValues((prevState: FiscalFormValues) => ({
                        ...prevState,
                        fiscalTypeSelect: v.value,
                        type: v.value,
                      }));
                    }}
                    options={[
                      {
                        value: "withholding",
                        label: t("witholding < 5000"),
                      },
                      {
                        value: "witholding-extra",
                        label: t("witholding > 5000"),
                      },
                      {
                        value: "other",
                        label: t("not compatible fiscal type"),
                      },
                    ]}
                  />
                  <ErrorMessage name={field.name} />
                </FormGroup>
              );
            }}
          </FormikField>
          <FormGroup>
            <CitySelect
              name="birthPlaceCity"
              label={t("City of birth")}
              onBlur={() => {
                setFieldTouched("birthPlaceCity");
                setFieldTouched("birthPlaceProvince");
              }}
              onChange={(place) => {
                const fields = place.address_components;
                const country = fields.find(
                  (field) => field.types.indexOf("country") >= 0
                );
                const province = fields.find(
                  (field) =>
                    field.types.indexOf("administrative_area_level_2") >= 0
                );
                const city = fields.find(
                  (field) => field.types.indexOf("locality") >= 0
                );
                setValues(
                  (prevState) => ({
                    ...prevState,
                    birthPlaceCity: city?.long_name,
                    birthPlaceProvince:
                      country?.short_name === "IT"
                        ? province?.short_name
                        : "EE",
                  }),
                  true
                );
              }}
            />
            <ErrorMessage name="birthPlaceCity" />
            <ErrorMessage name="birthPlaceProvince" />
          </FormGroup>
        </>
      )}
      <FormikField name="fiscalId">
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: FieldProps) => {
          return (
            <FormGroup>
              <FormLabel htmlFor={field.name} label={t("Fiscal ID")} />
              <Input
                id={field.name}
                type="text"
                value={field.value}
                onChange={(v) => {
                  form.setFieldTouched(field.name);
                  field.onChange(v);
                  form.setFieldValue(field.name, v, true);
                }}
              />
              {values.fiscalTypeRadio === "italian" && (
                <Text small className="aq-mt-1 aq-text-secondary">
                  {t(
                    "Any change to your personal data will lead to the recalculation of your tax code"
                  )}
                </Text>
              )}
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </FormikField>
    </>
  );
};

export default FiscalTypeArea;
