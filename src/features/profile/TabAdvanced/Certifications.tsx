import {
  Radio,
  Button,
  FormGroup,
  FormikField,
  ErrorMessage,
  Text,
  CSSGrid,
} from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";
import { FieldProps, useFormikContext } from "formik";
import modalStore from "../../../redux/modal";
import { NewCertificationModal } from "./NewCertificationModal";
import { AdvancedFormValues } from "./types";
import { DeleteCertificationsModal } from "./DeleteCertificationsModal";
import API from "../../../utils/api";

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
                open({
                  content: (
                    <DeleteCertificationsModal
                      certifications={values.certifications}
                    />
                  ),
                  title: t("Remove all the Certifications"),
                  footer: (
                    <>
                      {" "}
                      <Button
                        type="primary"
                        htmlType="submit"
                        flat={true}
                        disabled={false}
                      >
                        {t("Keep")}
                      </Button>
                      <Button
                        type="danger"
                        htmlType="submit"
                        flat={true}
                        disabled={false}
                      >
                        {t("Remove")}
                      </Button>
                    </>
                  ),
                });
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
        <>
          {values?.certifications?.map((cert) => (
            <CSSGrid
              gutter="20%"
              rowGap="1rem"
              min="70px"
              className="aq-mb-3"
              // style= "border-top: 1px solid #d1e0e8;"
            >
              <div className="aq-text-primary">
                <Text small aria-disabled={true}>
                  {cert.achievement_date}
                </Text>
                <strong>{cert.name}</strong>
                <strong>{cert.area}</strong>
                <Text>
                  {t("Institute:")} <strong>{cert.institute}</strong>
                </Text>
              </div>
              <div className="remove-certification">
                <Button
                  className="aq-text-danger"
                  type="link"
                  htmlType="button"
                  flat
                  style={{ padding: 0, fontWeight: 400 }}
                  size="sm"
                  onClick={() => {
                    let certifications = [];
                    certifications.push(cert);
                    open({
                      content: (
                        <DeleteCertificationsModal certifications={[cert]} />
                      ),
                      title: t("Remove Certification"),
                      footer: (
                        <>
                          {" "}
                          <Button
                            type="primary"
                            htmlType="submit"
                            flat={true}
                            disabled={false}
                          >
                            {t("Keep")}
                          </Button>
                          <Button
                            type="danger"
                            htmlType="submit"
                            flat={true}
                            disabled={false}
                            onClick={() => {}}
                          >
                            {t("Remove")}
                          </Button>
                        </>
                      ),
                    });
                  }}
                >
                  {t("Remove")}
                </Button>
              </div>
            </CSSGrid>
          ))}

          <Button
            type="success"
            htmlType="submit"
            flat={true}
            disabled={false}
            style={{ padding: 0, fontWeight: 400 }}
            size="sm"
            onClick={() => {
              open({
                content: <NewCertificationModal />,
                title: t("Add Certifications"),
              });
            }}
          >
            {t("Add Certifications")}
          </Button>
        </>
      )}
    </>
  );
};
export default Certifications;
