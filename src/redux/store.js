import { combineReducers, createStore } from "redux";
import counterReducer from "./counterReducer";
import doneReducer from "./doneReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
    counter: counterReducer,
    done: doneReducer
})

const store = createStore(rootReducer, composeWithDevTools())

export {store};