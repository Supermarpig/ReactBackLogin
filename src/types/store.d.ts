// 【重點】類型聲明裡面不要直接使用引入import...from...
// 而是使用 import("@/store") 這種語法
// import store from "@/store"
// TS中提供了ReturnType，用来获取函数类型的返回值
type RootState = ReturnType<typeof import("@/store").getState>

interface Window{
    __REDUX_DEVTOOLS_EXTENSION__:function ;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function;
}