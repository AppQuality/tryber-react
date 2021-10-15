import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { toggleMenu, openMenu, closeMenu } from "./actionCreators";

const MenuStore = () => {
  const open: boolean = useSelector(
    (state: GeneralState) => state.menu.open,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    isOpen: open,
    toggle: () => dispatch(toggleMenu()),
    open: () => dispatch(openMenu()),
    close: () => dispatch(closeMenu()),
  };
};

export default MenuStore;
