const proxy = require('http-proxy-middleware')

module.exports =function(app){
    app.use(proxy('/api',{
        target:'http://xue.cnkdl.cn:23683', //後台服務地址極端口號
        changeOrigin:true, //是否開啟代理
        pathRewrite:{'/api':''} //代理名稱
    }))
}