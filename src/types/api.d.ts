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