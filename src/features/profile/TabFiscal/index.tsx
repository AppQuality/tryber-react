import { useState, useEffect } from "react";
import { TabFiscalShow } from "./TabFiscalShow";
import { TabFiscalEdit } from "./TabFiscalEdit";
import { useSelector, shallowEqual } from "react-redux";
import { SkeletonTab } from "src/features/profile/SkeletonTab";

const TabFiscal = () => {
  const userFiscal = useSelector(
    (state: GeneralState) => state.user?.fiscal,
    shallowEqual
  );
  const isProfileLoading = useSelector(
    (state: GeneralState) => state.user?.user?.loadingProfile,
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
        <SkeletonTab />
      ) : isEdit ? (
        <TabFiscalEdit />
      ) : (
        <TabFiscalShow setEdit={setIsEdit} />
      )}
    </div>
  );
};

export default TabFiscal;
