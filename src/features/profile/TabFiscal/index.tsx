import { useTranslation } from "react-i18next";
import {
  Button,
  CSSGrid,
  Form,
  Formik,
  FormikField,
  FormLabel,
  FieldProps,
  FormGroup,
  ErrorMessage,
  Radio,
  Text,
  Title,
  Input,
  Select,
  Modal,
  Spinner,
} from "@appquality/appquality-design-system";
import { useState, useEffect } from "react";
import UserStore from "../../../redux/user";
import { TabFiscalShow } from "./TabFiscalShow";
import FiscalTypeArea from "./components/FiscalTypeArea";
import { ChangeEvent } from "react";
import FiscalAddress from "./components/FiscalAddress";
import residenceModalStore from "../../../redux/addResidenceAddressModal";
import { TabFiscalEdit } from "./TabFiscalEdit";

export const TabFiscal = ({
  ref,
}: {
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const { t } = useTranslation();
  const { isProfileLoading, isLoading } = UserStore();
  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="aq-p-3">
      {isProfileLoading || isLoading ? (
        <Spinner />
      ) : isEdit ? (
        <TabFiscalEdit setEdit={setIsEdit} />
      ) : (
        <TabFiscalShow setEdit={setIsEdit} />
      )}
    </div>
  );
};
