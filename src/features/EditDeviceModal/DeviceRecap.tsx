import { useFormikContext } from "formik";
import { Laptop, Phone, Tablet, Tv } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { DeviceFormInterface } from "./types";

export default () => {
  const { values } = useFormikContext<DeviceFormInterface>();
  const { t } = useTranslation();
  const getIcon = () => {
    switch (values.device_type) {
      case 0:
        return (
          <>
            <Phone className="aq-mb-3" />
            <div>
              <strong>Smartphone</strong>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <Tablet className="aq-mb-3" />
            <div>
              <strong>Tablet</strong>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <Laptop className="aq-mb-3" />
            <div>
              <strong>Computer</strong>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <Tv className="aq-mb-3" />
            <div>
              <strong>Smart TV & TV Box</strong>
            </div>
          </>
        );
      default:
        return "";
    }
  };
  return (
    <RecapBurrito>
      <div className="device-recap-icon aq-p-3 aq-m-3">{getIcon()}</div>
      <ul className="device-recap-props">
        {values.device_type === 2 ? (
          <li>
            <span>{t("Computer type")}:</span> <strong>{values.pc_type}</strong>
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
  display: grid;
  grid-template-columns: 100%;
  grid-gap: ${(props) => props.theme.grid.spacing.default};
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-columns: auto 1fr;
  }

  .device-recap-icon {
    text-align: center;
    svg {
      width: 56px;
      height: 56px;
      color: ${(props) => props.theme.palette.secondary};
    }
  }
  .device-recap-props {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      align-items: flex-start;
    }
  }
`;
