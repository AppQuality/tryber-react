import { shallowEqual, useSelector } from "react-redux";
import { updateMybugsPagination } from "src/redux/myBugs/actionCreator";
import { useAppDispatch } from "src/store";

const usePage = () => {
  const dispatch = useAppDispatch();

  const { limit, start } = useSelector(
    (state: GeneralState) => ({
      limit: state.myBugs.bugsList.limit,
      start: state.myBugs.bugsList.start,
      order: state.myBugs.bugsList.order,
      orderBy: state.myBugs.bugsList.orderBy,
    }),
    shallowEqual
  );

  const changePagination = (newPage: number) => {
    const newStart = limit * (newPage - 1);
    dispatch(updateMybugsPagination(newStart));
  };

  return {
    page: (start || 0) / limit + 1,
    setPage: changePagination,
  };
};

export { usePage };
