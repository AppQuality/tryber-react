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
import residenceModalStore from "../../../redux/addResidenceAddressModal";
import { FieldProps, useFormikContext } from "formik";

const FiscalAddress = () => {
  const { t } = useTranslation();
  const { values }: any = useFormikContext();
  const { open: openModal, address } = residenceModalStore();

  const currentAddress = {
    street: address.street ? address.street : values.address.street,
    country: values.country ? values.country : values.address.country,
  };

  return (
    <>
      <div className="aq-mb-3">
        <FormikField name="formattedFiscalAddress">
          {({ form, field }: FieldProps) => (
            <FormGroup>
              <FormLabel htmlFor={field.name} label={t("Fiscal Address")} />
              <PlacesAutocomplete
                placesProps={{
                  apiKey: process.env.REACT_APP_GOOGLE_APIKEY || "",
                }}
                onChange={(places) => {
                  form.setFieldValue(field.name, places[0].formatted_address);
                }}
              />
            </FormGroup>
          )}
        </FormikField>
      </div>
      <BSGrid>
        <BSCol size="col-6">
          <Button
            size="block"
            type="primary"
            htmlType="button"
            flat={true}
            onClick={openModal}
          >
            {t("Add")}
          </Button>
        </BSCol>
      </BSGrid>
    </>
  );
};
export default FiscalAddress;
