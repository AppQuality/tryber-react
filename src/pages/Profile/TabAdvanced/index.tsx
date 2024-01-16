import {
  CSSGrid,
  Form,
  Formik,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { HalfColumnButton } from "src/features/HalfColumnButton";
import { SkeletonTab } from "src/pages/Profile/SkeletonTab";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import {
  useGetUsersMeQuery,
  usePatchUsersMeMutation,
  usePutUsersMeAdditionalsByFieldIdMutation,
} from "src/services/tryberApi";
import * as yup from "yup";
import Certifications from "./Certifications";
import { CustomUserFields } from "./CustomUserFields";
import { EducationSelect } from "./EducationSelect";
import { EmploymentSelect } from "./EmploymentSelect";
import { MapCufValues, PrepareUserCuf } from "./MapCufValues";

const TabAdvanced = () => {
  const { t } = useTranslation();
  const { isLoading } = useGetUsersMeQuery({ fields: "all" });
  const dispatch = useDispatch();
  const [updateProfile] = usePatchUsersMeMutation();
  const [updateCuf] = usePutUsersMeAdditionalsByFieldIdMutation();
  const { initialUserValues, validationSchema } = MapCufValues();

  if (isLoading) return <SkeletonTab />;
  return (
    <Formik
      enableReinitialize
      initialValues={initialUserValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values, helpers) => {
        helpers.setSubmitting(true);
        const readyCuf = PrepareUserCuf(values, initialUserValues);
        try {
          await updateProfile({
            body: {
              profession: parseInt(values.employment),
              education: parseInt(values.education),
            },
          }).unwrap();

          await Promise.all(
            readyCuf.map((cuf) => {
              return updateCuf({
                fieldId: Number(cuf.id),
                body: cuf.values,
              }).unwrap();
            })
          );
          dispatch(addMessage(t("Profile data correctly updated."), "success"));
        } catch (e) {
          dispatch(
            addMessage(
              t("Profile data not saved. Please try again."),
              "warning"
            )
          );
        }

        helpers.setSubmitting(false);
      }}
    >
      {(formikProps) => (
        <Form id="advancedProfileForm" className="aq-m-3">
          <CSSGrid gutter="50px" rowGap="1rem" min="220px">
            <div className="employment">
              <div className="aq-mb-4">
                <Title className="aq-mb-2" size="xs">
                  {t("Employment")}
                </Title>
                <EmploymentSelect name="employment" label={t("Profession")} />
                <EducationSelect
                  name="education"
                  label={t("Education level")}
                />
              </div>
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
              {Object.keys(formikProps.errors).length ? (
                <Text color="danger" small className="aq-my-3">
                  {t("Please correct the errors in the form.")}
                </Text>
              ) : null}
              <CSSGrid min="50%" gutter="0" fill="true">
                <HalfColumnButton
                  kind="primary"
                  type="submit"
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
