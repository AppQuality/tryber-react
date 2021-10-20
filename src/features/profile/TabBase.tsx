import { useTranslation } from "react-i18next";
import {
  Title,
  FormLabel,
  CSSGrid,
  Field,
  Formik,
  Form,
  FieldProps,
  FormGroup,
  ErrorMessage,
  Input,
  FormikField,
  Select,
  DatepickerGlobalStyle,
  SelectType,
  Button,
} from "@appquality/appquality-design-system";
import UserStore from "../../redux/user";
import React, { useEffect, useState } from "react";
import CountrySelect from "../CountrySelect";
import { CitySelect } from "./CitySelect";
import * as yup from "yup";
import BirthdayPicker from "../BirthdayPicker";
import { LanguageSelect } from "./LanguageSelect";
import API from "../../utils/api";

const TabBase = () => {
  const { t } = useTranslation();
  const { user, isProfileLoading, updateProfile } = UserStore();
  const [countryCode, setCountryCode] = useState("");
  const [languages, setLanguages] = useState<SelectType.Option[]>([]);

  useEffect(() => {
    const getLanguages = async () => {
      const results = await API.languages();
      setLanguages(
        results.map((item) => ({ label: item.name, value: item.id.toString() }))
      );
    };
    getLanguages();
  }, []);
  const initialUserValues: BaseFields = {
    name: user.name || "",
    surname: user.surname || "",
    gender: user.gender || "",
    birthDate: user.birthDate || "",
    phone: user.phone || "",
    email: user.email || "",
    country: user.country || "",
    city: user.city || "",
    languages: user.languages || [], // ['Italiano', 'English']
  };
  const validationSchema = {
    name: yup.string().required(t("This is a required field")),
    surname: yup.string().required(t("This is a required field")),
    gender: yup.string().required(t("This is a required field")),
    birthDate: yup.string().required(t("This is a required field")),
    phone: yup.string().required(t("This is a required field")),
    email: yup
      .string()
      .email(t("Email must be a valid email"))
      .required(t("This is a required field")),
    country: yup.string().required(t("This is a required field")),
    city: yup.string().required(t("This is a required field")),
    languages: yup.array().required(t("This is a required field")),
  };
  const genderOptions = [
    { label: "Female", value: "female" },
    { label: "Male", value: "male" },
    { label: "Not Specified", value: "not-specified" },
  ];
  const handleCountryChange = (v: SelectType.Option) => {
    setCountryCode(v.code);
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      initialValues={initialUserValues}
      onSubmit={async (values) => {
        const selectedOptions = languages.filter(
          (option) => values.languages?.indexOf(option.label) >= 0
        );
        console.log(selectedOptions);
        try {
          const res = await updateProfile(values);
          console.log(res);
        } catch (e) {
          console.log(e);
        }
      }}
    >
      <Form id="baseProfileForm" className="aq-m-3">
        <CSSGrid gutter="50px" rowGap="1rem" min="220px">
          <DatepickerGlobalStyle />
          <div className="personal-info">
            <Title size="s">{t("Personal info")}</Title>
            <Field name="name" type="text" label={t("Name")} />
            <Field name="surname" type="text" label={t("Surname")} />
            <FormikField name="gender">
              {({ field, form }: FieldProps) => (
                <FormGroup>
                  <Select
                    options={genderOptions}
                    label={t("Gender")}
                    name={field.name}
                    placeholder={t("Select a gender")}
                    value={genderOptions.filter(
                      (option) => option.value === field.value
                    )}
                    onBlur={() => {
                      form.setFieldTouched(field.name);
                    }}
                    onChange={(v) => {
                      if (v === null) {
                        v = { label: "", value: "" };
                      }
                      field.onChange(v.value);
                      form.setFieldValue(field.name, v.value, true);
                    }}
                  />
                </FormGroup>
              )}
            </FormikField>
            <FormikField name="birthDate">
              {({ field, form }: FieldProps) => {
                return (
                  <FormGroup>
                    <BirthdayPicker
                      name={field.name}
                      initialValue={field.value}
                      onCancel={() => form.setFieldTouched(field.name)}
                      onChange={(v: Date) => {
                        field.onChange(v.toISOString().slice(0, 10));
                        form.setFieldValue(
                          field.name,
                          v.toISOString().slice(0, 10),
                          true
                        );
                      }}
                    />
                    <ErrorMessage name={field.name} />
                  </FormGroup>
                );
              }}
            </FormikField>
            <FormikField name="phone">
              {({ field, form, meta }: FieldProps) => {
                return (
                  <FormGroup>
                    <FormLabel htmlFor={field.name} label="Phone number" />
                    <Input
                      type="tel"
                      id={field.name}
                      isInvalid={meta.touched && !!meta.error}
                      value={field.value}
                      onChange={(v) => {
                        field.onChange(v);
                        form.setFieldValue(field.name, v);
                      }}
                    />
                    <ErrorMessage name={field.name} />
                  </FormGroup>
                );
              }}
            </FormikField>
            <Field name="email" type="email" label={t("Email")} />
          </div>
          <div className="address">
            <Title size="s">{t("Address")}</Title>
            <CountrySelect
              name="country"
              label={t("Country")}
              onChange={handleCountryChange}
            />
            <CitySelect name="city" label={t("Domicile")} />
            <Title size="s">{t("Language")}</Title>
            <LanguageSelect
              name="languages"
              label={t("Spoken languages")}
              options={languages}
            />
            <Button
              className="aq-mb-3"
              style={{ gridColumn: "auto / span 3" }}
              type="success"
              size="block"
              htmlType="submit"
              id="signup-simple"
              flat
            >
              salva
            </Button>
          </div>
        </CSSGrid>
      </Form>
    </Formik>
  );
};

export default TabBase;
