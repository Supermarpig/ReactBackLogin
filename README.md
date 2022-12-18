
### 登錄測試帳號：qdtest1
### 密碼：123456
### 驗證碼 ：888888

https://react-back-login-5ckv73hnn-supermarpig.vercel.app



UI組件庫 使用 Ant Design of React

https://ant.design/docs/react/introduce


以下是筆記
------------------------------------------------------------------------------------------
## 一、環境安裝
到自己的檔案路徑
```
npm init vite
```
y 創建

為檔案取名

找到react 

typeScript


將 dependencies
改成  
```
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^7.2.8",
    "react-router-dom": "6.4.4",
    "redux": "^4.2.0",
    "reset-css": "^5.0.1"
```
貼過來然後 下載 
```
npm i 
```
項目啟動  
```
npm run dev
```
創建成功~~ 

完善命令：

在dev 
```
  "scripts": {
    "dev": "vite --host --port 3002",  // --open  <-----npm run dev 就直接打開視窗
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
```
---------------------------------------------------------------------------------
## 二、清空原本的設定東西
開始在留下自己需求的東西

在src內

import引入內的東西都可以刪掉
最後剩
App.tsx
main.tsx
vite-env.d.ts 

APP 內 Return內可以渲染畫面


---------------------------------------------------------------------------------
## 三、樣式初始化
reset-css 
```
npm i reset-css
```
安裝完後 去main.tsx

//正確的樣式引入順序
//初始化樣式，一般放在最前面
import "reset-css"
//UI框架的樣式

//組件的樣式
import App from './App'
```
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```
---------------------------------------------------------------------------------
## 四、scss 的安裝和初步使用

安裝sass vite中很方便，loader這些不用自己配置，只需要安裝好即可使用。
```
npm i --save-dev sass
```
dev的意思是 devDependencies → 放在package.jason裡面 

dependencies :依賴工具→用戶會用到放這
devDependencies :開發工具→用戶不會用到放這

開始書寫東西~

新增一個資源文件夾 在SRC下面 (未來可能會有很多文件夾 EX. compoment、)

在assets內新增一個資料夾 "styles" 放樣式
新增一個檔案 global.scss  

內容：
```
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
```
-----------------------------------------------------------------------------------
## 五、配置項目的路徑別名

目前TS 對 @ 指向src目錄的提示是不支持的，
Vite默認也是不支持的。
所以需要手動配置 @ 符號的指向。

在vite.config.ts中添加配置
```
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
```
這時候引入path模塊會報錯，但其實我們已經有node，所以就已經有path模塊只是缺少ts的一些聲明配置。
所以需要安裝關於node這個庫的ts聲明配置
```
npm i -D @type/node
```
安裝成功後，就沒有報錯了。
如果import後面的path還是抱錯，可能是vite 版本過低。 
把 引入path 換成"import * as path from "path"就可以了;


### 5.2 配置路徑別名的提示

發現 打@/ 沒有路徑的提示

需要再tsconfig.json中：添加兩項配置
```
"complilerOptions":{
...
"baseUrl":"./",
"paths":{
"@/*":[
"src/*"
]
}
},
```

配置好後，輸入@ 後 就有路徑的資源提示了

-------------------------------------------------------------------------------------------------

# 六、 scss模塊化

## 6.1 scss 的進一步使用

src下新建compoment文件夾 然後再新增 Comp1 及 Comp2 兩個文件夾

在Comp1 中 新增 index.tsx 及 comp1.module.scss 文件

index.tsx 內容：
```
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

```
-----------------------------
// comp1.module.scss 內容：
```
.box{
    color:red;
    p{
       margin-top: 100px;
    }
}
```
------------------------------
在Comp2 中 新增 index.tsx 內容：
```

function Comp(){
    return(
        <div className="box">
        <p>這裡是Comp2裡面的內容</p>
        </div>
    )
}

export default Comp
```
-----------------------------------

在APP.tsx引入兩個comp1、comp2


App.tsx 內容：
```
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
```



-------------------------------------------------------------------------------------------------
# 七、 Antd Design 初步引入

安裝 Antd Design

//使用 npm 安裝
```
npm install antd --save
```
//使用 yarn 安裝
```
yarn add antd
```

安裝圖標所需要的模塊

//使用 npm 安裝
```
npm install --save @ant-design/icons
```
//使用 yarn 安裝
```
yarn add @ant-design/icons
```


刪除剛剛測試的comp1、comp2 

安裝好後 ，去官網測試是否安裝成功

在App.tsx 內測試
```
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
```
-------------------------------------------------------------------------------------------------------------
# 八、配置 Antd Design 樣式自動案需求引入

antd的 4.X版本 已經支援組件 按需求引入，我們只需要解決樣式上的自動按需求引入即可

安裝插件 vite-plugin-style-import
```
npm install vite-plugin-style-import@1.4.1 -D
```
安裝好後，在vite.config.ts中進行配置：
```
import styleImport,{AntdResolve} from 'vite-plugin-style-import';


plugins: [
    react(),
    styleImport({
      resolves:[
        AntdResolve()
      ],
    }),
  ],

```

到這邊會發現 package.json項目裡面少裝一個 LESS

要進行安裝
```
npm i less@2.7.1 -D
```
以前會順勢安裝 less loder
現在使用vite 就不用安裝他~


---------------------------------------------------------------------------------------------------------------

# 九、React 路由 -- 第一種配置方案 (舊項目中的寫法)
## 9.1 初步展示

我們在這裡模擬 Vue 中的home 和 about 兩個組件展示：

1.準備頁面：首先在SRC下創建views文件夾，views文件夾下面創建Home.tsx和About.tsx，大致代碼如下：
```
const View =()=>{
    return(
        <div className="home">
            <p>這是HOME組件</p>
        </div>
    )
}

export default View
```

2.配置對應關係： /src下 新建一個router文件夾，在新增一個index.tsx

```
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
```
## 9.2 編程式導航--設置菜單點及跳轉

/src/App.tsx中，使用<link/>組件進行跳轉：

先引入 LINK，
```
import { Outlet,Link} from 'react-router-dom'
```

再把return的內容修改

```
  return (
    <div className="App">
      <Link to="/Home">Home</Link>
      <Link to="/About">About</Link>
    {/* 佔位符組件， 類似於窗口，用來展示組件的，有點像VUE中的Router-view*/}
      <Outlet></Outlet>
    </div>
  )
}
```

## 9.3 路由重定向



#9.4 路由第二種方式-路由表寫法
首先，在創立一個index.tsx 內容如下→
``` 
import Home from "../views/Home"
import About from "../views/About"
import User from "../views/User"
```

//Navigate重定向組件
```
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
```

再去Main.tsx 下面 確認ReactDOM資料如下→
```
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <BrowserRouter>
      <App />
   </BrowserRouter>
    
  </React.StrictMode>
)
```

再去APP.tsx 修改成HOOK形式的對象如下→
```
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
```
## 9.5 路由第二種方式 -路由懶加載
```
import Home from "../views/Home"
import About from "../views/About"
import User from "../views/User"
```
在ROUTER內的index.tsx中 一開始引入都是全部引入，需要做懶加載使效率更好

把引入方式修改成下：

```
import {lazy} from "react"
import Home from "../views/Home"
// import About from "../views/About"
// import User from "../views/User"
const About =lazy(()=>import("../views/About"))
const User =lazy(()=>import("../views/User"))
```

然後會出現錯誤訊息：
A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator.
懶加載的模式 需要我們給他添加一個 Loading組件

需再上方引入 
```
import React,{lazy} from "react"
```
懶加載需要再前面增加React.Suspense

```
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
```


會發現每次增加路由 就要多一個<React.Suspense fallback={<div>Loading...</div>}>    </React.Suspense> 加載
太麻煩了

