import {useSelector,useDispatch} from "react-redux";

const View =()=>{
//通過useDispath修改倉庫數據
const dispatch= useDispatch()
//通過useSelector來獲取倉庫的數據
const {num} =useSelector((state:RootState)=>({
    num:state.handleNum.num
}))

    const changeNum =()=>{
        // dispatch({type:"字符串(認為是一個記號)",val:3})   type 是固定的 ，Val是自定義的
        dispatch({type:"add1",val:10})
    }

    //對sarr的操作
    const {sarr} =useSelector((state:RootState)=>({
        sarr:state.handleArr.sarr
    }))
    const changeArr=()=>{
        // dispatch({type:"字符串(認為是一個記號)",val:3})   type 是固定的 ，Val是自定義的
        dispatch({type:"sarrpush",val:100})
    }
    
    return(
        <div className="home">
            <p>這是Page1頁面內容</p>
            <p>{num}</p>
            <button onClick={changeNum}>按鈕</button>

            <p>{sarr}</p>
            <button onClick={changeArr}>按鈕</button>
        </div>
    )
}

export default View