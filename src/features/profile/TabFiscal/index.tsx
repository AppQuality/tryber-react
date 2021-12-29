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
        <TabFiscalEdit setEdit={setIsEdit} inputRef={inputRef} />
      ) : (
        <TabFiscalShow setEdit={setIsEdit} />
      )}
    </div>
  );
};

export default TabFiscal;
