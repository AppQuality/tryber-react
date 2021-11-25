import {
  ErrorMessage,
  FormGroup,
  FormLabel,
  Input,
  Radio,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { Field as FormikField, FieldProps, useFormikContext } from "formik";
import { ChangeEvent } from "react";
import { Trans, useTranslation } from "react-i18next";
import CitySelect from "src/features/profile/CitySelect";

const FiscalTypeArea = () => {
  const { values, setValues, setFieldTouched, setFieldError } =
    useFormikContext<FiscalFormValues>();
  const { t } = useTranslation();
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
              label={t("Tax residence option:::Italian")}
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
              label={t("Tax residence option:::Not italian")}
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
                    placeholder={t("Select a Fiscal Type please")}
                    name={field.name}
                    label={t("Tax regime options select label:::Fiscal Type")}
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
                        form.setFieldTouched(field.name);
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
                        label: t("Fiscal types:::@@Witholding < 5000€@@"),
                      },
                      {
                        value: "witholding-extra",
                        label: t("Fiscal types:::@@Witholding > 5000€@@"),
                      },
                      {
                        value: "other",
                        label: t("Fiscal types:::@@Not compatible regime@@"),
                      },
                    ]}
                  />{" "}
                  <Text small className="aq-mt-1 aq-text-secondary">
                    <Trans
                      i18nKey="Available tags:
<a></a>: Link to the fiscal type help article:::@@Description for help article for fiscal type@@"
                      components={{
                        a: (
                          <a
                            className="aq-text-secondary"
                            href={t("Fiscal type help article", {
                              ns: "links",
                            })}
                          />
                        ),
                      }}
                    />
                  </Text>
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
                // they made me do this
                if (country?.short_name === "IT") {
                  if (city?.long_name === "Milan") {
                    city.long_name = "Milano";
                  }
                  if (city?.long_name === "Rome") {
                    city.long_name = "Roma";
                  }
                  if (city?.long_name === "Turin") {
                    city.long_name = "Torino";
                  }
                  if (city?.long_name === "Naples") {
                    city.long_name = "Napoli";
                  }
                }
                if (!city) {
                  setFieldError(
                    "birthPlaceCity",
                    t(
                      "We couldn't find a city with that name, please search again"
                    )
                  );
                } else {
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
                }
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
              <FormLabel
                htmlFor={field.name}
                label={t("Tax identification number:::Tax ID")}
              />
              <Input
                placeholder={t("Personal Tax identification number")}
                id={field.name}
                type="text"
                value={field.value}
                extra={{ maxLength: "30" }}
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
