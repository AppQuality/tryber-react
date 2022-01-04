import { Ref, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { SkeletonTab } from "src/features/profile/SkeletonTab";
import { TabFiscalEdit } from "./TabFiscalEdit";
import { TabFiscalShow } from "./TabFiscalShow";

const TabFiscal = ({ inputRef }: { inputRef?: Ref<HTMLInputElement> }) => {
  const userFiscal = useSelector(
    (state: GeneralState) => state.user?.fiscal,
    shallowEqual
  );
  const isProfileLoading = useSelector(
    (state: GeneralState) => state.user.loadingProfile,
    shallowEqual
  );
  const [isEdit, setIsEdit] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    setIsVerified(userFiscal.data?.fiscalStatus === "Verified");
  }, [userFiscal]);
  return (
    <div className="aq-p-3">
      {isProfileLoading || userFiscal.loading ? (
        <SkeletonTab />
      ) : isEdit || !isVerified ? (
        <TabFiscalEdit setEdit={setIsEdit} inputRef={inputRef} />
      ) : (
        <TabFiscalShow setEdit={setIsEdit} />
      )}
    </div>
  );
};

export default TabFiscal;
