export default {
    state:{
        // 準備數據資料數量
        sarr:[10,20,30] 
    },
    actions:{
        sarrpush(newState:{sarr:number[]},action:{type:string,val:number}){
            newState.sarr.push(action.val)
        },
        
    },
    //名字統一管理
    sarrpush:"sarrpush",
  
}