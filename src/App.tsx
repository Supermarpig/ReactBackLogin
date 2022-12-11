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
      {/* <Link to="/Home">Home</Link>
      <Link to="/About">About</Link>
      <Link to="/User">User</Link> */}

      {/* 佔位符組件， 類似於窗口，用來展示組件的，有點像VUE中的Router-view*/}
      {/* <Outlet></Outlet> */}
      {outlet}
    </div>
  )
}

export default App
