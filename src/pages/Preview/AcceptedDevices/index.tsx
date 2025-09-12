import { Card, Text, Title } from "@appquality/appquality-design-system";
import {
  Controller,
  Laptop,
  Phone,
  Smartwatch,
  Tablet,
  Tv,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useGetUsersMeCampaignsByCampaignIdQuery } from "src/services/tryberApi";
import styled, { useTheme } from "styled-components";

const CardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.grid.sizes[2]};
`;

const CardTitle = ({ device }: { device: string }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const deviceMap: Record<string, { name: string; Icon: typeof Phone }> = {
    smartphone: { name: t("Smartphone"), Icon: Phone },
    tablet: { name: t("Tablet"), Icon: Tablet },
    pc: { name: t("PC"), Icon: Laptop },
    smartwatch: { name: t("Smartwatch"), Icon: Smartwatch },
    console: { name: t("Console"), Icon: Controller },
    smartTv: { name: t("Smart TV"), Icon: Tv },
  };
  const { Icon, name } = deviceMap[device] || { name: device, Icon: <></> };

  return (
    <CardTitleWrapper>
      <Icon style={{ color: theme.palette.secondary }} /> {name}
    </CardTitleWrapper>
  );
};

const AcceptedDevices = ({ id }: { id: string }) => {
  const { data } = useGetUsersMeCampaignsByCampaignIdQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title size="s" className="aq-mb-2">
        Accepted Devices
      </Title>
      {Object.entries(data.acceptedDevices).map(([type, devices]) => (
        <div key={type}>
          <Card title={<CardTitle device={type} />} className="aq-mb-1">
            {devices === "all" ? (
              <Text>All Devices</Text>
            ) : (
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                  margin: 0,
                }}
              >
                {devices.map((device) => (
                  <li key={device.name}>
                    <Text>{device.name}</Text>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      ))}
    </>
  );
};

export default AcceptedDevices;
