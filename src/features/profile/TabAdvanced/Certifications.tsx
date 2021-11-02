import {
  Radio,
  Button,
  FormGroup,
  FormikField,
  ErrorMessage,
} from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";
import { FieldProps, useFormikContext } from "formik";
import modalStore from "../../../redux/modal";
import { NewCertificationModal } from "./NewCertificationModal";

const Certifications = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext<AdvancedFormValues>();
  const { open } = modalStore();
  return (
    <>
      <FormikField name="certificationsRadio">
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: FieldProps) => (
          <FormGroup>
            <Radio
              value="false"
              name={field.name}
              checked={field.value === "false"}
              id="certificationFalse"
              label={t("I have no certifications")}
              onChange={(v) => {
                form.setFieldTouched(field.name);
                form.setFieldValue(field.name, v);
              }}
            />
            <Radio
              value="true"
              name={field.name}
              checked={field.value === "true"}
              id="certificationTrue"
              label={t("I have the certifications")}
              onChange={(v) => {
                form.setFieldTouched(field.name);
                form.setFieldValue(field.name, v);
              }}
            />
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>
      {values.certificationsRadio && (
        <Button
          type="link"
          htmlType="button"
          flat
          style={{ padding: 0, fontWeight: 400 }}
          size="sm"
          onClick={() => {
            open({
              content: <NewCertificationModal />,
              title: t("Add Certifications"),
            });
          }}
        >
          {t("Add")}
        </Button>
      )}
    </>
  );
};
export default Certifications;
