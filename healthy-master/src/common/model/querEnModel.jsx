import React,{Component} from "react"
import style from "./querEnModel.mcss"
//已确认
class ConfirmedPopup extends Component {
     /**
	 * 构造函数
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
    this.state = ({
        data:this.props.data || {},
    })
    console.log(this.props.data)
  }

  //预约状态，预约类型code转汉字，及预约状态对应操作按钮arr返回，供循环render
listTrans(type,value,numb){
    switch(type){
        case 'healthStatus':  //1：未预约 2:已预约 3:已邮件 4:已预约取消 5:已确认 6:已确认取消 7:已体检 8:资料回齐 9:录入完成 10:已撤销
        switch(value){
            case '1':
            return '未预约'
            break;
            case '2':
            return '已预约'
            break;
            case '3':
            return '已邮件'             //后台筛选，不传
            break;
            case '4':
            return '未预约'             //'已预约取消'
            break;
            case '5':
            return '已确认'
            break;
            case '6':
            return '未预约'             //'已确认取消'
            break;
            case '7':
            return '已体检'
            break;
            case '8':
            return '资料回齐'
            break;
            case '9':
            return '录入完成'
            break;
            case '10':
            return '已撤销'
            break;
        };
        break;
        case 'bookingType':   //0.新单核保体检
        switch(value){
            case '0':
            return '新单核保体检'
            break;
        }
        break;
        case 'operation':  //1：未预约 2:已预约 5:已确认 7:已体检 8:资料回齐 9:录入完成 10:已撤销
        //按钮操作加numb预约号，为循环的a按钮点击事件 取值 做接口传参用，
        switch(value){
            case '1':
            return [{numb:numb,code:value,name:'预约'},{numb:numb,code:value,name:'查看'}]
            break;
            case '2':
            return [{numb:numb,code:value,name:'修改'},{numb:numb,code:value,name:'查看'},{numb:numb,code:value,name:'预约确认'},{numb:numb,code:value,name:'预约取消'}]
            break;
            case '3':
            return [{numb:numb,code:value,name:''}]
            break;
            case '4':
            return [{numb:numb,code:value,name:'预约'},{numb:numb,code:value,name:'查看'}]
            break;
            case '5':
            return [{numb:numb,code:value,name:'修改'},{numb:numb,code:value,name:'查看'},{numb:numb,code:value,name:'预约取消'}]
            break;
            case '6':
            return [{numb:numb,code:value,name:'预约'},{numb:numb,code:value,name:'查看'}]
            break;
            case '7':
            return [{numb:numb,code:value,name:'关联影像'},{numb:numb,code:value,name:'详情'},{numb:numb,code:value,name:'取消预约'},{numb:numb,code:value,name:'修改预约'}]
            break;
            case '8':
            return [{numb:numb,code:value,name:'资料补录'},{numb:numb,code:value,name:'查看'}]
            break;
            case '9':
            return [{numb:numb,code:value,name:'查看'}]
            break;
            case '10':
            return [{numb:numb,code:value,name:'查看'}]
            break;
        };
        break;
    }
}

    render (){
        return <div className={style['Wraper']}>
        <div className={style["Model-head"]}> 预约信息</div>  
        <div className={style['Content']}>
        <ul>
          <li className={style['col-md-2']}><span>体检人姓名</span>{this.props.data==undefined?'':this.props.data.healthName}</li>
          <li className={style['col-md-2']}><span>体检预约号</span>{this.props.data==undefined?'':this.props.data.healthOderCode}</li>
          <li className={style['col-md-2']}><span>体检类型</span>{this.props.data==undefined?'':this.listTrans('bookingType',this.props.data.bookingType)}</li>
          <li className={style['col-md-2']}><span>体检机构</span>{this.props.data==undefined?'':this.props.data.healthOrgName}</li>
          <li><span>追加体检项目</span>{this.props.data==undefined?'':this.props.data.healthProject.map(
              (item,index)=>{
                  return(
                      <a>{item.projectName}</a>
                  )
              }
          )}</li>
        </ul>
        </div>
        </div>
    }
}
export default ConfirmedPopup;