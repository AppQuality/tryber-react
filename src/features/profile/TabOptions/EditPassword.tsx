import {
  CSSGrid,
  Field,
  Form,
  Formik,
  Text,
  Title,
  Input,
  FormikField,
  FormLabel,
  FormGroup,
  ErrorMessage,
} from "@appquality/appquality-design-system";
import { FieldProps, FormikProps } from "formik";
import API from "../../../utils/api";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import siteWideMessageStore from "../../../redux/siteWideMessages";
import ResetPasswordArea from "./ResetPasswordArea";
import { HalfColumnButton } from "src/pages/profile/HalfColumnButton";

const EditPassword = () => {
  const { t } = useTranslation();
  const { add } = siteWideMessageStore();
  const initialUserValues = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  };
  return (
    <div className="edit-password">
      <Formik
        initialValues={initialUserValues}
        validateOnMount
        validationSchema={yup.object().shape({
          currentPassword: yup.string().required(t("This is a required field")),
          newPassword: yup
            .string()
            .min(6, t("Must be at least 6 character long"))
            .matches(/[0-9]/, t("Must contain at least a number"))
            .matches(/[A-Z]/, t("Must contain at least an uppercase letter"))
            .matches(/[a-z]/, t("Must contain at least a lowercase letter"))
            .required(t("This is a required field")),
          newPasswordConfirm: yup
            .string()
            .required(t("This is a required field"))
            .oneOf(
              [yup.ref("newPassword"), null],
              t("Password confirmation doesn't match")
            ),
        })}
        onSubmit={async (values, { resetForm }) => {
          try {
            await API.changePassword({
              oldPass: values.currentPassword,
              newPass: values.newPasswordConfirm,
            });
            resetForm();
            add({
              message: t("Password correctly updated, you will be logged out"),
              type: "success",
            });
            window.location.reload();
          } catch (e: HttpError) {
            if (e.statusCode === 417) {
              add({
                message: t("Your current password is not correct"),
                type: "danger",
              });
            } else {
              add({
                message: e.message,
                type: "warning",
              });
            }
          }
        }}
      >
        {(formikProps: FormikProps<typeof initialUserValues>) => {
          return (
            <Form id="baseProfileForm">
              <Title size="xs" className="aq-mb-2">
                {t("Change password")}
              </Title>
              <Field
                name="currentPassword"
                type="password"
                label={t("Current password")}
                placeholder="******"
              />
              <FormikField name="newPassword">
                {({ field, form, meta }: FieldProps) => {
                  return (
                    <FormGroup>
                      <FormLabel
                        htmlFor={field.name}
                        label={t("New password")}
                      />
                      <Input
                        id={field.name}
                        isInvalid={
                          meta.touched && typeof meta.error == "string"
                        }
                        extra={{ ...field }}
                        type="password"
                        onChange={(v) => {
                          form.setFieldValue(field.name, v, true);
                        }}
                        placeholder="******"
                      />
                      <Text small className="aq-mt-2 aq-text-secondary">
                        {t(
                          "For a secure password we recommend: Minimum 6  characters. An uppercase character. A numerical digit. A lowercase character."
                        )}
                      </Text>
                      <ErrorMessage name={field.name} />
                    </FormGroup>
                  );
                }}
              </FormikField>
              <Field
                name="newPasswordConfirm"
                type="password"
                label={t("Confirm password")}
                placeholder="******"
              />
              <CSSGrid min="50%" gutter="0" fill="true">
                <HalfColumnButton
                  type="primary"
                  htmlType="submit"
                  flat={true}
                  disabled={!formikProps.isValid}
                >
                  {t("Change password")}
                </HalfColumnButton>
              </CSSGrid>
              <div className="aq-my-3">
                <ResetPasswordArea />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditPassword;
