// import "./comp1.scss"  //全局引入  會影響到其他組件

//scss模塊化 引入

import styles from "./comp1.module.scss" 

const Comp = () =>{
    return(
        <div className={styles.box}>
        <p>這裡是Comp1裡面的內容</p>
        </div>
    )
}

export default Comp