在上面再寫一個const 函數
```
const withLoadingComponent =(comp:JSX.Element) =>(
    <React.Suspense fallback={<div>Loading...</div>}>
    {comp}
    </React.Suspense>
)
```
然後下方就可以帶入函數即可~
```
{
    path:"/about",
    element: withLoadingComponent(<About />)
},
{
    path:"/user",
    element: withLoadingComponent(<User />)
},


```

-----------------------------------------------------------------------------------------------------
# 十、首頁布局的解決方案(含側邊欄)


去
https://ant.design/components/layout-cn
找一個喜歡的布局樣式

引入到將HOME舊的更換成喜歡的樣式

```
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
```
然後就會報錯~"~
可惡

----------->將antd版本降為   "antd": "^4.23.4"

就好了


在style.scss內的style 的golbal.css
新增首頁樣式

```


//首頁的布局樣式
#compoments-layout-demo-side .logo{
    height: 32px;
    margin: 16px;
    background: rgba(255,255,255,0.3);
}

.site-layout .site-layout-background{
    background: #FFF;
}

```

---------------------------------------------------------------------------------------------------------

# 調整頁面右側結構樣式的調整


```
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
} 

const items: MenuItem[] = [
  getItem('欄位 1', '1', <PieChartOutlined />),
  getItem('欄位 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左邊側邊攔 sider */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      {/* 右邊內容Layout */}
      <Layout className="site-layout">
        {/* 右邊頭部 */}
        <Header  className="site-layout-background" style={{ paddingLeft: '16px' }} >
          {/* 麵包屑 */}
        <Breadcrumb style={{ lineHeight:'64px' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        {/* 右邊內容 -白色框框區塊*/}
        <Content style={{ margin: '16px 16px 0' }} className="site-layout-background">
           {/* 之後窗口都可以放在這邊 */}
        </Content>
        {/* 右邊底部 */}
        <Footer style={{ textAlign: 'center',padding:0,lineHeight:'48px' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default View;
```

------------------------------------------------------------------------------------------------
# 點擊跳轉 -點擊左邊側邊攔 獲取到路徑



寫一個Function  

```
  const menuClick=(e:{key:string})=>{
    console.log("點擊了菜單",e.key);


    //點擊要跳轉到對應的路由
  }
```

在Menu後面加一個點擊事件
```
<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}  onClick={menuClick}/>
```



接下來使用HOOK 進行跳轉

在上面引入
```
import {useNavigate} from "react-router-dom"
```

就可以在頁面測試點及是否多一個路徑~

讚讚

但現在的路徑還沒有修改成我們所需要的路徑


先去新增兩個頁面

在Home 頁面下新增一個Page1.tsx、Page2.tsx
```
const View =()=>{
    return(
        <div className="home">
            <p>這是Page1頁面內容</p>
        </div>
    )
}

export default View
```


然後修改路由表

去router下的index.tsx新增

引入Page1 跟Page 2
```
const Page1 =lazy(()=>import("../views/Page1"))
const Page2 =lazy(()=>import("../views/Page2"))
```

下方routes 修改路徑位置：

```

const routes =[
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
    ]
}
// {
//     path:"/home",
//     element: withLoadingComponent(<Home />)
// },
// {
//     path:"/about",
//     element: withLoadingComponent(<About />)
// },
// {
//     path:"/user",
//     element: withLoadingComponent(<User />)
// },
]
```


然後回去Home頁面

在上方引入 Outlet屬性

```
import { Outlet,useNavigate} from "react-router-dom"
```


在下方return 裡面的窗口位置
```
        {/* 右邊內容 -白色框框區塊*/}
        <Content style={{ margin: '16px 16px 0' }} className="site-layout-background">
           {/* 之後窗口都可以放在這邊 */}
            <Outlet/>
        </Content>
```

這樣切換頁面 就會顯示在右方白色窗口內了~

灑花~

-------------------------------------------------------------------------------------------------------
# 增加功能 點擊其他Menu時，其他Menu會關閉


先去看文檔 ，是否有屬性可以做修改


發現下面API有所需要的功能

```
onOpenChange	SubMenu 展開/關閉的回調	function(openKeys: string [ ])
```

返回APP.tsx
新增onOpenChange事件


在 Menu添加事件
```
       <Menu 
            theme="dark" 
            defaultSelectedKeys={['/Page1']} 
            mode="inline" 
            items={items}  
            onClick={menuClick}
            //某項菜單 ，展開和回收的事件
            onOpenChange={handleOpenChange}
          />
```

在外面添加事件的函數 ，並帶入keys:string[]測試他會打印出什麼東西
```
  const handleOpenChange=(keys:string[])=>{
    //甚麼時候執行這個函數裡面的代碼?  => 展開和回收某項菜單時，執行這裡的代碼
    console.log(keys) //keys是一個數組，紀錄了當前是哪一項展開的(用key來記錄)
  }
```


接下來再設定他只要顯示最後一個key => 顯示的key會展開 ，所以只要顯示最後一個key

```
 const [openKeys, setOpenKeys] = useState(['']);
  const handleOpenChange=(keys:string[])=>{
    //甚麼時候執行這個函數裡面的代碼?  => 展開和回收某項菜單時，執行這裡的代碼
    // console.log(keys) //keys是一個數組，紀錄了當前是哪一項展開的(用key來記錄)
    //把這個數組修改成最後一項，因為只要一項是展開的。就是我剛剛點擊的那一項。
    setOpenKeys([keys[keys.length-1]])
  }
```

然後依樣要在Menu添加事件

```
<Menu 
            theme="dark" 
            defaultSelectedKeys={['/Page1']} 
            mode="inline" 
            items={items}  
            onClick={menuClick}
            //某項菜單 ，展開和回收的事件
            onOpenChange={handleOpenChange}
            //當前菜單展開的key數組
            openKeys={openKeys}
          />
```

--------------------------------------------------------------------------------------------------------------
# 菜單欄 -組件的抽取

因為目前是寫在Menu.tsx下面，未來Menu會越寫越多，所以需要把組件提取出來。

在components下新增一個資料夾 叫MainMenu 
在新增一個檔案 叫index.tsx

將Home.tsx內部 Menu 需要的東西貼到這邊
```
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate} from "react-router-dom"
import React, { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
} 
const items: MenuItem[] = [
  getItem('欄位 1', '/Page1', <PieChartOutlined />),
  getItem('欄位 2', '/Page2', <DesktopOutlined />),
  getItem('User', 'page3', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'page4', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '7')]),
  getItem('Files', '8', <FileOutlined />),
];
//組件內部的東西
const Comp: React.FC = () => {

    const navigatTO =useNavigate();

  const menuClick=(e:{key:string})=>{
    console.log("點擊了菜單",e.key);


    //點擊要跳轉到對應的路由 編程式導航 ，利用HOOK導航
    navigatTO(e.key);

  }
  const [openKeys, setOpenKeys] = useState(['']);
  const handleOpenChange=(keys:string[])=>{
    //甚麼時候執行這個函數裡面的代碼?  => 展開和回收某項菜單時，執行這裡的代碼
    // console.log(keys) //keys是一個數組，紀錄了當前是哪一項展開的(用key來記錄)
    //把這個數組修改成最後一項，因為只要一項是展開的。就是我剛剛點擊的那一項。
    setOpenKeys([keys[keys.length-1]])
  }
return(
     <Menu 
            theme="dark" 
            defaultSelectedKeys={['/Page1']} 
            mode="inline" 
            items={items}  
            onClick={menuClick}
            //某項菜單 ，展開和回收的事件
            onOpenChange={handleOpenChange}
            //當前菜單展開的key數組
            openKeys={openKeys}
          />
)
}

export default Comp;
```

然後Home.tsx 內需要引入 剛剛MainMenu 下的index.tsx檔案


```
import  MainMenu   from "@/components/MainMenu";
```

在下方return 中引入 MainMenu

