import { Select } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { useAppDispatch } from "src/store";
import { setBugDetailsModal } from "src/pages/BugForm/bugFormSlice";
import useCampaignData from "src/pages/BugForm/useCampaignData";

export const BugReplicability = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useCampaignData();
  if (!data) return null;
  const options = data.bugReplicability.valid.map((option) => ({
    value: option,
    label: option,
  }));
  return (
    <Select
      name="replicability"
      value={[]}
      options={options}
      label={
        <LabelWithHelper
          label={t("BUGFORM_BUGDTLS_REPLICABILTY", {
            defaultValue: "Bug replicability",
          })}
          onClick={() =>
            dispatch(
              setBugDetailsModal({
                open: true,
                title: t("BUGFORM_REPLICABILTY_MODAL_TITLE", {
                  defaultValue: "Bug replicability",
                }),
                type: "replicability",
              })
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
