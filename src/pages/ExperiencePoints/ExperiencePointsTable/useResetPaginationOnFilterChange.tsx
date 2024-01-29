import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

const useResetPaginationOnFilterChange = ({
  setPage,
}: {
  setPage: (newPage: number) => void;
}) => {
  const { selectedActivity, selectedCampaign, selectedDate, search } =
    useSelector((state: GeneralState) => state.experiencePoints, shallowEqual);

  useEffect(() => {
    if (
      selectedCampaign ||
      selectedActivity ||
      selectedDate ||
      search ||
      search === ""
    ) {
      setPage(1);
    }
  }, [selectedCampaign, selectedActivity, selectedDate, search]);
};

export { useResetPaginationOnFilterChange };
