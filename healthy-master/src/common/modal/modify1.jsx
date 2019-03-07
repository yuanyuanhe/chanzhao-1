import React,{Component} from 'react'
import {load} from '../../config/api'
class Model extends Component{
    state={
        message:{},//数据信息
        title:"",//标题
        orgName:"",//机构名称
        branchName:"",//分支名称
        adress:"",//地址
        phone:"",//联系方式
        contact:"",//联系人
        state:"",//状态
        image:"",//机构图片
        am:"",//上午预约时间
        pm:"",//下午预约时间
        translate:"",//交通
        time:"",//预约时间
        person:"",//名额
        deadTime:"",//最晚时间
        introduce:"",//机构介绍
        note:"",//备注
        type:0,//查看还是修改
        id:0//数据查询


    }
    componentDidMount(){
        // console.log(this.props)
        this.setState({
            type:this.props.type,
            id:this.props.id
        })
        load({
            id:this.props.id,
        }).then(
            res=>{
                let data=res.data.healthOrgManageLoad
                this.setState({
                    title:this.props.type?"查看":"修改",
                    orgName:data.healthOrgName,//机构名称
                    branchName:data.branchName,//分支名称
                    adress:data.province+data.city+data.region+data.specificAdress,//地址
                    phone:data.phone,//联系方式
                    contact:data.contact,//联系人
                    state:data.orgState,//状态
                    image:data.orgImage,//机构图片
                    am:data.bookableStarttimeAm+"-"+data.bookableEndtimeAm,//上午预约时间
                    pm:data.bookableStarttimePm+"-"+data.bookableEndtimePm,//下午预约时间
                    translate:"地铁8号线",//交通
                    time:"2018",//预约时间
                    person:"20",//名额
                    deadTime:data.latestBookTime,//最晚时间
                    introduce:data.branchName,//机构介绍
                    note:data.note,//备注
                    id:0//数据查询
                   

                })
                console.log(res)
            }
        )

    }
    componentWillReceiveProps(nextprops){
    //    console.log(this.props)
    this.setState({
        type:this.props.type,
        id:this.props.id
    })
        load({
            id:nextprops.id,
        }).then(
            res=>{
                this.setState({
                    message:res.data.healthOrgManageLoad,

                })
                console.log(res)
            }
        )
       
    }
    render(){
        console.log(this.state.id)
    const data=this.state.message
        return (
            <div>
                
                     <h2>体检机构内容/</h2>
                <div>机构名称{data.healthOrgName?data.healthOrgName:"无"}分支机构{data.branchName?data.branchName:"wu"}</div>
                <div>地址{data.province?data.province:"无"}{data.city?data.city:"wu"}{data.region?data.region:"wu"}{data.specificAdress?data.specificAdress:"wu"}</div>
                <div>联系电话{data.phone?data.phone:"wu"}{}联系人{data.contact?data.contact:"wu"}</div>
                <div>状态{data.orgState?data.orgState:"wu"}}{data.orgImage?data.orgImage:"wu"}</div>
                <div>可预约时间{data.bookableStarttimeAm?data.bookableStarttimeAm:"wu"}{data.bookableEndtimeAm?data.bookableEndtimeAm:"wu"}am{data.bookableStarttimePm?data.bookableStarttimePm:"wu"}
                    {data.bookableEndtimePm?data.bookableEndtimePm:"wu"}pm 交通{} </div>
                <div>{data.latestBookTime?data.latestBookTime:"wu"}</div>
                <div>{data.note?data.note:"wu"}</div>
                <div>{data.branchName?data.branchName:"wu"}</div>
                

            </div>
        )
    }
}
export default Model;