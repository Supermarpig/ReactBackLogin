import React from 'react'
import ReactDOM from 'react-dom/client'
//正確的樣式引入順序
//初始化樣式，一般放在最前面
import "reset-css"
//UI框架的樣式

//全局樣式
import "@/assets/styles/global.scss"
//組件的樣式
import App from './App'
import {BrowserRouter} from 'react-router-dom'
// import Router from './router'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <BrowserRouter>
      <App />
   </BrowserRouter>
    
  </React.StrictMode>
)
