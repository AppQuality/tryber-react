import {
  Radio,
  Button,
  FormGroup,
  FormikField,
  ErrorMessage,
  Text,
  aqBootstrapTheme,
  CSSGrid,
} from "@appquality/appquality-design-system";
import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { FieldProps, useFormikContext } from "formik";
import modalStore from "src/redux/modal";
import {
  NewCertificationModal,
  NewCertificationModalFooter,
} from "./NewCertificationModal";
import { AdvancedFormValues } from "./types";
import {
  DeleteCertificationsModal,
  DeleteCertificationsModalFooter,
} from "./DeleteCertificationsModal";
import { useSelector, shallowEqual } from "react-redux";
import { components } from "src/utils/schema";
import { HalfColumnButton } from "src/pages/profile/HalfColumnButton";

const Certifications = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext<AdvancedFormValues>();
  const { open } = modalStore();

  const userCertifications: components["schemas"]["Certification"][] =
    useSelector(
      (state: GeneralState) => state.user.user?.certifications || [],
      shallowEqual
    );

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
              onChange={(v: string, e?: ChangeEvent<HTMLInputElement>) => {
                e?.preventDefault();
                if (v === "false") {
                  form.setFieldValue(field.name, "true");
                }
                open({
                  content: (
                    <DeleteCertificationsModal
                      certifications={userCertifications}
                    />
                  ),
                  title: t("Remove all the Certifications"),
                  footer: (
                    <DeleteCertificationsModalFooter
                      onSubmit={() => {
                        e?.target?.click();
                        form.setFieldTouched(field.name);
                        form.setFieldValue(field.name, v);
                      }}
                      onClose={() => {
                        form.setFieldValue(field.name, "true");
                      }}
                    />
                  ),
                  size: "small",
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
          {userCertifications.map((cert) => (
            <CSSGrid
              rowGap="1rem"
              min="70px"
              className="aq-mb-3 aq-pt-3"
              style={{
                borderTop: `1px solid ${aqBootstrapTheme.colors.disabled}`,
              }}
            >
              <div className="aq-text-primary" style={{ gridColumn: "span 3" }}>
                <Text small aria-disabled={true}>
                  {cert.achievement_date}
                </Text>
                <strong>{cert.name}</strong>
                <strong>{cert.area}</strong>
                <Text>
                  {t("Institute:")} <strong>{cert.institute}</strong>
                </Text>
              </div>
              <div className="remove-certification aq-text-right">
                <Button
                  className="aq-text-danger"
                  type="link"
                  htmlType="button"
                  flat
                  size="sm"
                  onClick={() => {
                    open({
                      content: (
                        <DeleteCertificationsModal certifications={[cert]} />
                      ),
                      title: t("Remove Certification"),
                      footer: (
                        <DeleteCertificationsModalFooter certification={cert} />
                      ),
                      size: "small",
                    });
                  }}
                >
                  {t("Remove")}
                </Button>
              </div>
            </CSSGrid>
          ))}
          {values.certificationsRadio === "true" && (
            <CSSGrid min="50%" gutter="0" fill={true}>
              <HalfColumnButton
                type="primary"
                htmlType="submit"
                flat={true}
                disabled={false}
                onClick={() => {
                  open({
                    content: <NewCertificationModal />,
                    title: t("Add Certifications"),
                    footer: <NewCertificationModalFooter />,
                  });
                }}
              >
                {t("Add Certifications")}
              </HalfColumnButton>
            </CSSGrid>
          )}
        </>
      )}
    </>
  );
};
export default Certifications;
