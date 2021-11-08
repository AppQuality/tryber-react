import {
  CSSGrid,
  BSGrid,
  BSCol,
  Title,
  icons,
  Text,
  Button,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { Icon } from "react-bootstrap-icons";
import UserStore from "../../../redux/user";

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
        <Text className="aq-text-secondary">
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
  const { user, isProfileLoading } = UserStore();
  const handleEditClick = () => {
    setEdit(true);
  };
  return (
    <CSSGrid gutter="50px" rowGap="0" min="220px">
      <div>
        <Title size="xs" className="aq-mb-3">
          {t("Your fiscal data")}
        </Title>
        <ShowItem Icon={Person} label={t("Name")}>
          {user.name}
        </ShowItem>
        <ShowItem Icon={Person} label={t("Surname")}>
          {user.surname}
        </ShowItem>
        <ShowItem Icon={GenderAmbiguous} label={t("Gender")}>
          {user.fiscal.gender === "male"
            ? t("Male")
            : user.fiscal.gender === "female"
            ? t("Female")
            : t("Not specified")}
        </ShowItem>
        <ShowItem Icon={Calendar2Date} label={t("Birth Date")}>
          {user.birthDate}
        </ShowItem>
      </div>
      <div>
        <ShowItem Icon={CashCoin} label={t("Fiscal Type")}>
          {user.fiscal.type === "witholding"
            ? t(`Annual witholding < 5000€`)
            : user.fiscal.type === "witholding-extra"
            ? t("Annual witholding > 5000")
            : user.fiscal.type == "non-italian"
            ? t("Foreign")
            : t("Different rate scheme")}
        </ShowItem>
        <ShowItem Icon={CreditCard2Front} label={t("Fiscal Code")}>
          {user.fiscal.fiscalId}
        </ShowItem>
        <ShowItem Icon={Building} label={t("Birth city")}>
          {user.fiscal.birthPlace.city}
        </ShowItem>
        <ShowItem Icon={Compass} label={t("Fiscal residence")}>
          <p>{user.fiscal.address.street}</p>
          <p>{`${user.fiscal.address.cityCode} ${user.fiscal.address.city} (${user.fiscal.address.province})`}</p>
          <p>{user.fiscal.address.country}</p>
        </ShowItem>

        <BSGrid>
          <BSCol size="col-6">
            <Button size="block" type="primary" flat onClick={handleEditClick}>
              {t("Edit")}
            </Button>
          </BSCol>
        </BSGrid>
      </div>
    </CSSGrid>
  );
};
