import { useTranslation } from "react-i18next";
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
import modalStore from "../../redux/modal";
import siteWideMessageStore from "../../redux/siteWideMessages";
import leaveCrowd from "./assets/leave-crowd.png";
import styled from "styled-components";
import WPAPI from "../../utils/wpapi";
import * as yup from "yup";
import { useState } from "react";

const Separator = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${(props) => props.theme.colors.disabledElement};
  margin: 1em 0;
  padding: 0;
`;

const TabOptions = () => {
  const { t } = useTranslation();
  const { user, isProfileLoading, deleteUser, updateDeletionReason } =
    UserStore();
  const { open } = modalStore();
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
            validationSchema={yup.object().shape({
              currentPassword: yup.string().required(),
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
                .required()
                .when("newPassword", (newPassword, schema) => {
                  return schema.test({
                    test: (newPasswordConfirm: string) =>
                      newPassword === newPasswordConfirm,
                    message: t("Password confirmation doesn't match"),
                  });
                }),
            })}
            onSubmit={(values) => {
              console.log(values);
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
                    type="text"
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
                  <Button
                    as="a"
                    type="link"
                    target="_blank"
                    href="/wp-login.php?action=lostpassword"
                  >
                    {t("Request a new password")}
                  </Button>
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
                  WPAPI.requestUserData()
                    .then(() => {
                      add({
                        message: t("We couldn't retrieve your data"),
                        type: "success",
                      });
                    })
                    .catch((e) => {
                      const { message } = e as HttpError;
                      if (message === "FAILED_REQUEST") {
                        add({
                          message: t("We couldn't retrieve your data"),
                          type: "danger",
                        });
                      } else {
                        add({
                          message: t("There was an error"),
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
                The deletion of your account (T14999){" "}
                <b>will be irreversible</b>.
                <br />
                <br />
                You will not be able to continue earning money with us. <br />
                Are you sure you want to leave our community?
              </div>
            </Text>
            <BSGrid>
              <BSCol size="col-6">
                <Button
                  flat
                  size="block"
                  type="danger"
                  onClick={() => {
                    open({
                      content: (
                        <div>
                          <Input
                            id="deletionReason"
                            type="text"
                            onChange={(v) => updateDeletionReason(v)}
                          />
                        </div>
                      ),
                      footer: <p onClick={() => deleteUser()}>Submit</p>,
                    });
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
