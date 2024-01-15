import queryString from "query-string";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "src/store";
import {
  setSelectedCampaign,
  setSelectedStatus,
} from "../../redux/myBugs/actionCreator";

const useQueryStringFilters = () => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();

  useEffect(() => {
    const values = queryString.parse(search);
    if (values.cp) {
      dispatch(setSelectedCampaign({ value: values.cp.toString(), label: "" }));
    }
    if (values.status) {
      dispatch(
        setSelectedStatus({ value: values.status.toString(), label: "" })
      );
    }
  }, [queryString]);
};

export { useQueryStringFilters };
