import { Spinner } from "@appquality/appquality-design-system";
import { useState, useEffect } from "react";
import UserStore from "../../../redux/user";
import { TabFiscalShow } from "./TabFiscalShow";
import { TabFiscalEdit } from "./TabFiscalEdit";
import { useSelector, shallowEqual } from "react-redux";

const TabFiscal = () => {
  const { isProfileLoading } = UserStore();
  const userFiscal = useSelector(
    (state: GeneralState) => state.user.fiscal,
    shallowEqual
  );
  const [isEdit, setIsEdit] = useState(true);
  useEffect(() => {
    setIsEdit(
      !userFiscal.data?.fiscalStatus ||
        userFiscal.data?.fiscalStatus === "Unverified"
    );
  }, [userFiscal]);
  return (
    <div className="aq-p-3">
      {isProfileLoading || userFiscal.loading ? (
        <Spinner />
      ) : isEdit ? (
        <TabFiscalEdit />
      ) : (
        <TabFiscalShow setEdit={setIsEdit} />
      )}
    </div>
  );
};

export default TabFiscal;
