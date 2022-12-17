import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate,useLocation} from "react-router-dom"


type MenuItem = Required<MenuProps>['items'][number];
//登入請求到數據之後，就可以跟item這個數組進行匹配
const items: MenuItem[] = [
  {
    label:'同步 異步按鈕',
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
    label:'登出',
    key: '/Page5',
    icon: <FileOutlined />,
  },
]


//組件內部的東西
const Comp: React.FC = () => {

  const navigatTO =useNavigate();
  const currentRoute=useLocation();
  // console.log(currentRoute.pathname)   //currentRoute.pathname : "/page3/page301"
  const menuClick=(e:{key:string})=>{
    // console.log("點擊了菜單",e.key);
    //點擊要跳轉到對應的路由 編程式導航 ，利用HOOK導航
    navigatTO(e.key);
  }

  //拿著currentRoute.pathname 跟items 數組的每一項children的key值去做對比，如果找到相等了。就要他上一級的key
  //這個key給到openKeys的數組元素，作為初始值。

  let firstOpenKeys:string=""
  //在這裡做對比
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
  // items[]['children'].find(findKey) //這個結果如果找到的是一個對象，轉布爾值 true 如果找不到就顯示false


  //設置展開項的初始值
  const [openKeys, setOpenKeys] = useState([firstOpenKeys]);
  const handleOpenChange=(keys:string[])=>{
    //甚麼時候執行這個函數裡面的代碼?  => 展開和回收某項菜單時，執行這裡的代碼
    // console.log(keys) //keys是一個數組，紀錄了當前是哪一項展開的(用key來記錄)
    //把這個數組修改成最後一項，因為只要一項是展開的。就是我剛剛點擊的那一項。
    setOpenKeys([keys[keys.length-1]])
  }
return(
     <Menu 
            theme="dark" 
            //表示當前選中樣式的路徑的key值
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
)
}

export default Comp;