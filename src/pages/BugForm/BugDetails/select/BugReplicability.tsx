import { Select } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { useAppDispatch } from "src/store";
import { setBugDetailsModal } from "src/pages/BugForm/bugFormSlice";

export const BugReplicability = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const openBugDetailsModal = (
    title: string,
    type: "severity" | "type" | "replicability"
  ) =>
    dispatch(
      setBugDetailsModal({
        open: true,
        title,
        type,
      })
    );
  return (
    <Select
      name="replicability"
      value={[]}
      options={[]}
      label={
        <LabelWithHelper
          label={t("BUGFORM_BUGDTLS_REPLICABILTY", {
            defaultValue: "Bug replicability",
          })}
          onClick={() =>
            openBugDetailsModal(
              t("BUGFORM_REPLICABILTY_MODAL_TITLE", {
                defaultValue: "Bug replicability",
              }),
              "replicability"
            )
          }
          small
        />
      }
      placeholder={t("BUGFORM_BUGDTLS_REPLICABILTY_PLACEHOLDER", {
        defaultValue: "Select replicability",
      })}
      menuTargetQuery="body"
      onChange={() => null}
      noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
    />
  );
};
