以下是筆記



UI組件庫 使用 Ant Design of React

https://ant.design/docs/react/introduce

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