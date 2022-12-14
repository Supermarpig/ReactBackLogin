

const store={
    state:{
        // 準備數據資料數量
        num: 20
    },
    actions:{   //只放同步 的方法
        add1(newState:{num:number},action:{type:string}){
            setTimeout(()=>{
                newState.num++
            },1000)
          
        },
        add2(newState:{num:number},action:{type:string,val:number}){
            newState.num+= action.val
        },
        add3(newState:{num:number},action:{type:string,val:number}){
            newState.num+= action.val
        },
    },
    //模仿redux-thunk的異步寫法(模仿Vuex的寫法)
    asyncActions:{  //只放異步的方法
        asyncAdd1(dispatch:Function){
            setTimeout(()=>{
                dispatch({type:"add1"})
            },1000)
        }
    },
    //名字統一管理
    // add1:"add1",
    // add2:"add2",
    // actionNames:{
    //     add1:"add1",
    //     add2:"add2",
    // }
    actionNames:{}

}
//我們現在想做到的是：
//actionNames自動生成，不用我每一次添加一個方法，都要在actionNames手動添加值，這樣很麻煩

//定義一個全局的actionNames
let actionNames={}
//actionNames 有多少對key,取決於action裡有多少個函數，所以遍歷store.actions,給actionName添加key

for (let key in store.actions){
    actionNames[key]=key;
}
//把裡面的OBJ賦值
store.actionNames=actionNames;

export default store
//封裝的目的： 最終是有利於我們的開發或者維護
//封裝的思路是：將來開發的時候，只需要把數據和方法寫入到這個狀態文件中，
//             例如:XxxxxStatus/index.ts 而不需要再去操作其他的文件。
//             (我們往這個方向去封裝)