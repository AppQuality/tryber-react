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
import Certifications from "./Certifications";
import { MapCufValues } from "./MapCufValues";

const TabAdvanced = () => {
  const { t } = useTranslation();
  const { initialUserValues, validationSchema } = MapCufValues();
  const { user, isProfileLoading } = UserStore();

  return (
    <Formik
      enableReinitialize
      initialValues={initialUserValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formikProps) => (
        <Form id="advancedProfileForm">
          <CSSGrid gutter="50px" rowGap="1rem" min="220px" className="aq-m-3">
            <div className="employment">
              <Title size="s">{t("Employment")}</Title>
              <EmploymentSelect name="employment" label={t("Profession")} />
              <EducationSelect name="education" label={t("Education level")} />
              <Title size="xs">{t("Certifications")}</Title>
              <Certifications />
            </div>
            <div className="address">
              <Title size="s">{t("Additional fields")}</Title>
              <Text>
                {t(
                  "Improve your chances of being selected in test campaigns by completing your profile."
                )}
              </Text>
              <CustomUserFields />
              {formikProps.errors && (
                <Text color="danger" small>
                  <ul style={{ listStyle: "disc" }}>
                    {Object.entries(formikProps.errors).map((value, key) => (
                      <li>{value}</li>
                    ))}
                  </ul>
                </Text>
              )}
              <Button
                type="success"
                htmlType="submit"
                flat={true}
                disabled={false}
              >
                {t("Save")}
              </Button>
            </div>
          </CSSGrid>
        </Form>
      )}
    </Formik>
  );
};

export default TabAdvanced;
