import { Card } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import DeviceIcon from "src/pages/Devices/DeviceIcon";
import { useGetUsersMeCampaignsByCampaignIdDevicesQuery } from "src/services/tryberApi";

const useDevices = (id: string) => {
  const device = useGetUsersMeCampaignsByCampaignIdDevicesQuery({
    campaignId: id,
  });
  return (
    device.data?.map((option) => {
      const isPC = (d: typeof option.device): d is { pc_type: string } => {
        return d.hasOwnProperty("pc_type");
      };
      return {
        Icon: <DeviceIcon device_type={option.type} />,
        label:
          (isPC(option.device)
            ? option.device.pc_type
            : option.device.manufacturer + " " + option.device.model) +
          " " +
          option.operating_system.platform +
          " " +
          option.operating_system.version,
      };
    }) || []
  );
};

const DeviceCard = ({ id }: { id: string }) => {
  const { t } = useTranslation();

  const device = useDevices(id);

  if (!device || device.length === 0) {
    return null;
  }

  return (
    <Card
      title={t(
        "__MANUAL_PAGE__DEVICE_CARD_TITLE",
        "You were selected with this device"
      )}
      className="aq-mb-4"
    >
      <ul>
        {device.map(({ Icon, label }) => (
          <li key={label}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {Icon}
              {label}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export { DeviceCard };
