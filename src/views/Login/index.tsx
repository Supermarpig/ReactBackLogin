import { ChangeEvent, useEffect,useState  } from "react"
import { Input,Space,Button } from 'antd';
import styles from "./login.module.scss"
import initLoginBg from "./init.ts"
import 'antd/dist/antd.css';
import './login.less'
 
const view =()=>{


    //加載完這個組件之後，需要初始化
    useEffect(()=>{
        initLoginBg();
        window.onresize = function(){initLoginBg()};//假設畫面變動時，在自適應畫面
    },[])

    //獲取用戶輸入訊息
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
        console.log("用戶輸入的用戶名，密碼，驗證碼分別是：",usernameVal,passwordVal,captchaVal)
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
                        <Button type="primary" className="loginBtn" block onClick={gotoLogin}>登錄</Button>
                    </Space>

                    </div>

            </div>
        </div>
    )
}

export default view