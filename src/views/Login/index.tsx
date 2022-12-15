import { ChangeEvent, useEffect,useState  } from "react"
import { Input,Space,Button,message } from 'antd';
import styles from "./login.module.scss"
import initLoginBg from "./init.ts"
import 'antd/dist/antd.css';
import './login.less'
import {useNavigate} from "react-router-dom"
import { CaptchaAPI ,LoginAPI} from "@/request/api";
const view =()=>{
    let navigateTo =useNavigate();

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
    const gotoLogin=async()=>{
        // console.log("用戶輸入的用戶名，密碼，驗證碼分別是：",usernameVal,passwordVal,captchaVal)
        //登錄前，先驗證是否有空值
        if(!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()){
            message.warning("請輸入完整資料")
            return
        }
        //發起登錄請求
        let loginAPIRes =await LoginAPI({
            username :usernameVal,
            password :passwordVal,
            code :captchaVal,
            uuid :localStorage.getItem("uuid") as string,
        })

        // console.log(loginAPIRes);
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