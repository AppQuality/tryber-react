import {
  CSSGrid,
  ErrorMessage,
  Field,
  FieldProps,
  FormGroup,
  FormikField,
  Select,
  Title,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import countries from "i18n-iso-countries";
import i18next from "i18next";
import { ChangeEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import CitySelect from "src/features/CitySelect";

const FiscalAddress = () => {
  const { t } = useTranslation();

  const {
    setFieldValue,
    setFieldTouched,
    setFieldError,
    values,
    getFieldProps,
  } = useFormikContext<FiscalFormValues>();
  const countryOptions = useMemo(
    () =>
      Object.entries(
        countries.getNames(i18next.language, { select: "official" })
      ).map(([locale, name]) => ({
        label: name,
        value: locale,
      })),
    []
  );

  return (
    <>
      <Title size="xs" className="aq-mb-2">
        {t("Fiscal Address")}
      </Title>
      <FormikField name="countryCode">
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: FieldProps) => {
          return (
            <FormGroup>
              <Select
                name={field.name}
                label={t("Country")}
                placeholder={t("Select a country")}
                value={countryOptions.filter(
                  (opt) => opt.value === field.value
                )}
                onBlur={(e: ChangeEvent) => {
                  setFieldTouched(field.name);
                }}
                onChange={(v) => {
                  if (v === null) {
                    v = { label: "", value: "" };
                  }
                  setFieldValue("city", "");
                  setFieldTouched("city");
                  setFieldValue(field.name, v.value, true);
                  if (v.value !== "IT") {
                    setFieldValue("type", "non-italian", true);
                  }
                }}
                options={countryOptions}
                noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </FormikField>
      <FormGroup>
        <CitySelect
          name="city"
          label={t("City")}
          onBlur={() => {
            setFieldTouched("city");
          }}
          countryRestrictions={values.countryCode}
          onChange={(place) => {
            if (!place) {
              setFieldValue("city", "", true);
              return;
            }
            const fields = place.address_components;
            const city = fields.find(
              (field) => field.types.indexOf("locality") >= 0
            );
            const province = fields.find(
              (field) => field.types.indexOf("administrative_area_level_2") >= 0
            );
            if (!city) {
              setFieldError(
                "city",
                t("We couldn't find a city with that name, please search again")
              );
            } else {
              getFieldProps("city").onChange(city?.long_name || "");
              setFieldValue("city", city?.long_name || "", true);
              setFieldValue("province", province?.short_name || "", true);
            }
          }}
        />
        <ErrorMessage name="city" />
      </FormGroup>
      <CSSGrid min="35px">
        <div style={{ gridColumn: "auto / span 2" }}>
          <Field name="province" label={t("State / Province")} />
        </div>
        <div style={{ gridColumn: "auto / span 1" }}>
          <Field name="zipCode" label={t("Zip code")} />
        </div>
      </CSSGrid>
      <CSSGrid min="35px">
        <div style={{ gridColumn: "auto / span 2" }}>
          <Field name="street" label={t("Street")} />
        </div>
        <div style={{ gridColumn: "auto / span 1" }}>
          <Field name="streetNumber" label={t("Street N°")} />
        </div>
      </CSSGrid>
    </>
  );
};
export default FiscalAddress;
