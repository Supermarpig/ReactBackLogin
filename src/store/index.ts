import {legacy_createStore,combineReducers} from "redux"
import  handleNum  from "./NumStatus/reducer";
import  handleArr  from "./ArrStatus/reducer";

//組合各個模塊的reducer
const reducers = combineReducers({
    handleNum,
    handleArr
})


//創建數據倉庫
//新增window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__()
//是為了瀏覽器正常使用 redux-dev-tools插件
const store = legacy_createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__());

export default store