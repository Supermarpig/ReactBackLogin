import handleNum from "./index"



//用來管理數據的文件
let reducer = (state ={...handleNum.state},action:{type:string,val:number})=>{
    //調用dispatch執行這裡的代碼
    // console.log("執行了reducer")
    //深拷貝
    let newState = JSON.parse(JSON.stringify(state))

    //思路： switch 的作法是拿的 action.type和case後面的每一個進行對比，這種做法很像遍歷。
    //那我們就把case後面的這些值 做成對象Obj，actionNames
    // switch(action.type){
    //     case handleNum.add1:
    //         handleNum.actions[handleNum.add1](newState,action)
    //         break;
    //     case handleNum.add2:
    //         handleNum.actions[handleNum.add2](newState,action)
    //         break;
    //     default:
    //         break;
    // }
    //優化：上面這樣寫，我們每天加一個方法，都要在這裡多寫一句case

    //拿著action.type和actionName進行每一項的對比，如果是相等，就調用 模塊名.action[下標](newState,action)

    for(let key in handleNum.actionNames){
        //key是每一個健
        //判斷是不是相等
        if(action.type===handleNum.actionNames[key]){
            handleNum.actions[handleNum.actionNames[key]](newState,action);
            break;
        }
    }
    //這樣寫就達到，每次寫一個方法都不需要再手動添加這裡的case
    //可以解放雙手~~~~


    return newState
}

export default reducer