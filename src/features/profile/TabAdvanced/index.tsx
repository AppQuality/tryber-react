import {
  CSSGrid,
  Form,
  Formik,
  Spinner,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { HalfColumnButton } from "src/pages/profile/HalfColumnButton";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import API from "src/utils/api";
import * as yup from "yup";
import { EducationSelect } from "../EducationSelect";
import { EmploymentSelect } from "../EmploymentSelect";
import Certifications from "./Certifications";
import { CustomUserFields } from "./CustomUserFields";
import { MapCufValues, PrepareUserCuf } from "./MapCufValues";

const TabAdvanced = () => {
  const { t } = useTranslation();
  const { initialUserValues, validationSchema } = MapCufValues();
  const isLoading = useSelector(
    (state: GeneralState) => state.user.loadingProfile
  );
  const dispatch = useDispatch();

  if (isLoading) return <Spinner />;
  return (
    <Formik
      enableReinitialize
      initialValues={initialUserValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values, helpers) => {
        try {
          const readyCuf = PrepareUserCuf(values);
          const updateCuf = readyCuf.map((cuf) => {
            return API.updateCustomUserFields(cuf.id, cuf.values);
          });
          await Promise.all(updateCuf);
          dispatch(addMessage(t("Profile data correctly updated."), "success"));
          helpers.setSubmitting(false);
          helpers.resetForm({ values });
        } catch (e) {
          dispatch(
            addMessage(
              t("Profile data not saved. Please try again."),
              "warning"
            )
          );
        }
      }}
    >
      {(formikProps) => (
        <Form id="advancedProfileForm" className="aq-m-3">
          <CSSGrid gutter="50px" rowGap="1rem" min="220px">
            <div className="employment">
              <Title className="aq-mb-2" size="xs">
                {t("Employment")}
              </Title>
              <EmploymentSelect name="employment" label={t("Profession")} />
              <EducationSelect name="education" label={t("Education level")} />
              <Title className="aq-mb-2" size="xs">
                {t("Certifications")}
              </Title>
              <Certifications />
            </div>
            <div className="address">
              <Title className="aq-mb-2" size="xs">
                {t("Additional fields")}
              </Title>
              <Text className="aq-mb-3">
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
                  flat
                  disabled={
                    !formikProps.isValid ||
                    formikProps.isValidating ||
                    !formikProps.dirty
                  }
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
