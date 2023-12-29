import {
  BSCol,
  BSGrid,
  Button,
  CSSGrid,
  icons,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { Icon } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import dateFormatter from "../../../utils/dateFormatter";

const ShowItem = ({
  Icon,
  label,
  children,
}: {
  Icon: Icon;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div style={{ width: "100%", float: "left" }} className="aq-mb-3">
      <div className="aq-float-left aq-mr-2">
        <Icon size="21" className="aq-text-secondary" />
      </div>
      <div className="aq-float-left">
        <Text className="aq-text-primaryVariant">
          <b>{label}</b>
        </Text>
        <Text className="aq-text-primary">{children}</Text>
      </div>
    </div>
  );
};

export const TabFiscalShow = ({ setEdit }: TabCommonProps) => {
  const { t } = useTranslation();
  const {
    Person,
    GenderAmbiguous,
    Calendar2Date,
    CashCoin,
    CreditCard2Front,
    Building,
    Compass,
  } = icons;
  const userData = useSelector(
    (state: GeneralState) => state.user.user,
    shallowEqual
  );
  const fiscalData = useSelector(
    (state: GeneralState) => state.user.fiscal.data,
    shallowEqual
  );
  const handleEditClick = () => {
    setEdit(true);
  };
  return (
    <CSSGrid gutter="50px" rowGap="0" min="220px">
      <div data-qa="fiscal-data-show">
        <Title size="xs" className="aq-mb-3">
          {t("Your fiscal data")}
        </Title>
        <ShowItem Icon={Person} label={t("Name")}>
          {userData.name}
        </ShowItem>
        <ShowItem Icon={Person} label={t("Surname")}>
          {userData.surname}
        </ShowItem>
        <ShowItem Icon={GenderAmbiguous} label={t("Gender")}>
          {fiscalData?.gender === "male"
            ? t("Male")
            : fiscalData?.gender === "female"
            ? t("Female")
            : t("Not specified")}
        </ShowItem>
        <ShowItem Icon={Calendar2Date} label={t("Birth Date")}>
          {dateFormatter(userData.birthDate)}
        </ShowItem>
      </div>
      <div data-qa="fiscal-data-show">
        <ShowItem Icon={CashCoin} label={t("Fiscal Type")}>
          {fiscalData?.type === "withholding"
            ? t(`Fiscal types:::Witholding < 5000€`)
            : fiscalData?.type === "witholding-extra"
            ? t("Fiscal types:::Witholding > 5000€")
            : fiscalData?.type === "non-italian"
            ? t("Fiscal types:::Foreign")
            : fiscalData?.type === "internal"
            ? t("Fiscal types:::Internal employee")
            : fiscalData?.type === "vat"
            ? t("Fiscal types:::VAT")
            : fiscalData?.type === "company"
            ? t("Fiscal types:::Company")
            : t("Different rate scheme")}
        </ShowItem>
        <ShowItem
          Icon={CreditCard2Front}
          label={t("Tax identification number:::Tax ID")}
        >
          {fiscalData?.fiscalId}
        </ShowItem>
        {fiscalData?.type !== "non-italian" && (
          <ShowItem Icon={Building} label={t("Birth city")}>
            {fiscalData?.birthPlace.city}
          </ShowItem>
        )}
        <ShowItem Icon={Compass} label={t("Fiscal residence")}>
          <p>
            {fiscalData?.address.street} {fiscalData?.address?.streetNumber}
          </p>
          <p>{`${fiscalData?.address.cityCode} ${fiscalData?.address.city} (${fiscalData?.address.province})`}</p>
          <p>{fiscalData?.address.country}</p>
        </ShowItem>

        <BSGrid>
          <BSCol size="col-6">
            <Button
              data-qa="edit-fiscal-data-cta"
              size="block"
              kind="primary"
              flat
              onClick={handleEditClick}
              disabled={fiscalData?.type === "internal"}
            >
              {t("Edit")}
            </Button>
          </BSCol>
        </BSGrid>
      </div>
    </CSSGrid>
  );
};
