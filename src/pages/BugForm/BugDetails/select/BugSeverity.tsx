import { Select } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { setBugDetailsModal } from "src/pages/BugForm/bugFormSlice";
import { useAppDispatch } from "src/store";
import useCampaignData from "src/pages/BugForm/useCampaignData";

export const BugSeverity = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useCampaignData();
  if (!data) return null;
  const options = data.bugSeverity.valid.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <Select
      name="severity"
      value={[]}
      options={options}
      label={
        <LabelWithHelper
          label={t("BUGFORM_BUGDTLS_SEVERITY", {
            defaultValue: "Bug severity",
          })}
          onClick={() =>
            dispatch(
              setBugDetailsModal({
                open: true,
                title: t("BUGFORM_SEVERITY_MODAL_TITLE", {
                  defaultValue: "Bug severity",
                }),
                type: "severity",
              })
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
