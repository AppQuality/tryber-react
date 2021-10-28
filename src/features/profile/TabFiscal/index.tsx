import { Spinner } from "@appquality/appquality-design-system";
import { useState } from "react";
import UserStore from "../../../redux/user";
import { TabFiscalShow } from "./TabFiscalShow";
import { TabFiscalEdit } from "./TabFiscalEdit";

export const TabFiscal = ({
  ref,
}: {
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const { isProfileLoading, isLoading, user } = UserStore();
  const [isEdit, setIsEdit] = useState(!user.fiscal?.fiscalStatus);

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
