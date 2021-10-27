import { useTranslation } from "react-i18next";
import UserStore from "../../../redux/user";
import {
  Button,
  CSSGrid,
  Field,
  Form,
  Formik,
  Radio,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import React, { useEffect } from "react";
import { EmploymentSelect } from "../EmploymentSelect";
import * as yup from "yup";
import { EducationSelect } from "../EducationSelect";
import { CustomUserFields } from "./CustomUserFields";

const Index = () => {
  const { t } = useTranslation();
  const { user, isProfileLoading } = UserStore();
  const initialUserValues = {
    name: user.name || "",
    surname: user.surname || "",
    employment: user.profession
      ? { label: user.profession.name, value: user.profession.id.toString() }
      : { label: "", value: "" },
    education: user.education
      ? { label: user.education.name, value: user.education.id.toString() }
      : { label: "", value: "" },
  };
  const validationSchema = {
    name: yup.string().required(t("This is a required field")),
    surname: yup.string().required(t("This is a required field")),
    employment: yup.string().required(t("This is a required field")),
    education: yup.string().required(t("This is a required field")),
    telegram: yup.string().required(t("This is a required field")),
  };
  useEffect(() => {
    console.log(user);
  });
  return (
    <CSSGrid gutter="50px" rowGap="1rem" min="220px" className="aq-m-3">
      <Formik
        enableReinitialize
        initialValues={initialUserValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form id="baseProfileForm">
          <div className="employment">
            <Title size="s">{t("Employment")}</Title>
            <EmploymentSelect name="employment" label={t("Profession")} />
            <EducationSelect name="education" label={t("Education level")} />

            <Title size="s">{t("Certifications")}</Title>
            <Radio
              name="certifications"
              id="noCertifications"
              label={t("I have no certifications")}
            ></Radio>
            <Radio
              name="certifications"
              id="yesCertifications"
              label={t("I have the certifications")}
            ></Radio>
          </div>
        </Form>
      </Formik>
      <div className="address">
        <Title size="s">{t("Additional fields")}</Title>
        <Text>
          {t(
            "Improve your chances of being selected in test campaigns by completing your profile."
          )}
        </Text>
        <CustomUserFields></CustomUserFields>
        <Button type="success" htmlType="submit" flat={true} disabled={false}>
          {t("Save")}
        </Button>
      </div>
    </CSSGrid>
  );
};

export default Index;
