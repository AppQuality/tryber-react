import { useFormikContext } from "formik";
import DeviceIcon from "../DeviceIcon";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { DeviceFormInterface } from "./types";

const DeviceRecap = () => {
  const { values } = useFormikContext<DeviceFormInterface>();
  const { t } = useTranslation();
  return (
    <RecapBurrito>
      <div className="device-recap-icon aq-p-3 aq-m-3">
        <DeviceIcon
          device_type={values.device_type}
          className="aq-mb-3"
          showText
        />
      </div>
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
    li {
      text-align: center;
    }
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      align-items: flex-start;
      li {
        text-align: left;
      }
    }
  }
`;

export default DeviceRecap;
