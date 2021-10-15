import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./reducer";

const middlewares = [thunk];
const store: Store<GeneralState, MenuAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(...middlewares));

const StoreProvider = ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
);

export default StoreProvider;
