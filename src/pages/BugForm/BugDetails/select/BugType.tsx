import { Select } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { setBugDetailsModal } from "src/pages/BugForm/bugFormSlice";
import { useAppDispatch } from "src/store";
import useCampaignData from "src/pages/BugForm/useCampaignData";

export const BugType = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useCampaignData();
  console.log(data);
  if (!data) return null;
  const options = data.bugTypes.valid.map((option) => ({
    value: option,
    label: option,
  }));
  return (
    <Select
      name="type"
      value={[]}
      options={options}
      label={
        <LabelWithHelper
          label={t("BUGFORM_BUGDTLS_TYPE", { defaultValue: "Bug type" })}
          onClick={() =>
            dispatch(
              setBugDetailsModal({
                open: true,
                title: t("BUGFORM_TYPE_MODAL_TITLE", {
                  defaultValue: "Bug type",
                }),
                type: "type",
              })
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
