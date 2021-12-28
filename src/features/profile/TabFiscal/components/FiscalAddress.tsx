import {
  Button,
  FormLabel,
  Text,
  PlacesAutocomplete,
  Field,
  FormGroup,
  ErrorMessage,
  CSSGrid,
  Title,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import modalStore from "../../../../redux/modal";
import { useFormikContext } from "formik";
import FiscalResidenceModal from "./FiscalResidenceModal";

const FiscalAddress = () => {
  const { t, i18n } = useTranslation();
  const { open } = modalStore();
  const { setValues, setTouched, values, errors, touched } =
    useFormikContext<FiscalFormValues>();
  const formattedAddress = `${values.city || ""} - ${
    values.provinceCode || ""
  }`;

  return (
    <>
      <Title size="xs" className="aq-mb-2">
        {t("Fiscal Address")}
      </Title>
      <FormGroup>
        <FormLabel htmlFor="" label={t("City - State/Provice of residence")} />
        <PlacesAutocomplete
          placesProps={{
            apiKey: process.env.REACT_APP_GOOGLE_APIKEY || "",
            apiOptions: {
              language: i18n.language,
              region: i18n.language,
            },
            selectProps: {
              placeholder: t("select a city and a state/province"),
              isClearable: true,
              value: {
                label: formattedAddress,
                value: formattedAddress,
              },
              noOptionsMessage: () => t("Type to search your address"),
            },
            autocompletionRequest: {
              types: ["(cities)"],
              //componentRestrictions: { country: countryRestrictions || "" },
            },
          }}
          onBlur={(e) =>
            setTouched({
              countryCode: true,
              provinceCode: true,
              city: true,
            })
          }
          onChange={(places) => {
            if (!places) {
              setValues(
                (prevState) => ({
                  ...prevState,
                  countryCode: "",
                  provinceCode: "",
                  city: "",
                }),
                true
              );
              return;
            }
            const fields = places[0].address_components;
            const country = fields.find(
              (field) => field.types.indexOf("country") >= 0
            );
            const province = fields.find(
              (field) => field.types.indexOf("administrative_area_level_2") >= 0
            );
            const city = fields.find(
              (field) => field.types.indexOf("locality") >= 0
            );
            setValues(
              (prevState) => ({
                ...prevState,
                countryCode: country?.short_name,
                provinceCode: province?.short_name,
                city: city?.long_name,
              }),
              true
            );
          }}
        />
        <Text>
          {(errors.countryCode || errors.provinceCode || errors.city) &&
            touched.countryCode &&
            touched.provinceCode &&
            touched.city && (
              <div className="aq-mt-2">
                <ul>
                  {errors.countryCode && (
                    <li>
                      <ErrorMessage name="countryCode" />
                    </li>
                  )}
                  {errors.provinceCode && (
                    <li>
                      <ErrorMessage name="provinceCode" />
                    </li>
                  )}
                  {errors.city && (
                    <li>
                      <ErrorMessage name="city" />
                    </li>
                  )}
                </ul>
              </div>
            )}
        </Text>
      </FormGroup>
      <CSSGrid min="35px">
        <div style={{ gridColumn: "auto / span 2" }}>
          <Field name="street" label={t("Street")} />
        </div>
        <div style={{ gridColumn: "auto / span 1" }}>
          <Field name="streetNumber" label={t("Street N°")} />
        </div>
      </CSSGrid>
      <Field name="zipCode" label={t("Zip Code")} />
      <Text small className="aq-mt-1">
        <span className="aq-text-secondary">
          {t("If you have problems filling in your fiscal informations please")}
        </span>{" "}
        <Button
          type="link"
          htmlType="button"
          className="aq-text-secondary"
          flat
          style={{ padding: 0, fontWeight: 400 }}
          size="sm"
          onClick={() => {
            open({
              content: <FiscalResidenceModal values={values} />,
            });
          }}
        >
          {t("contact us")}
        </Button>
      </Text>
    </>
  );
};
export default FiscalAddress;
