import {
  Button,
  BSGrid,
  BSCol,
  FormLabel,
  FormikField,
  Text,
  PlacesAutocomplete,
  FormGroup,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import residenceModalStore from "../../../../redux/addResidenceAddressModal";
import { FieldProps, useFormikContext } from "formik";

const FiscalAddress = () => {
  const { t } = useTranslation();
  const { open: openModal, address } = residenceModalStore();
  const { setValues, values } = useFormikContext<FiscalFormValues>();
  const formattedAddress = `${values.address?.street} ${values.address?.city} ${values.address?.zipCode} ${values.address?.provinceCode}, ${values.address?.countryCode}`;
  return (
    <FormGroup>
      <FormLabel htmlFor="" label={t("Fiscal Address")} />
      <PlacesAutocomplete
        placesProps={{
          apiKey: process.env.REACT_APP_GOOGLE_APIKEY || "",
          selectProps: {
            value: {
              label: formattedAddress,
              value: formattedAddress,
            },
          },
        }}
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
              address: {
                countryCode: country?.short_name,
                provinceCode: province?.short_name,
                city: city?.long_name,
                zipCode: zipCode?.long_name,
                street: street?.long_name,
                streetNumber: streetNumber?.long_name,
              },
            }),
            true
          );
        }}
      />
      <Text className="aq-mt-3">
        {t("Problems?")}
        <Button
          as="a"
          type="link"
          htmlType="button"
          flat={true}
          onClick={openModal}
        >
          {t("Contact us")}
        </Button>
      </Text>
    </FormGroup>
  );
};
export default FiscalAddress;
