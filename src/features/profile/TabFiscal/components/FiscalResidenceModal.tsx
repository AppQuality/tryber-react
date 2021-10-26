import { ModalBody } from "@appquality/appquality-design-system";
import residenceModalStore from "../../../../redux/addResidenceAddressModal";
import userStore from "../../../../redux/user";
import modalStore from "../../../../redux/modal";

const FiscalResidenceModal = ({ values }: { values: FiscalFormValues }) => {
  const { user } = userStore();

  const iFrameStyle = {
    height: "100%",
    width: "100%",
    minHeight: "400px",
    border: "none",
  };

  return (
    <ModalBody>
      <iframe
        title="fiscal address help form"
        src={`https://form.jotform.com/212982709982369?testerId=T${user?.id}&email=${user?.email}&tax_type=${values.fiscalTypeRadio}&fiscalId=${values.fiscalId}`}
        style={iFrameStyle}
      />
    </ModalBody>
  );
};

export default FiscalResidenceModal;
