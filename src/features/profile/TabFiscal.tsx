import { useTranslation } from "react-i18next";
import {
  Button,
  CSSGrid,
  Field,
  Form,
  Formik,
  FormLabel,
  Radio,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import Select from "react-select/base";
import React from "react";
import UserStore from "../../redux/user";

const TabFiscal = ({ ref }: { ref?: React.RefObject<HTMLDivElement> }) => {
  const { t } = useTranslation();
  const { user, isProfileLoading } = UserStore();
  const initialUserValues = {
    name: user.name || "",
    surname: user.surname || "",
  };

  return (
    <div ref={ref}>
      <Formik
        initialValues={initialUserValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form id="baseProfileForm" className="aq-m-3">
          <CSSGrid gutter="50px" rowGap="1rem" min="220px">
            <div className="user-info">
              <Title size="s">{t("Informations")}</Title>
              <Field
                name="name"
                type="text"
                label={t("Name")}
                disabled={true}
              />
              <Field
                name="surname"
                type="text"
                label={t("Surname")}
                disabled={true}
              />
              <FormLabel htmlFor="gender" label={t("Gender")} />
              <Select></Select>
              <Text>
                For tax reasons we are obliged to tie this choice to binary
                options only
              </Text>
              <Field name="birthday" type="text" label={t("Birth Date")} />
            </div>

            <div className="tax-residence">
              <Title size="s">{t("Tax residence")}</Title>
              {/*<Radio id="italian" label={t("Italian")}></Radio>*/}
              {/*<Radio id="notItalian" label={t("Not italian")}></Radio>*/}
              <Field name="fiscalId" type="text" label={t("Fiscal ID")} />
              <Text>
                Any change to your personal data will lead to the recalculation
                of your tax code
              </Text>
              <FormLabel htmlFor="fiscalAddress" label={t("Fiscal Address")} />
              <Button type="primary" htmlType="button" flat={true}>
                {t("Add")}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                flat={true}
                disabled={true}
              >
                {t("Save")}
              </Button>
            </div>
          </CSSGrid>
        </Form>
      </Formik>
    </div>
  );
};

export default TabFiscal;
