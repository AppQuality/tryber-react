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
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import countries from "i18n-iso-countries";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BirthdayPicker from "src/features/BirthdayPicker";
import CitySelect from "src/features/CitySelect";
import CountrySelect from "src/features/CountrySelect";
import { HalfColumnButton } from "src/features/HalfColumnButton";
import { SkeletonTab } from "src/pages/Profile/SkeletonTab";
import { updateProfile } from "src/redux/user/actions/updateProfile";
import API from "src/utils/api";
import * as yup from "yup";

import { LanguageSelect } from "./LanguageSelect";
import useGenderOptions from "src/features/UseGenderOptions";

const TabBase = () => {
  const { t } = useTranslation();
  const { user, loading } = useSelector(
    (state: GeneralState) => ({
      user: state.user.user,
      loading: state.user.loadingProfile,
    }),
    shallowEqual
  );
  const [languages, setLanguages] = useState<SelectType.Option[]>([]);
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
    name: user?.name || "",
    surname: user?.surname || "",
    gender: user?.gender || "",
    birthDate: user?.birthDate || "",
    phone: user?.phone || "",
    email: user?.email || "",
    country: user?.country || "",
    countryCode: countries.getAlpha2Code(user?.country, "en"),
    city: user?.city || "",
    languages:
      user?.languages?.map((l: any) => ({
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
  const genderOptions = useGenderOptions();

  if (loading) return <SkeletonTab />;

  const initialTouched: { [key: string]: boolean } = {};
  Object.keys(initialUserValues).forEach((k) => {
    initialTouched[k] = true;
  });

  return (
    <Formik
      enableReinitialize
      validationSchema={yup.object(validationSchema)}
      validateOnMount
      initialTouched={initialTouched}
      initialValues={initialUserValues}
      onSubmit={async (values, helpers) => {
        let newLanguages: number[] = [];
        values.languages.forEach((val) => {
          if (typeof val.value === "string") {
            newLanguages.push(parseInt(val.value));
          }
        });
        const profileDataToSend: any = { ...values };
        if (profileDataToSend.email === user?.email) {
          delete profileDataToSend.email;
        }
        dispatch(
          updateProfile(
            {
              profile: profileDataToSend,
              languages: newLanguages,
            },
            t(
              "Your profile doesn't match with your fiscal profile, please check your data"
            ),
            t("Your fiscal profile is now verified"),
            t("Profile data correctly updated."),
            t("We couldn't update your profile. Try again."),
            t("PROFILE_EMAIL_ALREADY_EXISTS", {
              defaultValue: "Email already exists",
            }),
            () => {
              helpers.setSubmitting(false);
              helpers.resetForm({ values });
            }
          )
        );
      }}
    >
      {(formikProps: FormikProps<BaseFields>) => {
        return (
          <Form id="baseProfileForm" className="aq-m-3">
            <CSSGrid gutter="50px" rowGap="0" min="220px">
              <div className="personal-info">
                <Title className="aq-mb-2" size="xs">
                  {t("Personal info")}
                </Title>
                <FormikField name="name">
                  {({
                    field, // { name, value, onChange, onBlur }
                    meta,
                  }: FieldProps) => {
                    return (
                      <FormGroup className="aq-mb-3">
                        <FormLabel htmlFor="name" label={t("First Name")} />
                        <div className="input-group">
                          <Input
                            id="name"
                            type="text"
                            isInvalid={
                              meta.touched && typeof meta.error == "string"
                            }
                            extra={{ ...field }}
                          />
                        </div>
                        <Text small className="aq-mt-1 aq-text-primaryVariant">
                          {t("This field is shared with the fiscal section")}
                        </Text>
                        <ErrorMessage name="name" />
                      </FormGroup>
                    );
                  }}
                </FormikField>
                <FormikField name="surname">
                  {({
                    field, // { name, value, onChange, onBlur }
                    meta,
                  }: FieldProps) => {
                    return (
                      <FormGroup className="aq-mb-3">
                        <FormLabel htmlFor="surname" label={t("Last Name")} />
                        <div className="input-group">
                          <Input
                            id="surname"
                            type="text"
                            isInvalid={
                              meta.touched && typeof meta.error == "string"
                            }
                            extra={{ ...field }}
                          />
                        </div>
                        <Text small className="aq-mt-1 aq-text-primaryVariant">
                          {t("This field is shared with the fiscal section")}
                        </Text>
                        <ErrorMessage name="surname" />
                      </FormGroup>
                    );
                  }}
                </FormikField>
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
                        noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
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
                        <Text small className="aq-mt-1 aq-text-primaryVariant">
                          {t("This field is shared with the fiscal section")}
                        </Text>
                        <ErrorMessage name={field.name} />
                      </FormGroup>
                    );
                  }}
                </FormikField>
                <FormikField name="phone">
                  {({ field, form, meta }: FieldProps) => {
                    return (
                      <FormGroup>
                        <FormLabel
                          htmlFor={field.name}
                          label={t("Phone number")}
                        />
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
                  label={t("COUNTRY:::Profile TabBase")}
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
                    if (!place) {
                      formikProps.setFieldValue("city", "", true);
                      return;
                    }
                    const fields = place.address_components;
                    const city = fields.find(
                      (field) => field.types.indexOf("locality") >= 0
                    );
                    if (!city) {
                      formikProps.setFieldError(
                        "city",
                        t(
                          "We couldn't find a city with that name, please search again"
                        )
                      );
                    } else {
                      formikProps
                        .getFieldProps("city")
                        .onChange(city?.long_name || "");
                      formikProps.setFieldValue(
                        "city",
                        city?.long_name || "",
                        true
                      );
                    }
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
                <CSSGrid min="50%" gutter="0" fill="true">
                  <HalfColumnButton
                    className="aq-mb-3"
                    kind="primary"
                    size="block"
                    type="submit"
                    id="signup-simple"
                    data-qa="submit-base-info-cta"
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
