import { Select } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { setBugDetailsModal } from "src/pages/BugForm/bugFormSlice";
import { useAppDispatch } from "src/store";

export const BugSeverity = () => {
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
      name="severity"
      value={[]}
      options={[]}
      label={
        <LabelWithHelper
          label={t("BUGFORM_BUGDTLS_SEVERITY", {
            defaultValue: "Bug severity",
          })}
          onClick={() =>
            openBugDetailsModal(
              t("BUGFORM_SEVERITY_MODAL_TITLE", {
                defaultValue: "Bug severity",
              }),
              "severity"
            )
          }
          small
        />
      }
      placeholder={t("BUGFORM_BUGDTLS_SEVERITY_PLACEHOLDER", {
        defaultValue: "Select severity",
      })}
      menuTargetQuery="body"
      onChange={() => null}
      noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
    />
  );
};
