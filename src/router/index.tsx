import React,{lazy} from "react"
import Home from "../views/Home"
// import About from "../views/About"
// import User from "../views/User"
const About =lazy(()=>import("../views/Page301"))
const User =lazy(()=>import("../views/User"))
const Page1 =lazy(()=>import("../views/Page1"))
const Page2 =lazy(()=>import("../views/Page2"))
const Page301 =lazy(()=>import("../views/Page301"))
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
    ]
},
//嵌套路由 結束-------------------
//假設User隨便輸入不是裡面的網址  返回page1 ，專門去寫一個404頁面也可以
{
    path:"*",
    element: <Navigate to="/page1"/>
}
]

export default routes