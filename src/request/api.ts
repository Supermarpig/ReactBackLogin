import  request  from  "./index"

// 請求中： 請求參數和返回值的類型都需要進行約束

// 驗證碼請求
export  const  CaptchaAPI  =  () => request . get ( " /prod-api/captchaImage " );

// 登錄請求
export  const  LoginAPI  =  ( )  => request . post ( " /prod-api/login " ,  );