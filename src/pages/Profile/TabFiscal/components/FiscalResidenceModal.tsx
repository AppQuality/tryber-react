import { ModalBody } from "@appquality/appquality-design-system";
import { useSelector } from "react-redux";

const FiscalResidenceModal = ({ values }: { values: FiscalFormValues }) => {
  const { id, email } = useSelector((state: GeneralState) => ({
    id: state.user.user.id,
    email: state.user.user.email,
  }));

  const iFrameStyle = {
    height: "100%",
    width: "100%",
    minHeight: "400px",
    border: "none",
  };

  const iframeData = {
    testerId: `T${id}`,
    email: email || "",
    fiscalId: values.fiscalId || "",
    fiscalType: values.fiscalTypeSelect
      ? values.fiscalTypeSelect === "withholding"
        ? "Withholding tax annual < 5000€"
        : values.fiscalTypeSelect === "witholding-extra"
        ? "Withholding tax annual > 5000€"
        : values.fiscalTypeSelect === "other"
        ? "Not compatible with previous ones"
        : ""
      : "",
    "fiscalAddress[addr_line1]": values.street
      ? `${values.street} ${values.streetNumber}`
      : "",
    "fiscalAddress[city]": values.city || "",
    "fiscalAddress[state]": values.province || "",
    "fiscalAddress[postal]": values.zipCode || "",
  };

  const iframeParams = new URLSearchParams(iframeData).toString();

  return (
    <ModalBody>
      <iframe
        title="fiscal address help form"
        src={`https://form.jotform.com/220122177762349?${iframeParams}`}
        style={iFrameStyle}
      />
    </ModalBody>
  );
};

export default FiscalResidenceModal;
