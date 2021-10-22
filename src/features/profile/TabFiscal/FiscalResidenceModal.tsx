import {
  Formik,
  FormikField,
  Modal,
  Form,
  FormGroup,
  Input,
  Button,
  BSGrid,
  BSCol,
  Select,
  SelectType,
  FormLabel,
} from "@appquality/appquality-design-system";
import residenceModalStore from "../../../redux/addResidenceAddressModal";
import userStore from "../../../redux/user";
import { FieldProps, FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import API from "../../../utils/api";
import CountrySelect from "../../CountrySelect";
import { ProvinceSelect } from "./ProvinceSelect";
import countries from "i18n-iso-countries";
import { useMemo, useState } from "react";

const FiscalResidenceModal = () => {
  const {
    close: modalClose,
    isOpen: isModalOpen,
    address,
    updateData,
  } = residenceModalStore();
  const { user, isLoading, isProfileLoading } = userStore();
  const { t, i18n } = useTranslation();
  const enCountries = useMemo(
    () => countries.getNames("en", { select: "official" }),
    []
  );
  const { fiscal } = user;

  /* build initial value from a COUNTRY code or from store */
  let countrySelectInitialValue = "";
  if (fiscal?.address?.country) {
    countrySelectInitialValue = enCountries[fiscal.address.country];
  }

  /* build initial value from a PROVINCE code or from store */
  let provinceSelectInitialValue = { label: "", value: "" };
  if (fiscal?.address?.province) {
    provinceSelectInitialValue = {
      label: fiscal.address.province,
      value: fiscal.address.province,
    };
  }

  const initialValues: FiscalModalFields = {
    country: countrySelectInitialValue,
    countryCode: fiscal?.address?.country,
    province: provinceSelectInitialValue,
    provinceCode: fiscal?.address?.province,
    city: fiscal?.address?.city,
    cityCode: fiscal?.address?.city,
    street: fiscal?.address?.street,
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
                  <Button size="block" flat type="primary" htmlType="submit">
                    {t("Continue")}
                  </Button>
                </BSCol>
              </BSGrid>
            }
          >
            <Form>
              <CountrySelect
                name="country"
                label={t("Country")}
                onChange={(v) => {
                  formikProps.setFieldValue("countryCode", v.code, true);
                }}
              />
              <ProvinceSelect
                name="province"
                label={t("State / Province")}
                onChange={(v) => {
                  formikProps.setFieldValue("provinceCode", v.value, true);
                }}
              />
              <FormikField name="street">
                {({
                  field, // { name, value, onChange, onBlur }
                  form,
                }: FieldProps) => {
                  return (
                    <FormGroup>
                      <FormLabel htmlFor={field.name} label={t("Address")} />
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
