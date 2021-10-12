import { useTranslation } from "react-i18next";
import {
  BSCol,
  BSGrid,
  Title,
  FormLabel,
  Input,
  CSSGrid,
  Text,
  Button,
  Field,
  Formik,
  Form,
} from "@appquality/appquality-design-system";
import UserStore from "../../redux/user";
import React from "react";

const TabBase = () => {
  const { t } = useTranslation();
  const { user, isProfileLoading } = UserStore();
  const initialUserValues = {
    name: user.name || "",
    surname: user.surname || "",
  };

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
          </div>
          <div className="address">
            <Title size="s">{t("Address")}</Title>
          </div>
        </CSSGrid>
      </Form>
    </Formik>
  );
};

export default TabBase;
