import React,{Component} from 'react'
class Nav extends Component {
        render(){
            return (
                <div className="index-head">
                <div className="logo">
                <img src="./images/logo.png" alt=""/>
                 <span>任务工作台</span>
                   </div>
                  <div className="right-user">
                   <div className="head-user"><span className="user-photo"><img src="images/mine_fill.png" alt=""/></span><span className="user-name">你好！管理员李健锋<i><img src="./images/message.png" alt=""/></i><a ><img src="./images/退出.png" alt=""/></a></span></div>
                 </div>
                 </div>
            )
        }
}
export default Nav;