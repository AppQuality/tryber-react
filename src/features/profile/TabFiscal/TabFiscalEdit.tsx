import {
  Button,
  CSSGrid,
  ErrorMessage,
  FieldProps,
  Form,
  FormGroup,
  Formik,
  FormikField,
  FormLabel,
  Input,
  Select,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SkeletonTab } from "src/features/profile/SkeletonTab";
import { HalfColumnButton } from "src/pages/profile/HalfColumnButton";
import * as yup from "yup";
import { updateFiscalProfile } from "../../../redux/user/actions/updateFiscalProfile";
import FiscalAddress from "./components/FiscalAddress";
import FiscalTypeArea from "./components/FiscalTypeArea";
import { updateProfile } from "src/redux/user/actions/updateProfile";
import BirthdayPicker from "src/features/BirthdayPicker";
import FiscalResidenceModal from "src/features/profile/TabFiscal/components/FiscalResidenceModal";
import modalStore from "src/redux/modal";

export const TabFiscalEdit = ({ setEdit, inputRef }: TabCommonProps) => {
  const { t } = useTranslation();
  const { open } = modalStore();
  const fiscalData = useSelector(
    (state: GeneralState) => state.user.fiscal.data,
    shallowEqual
  );
  const userData = useSelector(
    (state: GeneralState) => state.user.user,
    shallowEqual
  );
  const isProfileLoading = useSelector(
    (state: GeneralState) => state.user.loadingProfile,
    shallowEqual
  );
  const dispatch = useDispatch();

  const initialUserValues: FiscalFormValues = {
    name: userData.name,
    surname: userData.surname,
    gender: fiscalData?.gender || "",
    fiscalId: fiscalData?.fiscalId || "",
    type: fiscalData?.type || "",
    fiscalTypeSelect:
      fiscalData?.type === "non-italian" ? "" : fiscalData?.type,
    birthPlaceCity: fiscalData?.birthPlace?.city,
    birthPlaceId: "",
    birthDate: userData.birthDate,
    birthPlaceProvince: fiscalData?.birthPlace?.province,
    countryCode: fiscalData?.address?.country,
    province: fiscalData?.address?.province,
    city: fiscalData?.address?.city,
    street: fiscalData?.address?.street,
    streetNumber: fiscalData?.address?.streetNumber,
    zipCode: fiscalData?.address?.cityCode,
  };

  const validationSchema = {
    name: yup.string().required(t("This is a required field")),
    surname: yup.string().required(t("This is a required field")),
    gender: yup
      .string()
      .oneOf(["male", "female"])
      .required(t("This is a required field")),
    countryCode: yup.string().required(t("You need to select a country")),
    province: yup.string().required(t("This is a required field")),
    city: yup.string().required(t("You need to select a city")),
    birthDate: yup
      .string()
      .required(t("@@Birth date is required, set it on base tab@@")),
    street: yup.string().required(t("You need to select a street")),
    streetNumber: yup.string().required(t("You need to select a street code")),
    zipCode: yup.string().required(t("You need to select a zip code")),
    fiscalTypeSelect: yup
      .string()
      .oneOf(["withholding", "witholding-extra", "other"])
      .when("countryCode", {
        is: "IT",
        then: yup.string().required(t("This is a required field")),
      }),
    type: yup
      .string()
      .oneOf(["non-italian", "withholding", "witholding-extra", "other"])
      .required(t("This is a required field")),
    birthPlaceCity: yup.string().when("countryCode", {
      is: "IT",
      then: yup.string().required(t("This is a required field")),
    }),
    birthPlaceProvince: yup.string().when("countryCode", {
      is: "IT",
      then: yup.string().when("birthPlaceCity", (birthPlaceCity) => {
        if (yup.string().required().isValidSync(birthPlaceCity)) {
          return yup
            .string()
            .required(
              t(
                "This value is invalid, you need to select a city with a province"
              )
            );
        }
        return yup.string();
      }),
    }),
    fiscalId: yup
      .string()
      .when("countryCode", {
        is: "IT",
        then: yup
          .string()
          .min(16, t("Should be exactly 16 characters"))
          .max(16, t("Should be exactly 16 characters")),
      })
      .required(t("This is a required field")),
  };

  const genderOptions = [
    { value: "male", label: t("Gender option:::Male") },
    { value: "female", label: t("Gender option:::Female") },
  ];

  const initialTouched: { [key: string]: boolean } = {};
  Object.keys(initialUserValues).forEach((k) => {
    initialTouched[k] = true;
  });

  if (isProfileLoading) return <SkeletonTab />;
  return (
    <Formik
      enableReinitialize
      validateOnMount={!!fiscalData}
      initialTouched={!!fiscalData ? initialTouched : {}}
      initialValues={initialUserValues}
      validationSchema={yup.object(validationSchema)}
      onReset={() => {
        setEdit(false);
      }}
      onSubmit={async (values, helpers) => {
        const submitValues = {
          address: {
            country: values.countryCode,
            province: values.province,
            city: values.city,
            street: values.street,
            streetNumber: values.streetNumber,
            cityCode: values.zipCode,
          },
          type: values.type,
          birthPlace: values.birthPlaceId
            ? { placeId: values.birthPlaceId }
            : {
                city: values.birthPlaceCity,
                province: values.birthPlaceProvince,
              },
          fiscalId: values.fiscalId,
          gender: values.gender,
        };
        dispatch(
          updateFiscalProfile(submitValues as UserData, {
            verifiedMessage: (
              <>
                <b>{t("Valid tax profile")}</b>
                <br />
                {t(
                  'You can view your profile summary and make changes if necessary in the "Tax" section of your profile.'
                )}
              </>
            ),
            unverifiedMessage: (
              <>
                <b>{t("Invalid tax profile.")}</b>
                <br />
                {t(
                  "There was an error validating your tax id. Please check your name, surname, date of birth or place of birth"
                )}
              </>
            ),
          })
        );
        dispatch(
          updateProfile(
            {
              profile: {
                name: values.name,
                surname: values.surname,
                birthDate: values.birthDate,
              },
            },
            t(
              "Your profile doesn't match with your fiscal profile, please check your data"
            ),
            t("Your fiscal profile is now verified")
          )
        );
        helpers.setSubmitting(false);
        helpers.resetForm({ values });
      }}
    >
      {({ isValid, isValidating, dirty, values, errors }) => (
        <Form id="fiscalProfileForm">
          <CSSGrid gutter="50px" rowGap="1rem" min="220px">
            <div className="user-info">
              <Title size="xs" className="aq-mb-2">
                {t("Informations")}
              </Title>
              <FormikField name="name">
                {({
                  field, // { name, value, onChange, onBlur }
                  form,
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
                          extra={{ ...field, ref: inputRef }}
                        />
                      </div>
                      <Text small className="aq-mt-1">
                        <span className="aq-text-secondary">
                          {t("This field is shared with the base section")}
                        </span>
                      </Text>
                      <ErrorMessage name="name" />
                    </FormGroup>
                  );
                }}
              </FormikField>
              <FormikField name="surname">
                {({
                  field, // { name, value, onChange, onBlur }
                  form,
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
                      <Text small className="aq-mt-1">
                        <span className="aq-text-secondary">
                          {t("This field is shared with the base section")}
                        </span>
                      </Text>
                      <ErrorMessage name="surname" />
                    </FormGroup>
                  );
                }}
              </FormikField>
              <FormikField name="gender">
                {({
                  field, // { name, value, onChange, onBlur }
                  form,
                }: FieldProps) => {
                  return (
                    <FormGroup>
                      <Select
                        placeholder={t("Select a gender please")}
                        name={field.name}
                        label={t("Gender")}
                        value={{ label: "", value: field.value }}
                        onChange={(v) => {
                          form.setFieldTouched(field.name);
                          if (!v || !v.value) {
                            form.setFieldValue(field.name, "", true);
                            return;
                          }
                          form.setFieldValue(field.name, v.value, true);
                        }}
                        options={genderOptions}
                      />
                      <Text small className="aq-mt-1">
                        <span className="aq-text-secondary">
                          {t(
                            "For tax reasons we are obliged to tie this choice to binary options only"
                          )}
                        </span>
                      </Text>
                      <ErrorMessage name={field.name} />
                    </FormGroup>
                  );
                }}
              </FormikField>
              <FormikField name="birthDate">
                {({
                  field, // { name, value, onChange, onBlur }
                  form,
                }: FieldProps) => {
                  return (
                    <FormGroup className="aq-mb-3">
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
                      <Text small className="aq-mt-1">
                        <span className="aq-text-secondary">
                          {t("This field is shared with the base section")}
                        </span>
                      </Text>
                      <ErrorMessage name="birthDate" />
                    </FormGroup>
                  );
                }}
              </FormikField>
            </div>
            <div className="tax-residence">
              <FiscalAddress />
              <div className="aq-mb-3">
                <Title size="xs" className="aq-mb-2">
                  {t("Additional Informations")}
                </Title>
                <FiscalTypeArea />
              </div>
              <CSSGrid min="40%" fill="true">
                {fiscalData?.fiscalStatus.toLowerCase() === "verified" && (
                  <HalfColumnButton
                    type="primary"
                    htmlType="reset"
                    flat
                    disabled={isValidating}
                  >
                    {t("Cancel")}
                  </HalfColumnButton>
                )}
                <HalfColumnButton
                  type="success"
                  htmlType="submit"
                  flat
                  disabled={!isValid || isValidating || !dirty}
                >
                  {t("Save")}
                </HalfColumnButton>
              </CSSGrid>
              <Text small className="aq-mt-3">
                <span className="aq-text-secondary">
                  {t(
                    "If you have problems filling in your fiscal informations please"
                  )}
                </span>{" "}
                <Button
                  type="link"
                  htmlType="button"
                  className="aq-text-secondary"
                  flat
                  style={{ padding: 0, fontWeight: 400 }}
                  size="sm"
                  onClick={() => {
                    open({
                      content: <FiscalResidenceModal values={values} />,
                    });
                  }}
                >
                  {t("contact us")}
                </Button>
              </Text>
            </div>
          </CSSGrid>
        </Form>
      )}
    </Formik>
  );
};
