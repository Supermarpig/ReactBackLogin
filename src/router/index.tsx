import React,{lazy} from "react"
import Home from "../views/Home"
// import About from "../views/About"
// import User from "../views/User"
import Login from "../views/Login"
const Page1 =lazy(()=>import("../views/Page1"))
const Page2 =lazy(()=>import("../views/Page2"))
const Page301 =lazy(()=>import("../views/Page301"))
const Page302 =lazy(()=>import("../views/Page302"))
const Page303 =lazy(()=>import("../views/Page303"))
const Page401 =lazy(()=>import("../views/Page401"))
const Page402 =lazy(()=>import("../views/Page402"))
const Page5 =lazy(()=>import("../views/Page5"))
//Navigate重定向組件
import {Navigate} from "react-router-dom"


const withLoadingComponent =(comp:JSX.Element) =>(
    <React.Suspense fallback={<div>Loading...</div>}>
    {comp}
    </React.Suspense>
)

const routes =[

    //嵌套路由 開始-------------------
{
    path:"/",
    element:<Navigate to="/page1"/>
},
{
    path:"/",
    element:<Home />,
    children:[
       {
        path:"/page1",
        element: withLoadingComponent(<Page1 />)
       } ,
       {
        path:"/page2",
        element: withLoadingComponent(<Page2 />)
       } ,
       {
        path:"/page3/page301",
        element: withLoadingComponent(<Page301 />)
       } ,
       {
        path:"/page3/page302",
        element: withLoadingComponent(<Page302 />)
       } ,
       {
        path:"/page3/page303",
        element: withLoadingComponent(<Page303 />)
       } ,
       {
        path:"/page4/page401",
        element: withLoadingComponent(<Page401 />)
       } ,
       {
        path:"/page4/page402",
        element: withLoadingComponent(<Page402 />)
       } ,
       {
        path:"/page5",
        element: withLoadingComponent(<Page5 />)
       } ,
    ]
},
//嵌套路由 結束-------------------
{
    path:"/login",
    element: <Login />
},
//假設User隨便輸入不是裡面的網址  返回page1 ，專門去寫一個404頁面也可以
{
    path:"*",
    element: <Navigate to="/page1"/>
}
]

export default routes