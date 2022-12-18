import  axios  from  "axios"

// module.exports = async (req: { query: { start: any; count: any } }, res: { json: (arg0: { status: string; data: any }) => void }) => {
//     const start = req.query.start ? req.query.start : 0
//     const count = req.query.count ? req.query.count : 1
  
//     const result = await axios({
//       method: 'get',
//       url: `http://cn.bing.com/HPImageArchive.aspx?format=js&idx=${start}&n=${count}`
//     })
  
//     res.json({
//       status: 'ok',
//       data: result.data
//     })
//   }
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

    return  res.data
}, err => {
    return  Promise.reject ( err )
})

export  default  instance