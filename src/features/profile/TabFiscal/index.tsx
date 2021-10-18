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
  Input,
} from "@appquality/appquality-design-system";
import Select from "react-select/base";
import { useState, useEffect } from "react";
import UserStore from "../../../redux/user";
import TabFiscalShow from "./TabFiscalShow";
import FiscalAddress from "./FiscalAddress";

const TabFiscal = ({ ref }: { ref?: React.RefObject<HTMLDivElement> }) => {
  const { t } = useTranslation();
  const { user, isProfileLoading, isLoading } = UserStore();
  const [isEdit, setIsEdit] = useState(true);
  const [isFiscalProfileIt, setIsFiscalProfileIt] = useState<boolean | null>(
    null
  );
  useEffect(() => {
    if (user.fiscal) {
      setIsEdit(false);
      if (user.fiscal.type === "non-italian") {
        setIsFiscalProfileIt(false);
      } else {
        setIsFiscalProfileIt(true);
      }
    }
  }, [isProfileLoading]);
  const initialUserValues = {
    name: user.name || "",
    surname: user.surname || "",
  };

  if (!isEdit) {
    return (
      <div className="aq-p-3">
        <TabFiscalShow setEdit={() => setIsEdit(true)} />
      </div>
    );
  }

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
              <Title size="xs" className="aq-mb-2">
                {t("Informations")}
              </Title>
              <div className="aq-mb-3">
                <FormLabel htmlFor="name" label={t("Name")} isDisabled />
                <Input id="name" type="text" disabled value={user.name} />
              </div>
              <div className="aq-mb-3">
                <FormLabel htmlFor="surname" label={t("Surname")} isDisabled />
                <Input id="surname" type="text" disabled value={user.surname} />
              </div>
              <div className="aq-mb-3">
                <FormLabel htmlFor="gender" label={t("Gender")} />
                <Select></Select>
                <Text small className="aq-mt-1">
                  For tax reasons we are obliged to tie this choice to binary
                  options only
                </Text>
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
              <div className="aq-mb-3">
                <Radio
                  name="fiscaltype"
                  checked={isFiscalProfileIt === true}
                  id="italian"
                  label={t("Italian")}
                  onChange={() => setIsFiscalProfileIt(true)}
                />
                <Radio
                  name="fiscaltype"
                  checked={isFiscalProfileIt === false}
                  id="notItalian"
                  label={t("Not italian")}
                  onChange={() => setIsFiscalProfileIt(false)}
                />
              </div>
              {isFiscalProfileIt === true ? (
                <>
                  <div className="aq-mb-3">
                    <FormLabel htmlFor="fiscalType" label={t("Fiscal Type")} />
                    <Select />
                  </div>
                  <div className="aq-mb-3">
                    <FormLabel htmlFor="fiscalId" label={t("Fiscal ID")} />
                    <Input id="fiscalId" type="text" />
                    <Text small className="aq-mt-1">
                      Any change to your personal data will lead to the
                      recalculation of your tax code
                    </Text>
                  </div>
                  <div className="aq-mb-3">
                    <FormLabel htmlFor="birthCity" label={t("Birth City")} />
                    <Select />
                  </div>
                  <div className="aq-mb-3">
                    <FiscalAddress address={user?.fiscal?.address} />
                  </div>
                </>
              ) : isFiscalProfileIt === false ? (
                <>
                  <div className="aq-mb-3">
                    <FormLabel htmlFor="fiscalId" label={t("Fiscal ID")} />
                    <Input id="fiscalId" type="text" />
                  </div>
                  <div className="aq-mb-3">
                    <FiscalAddress address={user?.fiscal?.address} />
                  </div>
                </>
              ) : null}
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
