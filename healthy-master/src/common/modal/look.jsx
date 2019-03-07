import React,{Component} from 'react'
import {load} from '../../config/api'
import style from '../../style/css/look.mcss'
class Model extends Component{
    state={
        message:{}//所有信息

    }
    componentDidMount(){
        //根据ID查询
        load({
            id:this.props.id,
        }).then(
            res=>this.setState({message:res.data.healthOrgManageLoad})
        )

    }
    componentWillReceiveProps(nextprops){
    //    console.log(this.props)
        if(nextprops.id!==this.props.id){
            
        load({
            id:nextprops.id,
        }).then(
            
            res=>this.setState({message:res.data.healthOrgManageLoad})
        )

        }else{
            return 
        }

        
       
    }
    render(){
    const data=this.state.message
        return (
            <div style={{height:600}} className={style["msg"]}>
                <h2>体检机构内容</h2>
                <div>机构名称:{data.healthOrgName?data.healthOrgName:"无"}分支机构:{data.branchName?data.branchName:"wu"}</div>
                <div>地址:{data.province?data.province:"无"}{data.city?data.city:"wu"}{data.region?data.region:"wu"}{data.specificAdress?data.specificAdress:"wu"}</div>
                <div>联系电话:{data.phone?data.phone:"wu"}{}联系人:{data.contact?data.contact:"wu"}</div>
                <div>状态:{data.orgState?data.orgState:"wu"}}{data.orgImage?data.orgImage:"wu"}</div>
                <div>可预约时间:{data.bookableStarttimeAm?data.bookableStarttimeAm:"wu"}-{data.bookableEndtimeAm?data.bookableEndtimeAm:"wu"}am{data.bookableStarttimePm?data.bookableStarttimePm:"wu"}-
                    {data.bookableEndtimePm?data.bookableEndtimePm:"wu"}pm 交通{} </div>
                <div>{data.latestBookTime?data.latestBookTime:"wu"}</div>
                <div>机构介绍{data.orgIntroduce?data.note:"wu"}</div>
                <div>备注{data.note?data.note:"wu"}</div>
                

            </div>
        )
    }
}
export default Model;