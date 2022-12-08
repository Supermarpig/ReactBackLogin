# React後台管理項目 React18+TypeScript

以下是筆記



UI組件庫 使用 Ant Design of React

https://ant.design/docs/react/introduce

------------------------------------------------------------------------------------------

到自己的檔案路徑
npm init vite

y 創建

為檔案取名

找到react 

typeScript


將 dependencies
改成  
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^7.2.8",
    "react-router-dom": "6.4.4",
    "redux": "^4.2.0",
    "reset-css": "^5.0.1"

貼過來然後 下載 npm i 

項目啟動  npm run dev

創建成功~~ 

完善命令：

在dev 

  "scripts": {
    "dev": "vite --host --port 3002",  // --open  <-----npm run dev 就直接打開視窗
    "build": "tsc && vite build",
    "preview": "vite preview"
  },

---------------------------------------------------------------------------------
開始在留下自己需求的東西

在src內

import引入內的東西都可以刪掉
最後剩
App.tsx
main.tsx
vite-env.d.ts 

APP 內 Return內可以渲染畫面


---------------------------------------------------------------------------------
三、樣式初始化
reset-css 

npm i reset-css

安裝完後 去main.tsx

//正確的樣式引入順序
//初始化樣式，一般放在最前面
import "reset-css"
//UI框架的樣式

//組件的樣式
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
---------------------------------------------------------------------------------
四、scss 的安裝和初步使用

安裝sass vite中很方便，loader這些不用自己配置，只需要安裝好即可使用。

npm i --save-dev sass

dev的意思是 devDependencies → 放在package.jason裡面 

dependencies :依賴工具→用戶會用到放這
devDependencies :開發工具→用戶不會用到放這

開始書寫東西~

新增一個資源文件夾 在SRC下面 (未來可能會有很多文件夾 EX. compoment、)

在assets內新增一個資料夾 "styles" 放樣式
新增一個檔案 global.scss  

內容：
$color:#FCF;
body{
    background-color: $color;
    //取消文字選取
    user-select: none;
}
img{
    //不允許圖片拖動
    -webkit-user-drag: none;
}

-----------------------------------------------------------------------------------
五、配置項目的路徑別名

目前TS 對 @ 指向src目錄的提示是不支持的，
Vite默認也是不支持的。
所以需要手動配置 @ 符號的指向。

在vite.config.ts中添加配置

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  }
})

這時候引入path模塊會報錯，但其實我們已經有node，所以就已經有path模塊只是缺少ts的一些聲明配置。
所以需要安裝關於node這個庫的ts聲明配置

npm i -D @type/node

安裝成功後，就沒有報錯了。
如果import後面的path還是抱錯，可能是vite 版本過低。 
把 引入path 換成"import * as path from "path"就可以了;


5.2 配置路徑別名的提示

發現 打@/ 沒有路徑的提示

需要再tsconfig.json中：添加兩項配置

"complilerOptions":{
...
"baseUrl":"./",
"paths":{
"@/*":[
"src/*"
]
}
},

配置好後，輸入@ 後 就有路徑的資源提示了

-------------------------------------------------------------------------------------------------

六、 scss模塊化

6.1 scss 的進一步使用

src下新建compoment文件夾 然後再新增 Comp1 及 Comp2 兩個文件夾

在Comp1 中 新增 index.tsx 及 comp1.module.scss 文件

index.tsx 內容：
// import "./comp1.scss"  //全局引入  會影響到其他組件

//scss模塊化 引入

import styles from "./comp1.module.scss" 

const Comp = () =>{
    return(
        <div className={styles.box}>
        <p>這裡是Comp1裡面的內容</p>
        </div>
    )
}

export default Comp
-----------------------------
// comp1.module.scss 內容：
.box{
    color:red;
    p{
       margin-top: 100px;
    }
}
------------------------------
在Comp2 中 新增 index.tsx 內容：


function Comp(){
    return(
        <div className="box">
        <p>這裡是Comp2裡面的內容</p>
        </div>
    )
}

export default Comp
-----------------------------------

在APP.tsx引入兩個comp1、comp2

App.tsx 內容：
import { useState } from 'react'
import Comp1 from "@/components/Comp1"
import Comp2 from "@/components/Comp2"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      頂級組建
      <Comp1></Comp1>
      <Comp2></Comp2>
    </div>
  )
}

export default App




-------------------------------------------------------------------------------------------------
七、 Antd Design 初步引入

安裝 Antd Design

//使用 npm 安裝

npm install antd --save

//使用 yarn 安裝

yarn add antd


安裝圖標所需要的模塊

//使用 npm 安裝

npm install --save @ant-design/icons

//使用 yarn 安裝

yarn add @ant-design/icons



刪除剛剛測試的comp1、comp2 

安裝好後 ，去官網測試是否安裝成功

在App.tsx 內測試
import { useState } from 'react'
import { Button, Space } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      頂級組建
      <Button type="primary">我們的按鈕</Button>
      <UpCircleOutlined style={{ fontSize:'40px',color:'red'}} />
    </div>
  )
}

export default App

-------------------------------------------------------------------------------------------------------------
八、配置 Antd Design 樣式自動案需求引入

