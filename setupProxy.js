const proxy = require('http-proxy-middleware')

module.exports =function(app){
    app.use(proxy('/api',{
        target:'http://xue.cnkdl.cn:23683', //後台服務地址極端口號
        changeOrigin:true, //是否開啟代理
        pathRewrite:{'/api':''} //代理名稱
    }))
}


const axios = require('axios')

module.exports = async (req, res) => {
  const start = req.query.start ? req.query.start : 0
  const count = req.query.count ? req.query.count : 1

  const result = await axios({
    method: 'get',
    url: `http://xue.cnkdl.cn:23683`
  })

  res.json({
    status: 'ok',
    data: result.data
  })
}