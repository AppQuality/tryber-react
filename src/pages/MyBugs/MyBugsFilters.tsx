import {
  Select,
  SelectType,
  SortTableSelect,
  SortTableSelectProps,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import {
  setSelectedCampaign,
  setSelectedSeverity,
  setSelectedStatus,
} from "../../redux/myBugs/actionCreator";
import { useAppDispatch } from "../../redux/provider";
import { useGetUsersMeBugsQuery } from "src/services/tryberApi";

interface MyBugsFiltersProps extends SortTableSelectProps<BugsOrderByType> {
  selectedCampaign?: SelectType.Option;
  selectedSeverity?: SelectType.Option;
  selectedStatus?: SelectType.Option;
  setPage: (page: number) => void;
}

const useSelectValues = ({
  selectedCampaign,
  selectedSeverity,
  selectedStatus,
}: {
  selectedCampaign?: SelectType.Option;
  selectedSeverity?: SelectType.Option;
  selectedStatus?: SelectType.Option;
}) => {
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
      return { value: r.severity.id.toString(), label: r.severity.name };
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
      return { value: r.status.id.toString(), label: r.status.name };
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.value === value.value)
    );
  return { campaigns, severities, status };
};

const MyBugsFilters = ({
  selectedCampaign,
  selectedSeverity,
  selectedStatus,
  order,
  orderBy,
  setPage,
  columns,
}: MyBugsFiltersProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { campaigns, severities, status } = useSelectValues({
    selectedCampaign,
    selectedSeverity,
    selectedStatus,
  });
  const allCampaign = t("All", { context: "female" });
  const allSeverity = t("All", { context: "female" });
  const allStatus = t("All", { context: "male" });
  let campaignValue = { label: allCampaign };
  let severityValue = { label: allSeverity };
  let statusValue = { label: allStatus };

  if (
    selectedCampaign &&
    campaigns.map((c) => c.value).includes(selectedCampaign.value)
  ) {
    campaignValue = selectedCampaign;
  }
  if (
    selectedSeverity &&
    severities.map((s) => s.value).includes(selectedSeverity.value)
  ) {
    severityValue = selectedSeverity;
  }
  if (
    selectedStatus &&
    status.map((s) => s.value).includes(selectedStatus.value)
  ) {
    statusValue = selectedStatus;
  }

  return (
    <div>
      <div className="aq-mb-3">
        <Select
          label={t("Campaign")}
          onChange={(value) => {
            setPage(1);
            dispatch(setSelectedCampaign(value));
          }}
          name="campaign"
          options={[{ label: allCampaign }, ...campaigns]}
          value={campaignValue}
          isSearchable
          placeholder={t("Search")}
          isClearable={false}
          noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          label={t("Severity")}
          onChange={(value) => {
            setPage(1);
            dispatch(setSelectedSeverity(value));
          }}
          name="severity"
          options={[{ label: allSeverity }, ...severities]}
          value={severityValue}
          isSearchable={false}
          placeholder={t("Search")}
          isClearable={false}
          noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          label={t("Status")}
          onChange={(value) => {
            setPage(1);
            dispatch(setSelectedStatus(value));
          }}
          name="status"
          options={[{ label: allStatus }, ...status]}
          value={statusValue}
          isSearchable={false}
          placeholder={t("Search")}
          isClearable={false}
          noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
        />
      </div>
      <SortTableSelect
        order={order}
        orderBy={orderBy}
        columns={columns}
        label={t("Order By", { context: "Sort Table Select" })}
      />
    </div>
  );
};

export default MyBugsFilters;
