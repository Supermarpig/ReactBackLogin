import {legacy_createStore,combineReducers,compose,applyMiddleware} from "redux"
import reduxThunk from "redux-thunk"
import  handleNum  from "./NumStatus/reducer";
import  handleArr  from "./ArrStatus/reducer";
import  handleXxxxx  from "./XxxxxStatus/reducer";

//組合各個模塊的reducer
const reducers = combineReducers({
    handleNum,
    handleArr,
    handleXxxxx,
})


//創建數據倉庫
//新增window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__()
//是為了瀏覽器正常使用 redux-dev-tools插件
// const store = legacy_createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__());


// 判斷有沒有__REDUX_DEVTOOLS_EXTENSION_COMPOSE__這個模塊
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose //rt

// 把倉庫數據，瀏覽器redux-dev-tools，還有reduxThunk插件關聯在store中
const store = legacy_createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk))); 
export default store