```
  {/* 左邊側邊攔 sider */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
       <MainMenu/>
      </Sider>
```

這樣就完成拉

以後要操作Menu就可以在這邊操作

----------------------------------------------------------------------------------------------
# 菜單數據整理

原本數據看起來不太直觀
寫一個直接看得動的樣式
原本數據如下：
```
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
} 
const items: MenuItem[] = [
  getItem('欄位 1', '/Page1', <PieChartOutlined />),
  getItem('欄位 2', '/Page2', <DesktopOutlined />),
  getItem('User', 'page3', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'page4', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '7')]),
  getItem('Files', '8', <FileOutlined />),
];
```

修改成下面這樣，未來也比較好維護

```
//登入請求到數據之後，就可以跟item這個數組進行匹配
const items: MenuItem[] = [
  {
    label:'欄位 1',
    key: '/Page1',
    icon: <PieChartOutlined />,
  },
  {
    label:'欄位 2',
    key: '/Page2',
    icon: <DesktopOutlined />,
  },
  {
    label:'欄位 3',
    key: 'page3',
    icon: <UserOutlined />,
    children: [
      {
        label:'欄位 301',
        key: '/page3/page301',
      },
      {
        label:'欄位 302',
        key: '/page3/page302',
      },
      {
        label:'欄位 303',
        key: '/page3/page303',
      },
        
    ]
  },
  {
    label:'欄位 4',
    key: 'page4',
    icon: <TeamOutlined />,
    children: [
      {
        label:'欄位 401',
        key: '/page4/page401',
      },
      {
        label:'欄位 402',
        key: '/page4/page402',
      },       
    ]
  },
  {
    label:'欄位 5',
    key: '/Page5',
    icon: <FileOutlined />,
  },
]
```

---------------------------------------------------------------------------------------------
# 將剩下的Menu配置一下他們的路徑


將About.tsx 更改名稱為Page301.tsx

然後去router 內的index.tsx 新增301的路徑

上方引入301
```
const Page301 =lazy(()=>import("../views/Page301"))
```
下方routes新增301的頁面
```
       {
        path:"/page3/page301",
        element: withLoadingComponent(<Page301 />)
       } ,
```


然後怕用戶輸入不是上面的連結 ，再新增一串
```
//假設User隨便輸入不是裡面的網址  返回page1 ，專門去寫一個404頁面也可以
{
    path:"*",
    element: <Navigate to="/page1"/>
}
```

-------------------------------------------------------------------------------------------------
# 菜單欄 -F5刷新時，默認當前選中的樣式

去MainMenu 內的index.tsx中

引入 useLocation

```
import { useNavigate,useLocation} from "react-router-dom"
```

在下方組件內部的東西
新增他的宣告

```
  const navigatTO =useNavigate();
  const currentRoute=useLocation();
  // console.log(currentRoute.pathname)
  const menuClick=(e:{key:string})=>{
    // console.log("點擊了菜單",e.key);
    //點擊要跳轉到對應的路由 編程式導航 ，利用HOOK導航
    navigatTO(e.key);

  }
```

然後再下方return的Menu 把/page1修改成變數 代碼如下：

```
 <Menu 
            theme="dark" 
            //表示當前選中樣式的路徑
            defaultSelectedKeys={[currentRoute.pathname]} 
            mode="inline" 
            //菜單項的數據
            items={items}  
            onClick={menuClick}
            //某項菜單 ，展開和回收的事件
            onOpenChange={handleOpenChange}
            //當前菜單展開的key數組
            openKeys={openKeys}
          />
```
----------------------------------------------------------------------------------
# 菜單欄-配置初始展開項的思路分析
－＞白話文的意思是：假設選到301 重新整理的時候，301的菜單來需要是打開來的

在 OpenKeys 中 ，一開始載入時顯示為空''，所以會關起來。
```
  const [openKeys, setOpenKeys] = useState(['']);
```

思路：
拿著currentRoute.pathname 跟items 數組的每一項children的key值去做對比，如果找到相等了。就要他上一級的key
這個key給到openKeys的數組元素，作為初始值。

實現完整代碼如下：

```
 //拿著currentRoute.pathname 跟items 數組的每一項children的key值去做對比，如果找到相等了。就要他上一級的key
  //這個key給到openKeys的數組元素，作為初始值。

  let firstOpenKeys:string=""
  //在這裡做對比
  function findKey(obj){
    return obj.key=== currentRoute.pathname
  }
  //要對比多個children
  for(let i=0;i<items.length;i++){
    //判斷找到找不到
    if( items[i]['children'] && items[i]['children'].length > 0 && items[i]['children'].find(findKey)){
      firstOpenKeys=items[i].key
      break
    }
  }
  // items[]['children'].find(findKey) //這個結果如果找到的是一個對象，轉布爾值 true 如果找不到就顯示false


  //設置展開項的初始值
  const [openKeys, setOpenKeys] = useState([firstOpenKeys]);

```

但還沒轉TS所以還會報錯  >____________<


##解決items[i]!['children']的紅色曲線警告：
我們在項目中的 tsconfig.json文件中添加：
```
"suppressImpliciAnyIndexErrors":true
```
選項，重啟vscode!

然後代碼修改成下方樣子：

```
 function findKey(obj:{key:string}){
    return obj.key=== currentRoute.pathname
  }
  //要對比多個children
  for(let i=0;i<items.length;i++){
    //判斷找到找不到
    if( items[i]!['children'] && items[i]!['children'].length > 0 && items[i]!['children'].find(findKey)){
      firstOpenKeys=items[i]!.key as string;
      break
    }
  }
```


這樣基本的路由就大致上完成拉~~~


---------------------------------------------------------------------------------------------------------

# 登陸頁面
## 登陸頁面基本配置

/src/views/下創建以下目錄：
```
|---views
    |---Login
        |---index.tsx
        |---init.ts
        |---login.module.scss
```

/src/views/Login/index.tsx

在上面引入

```
import Login from "../views/Login"

```
在下面新增路由


```
{
    path:"/login",
    element: <Login />
},
```

然後來去新增scss資料夾 取名 loginmodule.scss

```
.loginPage{

}
```

引入到剛剛的index.ts 頁面中

```
import styles from "./login.module.scss"

const view =()=>{
    return (
        <div className={styles.loginPage}>
            登錄頁面
        </div>
    )
}

export default view
```

再來引入這份寫好的背影畫面~ ini.ts

```
export default function initLoginBg(){
  var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
// var windowWidth = window.clientWidth;
// var windowHeight = window.clientHeight;
var canvas = document.getElementById('canvas') as HTMLCanvasElement,
ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
w = canvas.width = windowWidth,
h = canvas.height = windowHeight,

hue = 217,
stars:IntStart[] = [],
count = 0,
maxStars = 1500;//星星数量

var canvas2 = document.createElement('canvas') ,
ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
canvas2.width = 100;
canvas2.height = 100;
var half = canvas2.width / 2,
gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, '#CCC');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

// End cache

function random(min:number, max=0) {
if (arguments.length < 2) {
  max = min;
  min = 0;
}

if (min > max) {
  var hold = max;
  max = min;
  min = hold;
}

return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x:number, y:number) {
var max = Math.max(x, y),
  diameter = Math.round(Math.sqrt(max * max + max * max));
return diameter / 2;
//星星移动范围，值越大范围越小，
}
interface IntStart{
orbitRadius:number;
radius:number;
orbitX:number;
orbitY:number
timePassed:number;
speed:number;
alpha:number;
draw:()=>void;
}
var Star = function(this: IntStart) {

this.orbitRadius = random(maxOrbit(w, h));
this.radius = random(60, this.orbitRadius) / 18; 
//星星大小
this.orbitX = w / 2;
this.orbitY = h / 2;
this.timePassed = random(0, maxStars);
this.speed = random(this.orbitRadius) / 500000; 
//星星移动速度
this.alpha = random(2, 10) / 10;

count++;
stars[count] = this;
}

Star.prototype.draw = function() {
var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
  y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
  twinkle = random(10);

if (twinkle === 1 && this.alpha > 0) {
  this.alpha -= 0.05;
} else if (twinkle === 2 && this.alpha < 1) {
  this.alpha += 0.05;
}

ctx.globalAlpha = this.alpha;
ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
new Star.prototype.constructor();
}

function animation() {
ctx.globalCompositeOperation = 'source-over';
ctx.globalAlpha = 0.5; //尾巴
ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
ctx.fillRect(0, 0, w, h)

ctx.globalCompositeOperation = 'lighter';
for (var i = 1, l = stars.length; i < l; i++) {
  stars[i].draw();
};

window.requestAnimationFrame(animation);
}

animation();
}
```

