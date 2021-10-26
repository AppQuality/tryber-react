import {
  Formik,
  FormikField,
  Modal,
  Form,
  FormGroup,
  Input,
  Button,
  BSGrid,
  BSCol,
  Select,
  SelectType,
  FormLabel,
  ModalBody,
} from "@appquality/appquality-design-system";
import residenceModalStore from "../../../../redux/addResidenceAddressModal";
import userStore from "../../../../redux/user";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { useFormikContext } from "formik";
import modalStore from "../../../../redux/modal";

const FiscalResidenceModal = ({ values }: { values: FiscalFormValues }) => {
  const { close: modalClose, isOpen: isModalOpen } = residenceModalStore();
  const { open } = modalStore();
  const { user, isLoading, isProfileLoading } = userStore();
  const { t, i18n } = useTranslation();

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