antd的 4.X版本 已經支援組件 按需求引入，我們只需要解決樣式上的自動按需求引入即可

安裝插件 vite-plugin-style-import

npm install vite-plugin-style-import@1.4.1 -D

安裝好後，在vite.config.ts中進行配置：

import styleImport,{AntdResolve} from 'vite-plugin-style-import';


plugins: [
    react(),
    styleImport({
      resolves:[
        AntdResolve()
      ],
    }),
  ],

到這邊會發現 package.json項目裡面少裝一個 LESS

要進行安裝

npm i less@2.7.1 -D

以前會順勢安裝 less loder
現在使用vite 就不用安裝他~


---------------------------------------------------------------------------------------------------------------

九、React 路由 -- 第一種配置方案 (舊項目中的寫法)
9.1 初步展示

我們在這裡模擬 Vue 中的home 和 about 兩個組件展示：

1.準備頁面：首先在SRC下創建views文件夾，views文件夾下面創建Home.tsx和About.tsx，大致代碼如下：

const View =()=>{
    return(
        <div className="home">
            <p>這是HOME組件</p>
        </div>
    )
}

export default View


2.配置對應關係： /src下 新建一個router文件夾，在新增一個index.tsx


import App from "../App"
import Home from "../views/Home"
import About from "../views/About"
import {BrowserRouter,Routes,Route} from "react-router-dom"
//兩種路由模式的組件：BrowserRouter (History模式)，HashRouter(Hash模式)

//const baseRouter =()=>{
    // return()
// }
// 以上寫法可以簡寫為：

const baseRouter =() =>(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default baseRouter

9.2 編程式導航--設置菜單點及跳轉

/src/App.tsx中，使用<link/>組件進行跳轉：

先引入 LINK，
import { Outlet,Link} from 'react-router-dom'

再把return的內容修改
  return (
    <div className="App">
      <Link to="/Home">Home</Link>
      <Link to="/About">About</Link>
    {/* 佔位符組件， 類似於窗口，用來展示組件的，有點像VUE中的Router-view*/}
      <Outlet></Outlet>
    </div>
  )
}


9.3 路由重定向



9.4 路由第二種方式-路由表寫法
首先，在創立一個index.tsx 內容如下→ 
import Home from "../views/Home"
import About from "../views/About"
import User from "../views/User"


//Navigate重定向組件
import {Navigate} from "react-router-dom"

const routes =[
{
    path:"/",
    element:<Navigate to="/home"/>
},
{
    path:"/home",
    element: <Home />
},
{
    path:"/about",
    element: <About />
},
{
    path:"/user",
    element: <User />
},
]

export default routes
再去Main.tsx 下面 確認ReactDOM資料如下→

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <BrowserRouter>
      <App />
   </BrowserRouter>
    
  </React.StrictMode>
)


再去APP.tsx 修改成HOOK形式的對象如下→
import { useState } from 'react'
// import { Button, Space } from 'antd';
// import { UpCircleOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';// or 'antd/dist/antd.less'  全局，全部組件樣式都引入
import { useRoutes,Link} from 'react-router-dom'
import router from "./router"

function App() {
  const [count, setCount] = useState(0)
  const outlet = useRoutes(router)
  return (
    <div className="App">
      <Link to="/Home">Home</Link>
      <Link to="/About">About</Link>
      <Link to="/User">User</Link>

      {/* 佔位符組件， 類似於窗口，用來展示組件的，有點像VUE中的Router-view*/}
      {/* <Outlet></Outlet> */}
      {outlet}
    </div>
  )
}

export default App

9.5 路由第二種方式 -路由懶加載

import Home from "../views/Home"
import About from "../views/About"
import User from "../views/User"

在ROUTER內的index.tsx中 一開始引入都是全部引入，需要做懶加載使效率更好

把引入方式修改成下：
import {lazy} from "react"
import Home from "../views/Home"
// import About from "../views/About"
// import User from "../views/User"
const About =lazy(()=>import("../views/About"))
const User =lazy(()=>import("../views/User"))


然後會出現錯誤訊息：
A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator.
懶加載的模式 需要我們給他添加一個 Loading組件

需再上方引入 
import React,{lazy} from "react"
懶加載需要再前面增加React.Suspense
{
    path:"/about",
    element: <React.Suspense fallback={<div>Loading...</div>}>
    <About />
    </React.Suspense>
},
{
    path:"/user",
    element: <React.Suspense fallback={<div>Loading...</div>}>
    <User />
    </React.Suspense>
},



會發現每次增加路由 就要多一個<React.Suspense fallback={<div>Loading...</div>}>    </React.Suspense> 加載
太麻煩了

在上面再寫一個const 函數
const withLoadingComponent =(comp:JSX.Element) =>(
    <React.Suspense fallback={<div>Loading...</div>}>
    {comp}
    </React.Suspense>
)
然後下方就可以帶入函數即可~

{
    path:"/about",
    element: withLoadingComponent(<About />)
},
{
    path:"/user",
    element: withLoadingComponent(<User />)
},




-----------------------------------------------------------------------------------------------------