接下來回去index.tsx頁面
新增一個 

```
            {/* 存放背景畫面 */}
        <canvas id="canvas" style={{display:"block"}}></canvas>
```

上方引入 ini.ts 的這個檔案

```
import initLoginBg from "./ini.ts"
```

這時候會發現 "./ini.ts" 下方有~~~~~波浪報錯

要去全局做聲明的檔案 vite-env.d.ts 下面增加一行

```
declare module "*.ts"
```

這時候就沒有紅色波浪了~~~~~~~


→未來想引入 png、jpg 檔案都可以來這裡引入


接下來加載完組件需要做初始化


在上方引入useEffect 

```
import { useEffect } from "react"
```

下方新增初始化狀態

```
    //加載完這個組件之後，需要初始化
    useEffect(()=>{
        initLoginBg();
        window.onresize = function(){initLoginBg()}; //假設畫面變動時，在自適應畫面
    },[])
```



接下來新增登錄盒子
```
  return (
        <div className={styles.loginPage}>
            {/* 存放背景畫面 */}
        <canvas id="canvas" style={{display:"block"}}></canvas>
            {/* 登錄的盒子 */}
            <div className={styles.loginBox+ " loginbox"}>
              {/* 標題部分 */}
                    <div className={styles.title}>
                    <h1>練習用&nbsp;·&nbsp;通用後台系統</h1>
                    <p>Strive Everyday</p>
                    </div>
            </div>
        
        </div>
    )
```

然後新增scss畫面樣式
```
.loginPage{
    position: relative;
    .loginBox{
        width: 450px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        color:#fff;
  
        h1{
            font-weight: bold;
            font-size: 22px;
            text-align: center;
            color:#fff;
        }
        p{
            text-align: center;
            margin: 20px 0;
        }
        .title{
            margin-bottom: 40px;
            position: relative;
            &:before,&:after{
                content:"";
                width: 100px;
                height: 2px;
                position: absolute;
                background: linear-gradient(to right,rgba(255,255,255,0),#1976D2);
                left: -20px;
                top:18px;
            }
            &:after{
                left: auto;
                background: linear-gradient(to left,rgba(255,255,255,0),#1976D2);
                right: -20px;
            }
        }
    }
  }
```
------------------------------------------------------------------------------------------
#登錄頁面-登錄表單組件的構建

##首頁表單的繪製

找到Antd中，表單組件頁面  https://4x.ant.design/components/input-cn/
雖然有表單Form組件
但自由度不高

所以使用input組件



去/src/views/Login/index.tsx中：
上方引入input
```
import { Input } from 'antd';
```
在表單部分引入剛剛複製的input

```
     {/* 表單部分 */}
     <div className="form">
      <Input placeholder="Basic usage" />;
     </div>
```

燈愣  出現錯誤

找了一陣子
發現是less文件當中，官方vite本身錯誤 ，找less解析不了

回去 vite.config.ts檔案

把他Mark掉 代碼如下：

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import styleImport,{AntdResolve} from 'vite-plugin-style-import';
import * as path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // styleImport({
    //   resolves:[
    //     AntdResolve()
    //   ],
    // }),
  ],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  }
})

```

然後回到  Login/index.tsx

將他官方文檔的全局樣式 引入

```
import 'antd/dist/antd.css';
```

input 框就有樣式了!!!!!

然後新增密碼框

```
    {/* 表單部分 */}
    <div className="form">
    <Input placeholder="帳號" />
    <Input.Password placeholder="密碼" />
    </div>
```

但是這樣兩個間距 太近了!!

回去antd這UI組件庫
都有間距的功能回去找一下~

發現有一個space 垂直間距 的寫法
是使用<space></space>將東西包起來


在上方先 引入 <space>
```
import { Input,Space } from 'antd';
```


下方將剛剛帳號密碼包起來

```
{/* 表單部分 */}
<div className="form">
<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
<Input placeholder="帳號" />
<Input.Password placeholder="密碼" />
</Space>
</div>
```

接下來新增登錄按鈕
一樣上方引入Button

```
import { Input,Space,Button } from 'antd';
```

下方表單部分新增登錄按鈕
```
{/* 表單部分 */}
                    <div className="form">
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="帳號" />
                        <Input.Password placeholder="密碼" />
                        <Button type="primary" block>登錄</Button>
                    </Space>

```


但不想要原本的白色底的樣式，如果是透明的樣式會更好看
需要改變UI組件的樣式

再引入Style.loginBox後面增加一個 我們自己定義的樣式.loginBox

```
            {/* 登錄的盒子 */}
            <div className={styles.loginBox+ " loginbox"}>
```

然後創建一個檔案  loging.less

在index.tsx 中引入這個檔案

```
import './login.less'
```


然後去login.less中修改樣式
變成透明且 藍色邊框

```
.loginbox{
    .ant-input, .ant-input-password{
        background-color: rgba(255,255,255,0);
        border-color: #1890ff;
        color:#FFFFFF;
    }
    .ant-input-password-icon,.ant-input-password-icon:hover{
        color:#1890ff;
    }
}
```


-----------------------------------------------------------------------------------------------

#登錄頁面-驗證碼模塊布局


需要放一個DIV  裡面放一個input +驗證碼圖片


在密碼下面， 登錄上面 新增DIV 模塊

通常驗證碼叫做captchaBox


```
<Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="帳號" />
                        <Input.Password placeholder="密碼" />
                        <div className="captchaBox">
                            <Input placeholder="驗證碼" />
                            <div className="captchaImg">
                                <img height="38" src="http://www.zendei.com/js/img.php?url=https://img2018.cnblogs.com/blog/1735560/201911/1735560-20191109220533186-1855679599.jpg" alt="" />
                            </div>
                        </div>
                        <Button type="primary" className="loginBtn" block>登錄</Button>
                    </Space>
```

新增模塊完成
然後要修改樣式 
去剛剛的login.tsx修改

```
.loginbox{
    //控制表單元素樣式
    .ant-input, .ant-input-password{
        background-color: rgba(255,255,255,0);
        border-color: #1890ff;
        color:#FFFFFF;
        height: 38px;
    }
    .ant-input-password .ant-input{
        height: 28px;
    }
    //對眼睛圖標控制
    .ant-input-password-icon,.ant-input-password-icon:hover{
        color:#1890ff;
    }
    //控制驗證碼盒子
    .captchaBox{
        display: flex;
        .captchaImg{
            margin-left: 20px;
            cursor:pointer; //移到上面變成手指頭
        } 
    }

    //控制登錄按鈕
    .loginBtn{
        height: 38px;
    }
}
```


完成~


------------------------------------------------------------------------------------------------------
#登錄頁面-placeholder字體顏色的控制


目前字體內是白色 ，看起來有點不一至
想把顏色改為藍色

在login.less內新增字體顏色

```
  .ant-input::-webkit-input-placeholder{
        // color: #1890ff;
        color: #1890ff;   //顏色
        opacity: .5;	//透明度
    }
