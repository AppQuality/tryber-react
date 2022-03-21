import { createStore, applyMiddleware, Store } from "redux";
import { Provider, useDispatch } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./reducer";
const middlewares = [thunk];
const store: Store<GeneralState, MenuAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(...middlewares));

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
);
