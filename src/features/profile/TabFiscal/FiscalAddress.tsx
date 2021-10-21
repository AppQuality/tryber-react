import {
  Button,
  BSGrid,
  BSCol,
  FormLabel,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import residenceModalStore from "../../../redux/addResidenceAddressModal";
import { useFormikContext } from "formik";

const FiscalAddress = () => {
  const { t } = useTranslation();
  const { values }: any = useFormikContext();
  const { open: openModal, address } = residenceModalStore();

  const currentAddress = {
    street: address.street ? address.street : values.address.street,
    country: address.country ? address.country : values.address.country,
  };

  return (
    <>
      <div className="aq-mb-3">
        <FormLabel htmlFor="fiscalAddress" label={t("Fiscal Address")} />
        {values.address ? (
          <Text>
            <p>{currentAddress.street}</p>
            <p>{`${values.address.cityCode} ${values.address.city} (${values.address.province})`}</p>
            <p>{currentAddress.country}</p>
          </Text>
        ) : null}
      </div>
      <BSGrid>
        <BSCol size="col-6">
          <Button
            size="block"
            type="primary"
            htmlType="button"
            flat={true}
            onClick={openModal}
          >
            {t("Add")}
          </Button>
        </BSCol>
      </BSGrid>
    </>
  );
};
export default FiscalAddress;
