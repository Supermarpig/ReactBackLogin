import handleNum from "./index"



//用來管理數據的文件
let reducer = (state ={...handleNum.state},action:{type:string,val:number})=>{
    //調用dispatch執行這裡的代碼
    // console.log("執行了reducer")
    //深拷貝
    let newState = JSON.parse(JSON.stringify(state))

    switch(action.type){
        case handleNum.add1:
            handleNum.actions[handleNum.add1](newState,action)
            break;
        case handleNum.add2:
            handleNum.actions[handleNum.add2](newState,action)
            break;
        default:
            break;
    }

    return newState
}

export default reducer