```

----------------------------------------------------------------------------------------------------

#登錄頁面-獲取用戶輸入的用戶名

在用戶名稱那邊 新增一個onChange事件

```
  <Input placeholder="帳號"  onChange={usernameChage}/>
```


然後再上方輸入一個函數

```
    //獲取用戶輸入訊息
    const usernameChage=(e:ChangeEvent<HTMLInputElement)=>{
        console.log(e.target.value)
    }
```
來測試 是否有得到輸入內容

然後在上方引入useState

```
import { ChangeEvent, useEffect,useState  } from "react"
```

定義 一個空數組，
設置變量名稱，給用戶輸入
如果用戶輸入訊息onchange就傳給空數組

```
    //獲取用戶輸入訊息
    const[usernameVal,setusernameVal] =useState("") //定義用戶輸入訊息
    const usernameChage=(e:ChangeEvent<HTMLInputElement>)=>{
        //獲取用戶輸入的用戶名
        console.log(e.target.value);
        setusernameVal(e.target.value)
    }
```


密碼 與 驗證碼 同理~

一樣新增

以下為代碼：
```
const[usernameVal,setusernameVal] =useState("") //定義帳號輸入訊息
    const[passwordVal,setpasswordVal] =useState("") //定義密碼輸入訊息
    const[captchaVal,setcaptchaVal] =useState("") //定義驗證碼輸入訊息
    const usernameChage=(e:ChangeEvent<HTMLInputElement>)=>{
        //獲取用戶輸入的用戶名
        // console.log(e.target.value);
        //修改usernameVal這個變量為用戶輸入值，以後拿到usernameVal這個變量就相當於得到用戶訊息
        setusernameVal(e.target.value)
    }
    const passwordChage=(e:ChangeEvent<HTMLInputElement>)=>{
        setpasswordVal(e.target.value)
    }
    const captchaChage=(e:ChangeEvent<HTMLInputElement>)=>{
        setcaptchaVal(e.target.value)
    }

    //點擊登錄按鈕
    const gotoLogin=()=>{

    }

    return (
        <div className={styles.loginPage}>
            {/* 存放背景畫面 */}
        <canvas id="canvas" style={{display:"block"}}></canvas>
            {/* 登錄的盒子 */}
            <div className={styles.loginBox+ " loginbox"}>
                    {/* 標題部分 */}
                    <div className={styles.title}>
                    <h1>練習用&nbsp;·&nbsp;通用後台系統</h1>
                    <p>Strive Everyday</p>
                    </div>
                    {/* 表單部分 */}
                    <div className="form">
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="帳號"  onChange={usernameChage}/>
                        <Input.Password placeholder="密碼" onChange={passwordChage} />
                        <div className="captchaBox">
                            <Input placeholder="驗證碼" onChange={captchaChage} />
                            <div className="captchaImg">
                                <img height="38" src="http://www.zendei.com/js/img.php?url=https://img2018.cnblogs.com/blog/1735560/201911/1735560-20191109220533186-1855679599.jpg" alt="" />
                            </div>
                        </div>
                        <Button type="primary" className="loginBtn" block>登錄</Button>
                    </Space>

                    </div>

            </div>
        </div>
    )
```

然後新增一個onClick事件在登錄按鈕上

```
<Button type="primary" className="loginBtn" block onClick={gotoLogin}>登錄</Button>

```

測試是否可以把值傳出去
```
    //點擊登錄按鈕
    const gotoLogin=()=>{
        console.log("用戶輸入的用戶名，密碼，驗證碼分別是：",usernameVal,passwordVal,captchaVal)
    }

```


測試完成可以收到用戶輸入的訊息


-----------------------------------------------------------------------------------------------

# redux-dev-tools 工具安裝

去GOOGLE CHROME應用商店 新增三個應用程式

## 1. redux-devtools
## 2. Vue.js devtools
## 3. React Context DevTool

在CHROME 內 右上角三個點 →更多工具→擴充功能 內可以檢視 是否安裝完成


-----------------------------------------------------------------------------------------------
# ReactRedux的基本配置

## 安裝Redux 和 ReactRedux

```
npm i redux react-redux --save
```

/src下新增store，新建index.ts 文件 及 reducer.ts 文件

```
import {legacy_createStore} from "redux"
import reducer from "./reducer.ts"

const store = legacy_createStore(reducer);

export default store
```

## 開始寫數據到數據倉庫

去reducer.ts文件內寫數據

```
const defaultState={
    num: 20
 
}

let reducer = (state =defaultState,)=>{
    let newState = JSON.parse(JSON.stringify(state))

    return newState
}

export default reducer
```

接下來就可以去使用這些組件，來新增資料

要新增資料之前  ，先去main.tsx 檔案內  引入狀態管理的資料 引入provider

```
import {Provider} from "react-redux"

```

然後Provider 需要放在最外層

```
 <Provider >

   <BrowserRouter>
      <App />
   </BrowserRouter>
    

  </Provider>
```

這時候會會出現一個紅色波浪的錯誤，是因為缺少了一個必傳的屬性 store

store 就是我們剛剛創立的倉庫

所以這時候記得要引入我們剛剛的資料倉庫

```
//狀態管理
import {Provider} from "react-redux"
import store from '@/store'
```


下方代碼如下：
```
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store} >
   <BrowserRouter>
      <App />
   </BrowserRouter>
  </Provider>
 
)

```

##接下來 在組件中獲取倉庫數據


在Page1.tsx 檔案中
使用HOOK 函數中的useSelector 來獲取 倉庫的數據


```
import {useSelector} from "react-redux";

const View =()=>{
//獲取倉庫的數據
const {num} =useSelector((state)=>({
    num:state.num
}))

    return(
        <div className="home">
            <p>這是Page1頁面內容</p>
            <p>{num}</p>
        </div>
    )
}

export default View
```
這時候 到/page1就能看到畫面出來剛剛的num 20的數字
但是點選F12 內的Redux 倉庫中沒有東西出來

這時候需要到store內 新增下面這個配置項目
為了瀏覽器正常使用 redux-dev-tools插件

```

//創建數據倉庫
const store = legacy_createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__());

export default store

```
這時候返回F12 的Redux就可以看到state裡面有num:20的資料


------------------------------------------------------------------------------------------
## 接下來 新增按鈕 來讓剛剛的num ++

在剛剛Page1.tsx中新增按鈕 然後增加onclick事件

```
  return(
        <div className="home">
            <p>這是Page1頁面內容</p>
            <p>{num}</p>
            <button onClick={changeNum}>按鈕</button>
        </div>
    )
```

然後在外面新增 函數 事件
先在上方引入 useDispatch才可以改變數據
```
import {useSelector,useDispatch} from "react-redux";
```
再來新增函數
```
//修改倉庫數據
const dispatch= useDispatch()
const changeNum =()=>{
    // dispatch({type:"字符串(認為是一個記號)",val:3})   type 是固定的 ，Val是自定義的
    dispatch({type:"add"})
}
```

當使用dispatch 會來觸發Reducer.ts 裡面的內容

在reducer 新增console.log("執行了reducer") 來確認一下 是否有執行

```
let reducer = (state =defaultState,)=>{
    console.log("執行了reducer")

    let newState = JSON.parse(JSON.stringify(state))


    return newState
}
```

返回網頁 看F12 有結果出來~~
證明代碼沒問題!!!!!!!!
灑花!!!!!!~~~~!@#$%*()(*&^%$#@!


確認沒問題後，在reducer後面新增 action 事件來讓他num 的深拷貝資料++

```
//用來管理數據的文件

const defaultState={
    // 準備數據資料數量
    num: 20
}

let reducer = (state =defaultState,action:{type:string,val:number})=>{
    //調用dispatch執行這裡的代碼
    // console.log("執行了reducer")
    //深拷貝
    let newState = JSON.parse(JSON.stringify(state))

    switch(action.type){
        case "add1":
            newState.num++
            break;
        case "add2":
            newState.num+=action.val
            break;
        default:
            break;
    }

    return newState
}

