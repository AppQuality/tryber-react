import {
  Button,
  BSGrid,
  BSCol,
  FormLabel,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const FiscalAddress = ({
  address,
}: {
  address?: {
    street: string;
    cityCode: string;
    city: string;
    province: string;
    country: string;
  };
}) => {
  const { t } = useTranslation();
  return (
    <>
      <FormLabel htmlFor="fiscalAddress" label={t("Fiscal Address")} />
      {address ? (
        <Text>
          <p>{address.street}</p>
          <p>{`${address.cityCode} ${address.city} (${address.province})`}</p>
          <p>{address.country}</p>
        </Text>
      ) : null}
      <BSGrid>
        <BSCol size="col-6">
          <Button size="block" type="primary" htmlType="button" flat={true}>
            {t("Add")}
          </Button>
        </BSCol>
      </BSGrid>
    </>
  );
};
export default FiscalAddress;
