import {
  Formik,
  Modal,
  Form,
  FormGroup,
  Input,
  Button,
  BSGrid,
  BSCol,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import residenceModalStore from "../../../redux/addResidenceAddressModal";
import userStore from "../../../redux/user";
import { Field as FormikField, FieldProps, FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import API from "../../../utils/api";
import CountrySelect from "../../CountrySelect";
import countries from "i18n-iso-countries";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { useState } from "react";

const FiscalResidenceModal = () => {
  const {
    close: modalClose,
    isOpen: isModalOpen,
    address,
    updateData,
  } = residenceModalStore();
  const [a, setA] = useState(null);
  const { user, isLoading, isProfileLoading } = userStore();
  const { t, i18n } = useTranslation();
  if (isLoading || isProfileLoading) return null;

  let countrySelectValue = address.country || "";
  if (!countrySelectValue) {
    const enCountries = countries.getNames("en", { select: "official" });
    const item = Object.entries(enCountries).find(
      ([locale]) => locale === user?.fiscal?.address.country
    );
    if (item) {
      countrySelectValue = item[1];
    }
  }
  const initialValues: {
    countrySelect: string;
    country: string;
    street: string;
  } = {
    countrySelect: countrySelectValue,
    country: address.country ? address.country : user?.fiscal?.address.country,
    street: address.street ? address.street : user?.fiscal?.address.street,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(v) => {
        updateData(v);
        modalClose();
      }}
    >
      {(formikProps: FormikProps<any>) => {
        return (
          <Modal
            isOpen={isModalOpen}
            onClose={modalClose}
            footer={
              <BSGrid>
                <BSCol size="col-8"></BSCol>
                <BSCol size="col-4">
                  <Button
                    size="block"
                    flat
                    type="primary"
                    htmlType="submit"
                    onClick={() => formikProps.handleSubmit()}
                  >
                    Ok
                  </Button>
                </BSCol>
              </BSGrid>
            }
          >
            <Form>
              <GooglePlacesAutocomplete
                autocompletionRequest={{
                  types: ["geocode"],
                }}
                selectProps={{
                  onChange: (v: any) => {
                    geocodeByPlaceId(v.value.place_id)
                      .then((results) => results)
                      .catch((error) => error);
                  },
                }}
              />
              <FormikField name="country">
                {({
                  field, // { name, value, onChange, onBlur }
                  form,
                }: FieldProps) => {
                  return (
                    <CountrySelect
                      name={"countrySelect"}
                      menuTargetQuery={"body"}
                      label={t("Country")}
                      onChange={(v: SelectType.Option) => {
                        field.onChange(v.code);
                        form.setFieldValue(field.name, v.code, true);
                      }}
                    />
                  );
                }}
              </FormikField>
              <FormikField name="region">
                {({
                  field, // { name, value, onChange, onBlur }
                  form,
                }: FieldProps) => {
                  return (
                    <Select
                      name={field.name}
                      menuTargetQuery={"body"}
                      label={t("Province")}
                      value={{ label: "", value: field.value }}
                      onChange={(v: SelectType.Option) => {
                        field.onChange(v.value);
                        form.setFieldValue(field.name, v.value, true);
                      }}
                      options={async (start) => {
                        let provinces = await API.adminAreas({
                          countryIds: form.values.country,
                          languageCode: i18n.language,
                          offset: start,
                        });
                        return {
                          results: provinces.data.map((r) => ({
                            value: r.name,
                            label: r.name,
                          })),
                          more:
                            provinces.links &&
                            !!provinces.links.find((l) => l.rel === "next"),
                        };
                      }}
                    />
                  );
                }}
              </FormikField>
              <FormikField name="street">
                {({
                  field, // { name, value, onChange, onBlur }
                  form,
                }: FieldProps) => {
                  return (
                    <FormGroup>
                      <Input
                        type="text"
                        id={field.name}
                        value={field.value}
                        onChange={(v) => {
                          field.onChange(v);
                          form.setFieldValue(field.name, v, true);
                        }}
                      />
                    </FormGroup>
                  );
                }}
              </FormikField>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default FiscalResidenceModal;