export default reducer
```

結論：
```
→	通過useSelector來獲取倉庫的數據
→	通過useDispath修改倉庫數據
```


接下來要修改檔案中紅色波浪的問題
```
//通過useSelector來獲取倉庫的數據
const {num} =useSelector((state)=>({
    num:state.num
}))
```
num下方的波浪是說 沒有存在num 是ts的報錯

新建一個types 資料夾 裡面新增store.d.ts

內容新增
```
// 【重點】類型聲明裡面不要直接使用引入import...from...
// 而是使用 import("@/store") 這種語法
// import store from "@/store"
// TS中提供了ReturnType，用来获取函数类型的返回值
type RootState = ReturnType<typeof import("@/store").getState>
```
返回Page1.tsx內將RootState加到 state中
```
//通過useSelector來獲取倉庫的數據
const {num} =useSelector((state:RootState)=>({
    num:state.num
}))
```
這樣 num的紅色~~~~就消失囉^___________________^


發現Store 內的index.ts
也發現紅色~~~~~錯誤

在說明沒有那個東西

在剛剛 
Store.d.ts
新增一個全局聲明
```
interface Window{
    __REDUX_DEVTOOLS_EXTENSION__:function 
}
```

這樣就解決兩個波浪問題了

-------------------------------------------------------------------------------------------------
# react-redux 數據和方法 從reducer中進行抽離

未來可能很多的方法及數據 都會放在reducer.ts 檔案內
代碼就會變得很長、很亂
所以需要把 方法從模塊中抽取出來

新建一個資料夾在 /store下面 叫做 NumStatus
裡面新增一個 index.ts檔案

```
export default {
    state:{
        // 準備數據資料數量
        num: 20
    },
    actions:{
        add1(newState:{num:number},action:{type:string}){
            newState.num++
        },
        add2(newState:{num:number},action:{type:string,val:number}){
            newState.num+= action.val
        },
    }
}
```

再來將 reducer.ts 中修改成模塊 

代碼如下：
```
import handleNum from "./NumStatus"

//用來管理數據的文件
const defaultState={
    // num:NumStatus.state.num //這種數據一多 ，要寫很多次
    ...handleNum.state //解構的寫法
}

let reducer = (state =defaultState,action:{type:string,val:number})=>{
    //調用dispatch執行這裡的代碼
    // console.log("執行了reducer")
    //深拷貝
    let newState = JSON.parse(JSON.stringify(state))

    switch(action.type){
        case "add1":
            handleNum.actions.add1(newState,action)
            break;
        case "add2":
            handleNum.actions.add2(newState,action)
            break;
        default:
            break;
    }

    return newState
}

export default reducer
```

未來就可以去Number 下新增、修改 index.ts資料就可以了~


--------------------------------------------------------------------------------------------

# React-redux方法統一管理


把NumStatus內的代碼在下面新增 名字統一管理

```
 //名字統一管理
    add1:"add1",
    add2:"add2",
```
在把Reducer.ts 修改成
```
switch(action.type){
        case handleNum.add1:
            handleNum.actions[handleNum.add1](newState,action)
            break;
        case handleNum.add2:
            handleNum.actions[handleNum.add2](newState,action)
            break;
        default:
            break;
    }
```

這樣就可以 修改NumStatus資料即可。



在新增一個ArrStatus資料夾 下方新增 index.ts
內容修改成
array.push樣式
如下：
```
export default {
    state:{
        // 準備數據資料數量
        sarr:[10,20,30] 
    },
    actions:{
        sarrpush(newState:{sarr:number[]},action:{type:string,val:number}){
            newState.sarr.push(action.val)
        },
        
    },
    //名字統一管理
    sarrpush:"sarrpush",
  
}

```

寫好然後回到 reducer 進行引入

```
import handleArr from "./index"



//用來管理數據的文件
let reducer = (state ={...handleArr.state},action:{type:string,val:number})=>{
    //調用dispatch執行這裡的代碼
    // console.log("執行了reducer")
    //深拷貝
    let newState = JSON.parse(JSON.stringify(state))

    switch(action.type){
        case handleArr.sarrpush:
            handleArr.actions[handleArr.sarrpush](newState,action)
            break;
        default:
            break;
    }

    return newState
}

export default reducer

```

------------------------------------------------------------------------------------------------------
# 優化Switch ...case... 代碼

switch 的作法是拿的 action.type和case後面的每一個進行對比，這種做法很像遍歷。

所以來進行優化

去NumStatus下的 index.ts 文件中
把add:"add1"
修改成Obj格式

```
   //名字統一管理
    // add1:"add1",
    // add2:"add2",
    actionNames:{
        add1:"add1",
        add2:"add2",
    }
```

再去reducer.ts把switch.case修改如下：

```
import handleNum from "./index"



//用來管理數據的文件
let reducer = (state ={...handleNum.state},action:{type:string,val:number})=>{
    //調用dispatch執行這裡的代碼
    // console.log("執行了reducer")
    //深拷貝
    let newState = JSON.parse(JSON.stringify(state))

    //思路： switch 的作法是拿的 action.type和case後面的每一個進行對比，這種做法很像遍歷。
    //那我們就把case後面的這些值 做成對象Obj，actionNames
    // switch(action.type){
    //     case handleNum.add1:
    //         handleNum.actions[handleNum.add1](newState,action)
    //         break;
    //     case handleNum.add2:
    //         handleNum.actions[handleNum.add2](newState,action)
    //         break;
    //     default:
    //         break;
    // }
    //優化：上面這樣寫，我們每天加一個方法，都要在這裡多寫一句case

    //拿著action.type和actionName進行每一項的對比，如果是相等，就調用 模塊名.action[下標](newState,action)

    for(let key in handleNum.actionNames){
        //key是每一個健
        //判斷是不是相等
        if(action.type===handleNum.actionNames[key]){
            handleNum.actions[handleNum.actionNames[key]](newState,action);
            break;
        }
    }
    //這樣寫就達到，每次寫一個方法都不需要再手動添加這裡的case
    //可以解放雙手~~~~


    return newState
}

export default reducer
```

這樣就完成reducer.ts 的優化拉~

# 接下來 來優化index.ts的檔案

把剛剛測試的 修改成如下代碼：

```
    //名字統一管理
    // add1:"add1",
    // add2:"add2",
    // actionNames:{
    //     add1:"add1",
    //     add2:"add2",
    // }
    actionNames:{}
```

再來下面新增一個全局函數然後賦值給剛剛的obj，代碼如下：
```
//我們現在想做到的是：
//actionNames自動生成，不用我每一次添加一個方法，都要在actionNames手動添加值，這樣很麻煩

//定義一個全局的actionNames
let actionNames={}
//actionNames 有多少對key,取決於action裡有多少個函數，所以遍歷store.actions,給actionName添加key

for (let key in store.actions){
    actionNames[key]=key;
}
//把裡面的OBJ賦值
store.actionNames=actionNames;
```
-----------------------------------------------------------------------
# 接下來優化 ArrStatus

把剛剛優化完的代碼 複製 貼過來整理一下就可以了
/ArrStatusi/index.ts 代碼如下：

```
const store= {
    state:{
        sarr:[10,20,30] 
    },
    actions:{
        sarrpush(newState:{sarr:number[]},action:{type:string,val:number}){
            newState.sarr.push(action.val)
        },
    },
    sarrpush:"sarrpush",
    actionNames:{},
}
let actionNames={}
for (let key in store.actions){
    actionNames[key]=key;
}
store.actionNames=actionNames;

