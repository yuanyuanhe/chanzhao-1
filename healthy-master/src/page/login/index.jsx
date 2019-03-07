import React,{Component} from "react";
import { Input ,message} from 'antd'
import {NavLink } from "react-router-dom";
import style from './style.mcss'
class Login extends Component {
    
    submit(){
        let rule=/^[a-z]{4,16}$/
        let rule1=/^[0-9a-z]{8,20}$/
        // if(!document.querySelector(".name").value ||!document.querySelector(".password").value){
        //     // console.log("用户名不能为空")
        //     message.error("")

        // }
        if(document.querySelector(".name").value && document.querySelector(".password").value){
            if(rule.test(document.querySelector(".name").value) && rule1.test(document.querySelector(".password").value)){
                message.success('登陆成功')
                window.location.href="http://localhost:3000/#/index"
            }else{
                message.error("用户名格式错误")
            }
           
        }else{
            message.error('用户名或密码不能为空')
        }
           
        


    }
    render(){
        console.log(window)
        return (<div className={style["login-bg"]}>
            <Input  placeholder="用户名" className="name" style={{margin:"300px auto 0",width:"200px"}}></Input>
            <Input  placeholder="密码" className="password" style={{margin:"10px auto",width:"200px"}}></Input>
            <NavLink to="/index"  style={{margin:"10px auto",width:"200px"}}>登陆</NavLink>
            {/* <Button type="primary" onClick={this.submit} style={{margin:"10px auto",width:"200px"}}>登陆</Button> */}
        </div>)
    }
    
}
export default Login;