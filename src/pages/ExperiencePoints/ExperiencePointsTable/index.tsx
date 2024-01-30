import {
  Pagination,
  SortTableSelect,
  Table,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { updateExperiencePointsPagination } from "src/redux/experiencePoints/experiencePointsSlice";
import { useAppDispatch } from "src/store";
import { useExperiencePointsColumns } from "../columns";
import { useResetPaginationOnFilterChange } from "./useResetPaginationOnFilterChange";
import { useRows } from "./useRows";

const ExperiencePointsTable = () => {
  const limit = 25;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { rows, loading, totalEntries } = useRows();
  const columns = useExperiencePointsColumns();

  const setPage = (newPage: number) => {
    const newStart = limit * (newPage - 1);
    dispatch(updateExperiencePointsPagination(newStart));
  };

  useResetPaginationOnFilterChange({ setPage });

  const { order, orderBy, start } = useSelector(
    (state: GeneralState) => state.experiencePoints.expList,
    shallowEqual
  );

  const page = (start ?? 0) / limit + 1;

  return (
    <>
      <SortTableSelect
        order={order}
        orderBy={orderBy}
        columns={columns}
        label={t("Order By", { context: "Sort Table Select" })}
      />
      <Table
        dataSource={rows}
        columns={columns}
        orderBy={orderBy}
        order={order}
        isLoading={loading}
        className="aq-mb-3"
        isStriped
      />
      <Pagination
        onPageChange={setPage}
        current={page}
        maxPages={Math.ceil(totalEntries / limit)}
        mobileText={(current, total) =>
          t(`Page %current% / %total%`)
            .replace("%current%", current.toString())
            .replace("%total%", total ? total.toString() : "0")
        }
      />
    </>
  );
};

export default ExperiencePointsTable;
