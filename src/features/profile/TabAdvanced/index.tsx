import { useTranslation } from "react-i18next";
import {
  CSSGrid,
  Form,
  Formik,
  Spinner,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import React from "react";
import { EmploymentSelect } from "../EmploymentSelect";
import * as yup from "yup";
import { EducationSelect } from "../EducationSelect";
import { CustomUserFields } from "./CustomUserFields";
import Certifications from "./Certifications";
import { MapCufValues, PrepareUserCuf } from "./MapCufValues";
import { useSelector } from "react-redux";
import { HalfColumnButton } from "src/pages/profile/HalfColumnButton";
import API from "src/utils/api";

const TabAdvanced = () => {
  const { t } = useTranslation();
  const { initialUserValues, validationSchema } = MapCufValues();
  const isLoading = useSelector(
    (state: GeneralState) => state.user.loadingProfile
  );

  if (isLoading) return <Spinner />;
  return (
    <Formik
      enableReinitialize
      initialValues={initialUserValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={(values) => {
        const readyCuf = PrepareUserCuf(values);
        readyCuf.forEach((cuf) => {
          API.updateCustomUserFields(cuf.id, cuf.values);
        });
      }}
    >
      {(formikProps) => (
        <Form id="advancedProfileForm" className="aq-m-3">
          <CSSGrid gutter="50px" rowGap="1rem" min="220px">
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
                    {Object.entries(formikProps.errors).map((value) => (
                      <li>{value}</li>
                    ))}
                  </ul>
                </Text>
              )}
              <CSSGrid min="50%" gutter="0" fill={true}>
                <HalfColumnButton
                  type="success"
                  htmlType="submit"
                  flat={true}
                  disabled={false}
                >
                  {t("Save")}
                </HalfColumnButton>
              </CSSGrid>
            </div>
          </CSSGrid>
        </Form>
      )}
    </Formik>
  );
};

export default TabAdvanced;