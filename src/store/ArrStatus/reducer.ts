import handleArr from "./index"



//用來管理數據的文件
let reducer = (state ={...handleArr.state},action:{type:string,val:number})=>{
    //調用dispatch執行這裡的代碼
    // console.log("執行了reducer")
    //深拷貝
    let newState = JSON.parse(JSON.stringify(state))

    switch(action.type){
        case handleArr.sarrpush:
            handleArr.actions[handleArr.sarrpush](newState,action)
            break;
        default:
            break;
    }

    return newState
}

export default reducer