export default store
```
/ArrStatusi/reducer.ts 代碼如下：

```
import handle from "./index"
let reducer = (state ={...handle.state},action:{type:string,val:number})=>{
    let newState = JSON.parse(JSON.stringify(state))
    for(let key in handle.actionNames){
        if(action.type===handle.actionNames[key]){
            handle.actions[handle.actionNames[key]](newState,action);
            break;
        }
    }
    return newState
}
export default reducer
```


之後未來新增 XXX Status檔案
只需要修改 index.ts 的
state 及 action 裡面都資料即可
其他都自動生成




-----------------------------------------------------------------------------------------------
# redux-thunk  setTimeOut異步的解決方案

redux-thunk相比於redux-saga，體積小，靈活，但需要自己手動抽取及封裝，但學習成本低。

需在項目 目錄下安裝redux-thunk

```
npm i redux-thunk
```

然後去 /store/index.ts文件內引入一下 ：

```
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
```

還要需 /type/stroe.d.ts 聲明  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  這個文件
```
interface Window{
    __REDUX_DEVTOOLS_EXTENSION__:function ;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function;
}
```



    const changeNum2 =()=>{
        // 最開始的寫法－同步的寫法
        // dispatch({type:"add1"})
        // 異步的寫法－ redux-thunk的用法  基本格式： dispath(執行異步的函數)
        dispatch((dis:Function)=>{
            setTimeout(()=>{
                dis({type:"add1"})
            },1000)
        })
        
    }
```
把代碼放上去


# React-redux總結與使用

去Xxxxx.ts中 的index.ts

已經封裝好了，未來新增只需要在規定的 模塊下方新增 數據、 同步方法、異步方法 即可

```
const store= {
    state:{
       //放數據
    },
    actions:{
       //放同步方法
    },
    asyncActions:{
       //放異步方法
    },
    sarrpush:"sarrpush",
    actionNames:{},
}
let actionNames={}
for (let key in store.actions){
    actionNames[key]=key;
}
store.actionNames=actionNames;

export default store

```

獲取數據的方法

可以參考page1頁面下
```
import {useSelector,useDispatch} from "react-redux";
import numStatus from "@/store/NumStatus"

const View =()=>{
//通過useDispath修改倉庫數據
const dispatch= useDispatch()
//通過useSelector來獲取倉庫的數據
const {num,sarr} =useSelector((state:RootState)=>({
    num:state.handleNum.num,
    sarr:state.handleArr.sarr
}))

    const changeNum =()=>{
        // dispatch({type:"字符串(認為是一個記號)",val:3})   type 是固定的 ，Val是自定義的
        dispatch({type:"add3",val:100})
    }
    const changeNum2 =()=>{
        // 最開始的寫法－同步的寫法
        // dispatch({type:"add1"})
        // 異步的寫法－ redux-thunk的用法  基本格式： dispath(執行異步的函數)
        // dispatch((dis:Function)=>{
        //     setTimeout(()=>{
        //         dis({type:"add1"})
        //     },1000)
        // })

        //優化Redux-thunk的異步寫法
        // dispatch(調用狀態管理中的asyncAdd1)
        dispatch(numStatus.asyncActions.asyncAdd1)
    }

    // //對sarr的操作
    // const {sarr} =useSelector((state:RootState)=>({
    //     sarr:state.handleArr.sarr
    // }))
    const changeArr=()=>{
        // dispatch({type:"字符串(認為是一個記號)",val:3})   type 是固定的 ，Val是自定義的
        dispatch({type:"sarrpush",val:100})
    }
    
    return(
        <div className="home">
            <p>這是Page1頁面內容</p>
            <p>{num}</p>
            <button onClick={changeNum}>同步按鈕</button>
            <button onClick={changeNum2}>異步按鈕</button>

            <p>{sarr}</p>
            <button onClick={changeArr}>按鈕</button>
        </div>
    )
}

export default View
```

----------------------------------------------------------------------------------------------------
# axios封裝 和apis的抽取

安裝axios
```
npm i axios
```

按照一般安裝方式
新建一個文件夾來存放請求

在SRC下方新增一個 資料夾 request
新增兩個資料檔案 index.ts 和 api.ts

index.ts新增代碼如下：

```
import  axios  from  "axios"

// 創建axios實例
const  instance  =  axios . create ({
    // 基本請求路徑的抽取
    baseURL : " http://xue.cnkdl.cn:23683 " ,
    // 這個時間是你每次請求的過期時間，這次請求認為20秒之後這個請求就是失敗的
    timeout : 20000
})

// 請求攔截器
instance . interceptors . request . use ( config => {
    
    return  config
}, err => {
    return  Promise . reject ( err )
});

// 響應攔截器
instance . interceptors . response . use ( res => {

    return  res . data
}, err => {
    return  Promise . reject ( err )
})

export  default  instance
```


api.ts 代碼如下：
```

import  request  from  "./index"

// 請求中： 請求參數和返回值的類型都需要進行約束

// 驗證碼請求
export  const  CaptchaAPI  =  (): Promise < CaptchaAPIRes >  => request . get ( " /prod-api/captchaImage " );

// 登錄請求
export  const  LoginAPI  =  ( params : LoginAPIReq ): Promise < LoginAPIRes >  => request . post ( " /prod-api/login " , params );

```


回到login/index.ts檔案
上方引入API請求

```
import { CaptchaAPI } from "@/request/api";
```
下方return新增 onclick事件

```
    <div className="captchaImg" onClick={getCaptchaImg}>
```

然後新增事件函數
```
    //點及驗證碼圖片盒子的事件函數
    const getCaptchaImg=()=>{
        //做驗證碼的請求
        CaptchaAPI().then((res)=>{
            console.log(res)
        })
    }
```





這個RES 會需要有一個文件來存放定義


這時需要再 /types 下方新增一個檔案叫做 api.d.ts


此時文件是JSON檔案  ，可以安裝一個插件→   JSON TO TS


```
interface CaptchaAPIRes {
    msg: string;
    img: string;
    code: number;
    captchaEnabled: boolean;
    uuid: string;
  }
```

將驗證碼圖片 的JSON 轉為TS

再將 CaptchaAPIRes  放到/Login/index.ts 中res變數後面。


## 把驗證碼改成 async await寫法

```

    //點及驗證碼圖片盒子的事件函數
    const getCaptchaImg= async ()=>{
    //        //做驗證碼的請求
    //          CaptchaAPI().then((res)=>{
    //          console.log(res);
    // })
        let CaptchaAPIRes = await CaptchaAPI();
        console.log(CaptchaAPIRes);
        
    }

```


然後再/request中的api.ts內 新增:Promise<CaptchaAPIRes>

```
// 驗證碼請求
export  const  CaptchaAPI  =  ():Promise<CaptchaAPIRes> => request . get ( " /prod-api/captchaImage " );

```

然後新增請求在 loging頁面

