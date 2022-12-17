import  axios  from  "axios"

// 創建axios實例
const  instance  =  axios.create ({
    // 基本請求路徑的抽取
    baseURL : "http://xue.cnkdl.cn:23683" ,
    // 這個時間是你每次請求的過期時間，這次請求認為20秒之後這個請求就是失敗的
    timeout : 20000
})

// 請求攔截器
instance.interceptors.request.use(config => {
    
    return  config
}, err => {
    return  Promise.reject ( err )
});

// 響應攔截器
instance.interceptors.response.use( res => {

    return  res . data
}, err => {
    return  Promise.reject ( err )
})

export  default  instance