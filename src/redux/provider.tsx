import { createStore, applyMiddleware, Store, compose } from "redux";
import { Provider, useDispatch } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./reducer";
const middlewares = [thunk];
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store<GeneralState, MenuAction> & {
  dispatch: DispatchType;
} = createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
);
