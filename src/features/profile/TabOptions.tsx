import { Trans, useTranslation } from "react-i18next";
import {
  Button,
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
  BSGrid,
  BSCol,
  ErrorMessage,
} from "@appquality/appquality-design-system";
import { FieldProps, FormikProps } from "formik";
import UserStore from "../../redux/user";
import siteWideMessageStore from "../../redux/siteWideMessages";
import leaveCrowd from "./assets/leave-crowd.png";
import styled from "styled-components";
import WPAPI from "../../utils/wpapi";
import API from "../../utils/api";
import * as yup from "yup";

const Separator = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${(props) => props.theme.colors.disabledElement};
  margin: 1em 0;
  padding: 0;
`;

const TabOptions = () => {
  const { t, i18n } = useTranslation();
  const { deletion, user } = UserStore();
  const { openDeleteModal } = deletion;
  const { add } = siteWideMessageStore();
  const initialUserValues = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  };
  return (
    <div className="aq-m-3">
      <CSSGrid gutter="50px" rowGap="1rem" min="220px">
        <div className="edit-password">
          <Formik
            initialValues={initialUserValues}
            validateOnMount
            validationSchema={yup.object().shape({
              currentPassword: yup
                .string()
                .required(t("This is a required field")),
              newPassword: yup
                .string()
                .min(6, t("Must be at least 6 character long"))
                .matches(/[0-9]/, t("Must contain at least a number"))
                .matches(
                  /[A-Z]/,
                  t("Must contain at least an uppercase letter")
                )
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
            onSubmit={(values, { resetForm }) => {
              return API.changePassword({
                oldPass: values.currentPassword,
                newPass: values.newPasswordConfirm,
              })
                .then(() => {
                  resetForm();
                  add({
                    message: t("Password correctly updated"),
                    type: "success",
                  });
                })
                .catch((e: HttpError) => {
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
                });
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
                          <Text small className="aq-mt-2">
                            * For a secure password we recommend: Minimum 6
                            characters. An uppercase character. A numerical
                            digit. A lowercase character.
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    flat={true}
                    disabled={!formikProps.isValid}
                    onClick={() => {
                      console.log(formikProps);
                    }}
                  >
                    {t("Change password")}
                  </Button>
                  <div className="aq-my-3">
                    <Title size="xs" className="aq-mb-2">
                      {t("Reset password")}
                    </Title>
                    <CSSGrid min="110px" fill={true}>
                      <div style={{ gridColumn: "auto / span 2" }}>
                        <Text>
                          {t(
                            "If you don't remember your password, you can just ask for a new one."
                          )}
                        </Text>
                      </div>
                      <Button
                        as="a"
                        type="link"
                        target="_blank"
                        href="/wp-login.php?action=lostpassword"
                      >
                        {t("Request now")}
                      </Button>
                    </CSSGrid>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className="ask-your-data">
          <Title size="xs" className="aq-mb-2">
            {t("Request your data")}
          </Title>
          <Text className="aq-mb-3">
            {t(
              "Your data are safe with us. You can ask them anytime you need. Upon your request, we will provide you a copy of your personal data at the email associated to your Tester ID."
            )}
          </Text>
          <BSGrid>
            <BSCol size="col-6">
              <Button
                type="primary"
                size="block"
                htmlType="submit"
                flat={true}
                onClick={async () => {
                  WPAPI.requestUserData(i18n.language)
                    .then(() => {
                      add({
                        message: t(
                          "We've received your request. You'll get an email in a few days."
                        ),
                        type: "success",
                      });
                    })
                    .catch((e) => {
                      const { message } = e as HttpError;
                      if (message === "GENERIC_ERROR") {
                        add({
                          message: t("There was an error"),
                          type: "danger",
                        });
                      } else {
                        add({
                          message: message,
                          type: "danger",
                        });
                      }
                    });
                }}
              >
                {t("Request data")}
              </Button>
            </BSCol>
          </BSGrid>
        </div>
      </CSSGrid>
      <Separator className="aq-mt-3 aq-mb-3" />
      <BSGrid>
        <BSCol size="col-6">
          <Title size="xs" className="aq-mb-2">
            {t("Delete your account")}
            <Text className="aq-mb-3">
              <div>
                <Trans
                  values={{ testerId: `T${user.id}` }}
                  i18nKey="The deletion of your account ({{testerId}}) <bold>will be irreversible</bold>.<br></br><br></br>You will not be able to continue earning money with us. <br></br>Are you sure you want to leave our community?"
                  defaults="The deletion of your account ({{testerId}}) <bold>will be irreversible</bold>.<br></br><br></br>You will not be able to continue earning money with us. <br></br>Are you sure you want to leave our community?"
                  components={{ br: <br />, bold: <strong /> }}
                />
              </div>
            </Text>
            <BSGrid>
              <BSCol size="col-6">
                <Button
                  flat
                  size="block"
                  type="danger"
                  onClick={() => {
                    openDeleteModal();
                  }}
                >
                  {t("Delete account")}
                </Button>
              </BSCol>
            </BSGrid>
          </Title>
        </BSCol>
        <BSCol size="col-6">
          <img className="aq-float-right" src={leaveCrowd} />
        </BSCol>
      </BSGrid>
    </div>
  );
};

export default TabOptions;
