import { Spinner } from "@appquality/appquality-design-system";
import { useState, useEffect } from "react";
import UserStore from "../../../redux/user";
import { TabFiscalShow } from "./TabFiscalShow";
import { TabFiscalEdit } from "./TabFiscalEdit";

const TabFiscal = ({ ref }: { ref?: React.RefObject<HTMLDivElement> }) => {
  const { isProfileLoading, isLoading, user } = UserStore();
  const [isEdit, setIsEdit] = useState(true);
  useEffect(() => {
    setIsEdit(!user.fiscal?.fiscalStatus);
  }, [user]);
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

export default TabFiscal;
