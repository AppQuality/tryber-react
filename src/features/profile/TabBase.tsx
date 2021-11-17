import {
  CSSGrid,
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  FormGroup,
  Formik,
  FormikField,
  FormLabel,
  Input,
  Select,
  SelectType,
  Title,
} from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import countries from "i18n-iso-countries";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import CitySelect from "src/features/profile/CitySelect";
import { HalfColumnButton } from "src/pages/profile/HalfColumnButton";
import * as yup from "yup";
import siteWideMessages from "../../redux/siteWideMessages";
import UserStore from "../../redux/user";
import { updateProfile } from "../../redux/user/actions/updateProfile";
import API from "../../utils/api";
import BirthdayPicker from "../BirthdayPicker";
import CountrySelect from "../CountrySelect";
import { LanguageSelect } from "./LanguageSelect";
import { BaseFields } from "./types.d";

const TabBase = () => {
  const { t } = useTranslation();
  const { user, isProfileLoading } = UserStore();
  const [languages, setLanguages] = useState<SelectType.Option[]>([]);
  const { add } = siteWideMessages();
  const dispatch = useDispatch();

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
    countryCode: countries.getAlpha2Code(user.country, "en"),
    city: user.city || "",
    languages:
      user.languages?.map((l: any) => ({
        label: l.name,
        value: l.id.toString(),
      })) || [],
  };
  const validationSchema = {
    name: yup.string().required(t("This is a required field")),
    surname: yup.string().required(t("This is a required field")),
    gender: yup.string(),
    birthDate: yup.string().required(t("This is a required field")),
    phone: yup
      .string()
      .matches(
        /^\+?((\d\-|\d)+\d){4,20}$/gi,
        t(
          "This is an invalid format. Should be formatted as +11000000000 or 0011000000000"
        )
      ),
    email: yup
      .string()
      .email(t("Email must be a valid email"))
      .required(t("This is a required field")),
    country: yup.string().required(t("This is a required field")),
    countryCode: yup.string(),
    city: yup.string(),
    languages: yup.array(),
  };
  const genderOptions = [
    { label: "Female", value: "female" },
    { label: "Male", value: "male" },
    { label: "Not Specified", value: "not-specified" },
  ];

  return (
    <Formik
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      initialValues={initialUserValues}
      onSubmit={async (values, helpers) => {
        try {
          let newLanguages: number[] = [];
          values.languages.forEach((val) => {
            if (typeof val.value === "string") {
              newLanguages.push(parseInt(val.value));
            }
          });
          const resLang = await API.myLanguages(newLanguages);
          const profileDataToSend: any = { ...values };
          dispatch(
            updateProfile(
              profileDataToSend,
              t(
                "Your profile doesn't match with your fiscal profile, please check your data"
              ),
              t("Your fiscal profile is now verified")
            )
          );
          add({
            message: t("Profile data correctly updated."),
            type: "success",
          });
          helpers.setSubmitting(false);
          helpers.resetForm({ values });
        } catch (e) {
          console.log(e);
          add({
            message: t("We couldn't update your profile. Try again."),
            type: "warning",
          });
        }
      }}
    >
      {(formikProps: FormikProps<BaseFields>) => {
        return (
          <Form id="baseProfileForm" className="aq-m-3">
            <CSSGrid gutter="50px" rowGap="1rem" min="220px">
              <div className="personal-info">
                <Title className="aq-mb-2" size="xs">
                  {t("Personal info")}
                </Title>
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
                            v = { label: "", value: "not-specified" };
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
                <Title className="aq-mb-2" size="xs">
                  {t("Address")}
                </Title>
                <CountrySelect
                  name="country"
                  label={t("Country")}
                  onChange={(v: SelectType.Option) => {
                    formikProps.setFieldValue("city", "");
                    formikProps.setFieldTouched("city");
                    formikProps.setFieldValue("countryCode", v.code);
                  }}
                />
                <CitySelect
                  name="city"
                  label={t("Domicile")}
                  onBlur={() => {
                    formikProps.setFieldTouched("city");
                  }}
                  countryRestrictions={formikProps.values.countryCode}
                  onChange={(place) => {
                    const fields = place.address_components;
                    const city = fields.find(
                      (field) => field.types.indexOf("locality") >= 0
                    );
                    formikProps
                      .getFieldProps("city")
                      .onChange(city?.long_name || "");
                    formikProps.setFieldValue(
                      "city",
                      city?.long_name || "",
                      true
                    );
                  }}
                />
                <ErrorMessage name="city" />

                <Title className="aq-mb-2 aq-mt-3" size="xs">
                  {t("Language")}
                </Title>
                <LanguageSelect
                  name="languages"
                  label={t("Spoken languages")}
                  options={languages}
                />
                <CSSGrid min="50%" gutter="0" fill={true}>
                  <HalfColumnButton
                    className="aq-mb-3"
                    type="success"
                    size="block"
                    htmlType="submit"
                    id="signup-simple"
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
        );
      }}
    </Formik>
  );
};

export default TabBase;
