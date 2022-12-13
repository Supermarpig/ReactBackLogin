export default {
    state:{
        // 準備數據資料數量
        num: 20
    },
    actions:{
        add1(newState:{num:number},action:{type:string}){
            newState.num++
        },
        add2(newState:{num:number},action:{type:string,val:number}){
            newState.num+= action.val
        },
    },
    //名字統一管理
    add1:"add1",
    add2:"add2",
}

//封裝的目的： 最終是有利於我們的開發或者維護
//封裝的思路是：將來開發的時候，只需要把數據和方法寫入到這個狀態文件中，
//             例如:XxxxxStatus/index.ts 而不需要再去操作其他的文件。
//             (我們往這個方向去封裝)