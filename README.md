以下是筆記



UI組件庫 使用 Ant Design of React

https://ant.design/docs/react/introduce

------------------------------------------------------------------------------------------

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
貼過來然後 下載 npm i 

項目啟動  npm run dev

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
開始在留下自己需求的東西

在src內

import引入內的東西都可以刪掉
最後剩
App.tsx
main.tsx
vite-env.d.ts 

APP 內 Return內可以渲染畫面


---------------------------------------------------------------------------------
##三、樣式初始化
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
##四、scss 的安裝和初步使用

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
##五、配置項目的路徑別名

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


#5.2 配置路徑別名的提示

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

##六、 scss模塊化

#6.1 scss 的進一步使用

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
##七、 Antd Design 初步引入

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
##八、配置 Antd Design 樣式自動案需求引入

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

##九、React 路由 -- 第一種配置方案 (舊項目中的寫法)
#9.1 初步展示

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
#9.2 編程式導航--設置菜單點及跳轉

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

#9.3 路由重定向



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
#9.5 路由第二種方式 -路由懶加載
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
##十、首頁布局的解決方案(含側邊欄)


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

##調整頁面右側結構樣式的調整


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
##點擊跳轉 -點擊左邊側邊攔 獲取到路徑



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
##增加功能 點擊其他Menu時，其他Menu會關閉


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
##菜單欄 -組件的抽取

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
##菜單數據整理

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
##將剩下的Menu配置一下他們的路徑


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
##菜單欄 -F5刷新時，默認當前選中的樣式

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
##菜單欄-配置初始展開項的思路分析
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

###登陸頁面
##登陸頁面基本配置






















