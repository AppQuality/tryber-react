import { useFormikContext } from "formik";
import { Laptop, Phone, Tablet, Tv } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export default () => {
  const { values } = useFormikContext<DeviceFormInterface>();
  const { t } = useTranslation();
  const getIcon = () => {
    switch (values.device_type) {
      case 0:
        return <Phone />;
      case 1:
        return <Tablet />;
      case 2:
        return <Laptop />;
      case 5:
        return <Tv />;
      default:
        return "";
    }
  };
  return (
    <RecapBurrito>
      <div>{getIcon()}</div>
      <ul>
        {values.device_type === 2 ? (
          <li>
            <span>{t("Computer type")}:</span> <strong>{values.device}</strong>
          </li>
        ) : (
          <>
            <li>
              <span>{t("Manufacturer")}:</span>{" "}
              <strong>{values.manufacturer}</strong>
            </li>
            <li>
              <span>{t("Model")}:</span> <strong>{values.model}</strong>
            </li>
          </>
        )}
        <li>
          <span>{t("Operating system")}:</span>{" "}
          <strong>{values.operating_system_platform}</strong>
        </li>
        <li>
          <span>{t("Operating system version")}:</span>{" "}
          <strong>{values.operating_system_version}</strong>
        </li>
      </ul>
    </RecapBurrito>
  );
};

const RecapBurrito = styled.div`
  svg {
    width: 56px;
    height: 56px;
    color: ${(props) => props.theme.palette.secondary};
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    display: flex;
    align-items: flex-start;
  }
`;
