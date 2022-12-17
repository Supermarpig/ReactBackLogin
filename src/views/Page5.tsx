import {useNavigate} from "react-router-dom"
import {  Button     } from 'antd';


const View =()=>{
    let navigateTo =useNavigate();


    const Logout=()=>{
        localStorage.removeItem('React-management-token');
        navigateTo("/login");
    }



    return(
        <div className="home">
            <p>這是Page5頁面</p>

            <Button onClick={Logout}>登出按鈕</Button>
           
        </div>
    )
}

export default View