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
import Select from "react-select/base";

const TabBase = () => {
  const { t } = useTranslation();
  const { user, isProfileLoading } = UserStore();
  const initialUserValues = {
    name: user.name || "",
    surname: user.surname || "",
  };
  const now = new Date();
  return (
    <Formik
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
            <Field name="gender" type="text" label={t("Gender")} />

            <Field name="birthday" type="text" label={t("Birth Date")} />
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
