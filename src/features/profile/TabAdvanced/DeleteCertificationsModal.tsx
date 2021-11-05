import {
  Form,
  FormGroup,
  Formik,
  FormikField,
  Text,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import { UserCertification } from "../types";
import { useTranslation } from "react-i18next";
import React from "react";

export const DeleteCertificationsModal = ({
  certifications,
}: {
  certifications: UserCertification[];
}) => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ institute: "", area: "", certificationId: "" }}
      onSubmit={(values) => {
        console.log(values);
        console.log(certifications);
      }}
    >
      <Form>
        <FormikField name={"area"}>
          {({ field, form }: FieldProps) => (
            <FormGroup>
              {certifications.length > 1 ? (
                <Text>
                  {t(
                    "Do you want to remove all certification? This is an irreversible action."
                  )}
                </Text>
              ) : (
                <div>
                  <Text>
                    {t(
                      "Do you want to remove this certification? This is a irreversible action."
                    )}
                  </Text>
                  <Text small aria-disabled={true}>
                    {certifications[0].achievement_date}
                  </Text>
                  <Text>
                    {t("Institute:")}{" "}
                    <strong>{certifications[0].institute}</strong>
                  </Text>
                  <strong>{certifications[0].name}</strong>
                  <strong>{certifications[0].area}</strong>
                </div>
              )}
            </FormGroup>
          )}
        </FormikField>
      </Form>
    </Formik>
  );
};
