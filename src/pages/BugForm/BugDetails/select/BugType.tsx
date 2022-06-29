import { Select } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { setBugDetailsModal } from "src/pages/BugForm/bugFormSlice";
import { useAppDispatch } from "src/store";

export const BugType = () => {
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
      name="type"
      value={[]}
      options={[]}
      label={
        <LabelWithHelper
          label={t("BUGFORM_BUGDTLS_TYPE", { defaultValue: "Bug type" })}
          onClick={() =>
            openBugDetailsModal(
              t("BUGFORM_TYPE_MODAL_TITLE", {
                defaultValue: "Bug type",
              }),
              "type"
            )
          }
          small
        />
      }
      placeholder={t("BUGFORM_BUGDTLS_TYPE_PLACEHOLDER", {
        defaultValue: "Select type",
      })}
      menuTargetQuery="body"
      onChange={() => null}
      noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
    />
  );
};
