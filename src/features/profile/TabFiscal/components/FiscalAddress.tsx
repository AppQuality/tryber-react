import {
  Button,
  BSGrid,
  BSCol,
  FormLabel,
  FormikField,
  Text,
  PlacesAutocomplete,
  FormGroup,
  ErrorMessage,
  ModalBody,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import modalStore from "../../../../redux/modal";
import userStore from "../../../../redux/user";
import residenceModalStore from "../../../../redux/addResidenceAddressModal";
import { FieldProps, useFormikContext } from "formik";
import FiscalResidenceModal from "./FiscalResidenceModal";

const FiscalAddress = () => {
  const { t, i18n } = useTranslation();
  const { open: openModal, address } = residenceModalStore();
  const { open } = modalStore();
  const { setValues, setTouched, values, errors } =
    useFormikContext<FiscalFormValues>();
  const formattedAddress = `${values.street || ""} ${values.city || ""} ${
    values.zipCode || ""
  } ${values.provinceCode || ""}, ${values.countryCode || ""}`;

  return (
    <FormGroup>
      <FormLabel htmlFor="" label={t("Fiscal Address")} />
      <PlacesAutocomplete
        placesProps={{
          apiKey: process.env.REACT_APP_GOOGLE_APIKEY || "",
          apiOptions: {
            language: i18n.language,
            region: i18n.language,
          },
          selectProps: {
            value: {
              label: formattedAddress,
              value: formattedAddress,
            },
          },
        }}
        onBlur={(e) =>
          setTouched({
            countryCode: true,
            provinceCode: true,
            city: true,
            zipCode: true,
            street: true,
          })
        }
        onChange={(places) => {
          const fields = places[0].address_components;
          const country = fields.find(
            (field) => field.types.indexOf("country") >= 0
          );
          const province = fields.find(
            (field) => field.types.indexOf("administrative_area_level_2") >= 0
          );
          const city = fields.find(
            (field) => field.types.indexOf("administrative_area_level_3") >= 0
          );
          const zipCode = fields.find(
            (field) => field.types.indexOf("postal_code") >= 0
          );
          const street = fields.find(
            (field) => field.types.indexOf("route") >= 0
          );
          const streetNumber = fields.find(
            (field) => field.types.indexOf("street_number") >= 0
          );
          setValues(
            (prevState) => ({
              ...prevState,
              countryCode: country?.short_name,
              provinceCode: province?.short_name,
              city: city?.long_name,
              zipCode: zipCode?.long_name,
              street: street?.long_name,
              streetNumber: streetNumber?.long_name,
            }),
            true
          );
        }}
      />
      <Text>
        {(errors.countryCode ||
          errors.provinceCode ||
          errors.city ||
          errors.zipCode ||
          errors.street) && (
          <div className="aq-mt-2">
            <Text color="danger">
              Please add the following fields to your address:
            </Text>
            <ul style={{ listStyle: "disc" }}>
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
              {errors.zipCode && (
                <li>
                  <ErrorMessage name="zipCode" />
                </li>
              )}
              {errors.street && (
                <li>
                  <ErrorMessage name="street" />
                </li>
              )}
            </ul>
          </div>
        )}
        <Text small className="aq-mt-1">
          <span className="aq-text-disabled-dark">
            {t("If your address is not in the list please ")}
          </span>
          <Button
            type="link"
            htmlType="button"
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
      </Text>
    </FormGroup>
  );
};
export default FiscalAddress;
