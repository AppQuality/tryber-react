import { Laptop, Phone, Tablet, Tv } from "react-bootstrap-icons";

const DeviceIcon = ({
  device_type,
  className,
  size,
  showText = false,
}: {
  device_type: number | string;
  className?: string;
  size?: number;
  showText?: boolean;
}) => {
  switch (device_type) {
    case 0:
    case "Smartphone":
      return (
        <>
          <Phone className={className} size={size} />
          {showText ? (
            <div>
              <strong>Smartphone</strong>
            </div>
          ) : null}
        </>
      );
    case 1:
    case "Tablet":
      return (
        <>
          <Tablet className={className} size={size} />
          {showText ? (
            <div>
              <strong>Tablet</strong>
            </div>
          ) : null}
        </>
      );
    case 2:
    case "PC":
      return (
        <>
          <Laptop className={className} size={size} />
          {showText ? (
            <div>
              <strong>Computer</strong>
            </div>
          ) : null}
        </>
      );
    case 5:
    case "Smart-tv":
      return (
        <>
          <Tv className={className} size={size} />
          {showText ? (
            <div>
              <strong>Smart TV & TV Box</strong>
            </div>
          ) : null}
        </>
      );
    default:
      return null;
  }
};

export default DeviceIcon;
