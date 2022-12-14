import {useSelector,useDispatch} from "react-redux";
import numStatus from "@/store/NumStatus"

const View =()=>{
//通過useDispath修改倉庫數據
const dispatch= useDispatch()
//通過useSelector來獲取倉庫的數據
const {num,sarr} =useSelector((state:RootState)=>({
    num:state.handleNum.num,
    sarr:state.handleArr.sarr
}))

    const changeNum =()=>{
        // dispatch({type:"字符串(認為是一個記號)",val:3})   type 是固定的 ，Val是自定義的
        dispatch({type:"add3",val:100})
    }
    const changeNum2 =()=>{
        // 最開始的寫法－同步的寫法
        // dispatch({type:"add1"})
        // 異步的寫法－ redux-thunk的用法  基本格式： dispath(執行異步的函數)
        // dispatch((dis:Function)=>{
        //     setTimeout(()=>{
        //         dis({type:"add1"})
        //     },1000)
        // })

        //優化Redux-thunk的異步寫法
        // dispatch(調用狀態管理中的asyncAdd1)
        dispatch(numStatus.asyncActions.asyncAdd1)
    }

    // //對sarr的操作
    // const {sarr} =useSelector((state:RootState)=>({
    //     sarr:state.handleArr.sarr
    // }))
    const changeArr=()=>{
        // dispatch({type:"字符串(認為是一個記號)",val:3})   type 是固定的 ，Val是自定義的
        dispatch({type:"sarrpush",val:100})
    }
    
    return(
        <div className="home">
            <p>這是Page1頁面內容</p>
            <p>{num}</p>
            <button onClick={changeNum}>同步按鈕</button>
            <button onClick={changeNum2}>異步按鈕</button>

            <p>{sarr}</p>
            <button onClick={changeArr}>按鈕</button>
        </div>
    )
}

export default View