```
import { ChangeEvent, useEffect,useState  } from "react"
import { Input,Space,Button } from 'antd';
import styles from "./login.module.scss"
import initLoginBg from "./init.ts"
import 'antd/dist/antd.css';
import './login.less'
 
import { CaptchaAPI } from "@/request/api";
const view =()=>{


    //加載完這個組件之後，需要初始化
    useEffect(()=>{

        getCaptchaImg();
        initLoginBg();
        window.onresize = function(){initLoginBg()};//假設畫面變動時，在自適應畫面
    },[])

    //獲取用戶輸入訊息
    const[usernameVal,setusernameVal] =useState("") ;//定義帳號輸入訊息
    const[passwordVal,setpasswordVal] =useState("") ;//定義密碼輸入訊息
    const[captchaVal,setcaptchaVal] =useState(""); //定義驗證碼輸入訊息
    //定義一個變量訊息保存驗證碼的圖片資訊
    const [captchaImg,setcaptchaImg] =useState("");
    

    const usernameChage=(e:ChangeEvent<HTMLInputElement>)=>{
        //獲取用戶輸入的用戶名
        // console.log(e.target.value);
        //修改usernameVal這個變量為用戶輸入值，以後拿到usernameVal這個變量就相當於得到用戶訊息
        setusernameVal(e.target.value)
    }
    const passwordChage=(e:ChangeEvent<HTMLInputElement>)=>{
        setpasswordVal(e.target.value)
    }
    const captchaChage=(e:ChangeEvent<HTMLInputElement>)=>{
        setcaptchaVal(e.target.value)
    }

    //點擊登錄按鈕事件函數
    const gotoLogin=()=>{
        console.log("用戶輸入的用戶名，密碼，驗證碼分別是：",usernameVal,passwordVal,captchaVal)
    }

    //點及驗證碼圖片盒子的事件函數
    const getCaptchaImg= async ()=>{
    //        //做驗證碼的請求
    //          CaptchaAPI().then((res)=>{
    //          console.log(res);
    // })
        let captchaAPIRes = await CaptchaAPI();
        // console.log(CaptchaAPIRes);
        if(captchaAPIRes.code===200){
        //1.把圖片數據顯示在img上面
        setcaptchaImg("data:image/gif;base64,"+captchaAPIRes.img)
        //2 本地保存這個uuid，給登錄的時候用
        localStorage.setItem("uuid",captchaAPIRes.uuid)
        }
      
        
    }

    return (
        <div className={styles.loginPage}>
            {/* 存放背景畫面 */}
        <canvas id="canvas" style={{display:"block"}}></canvas>
            {/* 登錄的盒子 */}
            <div className={styles.loginBox+ " loginbox"}>
                    {/* 標題部分 */}
                    <div className={styles.title}>
                    <h1>練習用&nbsp;·&nbsp;通用後台系統</h1>
                    <p>Strive Everyday</p>
                    </div>
                    {/* 表單部分 */}
                    <div className="form">
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="帳號"  onChange={usernameChage}/>
                        <Input.Password placeholder="密碼" onChange={passwordChage} />
                        <div className="captchaBox">
                            <Input placeholder="驗證碼" onChange={captchaChage} />
                            <div className="captchaImg" onClick={getCaptchaImg}>
                                <img height="38" src={captchaImg} alt="" />
                            </div>
                        </div>
                        <Button type="primary" className="loginBtn" block onClick={gotoLogin}>登錄</Button>
                    </Space>

                    </div>

            </div>
        </div>
    )
}

export default view
```


這樣驗證碼的獲取就完成了




接來來處理登錄的請求

在api.d.ts新增登錄請求的類型

```
//這個文件專門定義請求參數類型和響應的類型

import { UpOutlined } from "@ant-design/icons";

//驗證碼的響應類型約束
interface CaptchaAPIRes {
    msg: string;
    img: string;
    code: number;
    captchaEnabled: boolean;
    uuid: string;
  }
//登錄請求參數類型約束
interface LoginAPIReq{
username :string;
password :string;
code :string; 
uuid :string;
}
//登錄的響應類型約束
interface LoginAPIRes{
  msg: string;
  code: number;
  token: string;   
}
```
然後去api.ts中 新增登錄的請求

```

// 登錄請求
export const LoginAPI=(params:LoginAPIReq):Promise<LoginAPIRes> =>request.post("/prod-api/login",params);
```




新增完成去 login/index.ts 中新增登錄畫面設定

```

    //點擊登錄按鈕事件函數
    const gotoLogin=async()=>{
        console.log("用戶輸入的用戶名，密碼，驗證碼分別是：",usernameVal,passwordVal,captchaVal)
        //登錄前，先驗證是否有空值
        if(!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()){
            message.error("請輸入正確資料")
            return
        }
        //發起登錄請求
        let loginAPIRes =await LoginAPI({
            username :usernameVal,
            password :passwordVal,
            code :captchaVal,
            uuid :localStorage.getItem("uuid") as string,
        })

        console.log(loginAPIRes);
        if (loginAPIRes.code===200){
            //1.提示登錄成功
            message.success("登錄成功")
            //2.保存token
            localStorage.setItem("React-management-token",loginAPIRes.token)
            //3.跳轉到/page1
            navigateTo("/page1")
            //4.刪除本地保存中的uuid
            localStorage.removeItem("uuid")
        }


    }
```


這樣就可以登錄頁囉~



--------------------------------------------------------------------------------------------------

# 封裝一個路由守衛

簡單來說，直接在網頁上輸入/page1也會跳至 page1 正常來說應該不能跳
所以要封裝一下他

目前react是偵測 outlet來渲染整個畫面
所以可以藉由outlet來控制 路由守衛

首先 ，先製作一個組件

```
function BeforeRouterEnter(){
  const outlet = useRoutes(router);
  return outlet
}

下方導入變成：
```
function App() {
  const [count, setCount] = useState(0)
  const outlet = useRoutes(router)
  return (
    <div className="App">
      {/* <Link to="/Home">Home</Link>
      <Link to="/About">About</Link>
      <Link to="/User">User</Link> */}

      {/* 佔位符組件， 類似於窗口，用來展示組件的，有點像VUE中的Router-view*/}
      {/* <Outlet></Outlet> */}
      {/* {outlet} */}

      < BeforeRouterEnter />
    </div>
  )
}


```


思路：
//對於後臺管理系統，兩中經典的跳轉情況
//1.如果訪問的是登錄頁面，並且有token，跳轉至首頁
//2.如果訪問的不是登錄頁面，並且沒有token，跳轉到登錄頁面
//3.其餘的都可以正常放行



```
import { useState ,useEffect} from 'react'
import { useRoutes,useLocation,useNavigate} from 'react-router-dom'
import router from "./router"
import {message } from "antd"

//去網登錄頁面
function ToLogin(){
  const navagateTo=useNavigate();
  //加載完這個組件之後實現跳轉
  useEffect(()=>{

   //加載完組件之後，執行這邊的代碼
   navagateTo("/login")
   message.warning("您還沒有登陸 ，請登錄後再訪問")
 },[])
 return <div></div>
 }
//去往首頁
function ToPage1(){
  const navagateTo=useNavigate();
  //加載完這個組件之後實現跳轉
  useEffect(()=>{

    //加載完組件之後，執行這邊的代碼
    navagateTo("/page1")
    message.warning("您已經登錄過了!!")
  },[])
  return <div></div>
}


function BeforeRouterEnter(){
  const outlet = useRoutes(router);

  const location =useLocation();
  let token = localStorage.getItem("React-management-token");

  //對於後臺管理系統，兩中經典的跳轉情況
  //1.如果訪問的是登錄頁面，並且有token，跳轉至首頁
  if (location.pathname ==="/login" && token){
    //這裡不能直接useNavigete 來實現跳轉，因為需要BeforeRoutterEnter是一個JSX組件
    return <ToPage1/>
  }

  //2.如果訪問的不是登錄頁面，並且沒有token，跳轉到登錄頁面
  if (location.pathname !=="/login" && !token){
    return <ToLogin/>
  }

  //3.其餘的都可以正常放行





  return outlet
}


function App() {
  const [count, setCount] = useState(0)
  const outlet = useRoutes(router)
  return (
    <div className="App">
      {/* <Link to="/Home">Home</Link>
      <Link to="/About">About</Link>
      <Link to="/User">User</Link> */}

      {/* 佔位符組件， 類似於窗口，用來展示組件的，有點像VUE中的Router-view*/}
      {/* <Outlet></Outlet> */}
      {/* {outlet} */}

      < BeforeRouterEnter />
    </div>
  )
}

export default App

```


這樣一個基本的後端登錄畫面就做完了~

灑花~~~~~~~



------------------------------------------------------------------
# 修改驗證碼API

部屬網站Vercel 
發現 目前這個測試網站 連不進去  在DEMO的時候不會顯示 ，可是在本地是正常的。
問題好像是因為請求不了 > 口 < 

原網址的請求位置是 http://xue.cnkdl.cn:23683

但是 請求必須是 Https 才可以

解決方法： CORS

