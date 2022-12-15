//組件形式的TSX
import App from "../App"
import Home from "../views/Home"
import About from "../views/About"
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
//兩種路由模式的組件：BrowserRouter (History模式)，HashRouter(Hash模式)

//const baseRouter =()=>{
    //假設有邏輯 就需要用return寫法，沒有的話用下面快速寫法就好
    // return(<BrowserRouter> 
        // <Routes>
        // <Route path="/" element={<App/>}>
            // <Route path="/home" element={<Home/>}></Route>
            // <Route path="/about" element={<About/>}></Route>
        // </Route>
    // </Routes>
// </BrowserRouter>)
// }
// 以上寫法可以簡寫為：

const baseRouter =()=>(
    <BrowserRouter> 
        <Routes>
            <Route path="/" element={<App/>}>
                {/* 配置 USER訪問的時候，重定向到/home路徑*/}
                <Route path="/" element={<Navigate to="/home"/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default baseRouter



// {
//     path:"",
//     component:
// }