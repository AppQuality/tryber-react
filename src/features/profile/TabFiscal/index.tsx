import { useTranslation } from "react-i18next";
import {
  Button,
  CSSGrid,
  Form,
  Formik,
  FormikField,
  FormLabel,
  FieldProps,
  FormGroup,
  ErrorMessage,
  Radio,
  Text,
  Title,
  Input,
  Select,
  Modal,
} from "@appquality/appquality-design-system";
import { useState, useEffect } from "react";
import UserStore from "../../../redux/user";
import TabFiscalShow from "./TabFiscalShow";
import FiscalTypeArea from "./FiscalTypeArea";
import { ChangeEvent } from "react";
import FiscalAddress from "./FiscalAddress";
import residenceModalStore from "../../../redux/addResidenceAddressModal";

const TabFiscal = ({ ref }: { ref?: React.RefObject<HTMLDivElement> }) => {
  const { t } = useTranslation();
  const { user, isProfileLoading, isLoading } = UserStore();
  const { address } = residenceModalStore();
  const [isEdit, setIsEdit] = useState(true);
  useEffect(() => {
    if (user.fiscal) {
      // setIsEdit(false);
    }
  }, [isProfileLoading]);
  const initialUserValues = {
    name: user.name || "",
    surname: user.surname || "",
    fiscalId: user?.fiscal?.fiscalId || "",
    fiscalTypeSelect: user?.fiscal?.type || "",
    fiscalTypeRadio:
      user?.fiscal?.type === "non-italian"
        ? "non-italian"
        : ["witholding", "witholding-extra", "other"].includes(
            user?.fiscal?.type
          )
        ? "italian"
        : "",
    address: {
      ...user?.fiscal?.address,
      street: address.street ? address.street : user?.fiscal?.address.street,
    },
  };

  if (!isEdit) {
    return (
      <div className="aq-p-3">
        <TabFiscalShow setEdit={() => setIsEdit(true)} />
      </div>
    );
  }
  return (
    <>
      <div ref={ref}>
        <Formik
          enableReinitialize
          initialValues={initialUserValues}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form id="baseProfileForm" className="aq-m-3">
            <CSSGrid gutter="50px" rowGap="1rem" min="220px">
              <div className="user-info">
                <Title size="xs" className="aq-mb-2">
                  {t("Informations")}
                </Title>
                <div className="aq-mb-3">
                  <FormLabel htmlFor="name" label={t("Name")} isDisabled />
                  <Input id="name" type="text" disabled value={user.name} />
                </div>
                <div className="aq-mb-3">
                  <FormLabel
                    htmlFor="surname"
                    label={t("Surname")}
                    isDisabled
                  />
                  <Input
                    id="surname"
                    type="text"
                    disabled
                    value={user.surname}
                  />
                </div>
                <div className="aq-mb-3">
                  <FormikField name="gender">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form,
                    }: FieldProps) => {
                      return (
                        <FormGroup>
                          <Select
                            name={"gender"}
                            label={t("Gender")}
                            value={
                              user?.fiscal?.gender
                                ? { value: user.fiscal.gender, label: "" }
                                : { value: "", label: "" }
                            }
                            onBlur={(e: ChangeEvent) => {
                              form.setFieldTouched("gender");
                            }}
                            onChange={(v) => {
                              if (v == null) {
                                v = { label: "", value: "" };
                              }
                              field.onChange(v.value);
                              form.setFieldValue("gender", v.value, true);
                            }}
                            options={[
                              { value: "male", label: t("Male") },
                              { value: "female", label: t("Female") },
                            ]}
                          />
                          <Text small className="aq-mt-1">
                            For tax reasons we are obliged to tie this choice to
                            binary options only
                          </Text>
                          <ErrorMessage name={"gender"} />
                        </FormGroup>
                      );
                    }}
                  </FormikField>
                </div>
                <div className="aq-mb-3">
                  <FormLabel
                    htmlFor="birth_date"
                    label={t("Birth Date")}
                    isDisabled
                  />
                  <Input
                    id="birth_date"
                    type="text"
                    disabled
                    value={user.birthDate}
                  />
                </div>
              </div>

              <div className="tax-residence">
                <Title size="xs" className="aq-mb-2">
                  {t("Tax residence")}
                </Title>
                <FiscalTypeArea />
                <div className="aq-mb-3">
                  <FiscalAddress />
                </div>
                <Button type="primary" htmlType="submit" flat={true}>
                  {t("Save")}
                </Button>
              </div>
            </CSSGrid>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default TabFiscal;
