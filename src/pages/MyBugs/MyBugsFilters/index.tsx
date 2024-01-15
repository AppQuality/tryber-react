import {
  Select,
  SortTableSelect,
  SortTableSelectProps,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import {
  setSelectedCampaign,
  setSelectedSeverity,
  setSelectedStatus,
} from "src/redux/myBugs/actionCreator";
import { useAppDispatch } from "src/redux/provider";
import { useSelectValues } from "./useSelectValues";

interface MyBugsFiltersProps extends SortTableSelectProps<BugsOrderByType> {
  setPage: (page: number) => void;
}

const MyBugsFilters = ({
  order,
  orderBy,
  setPage,
  columns,
}: MyBugsFiltersProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { campaigns, severities, status } = useSelectValues();

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
          options={campaigns}
          value={campaigns.find((c) => c.selected) || campaigns[0]}
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
          options={severities}
          value={severities.find((c) => c.selected) || severities[0]}
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
          options={status}
          value={status.find((c) => c.selected) || status[0]}
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
