import { useTranslation } from "react-i18next";
import {
  Title,
  FormLabel,
  CSSGrid,
  Field,
  Formik,
  Form,
  FieldProps,
  FormGroup,
  ErrorMessage,
  FormikField,
} from "@appquality/appquality-design-system";
import UserStore from "../../redux/user";
import React from "react";
import CountrySelect from "../CountrySelect";
import Select from "react-select";
import * as yup from "yup";
import BirthdayPicker from "../BirthdayPicker";

const TabBase = () => {
  const { t } = useTranslation();
  const { user, isProfileLoading } = UserStore();
  const initialUserValues = {
    name: user.name || "",
    surname: user.surname || "",
    gender: user.gender || "",
    birthDate: user.bithDate || "",
  };
  const validationSchema = {
    name: yup.string().required(t("This is a required field")),
    surname: yup.string().required(t("This is a required field")),
  };
  const now = new Date();
  return (
    <Formik
      validationSchema={yup.object(validationSchema)}
      initialValues={initialUserValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form id="baseProfileForm" className="aq-m-3">
        <CSSGrid gutter="50px" rowGap="1rem" min="220px">
          <div className="personal-info">
            <Title size="s">{t("Personal info")}</Title>
            <Field name="name" type="text" label={t("Name")} />
            <Field name="surname" type="text" label={t("Surname")} />
            <FormikField name="gender">
              {({ field, form }: FieldProps) => (
                <FormGroup>
                  <FormLabel htmlFor={field.name} label={t("Gender")} />
                  <Select
                    options={[
                      { label: "Female", value: "female" },
                      { label: "Male", value: "male" },
                      { label: "Not Specified", value: "not-specified" },
                    ]}
                    name={field.name}
                    placeholder={t("Select a gender")}
                    value={field.value}
                    onBlur={() => {
                      form.setFieldTouched(field.name);
                    }}
                    onChange={(v) => {
                      if (v === null) {
                        v = { label: "", value: "" };
                      }
                      field.onChange(v.value);
                      form.setFieldValue(field.name, v.value, true);
                    }}
                  />
                </FormGroup>
              )}
            </FormikField>

            <FormikField name="birthDate">
              {({ field, form }: FieldProps) => {
                return (
                  <FormGroup>
                    <BirthdayPicker
                      name={field.name}
                      initialValue={field.value}
                      onCancel={() => form.setFieldTouched(field.name)}
                      onChange={(v: Date) => {
                        field.onChange(v.toISOString().slice(0, 10));
                        form.setFieldValue(
                          "birthDate",
                          v.toISOString().slice(0, 10),
                          true
                        );
                      }}
                    />
                    <ErrorMessage name={field.name} />
                  </FormGroup>
                );
              }}
            </FormikField>
            <FormLabel htmlFor="phonenumber" label="Phone number" />
            <Field name="prefix" type="number" />
            <Field name="phone" type="number" />

            <Field name="email" type="email" label={t("Email")} />
          </div>

          <div className="address">
            <Title size="s">{t("Address")}</Title>
            <CountrySelect name="country" label={t("Country")} />
            <Field
              name="domicile"
              type="text"
              label={t("Domicile")}
              placeholder={t("ex. New York")}
            />
            <Title size="s">{t("Language")}</Title>
            <FormLabel htmlFor="language" label={t("Spoken languages")} />
            <Select></Select>
          </div>
        </CSSGrid>
      </Form>
    </Formik>
  );
};

export default TabBase;
