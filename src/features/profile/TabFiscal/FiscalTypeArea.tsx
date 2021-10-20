import { useFormikContext, Field as FormikField, FieldProps } from "formik";
import {
  Radio,
  FormGroup,
  Select,
  FormLabel,
  Input,
  Text,
  Field,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { ChangeEvent } from "react";
import UserStore from "../../../redux/user";

const FiscalTypeArea = () => {
  const { values }: { values: { fiscalTypeRadio: string } } =
    useFormikContext();
  const { user } = UserStore();
  const { t } = useTranslation();
  return (
    <>
      <div className="aq-mb-3">
        <FormikField name="fiscalTypeRadio">
          {({
            field, // { name, value, onChange, onBlur }
            form,
          }: FieldProps) => {
            return (
              <>
                <Radio
                  name={field.name}
                  checked={field.value === "italian"}
                  id="italian"
                  label={t("Italian")}
                  onChange={() =>
                    form.setFieldValue(field.name, "italian", true)
                  }
                />
                <Radio
                  name={field.name}
                  checked={field.value === "non-italian"}
                  id="notItalian"
                  label={t("Not italian")}
                  onChange={() =>
                    form.setFieldValue(field.name, "non-italian", true)
                  }
                />
              </>
            );
          }}
        </FormikField>
      </div>

      {values.fiscalTypeRadio === "italian" ? (
        <>
          <div className="aq-mb-3">
            <FormikField name="fiscalTypeSelect">
              {({
                field, // { name, value, onChange, onBlur }
                form,
              }: FieldProps) => {
                return (
                  <FormGroup>
                    <Select
                      name={field.name}
                      label={t("Fiscal Type")}
                      value={
                        field.value
                          ? { value: field.value, label: "" }
                          : { value: "", label: "" }
                      }
                      onBlur={(e: ChangeEvent) => {
                        form.setFieldTouched(field.name);
                      }}
                      onChange={(v) => {
                        if (v == null) {
                          v = { label: "", value: "" };
                        }
                        field.onChange(v.value);
                        form.setFieldValue(field.name, v.value, true);
                      }}
                      options={[
                        {
                          value: "witholding",
                          label: t("witholding < 5000"),
                        },
                        {
                          value: "witholding-extra",
                          label: t("witholding > 5000"),
                        },
                        {
                          value: "other",
                          label: t("not compatible fiscal type"),
                        },
                      ]}
                    />
                  </FormGroup>
                );
              }}
            </FormikField>
          </div>
          <div className="aq-mb-3">
            <FormikField name="fiscalId">
              {({
                field, // { name, value, onChange, onBlur }
                form,
              }: FieldProps) => {
                return (
                  <>
                    <FormLabel htmlFor={field.name} label={t("Fiscal ID")} />
                    <Input
                      id={field.name}
                      type="text"
                      value={field.value}
                      onChange={(v) => {
                        field.onChange(v);
                        form.setFieldValue(field.name, v, true);
                      }}
                    />
                    <Text small className="aq-mt-1">
                      Any change to your personal data will lead to the
                      recalculation of your tax code
                    </Text>
                  </>
                );
              }}
            </FormikField>
          </div>
        </>
      ) : values.fiscalTypeRadio === "non-italian" ? (
        <div className="aq-mb-3">
          <Field name="fiscalId" label={t("Fiscal ID")} />
        </div>
      ) : null}
    </>
  );
};

export default FiscalTypeArea;
