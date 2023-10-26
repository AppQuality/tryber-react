import {
  ErrorMessage,
  FormGroup,
  FormLabel,
  Input,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { Field as FormikField, FieldProps, useFormikContext } from "formik";
import { Trans, useTranslation } from "react-i18next";
import CitySelect from "src/features/CitySelect";

const FiscalTypeArea = () => {
  const { values, setValues, setFieldTouched, setFieldError } =
    useFormikContext<FiscalFormValues>();
  const { t } = useTranslation();
  return (
    <>
      {values.countryCode === "IT" && (
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
                    onBlur={() => {
                      form.setFieldTouched(field.name);
                    }}
                    onChange={(v) => {
                      if (v == null) {
                        v = { label: "", value: "" };
                      }
                      form.setFieldTouched(field.name);
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
                        label: t("Fiscal types:::Witholding < 5000€"),
                      },
                      {
                        value: "witholding-extra",
                        label: t("Fiscal types:::Witholding > 5000€"),
                      },
                      {
                        value: "vat",
                        label: t("Fiscal types:::VAT"),
                      },
                      {
                        value: "company",
                        label: t("Fiscal types:::Company"),
                      },
                    ]}
                    noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
                  />{" "}
                  <Text small className="aq-mt-1 aq-text-primaryVariant">
                    <Trans
                      i18nKey="Available tags 
<a> - Link to help article for fiscal type:::@@Description for fiscal type@@"
                      components={{
                        a: (
                          <a
                            className="aq-text-secondary"
                            target="_blank"
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
              onChange={async (place) => {
                if (!place) {
                  setValues(
                    (prevState) => ({
                      ...prevState,
                      birthPlaceCity: "",
                      birthPlaceProvince: "",
                    }),
                    true
                  );
                  return;
                }
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
                      birthPlaceId: place.place_id,
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
          meta,
        }: FieldProps) => {
          return (
            <FormGroup>
              <FormLabel
                htmlFor={field.name}
                label={t("Tax identification number:::Tax ID")}
              />
              <Input
                placeholder={t("Tax identification number:::Tax ID")}
                id={field.name}
                isInvalid={meta.touched && typeof meta.error == "string"}
                type="text"
                extra={{ ...field, maxLength: "30" }}
              />
              <Text small className="aq-mt-1 aq-text-primaryVariant">
                <Trans
                  i18nKey={
                    "Available tags: <tax_id_support_link> (article link for tax id explanation):::__FISCAL_PROFILE_TAX_ID_LINK"
                  }
                  components={{
                    tax_id_support_link: (
                      <a
                        href={t("tax id help article", {
                          ns: "links",
                        })}
                        target="_blank"
                      />
                    ),
                  }}
                />
                {values.countryCode === "IT" && (
                  <span>
                    <br />
                    {t("__FISCAL_PROFILE_TAX_ID_DISCLAIMER")}
                  </span>
                )}
              </Text>
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </FormikField>
    </>
  );
};

export default FiscalTypeArea;
