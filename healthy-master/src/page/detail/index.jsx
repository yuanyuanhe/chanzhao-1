import React,{Component} from 'react'
import { Route, Switch, NavLink } from "react-router-dom";
import { Timeline } from 'antd';
import * as api from '../../config/api.js'
import './style.mcss'
import admin from '../administration/index'
class detail extends Component{
    /**
	 * 构造函数
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
    this.state = ({
        numb:this.props.location.numb || '', //预约号
        code:this.props.location.code || '', //预约状态code   暂时没有写，'7,8,9'状态没有imageSelect对象，即详情页面的影像上传的表格数据

        operateHistory:[],
        queryRecord:[],
        queryRecordone:'',
    })
    console.log(this.state.data)
  }
  componentWillMount(){
      //详情数据请求
        var param2={
            healthOderCode:this.state.numb,
            healthStatus:this.state.code,
        }
        api.detailedQuery(param2).then(res=>{this.setState({
            operateHistory:res.operateHistory,
            operateHistoryone:res.operateHistory==undefined?[]:res.operateHistory[0],
            queryRecord:res.queryRecord,
            queryRecordone:res.queryRecord==undefined?[]:res.queryRecord[0],
        })});
        console.log(this.state.operateHistory)
        console.log(this.state.queryRecord)
  }
  componentDidMount() {
      
     console.log(this.props.location.numb)
     console.log(this.props.location.code)
     
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
            return [{numb:numb,code:value,name:'预约'},]
            break;
            case '2':
            return [{numb:numb,code:value,name:'修改'},{numb:numb,code:value,name:'预约确认'},{numb:numb,code:value,name:'预约取消'}]
            break;
            case '3':
            return [{numb:numb,code:value,}]
            break;
            case '4':
            return [{numb:numb,code:value,name:'预约'}]
            break;
            case '5':
            return [{numb:numb,code:value,name:'修改'},{numb:numb,code:value,name:'预约取消'}]
            break;
            case '6':
            return [{numb:numb,code:value,name:'预约'}]
            break;
            case '7':
            return [{numb:numb,code:value,name:'关联影像'},{numb:numb,code:value,name:'详情'},{numb:numb,code:value,name:'取消预约'},{numb:numb,code:value,name:'修改预约'}]
            break;
            case '8':
            return [{numb:numb,code:value,name:'资料补录'}]
            break;
            case '9':
            return [{numb:numb,code:value,}]
            break;
            case '10':
            return [{numb:numb,code:value,}]
            break;
        };
        break;
    }
  }

render(){
  const project = this.state.queryRecordone==undefined?'':this.state.queryRecordone.healthPackage;
  const project1 = project==undefined?'':project[0];
  const projectli = project1==undefined?'':project1.projectName;
  const projec = this.state.queryRecordone==undefined?'':this.state.queryRecordone.healthProject;
  const projec1 = projec==undefined?'':projec[0];
  const projecli = projec1==undefined?'':projec1.projectName;
  return (
   <div className="content-right clearfix" style={{backgroundColor:'#f4f4f4',padding:'0 0 20px 20px',width:'1600px'}}>
       <div className="tab back" style={{fontSize:'16px',color:'#E87722'}} onClick={(e)=>window.history.back()}>
       &lt;返回
       </div>

      <div style={{float:'left',width:'1070px'}}>
       <div className="detail-content fl" style={{backgroundColor:'#fff',width:'1070px',padding:'20px'}}>
            <div className="details" >
                <div className="details-header clearfix">
                    <span className="fl title" style={{fontSize:'26px',color:'#333'}}>预约详情</span>
                    <span className="fr look-details" style={{fontSize:'14px',color:'#666',marginTop:'10px'}}>查看体检信&gt;</span>
                </div>
                <div className="state" style={{border:'1px solid rgba(232,119,34,0.20)',padding:'20px',marginTop:'20px',backgroundColor:'rgba(232,119,34,0.05)'}}>
                    <div className="state-title" style={{fontSize:'22px' ,color:'#4A4A4A'}}>预约状态：{this.listTrans('healthStatus',this.state.code)}</div>
                    <ul className="state-content" style={{ marginTop:'20px' ,fontSize:'14px',color:'#999', height:'14px'}}>
                        <li className="col-md-2"><span>体检类型&nbsp;&nbsp;</span>个险预约</li>
                        <li className="col-md-2"><span>预约号&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.healthOderCode}</li>
                        <li className="col-md-2" style={{width:'150px'}}><span>保单号&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.policyno}</li>
                        <li className="col-md-2"><span>任务来源&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.taskSource}</li>
                        <li className="col-md-2"  style={{width:'250px'}}><span>任务生成时间&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.taskGenerationTime}</li>
                    </ul>
                </div>
                <div className='detail-title clearfix' style={{marginTop:'20px'}}>
                    <div className="detail-title-left col-md-6" >
                        <span style={{color:'#E87722'}} className='ellipse'>|&nbsp;&nbsp;&nbsp;</span><span className='title' style={{color:'#333',fontSize:'16px'}}>体检人信息</span>
                        <ul className="clearfix" style={{marginLeft:'10px'}}>
                                {/* <li className='col-md-6'><span>体检类型</span></li> */}
                            <li style={{marginTop:'20px',height:'20px'}} className='col-md-6'><span style={{color:'#999',fontSize:'14px'}}>体检人姓名&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.healthName}</li>
                            <li style={{marginTop:'20px',height:'20px'}} className='col-md-6'><span style={{color:'#999',fontSize:'14px'}}>分公司&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.branchCompany}</li>
                            <li style={{marginTop:'20px',height:'20px'}} className='col-md-6'><span style={{color:'#999',fontSize:'14px'}}>证件类型&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.cardType}</li>
                            <li style={{marginTop:'20px',height:'20px'}} className='col-md-6'><span style={{color:'#999',fontSize:'14px'}}>证件号码&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.cardNum}</li>
                            <li style={{marginTop:'20px',height:'20px'}} className='col-md-6'><span style={{color:'#999',fontSize:'14px'}}>营销员&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.contact}</li>
                            <li style={{marginTop:'20px',height:'20px'}} className='col-md-6'><span style={{color:'#999',fontSize:'14px'}}>营销员电话&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.contactphone}</li>
                        </ul>
                    </div>
                    <div className="detail-title-right col-md-6">
                        <span style={{color:'#E87722'}} className='ellipse'>|&nbsp;&nbsp;&nbsp;</span><span className='title' style={{color:'#333',fontSize:'16px'}}>预约信息</span>
                            <ul className="clearfix" style={{marginLeft:'10px'}}>
                                <li style={{marginTop:'20px',height:'20px'}}><span style={{color:'#999',fontSize:'14px'}}>预约时间&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.healthOrderTime}</li>
                                <li style={{marginTop:'20px',height:'20px'}}><span style={{color:'#999',fontSize:'14px'}}>体检套餐&nbsp;&nbsp;</span>{projectli}</li>
                                <li style={{marginTop:'20px',height:'20px'}}><span style={{color:'#999',fontSize:'14px'}}>追加项目&nbsp;&nbsp;</span>{projecli}</li>
                            </ul>
                    </div>
                    <div className="detail-title-left col-md-6">
                        <span style={{color:'#E87722'}} className='ellipse'>|&nbsp;&nbsp;&nbsp;</span><span className='title' style={{color:'#333',fontSize:'16px'}}>体检机构信息</span>
                            <ul className="clearfix" style={{marginLeft:'10px'}}>
                                <li style={{marginTop:'20px',height:'20px'}}><span style={{color:'#999',fontSize:'14px'}}>机构名称&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.healthOrgName}</li>
                                <li style={{marginTop:'20px',height:'20px'}}><span style={{color:'#999',fontSize:'14px'}}>机构地址&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.specificAdress}</li>
                                <li style={{marginTop:'20px',height:'20px'}}><span style={{color:'#999',fontSize:'14px'}}>机构介绍&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.orgIntroduce}</li>
                                <li style={{marginTop:'20px',height:'20px'}}><span style={{color:'#999',fontSize:'14px'}}>联系电话&nbsp;&nbsp;</span>{this.state.queryRecordone==undefined?'':this.state.queryRecordone.phone}</li>
                            </ul>
                    </div>
       
                </div>
        
            </div>
        </div>

       <div className="report" style={{float:'left',width:'1070px',marginTop:'20px',padding:'20px',backgroundColor:'#fff',marginTop:'20px'}}> 
            <div className="report-title" style={{marginBottom:'20px'}}>
            体检报告录入
            </div> 
            <hr/>       
            <table style={{marginTop:'30px'}} width="100%" border="1" className="report-content"  cellpadding="0" cellspacing="0" >
                    <tbody>
                                <tr style={{height:'50px'}}>
                                    <th style={{textAlign:'center'}}>影像名称</th>
                                        <th style={{textAlign:'center'}}>资料类型</th>
                                        
                                </tr>
                                <tr style={{height:'50px'}}>
                                    <td style={{textAlign:'center'}}>{this.state.queryRecordone==undefined?'-':this.state.queryRecordone.healthname}</td>
                                    <td style={{textAlign:'center'}}>{this.state.queryRecordone==undefined?'-':this.state.queryRecordone.healthOderCode}</td>
                                    </tr>
                    </tbody>
                    </table>
            <table style={{marginTop:'30px'}} width="100%" border="1" className="report-content"  cellpadding="0" cellspacing="0" >
            <tbody>
                        <tr style={{height:'50px'}}>
                                <th style={{textAlign:'center'}}>体检大类</th>
                                <th style={{textAlign:'center'}}>体检项目</th>
                                <th style={{textAlign:'center'}}>体检细项</th>
                                <th style={{textAlign:'center'}}>正常值</th>
                                <th style={{textAlign:'center'}}>结果</th>
                                <th style={{textAlign:'center'}}>结论</th>
                                <th style={{textAlign:'center'}}>备注</th>
                                
                        </tr>
                        <tr style={{height:'50px'}}>
                            <td rowspan="3" style={{textAlign:'center'}}>{this.state.queryRecordone==undefined?'-':this.state.queryRecordone.healthname}</td>
                            <td rowspan="2" style={{textAlign:'center'}}>{this.state.queryRecordone==undefined?'-':this.state.queryRecordone.healthOderCode}</td>
                            <td style={{textAlign:'center'}}>{this.state.queryRecordone==undefined?'-':this.state.queryRecordone.healthOderCode}</td>
                            <td style={{textAlign:'center'}}>{this.state.queryRecordone==undefined?'-':this.state.queryRecordone.healthOderCode}</td>
                            <td style={{textAlign:'center'}}>{this.state.queryRecordone==undefined?'-':this.state.queryRecordone.healthOderCode}</td>
                            <td style={{textAlign:'center'}}>{this.state.queryRecordone==undefined?'-':this.state.queryRecordone.healthOderCode}</td>
                            <td style={{textAlign:'center'}}>{this.state.queryRecordone==undefined?'-':this.state.queryRecordone.healthOderCode}</td>
                            </tr>
                        <tr style={{height:'50px'}}>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            
                            </tr>
                        <tr style={{height:'50px'}}>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            
                            </tr>
                        <tr style={{height:'50px'}}>
                            <td style={{textAlign:'center'}}>1</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            <td style={{textAlign:'center'}}>上海</td>
                            </tr>
                </tbody>
            </table>
        </div> 
      </div> 
       
      <div style={{float:'right',width:'300px'}}>
       <div className="notes fr" 
       style={this.state.operateHistoryone==undefined?{display:'none'}:{width:'280px',float:'right',backgroundColor:'#fff',padding:'20px',marginLeft:'20px',display:'block'}}
       >
            <div className="notes-title" style={{fontSize:'16px' ,color:'#333', marginBottom:'20px'}}>
            操作履历记录
            </div>
            <hr/>
            <div className="timerLineWrpaer" style={{marginTop:'20px'}}>
                <Timeline>
                    <Timeline.Item color="#D7DDE4">{this.state.operateHistoryone==undefined?'':this.state.operateHistoryone.operateTime}
                        <p style={{fontSize:"14px",color:"#666666"}}>{this.state.operateHistoryone==undefined?'':this.state.operateHistoryone.operateuser}
                        {this.state.operateHistoryone==undefined?'':this.state.operateHistoryone.operateType}
                        了
                        {this.state.operateHistoryone==undefined?'':this.state.operateHistoryone.context}</p>
                        <p>备注：{this.state.operateHistoryone==undefined?'':this.state.operateHistoryone.remark}</p>
                    </Timeline.Item>
                    <Timeline.Item color="#D7DDE4">{this.state.operateHistoryone==undefined?'':this.state.operateHistoryone.operateTime}</Timeline.Item>
                    <Timeline.Item color="red">
                        <p>Solve initial network problems 1</p>
                        <p>Solve initial network problems 2</p>
                        <p>Solve initial network problems 3 2015-09-01</p>
                    </Timeline.Item>
                </Timeline>
            </div>
       </div>
      </div> 
    </div>
        )
}
}


export default detail;