import { useTranslation } from "react-i18next";
import {
  Button,
  CSSGrid,
  Form,
  Formik,
  FormikField,
  FormLabel,
  FieldProps,
  FormGroup,
  ErrorMessage,
  Radio,
  Text,
  Title,
  Input,
  Select,
  Modal,
} from "@appquality/appquality-design-system";
import { useState, useEffect } from "react";
import UserStore from "../../../redux/user";
import FiscalTypeArea from "./components/FiscalTypeArea";
import { ChangeEvent } from "react";
import FiscalAddress from "./components/FiscalAddress";
import residenceModalStore from "../../../redux/addResidenceAddressModal";
import * as yup from "yup";
import FiscalResidenceModal from "./components/FiscalResidenceModal";
import styled from "styled-components";
import dateFormatter from "../../../utils/dateFormatter";

export const TabFiscalEdit = ({ setEdit }: TabCommonProps) => {
  const { t } = useTranslation();
  const { user, updateFiscalProfile } = UserStore();
  const { address } = residenceModalStore();

  let street, streetNumber;
  let streetData = user.fiscal?.address?.street;
  if (streetData) {
    streetData = streetData.split(",");
    street = streetData[0];
    if (streetData.length > 1) streetNumber = streetData[1];
  }

  const initialUserValues: FiscalFormValues = {
    gender: user.fiscal?.gender || "",
    fiscalId: user.fiscal?.fiscalId || "",
    type: user.fiscal?.type || "",
    fiscalTypeSelect:
      user.fiscal?.type === "non-italian" ? "" : user.fiscal?.type,
    fiscalTypeRadio:
      user.fiscal?.type === "non-italian"
        ? "non-italian"
        : ["withholding", "witholding-extra", "other"].includes(
            user.fiscal?.type
          )
        ? "italian"
        : undefined,
    birthPlaceCity: user.fiscal?.birthPlace?.city,
    birthPlaceProvince: user.fiscal?.birthPlace?.province,
    countryCode: user.fiscal?.address?.country,
    provinceCode: user.fiscal?.address?.province,
    city: user.fiscal?.address?.city,
    street: street,
    streetNumber: streetNumber,
    zipCode: user.fiscal?.address?.cityCode,
  };

  const validationSchema = {
    gender: yup
      .string()
      .oneOf(["male", "female"])
      .required(t("This is a required field")),
    countryCode: yup.string().required(t("You need to select a country")),
    provinceCode: yup
      .string()
      .required(t("Your address need to have a province code")),
    city: yup.string().required(t("You need to select a city")),
    street: yup.string().required(t("You need to select a street")),
    streetNumber: yup
      .string()
      .required(t("You need to select a street with a street code")),
    zipCode: yup.string().required(t("Your address need a zip code")),
    fiscalTypeRadio: yup
      .string()
      .oneOf(["non-italian", "italian"])
      .required(t("This is a required field")),
    fiscalTypeSelect: yup
      .string()
      .oneOf(["withholding", "witholding-extra", "other"])
      .when("fiscalTypeRadio", {
        is: "italian",
        then: yup.string().required(t("This is a required field")),
      }),
    type: yup
      .string()
      .oneOf(["non-italian", "withholding", "witholding-extra", "other"])
      .required(t("This is a required field")),
    birthPlaceCity: yup.string().when("fiscalTypeRadio", {
      is: "italian",
      then: yup.string().required(t("This is a required field")),
    }),
    birthPlaceProvince: yup.string().when("fiscalTypeRadio", {
      is: "italian",
      then: yup
        .string()
        .required(
          t("This value is invalid, you need to select a city with a province")
        ),
    }),
    fiscalId: yup
      .string()
      .required(t("This is a required field"))
      .min(11, t("Should be at least 11 characters"))
      .max(16, t("Should be at most 16 characters")),
  };

  const genderOptions = [
    { value: "male", label: t("Male") },
    { value: "female", label: t("Female") },
  ];

  return (
    <Formik
      enableReinitialize
      initialValues={initialUserValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values, action) => {
        const submitValues = {
          address: {
            country: values.countryCode,
            province: values.provinceCode,
            city: values.city,
            street: `${values.street}, ${values.streetNumber}`,
            cityCode: values.zipCode,
          },
          type: values.type,
          birthPlace: {
            city: values.birthPlaceCity,
            province: values.birthPlaceProvince,
          },
          fiscalId: values.fiscalId,
          gender: values.gender,
        };
        // todo: check types
        await updateFiscalProfile(submitValues);
        action.setSubmitting(false);
      }}
    >
      {({ isValid, isValidating, dirty, errors, values }) => (
        <Form id="baseProfileForm">
          <CSSGrid gutter="50px" rowGap="1rem" min="220px">
            <div className="user-info">
              <Title size="xs" className="aq-mb-2">
                {t("Informations")}
              </Title>
              <FormGroup>
                <FormLabel htmlFor="name" label={t("Name")} isDisabled />
                <Input id="name" type="text" disabled value={user.name} />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="surname" label={t("Surname")} />
                <Input id="surname" type="text" disabled value={user.surname} />
              </FormGroup>
              <FormikField name="gender">
                {({
                  field, // { name, value, onChange, onBlur }
                  form,
                }: FieldProps) => {
                  return (
                    <FormGroup>
                      <Select
                        name={field.name}
                        label={t("Gender")}
                        value={{ label: "", value: field.value }}
                        onChange={(v) => {
                          form.setFieldTouched(field.name);
                          if (!v || !v.value) {
                            form.setFieldValue(field.name, "", true);
                            return;
                          }
                          form.setFieldValue(field.name, v.value, true);
                        }}
                        options={genderOptions}
                      />
                      <Text small className="aq-mt-1">
                        <span className="aq-text-disabled-dark">
                          {t(
                            "For tax reasons we are obliged to tie this choice to binary options only"
                          )}
                        </span>
                      </Text>
                      <ErrorMessage name={field.name} />
                    </FormGroup>
                  );
                }}
              </FormikField>
              <FormGroup className="aq-mb-3">
                <FormLabel
                  htmlFor="birth_date"
                  label={t("Birth Date")}
                  isDisabled
                />
                <Input
                  id="birth_date"
                  type="text"
                  disabled
                  value={dateFormatter(user.birthDate)}
                />
              </FormGroup>
            </div>
            <div className="tax-residence">
              <Title size="xs" className="aq-mb-2">
                {t("Tax residence")}
              </Title>
              <FiscalTypeArea />
              <div className="aq-mb-3">
                <FiscalAddress />
              </div>
              <CSSGrid min="50%" gutter="0" fill>
                <SubmitButton
                  type="success"
                  htmlType="submit"
                  flat
                  disabled={!isValid || isValidating || !dirty}
                >
                  {dirty ? t("Save") : t("Nothing to Save")}
                </SubmitButton>
              </CSSGrid>
            </div>
          </CSSGrid>
        </Form>
      )}
    </Formik>
  );
};

const SubmitButton = styled(Button)`
  grid-column: span 2;
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-column: span 1;
  }
`;
