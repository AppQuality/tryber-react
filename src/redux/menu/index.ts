import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { toggleMenu } from "./actionCreators";

export default () => {
  const open: boolean = useSelector(
    (state: GeneralState) => state.menu.open,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    open,
    toggle: () => dispatch(toggleMenu()),
  };
};
