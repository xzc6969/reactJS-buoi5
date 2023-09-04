import { combineReducers, createStore } from "redux";
import { SVReducer } from "./reducers/SVReducer";


const rootReducer = combineReducers({
   SVReducer:SVReducer,
})
export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());