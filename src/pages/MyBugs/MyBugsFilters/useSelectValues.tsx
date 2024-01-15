import { SelectType } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useGetUsersMeBugsQuery } from "src/services/tryberApi";

const useSelectValues = () => {
  const { t } = useTranslation();

  const allCampaign = t("All", { context: "female" });
  const allSeverity = t("All", { context: "female" });
  const allStatus = t("All", { context: "male" });
  const { selectedCampaign, selectedSeverity, selectedStatus } = useSelector(
    (state: GeneralState) => ({
      selectedCampaign: state.myBugs.selectedCampaign,
      selectedSeverity: state.myBugs.selectedSeverity,
      selectedStatus: state.myBugs.selectedStatus,
    }),
    shallowEqual
  );

  const { data, isLoading } = useGetUsersMeBugsQuery({
    filterBy: {
      campaign: selectedCampaign?.value,
      severity: selectedSeverity?.value,
      status: selectedStatus?.value,
    },
  });

  if (isLoading || !data) return { campaigns: [], severities: [], status: [] };

  const campaigns: SelectType.Option[] = data.results
    .filter(
      (r): r is { id: number; campaign: { id: number; name: string } } =>
        typeof r.campaign !== "undefined"
    )
    .map((r) => {
      return {
        value: r.campaign.id.toString(),
        selected: selectedCampaign?.value === r.campaign.id.toString(),
        label: `CP${r.campaign.id} - ${r.campaign.name}`,
      };
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.value === value.value)
    );

  const severities: SelectType.Option[] = data.results
    .filter(
      (r): r is { id: number; severity: { id: number; name: string } } =>
        typeof r.severity !== "undefined"
    )
    .map((r) => {
      return {
        value: r.severity.id.toString(),
        selected: selectedSeverity?.value === r.severity.id.toString(),
        label: r.severity.name,
      };
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.value === value.value)
    );

  const status: SelectType.Option[] = data.results
    .filter(
      (r): r is { id: number; status: { id: number; name: string } } =>
        typeof r.status !== "undefined"
    )
    .map((r) => {
      return {
        value: r.status.id.toString(),
        selected: selectedStatus?.value === r.status.id.toString(),
        label: r.status.name,
      };
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.value === value.value)
    );
  return {
    campaigns: [{ label: allCampaign }, ...campaigns],
    severities: [{ label: allSeverity }, ...severities],
    status: [{ label: allStatus }, ...status],
  };
};

export { useSelectValues };
