import React,{Component} from 'react'
import { Route, Switch, NavLink } from "react-router-dom";
import * as api from '../../config/api.js'
import { Tabs,Pagination, DatePicker,Modal ,Button,Icon,Popover} from 'antd'

import Information from '../../common/model/index'
import ConfirmedPopup from '../../common/model/querEnModel'
import UnreservedPopup from '../../common/model/weiyuyuemodel'
import ReservedPopup from '../../common/model/yiyuyueModel'
import UpdataPopup from '../../common/model/updateImageModel'
import Detail from '../detail/index'


const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
  }

class Administration extends Component{
 /**
	 * 构造函数
	 * @param {*} props
	 */
	constructor(props) {
        // location.reload(()=>{window.history.back()} ) 
        // history.go(0)
		super(props);
    this.state = ({
        oder:'新单核保体检',
        queryRecord:[],         //全部列表数据
        //queryRecord1:[],         //未预约列表数据
        //queryRecord2:[],         //已预约列表数据
        //queryRecord5:[],         //已确认列表数据
        //queryRecord7:[],         //已体检列表数据
        //queryRecord8:[],         //报告回齐列表数据
        //queryRecord9:[],         //录入完成列表数据
        //queryRecord10:[],         //已撤销列表数据

        pagenum:1,             //当前页数

        cityList:[],            //城市列表
        hospitalList:[],        //体检机构列表
        //查询请求参数
        healthOderCode:'',      //预约号
        orderType:'',           //预约类型
        cityCode:'',            //城市代码
        checkupDates:'',        //体检日期
        personName:'',          //客户姓名
        partyCode:'',           //体检机构 name
        hospitalCode:'',       //体检机构 code
        //分页控制
        totalPage:0,	        //总页数
        pageSize:0,            //一页数据的大小
        totalCount:0,	        //总记录数
        // currentPage:'',	        //后台当前页数   
        //操作按钮，弹框控制
        operateHistory:[],
        queryRecord3:[],

        informOpt:false,            //预约信息的visible
                                    //全部
        unreserveOpt:false,         //未预约的visible
        reservedOpt:false,          //已预约的cisible
        confirmedOpt:false,         //已确认的visible
                                    //已体检的visible
                                    //报告回齐的visible
        entryOpt:false,                //录入完成
        rescindedOpt:false,            //已撤销
        updataOpt:false,             //影像上传
        //详情接口请求传参
        reserveNum:'',      //预约号
        healthState:'',    //预约状态/体检状态
    })
  }

  componentWillMount() {
      //城市列表查询
    api.cityLoad().then(res=>{this.setState({cityList:res.cityList})} );

    //初始调查询接口,取全部数据
    var param={
        pageno:this.state.pagenum,
        healthOderCode:this.state.healthOderCode,
        orderType:this.state.orderType,
        cityCode:this.state.cityCode,
        checkupDates:this.state.checkupDates,
        personName:this.state.personName,
        partyCode:this.state.partyCode,
        hospitalCode:this.state.hospitalCode,

    }
    api.selectQuery(param).then(res=>{this.setState({
        queryRecord:res.pagerList==undefined?[]:res.pagerList.pageItems,
        totalCount:res.pagerList==undefined?0:res.pagerList.totalCount,
        pagenum:res.pagerList==undefined?1:res.pagerList.currentPage,
        totalPage:res.pagerList==undefined?0:res.pagerList.totalPage,
        pageSize:res.pagerList==undefined?0:res.pagerList.pageSize
    })} ).catch();      
    
    //预约详情，调试
    // var num ={
    //     healthOderCode:'WX001',
    // }
    // api.detailedQuery(num).then();
    // api.statusQuery();
  }

  componentDidMount() {

    // api.cityLoad().then(res=>{this.setState({cityList:res.cityList})} );
    // var status ={
    //     healthStatus:'1',   //1:未预约2:已预约3:已邮件4:已预约取消5:已确认6:已确认取7:已体检8:资料回齐9:录入完成10:已撤销
    // }
    // api.statusQuery();
}

OrgCode(value){
    console.log(value);
    this.setState({hospitalCode:value})
}
//按钮点击事件，触发弹框
popup(code,num){
    var param2={
        healthOderCode:code,
        healthStatus:num,
    }
    api.detailedQuery(param2).then(res=>{this.setState({
        operateHistory:res.operateHistory,
        queryRecord3:res.queryRecord
    })});
    switch(num){
        case '1': 
            this.setState({unreserveOpt:true});
        break;
        case '2': 
            this.setState({reservedOpt:true});
        break;
        case '4': 
            this.setState({unreserveOpt:true});
        break;
        case '5': 
            this.setState({confirmedOpt:true});
        break;
        case '6': 
            this.setState({unreserveOpt:true});
        break;
        case '7': 
            this.setState({updataOpt:true});
        break;
        case '8': 
            this.setState({updataOpt:true});
        break;

    }        
    console.log(code+'-'+num)
}

//详情接口
detailQuery(){
    api.detailedQuery().then();
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
            return [{numb:numb,code:value,name:''}]
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
            return [{numb:numb,code:value,name:'取消预约'},{numb:numb,code:value,name:'修改预约'}]
            break;
            case '8':
            return [{numb:numb,code:value,}]
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

//快捷弹框<>
showConfirm(value) {
  Modal.confirm({
    title: '预约体检',
    content: '预约体检',
    okText: '确认',
    okType: 'danger',
    cancelText: '取消',
    bodyStyle:{width:'500px',height:'500px',},
    width:'1000px',
    height:'800px',
    onOk() {
      console.log('确认');
    },
    onCancel() {
      console.log('取消');
    },
  });
  console.log(value)
}

//取城市列表数据，及相应体检机构数据获取
cityQuery(id){
    var city ={
        cityCode:id,    //界面加载时，若不向后台传递城市code参数，则后台只向前台返回城市，不返回城市对应的体检机构
    }
    api.cityLoad(city).then(res=>{this.setState({hospitalList:res.hospitalList})} );
  }

//预约状态查询数据，数据1-10，8,9,10暂无数据，tabs无3,4,6,7，
statuQuery(statu,pages){
    if(statu!='0'){
    var status={
        healthStatus:statu,
        pageno:pages,
        healthOderCode:this.state.healthOderCode,
        orderType:this.state.orderType,
        cityCode:this.state.cityCode,
        checkupDates:this.state.checkupDates,
        personName:this.state.personName,
        hospitalCode:this.state.partyCode,
        partyCode:this.state.partyCode,
    }
    console.log(status)
    api.selectQuery(status).then(res=>{this.setState({
        queryRecord:res.pagerList==undefined?[]:res.pagerList.pageItems,
        totalCount:res.pagerList==undefined?0:res.pagerList.totalCount,
        pagenum:res.pagerList==undefined?1:res.pagerList.currentPage,
        totalPage:res.pagerList==undefined?0:res.pagerList.totalPage,
        pageSize:res.pagerList==undefined?0:res.pagerList.pageSize
    })} ).catch();
    }else{
        this.query(1);
    }
}

//查询按钮，
query(num){
    var param={
        pageno:num,
        healthOderCode:this.state.healthOderCode,
        orderType:this.state.orderType,
        cityCode:this.state.cityCode,
        checkupDates:this.state.checkupDates,
        personName:this.state.personName,
        hospitalCode:this.state.partyCode,
        partyCode:this.state.partyCode,
    }
    console.log(param)
    // api.food(param);
    api.selectQuery(param).then(res=>{this.setState({
        queryRecord:res.pagerList==undefined?[]:res.pagerList.pageItems,
        totalCount:res.pagerList==undefined?0:res.pagerList.totalCount,
        pagenum:res.pagerList==undefined?1:res.pagerList.currentPage,
        totalPage:res.pagerList==undefined?0:res.pagerList.totalPage,
        pageSize:res.pagerList==undefined?0:res.pagerList.pageSize
    })} ).catch();  
  }

render(){
        return (
   <div className="content-right">
       <div className="tab">
           体检管理  /  <span> 体检管理</span>
       </div>

       <div className="main1">
           <div className="box2">
               <div className="clearfix"></div>
               <ul className="clearfix chaxunlist">
                   <li className="col-mod-3">
                       <label className="fl" >体检预约号</label>
                       <input type="text" className="tl fl width20" placeholder="例:YY233432" value={this.state.healthOderCode} data-input-clear="5" onChange={(e)=>this.setState({healthOderCode:e.target.value})}/>
                   </li>
                   <li className="col-mod-3">
                       <label className="fl" >体检城市</label>
                       <select className="fl-none fl width20" name="choose" id="choose" value={this.state.cityCode} onChange={(e)=>{this.setState({cityCode:e.target.value}); this.cityQuery(e.target.value) }} >
                       <option value="请选择" >请选择</option>
                        {this.state.cityList==undefined?[]:this.state.cityList.map((item,index)=>{
                            return(
                                 <option key={index} value={item.note} onClick={
                                     (e)=>this.cityQuery(e.target.value)
                                    }>{item.province}</option>
                                )
                        })}
                       </select>
                   </li>
                   <li className="col-mod-3">
                       <label className="fl" >体检机构</label>
                       <select className="fl-none fl width20" name="choose" id="choose" value={this.state.partyCode} onChange={(e)=>this.setState({partyCode:e.target.value})}>
                       <option value="请选择" >请选择</option>
                       {this.state.hospitalList.map((item,index)=>{
                            return(
                                 <option key={index} value={item.hospitalCode} >{item.hospitalName}</option>
                                )
                        })}
                       </select>
                   </li>
                   <li className="col-mod-3">
                       <label className="fl" >体检日期</label>
                       <DatePicker placeholder='' onChange={(date,dateString)=>{this.setState({checkupDates:dateString})} }/>
                       {/* <select className="fl-none fl width20" name="choose" id="choose">
                       <option value="请选择" selected>请选择</option>
                       <option value="请选择1">请选择1</option>
                       <option value="请选择2">请选择2</option>
                       </select> */}
                   </li>
                   <li className="col-mod-3">
                       <label className="fl" >客户姓名</label>
                       <input type="text" className="tl fl width20" value={this.state.personName} data-input-clear="5" onChange={(e)=>this.setState({personName:e.target.value})}/>
                   </li>
                   <li className="col-mod-3">
                       <label className="fl" >预约类型</label>
                       <select className="fl-none fl width20" name="choose" id="choose" value={this.state.oder} onChange={(e)=>this.setState({orderType:e.target.value})}>
                       <option value="请选择" >请选择</option>
                       {/* <option value="请选择" >新单核保体检</option> */}
                       {/* {this.state.hospitalList.map((item,index)=>{
                            return(
                                 <option key={index} value={item.id}>{item.hospitalName}</option>
                                )
                        })} */}
                       </select>
                   </li>

                   <div className="title-add" style={{}}><a  className="add-data fr" data-reveal-id="edIt" onClick={()=>{this.query()}}>查询</a></div>
                   <div className="title-add"><a className="add-data fr" data-reveal-id="edIt" onClick={(e)=>this.setState({informOpt:true})}>预约体检</a></div>
                    {/* <div className="wraper clearfix">
                   <div className="title-add">
                   <a  className="reset" data-reveal-id="edIt">重置</a>
                   <a  className="confirm" data-reveal-id="edIt">确认</a>
                   </div>
                   </div> */}
               </ul>
           </div>
       </div>
           <div className="clear"></div>
           <div className="main1 content"  id="myTab2_2Content0">
           {/* <div className="title-add"><a href="javaScript:;" className="add-data" data-reveal-id="edIt">+新增</a></div> */}
           {/* <ul className="clearfix header-table"> */}
               {/* <li>未预约</li>
               <li>已预约</li>
               <li>已确认</li>
               <li>已体检</li>
               <li>报告回齐</li>
               <li>录入完成</li>
               <li>已撤回</li> */}
    <Tabs defaultActiveKey="0" onChange={(key)=>{callback(key);this.statuQuery(key);this.setState({key:key})}} className="clearfix header-table">
    {/* 1:未预约 2:已预约 3:已邮件 4:已预约取消 5:已确认 6:已确认取消 7:已体检 8:资料回齐 9:录入完成 10:已撤销 */}
    <TabPane tab="全部" key="0">
        <div className="box1 table-overflow m-b-2">
               <table width="100%" border="0" className="table1">
                   <tbody>
                   <tr>
                       <th>序号</th>
                       <th>体检人姓名</th>
                       <th>预约号</th>
                       <th>体检机构</th>
                       <th>营销员</th>
                       <th>营销员电话</th>
                       <th>体检项目</th>
                       <th>预约类型</th>
                       <th>预约状态</th>
                       <th>任务来源</th>
                       <th>操作</th>
                   </tr>
                    {this.state.queryRecord==undefined?[]:this.state.queryRecord.map((item,index)=>{
                        return(
                            <tr key={index} value={item.id}>
                                <td >{this.state.queryRecord==undefined?'':index+1}</td>
                                {/* index=(currentPage-1)*pageSize //序号*/}
                                <td >{item.healthName}</td>
                                <td >{item.healthOderCode}</td>
                                <td >{item.healthOrgName}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contact}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contactphone}</td>
                                <td >
                                    {item.healthProject.map((item,index)=>{
                                        return(
                                            <span key={index} value={item.id} onClick={(e)=>alert(item.id+item.projectName)}>{item.projectName}</span>
                                        )
                                    })}
                                </td>
                                <td >{this.listTrans('bookingType',item.bookingType)}</td>
                                <td >{this.listTrans('healthStatus',item.healthStatus)}</td>
                                <td >{item.taskSource}</td>
                                <td >
                                    <Popover placement="bottomRight" content={
                                        <div>
                                        {this.listTrans('operation',item.healthStatus,item.healthOderCode)==undefined?[]:this.listTrans('operation',item.healthStatus,item.healthOderCode).map((item,index)=>{
                                                return(
                                                    <span>
                                                    <a key={index} value={this.props.data} onClick={(e)=>this.popup(item.numb,item.code)}>{item.name}</a>
                                                    <br style={item.name==undefined?{display:'none'}:{display:'block'}}/>
                                                    </span>
                                                )})
                                            }
                                            <NavLink to={{pathname:'/index/Detail',code:item.healthStatus,numb:item.healthOderCode}} isActive={false}>查看</NavLink>
                                        </div>
                                            } trigger="click" 
                                        // title={
                                        // } 
                                        onConfirm={true} >
                                        <Icon type="ellipsis" theme="outlined" />
                                    </Popover>
                                    {/* {this.listTrans('operation',item.healthStatus,item.healthOderCode)==undefined?[]:this.listTrans('operation',item.healthStatus,item.healthOderCode).map((item,index)=>{
                                        return(
                                            <a key={index} value={this.props.data} onClick={(e)=>this.popup(item.numb,item.code)}>{item.name}</a>
                                        )})} */}
                                {/* {this.listTrans('operation',item.healthStatus)} */}
                                {/* <td><a  data-reveal-id="edIt">修改</a><a  data-reveal-id="addalldata">删除</a><a  data-reveal-id="contectM">关联项目</a></td> */}
                                </td>
                            </tr>
                        )
                    })}
                   
                   </tbody>
               </table>
           </div>
           {/* <ul className="mui-pagination mui-pagination-lg tr">
               <span className="totle">共45条</span>
               <li className="mui-previous">
                   <a >
                       &lt;
                   </a>
               </li>
               <li>
                   <a className="active">
                       1
                   </a>
               </li>
               <li>
                   <a >
                       2
                   </a>
               </li>
               <li>
                   <a >
                       3
                   </a>
               </li>
               <li>
                   <a >
                       4
                   </a>
               </li>
               <li className="mui-active">
                   <a >
                       5
                   </a>
               </li>
               <li className="mui-next">
                   <a >
                       >
                   </a>
               </li>
               <li className="mui-next">
                   <a >
                       25条/页<i></i>
                   </a>
               </li>
               <span>
                   跳至 
               </span>
               <li className="mui-next">
                   <a >
                       5
                   </a>
               </li>
               <span>
                   页
               </span>
           </ul> */}
           {this.state.queryRecord==undefined?'':
           <Pagination style={{float:"right"}}
        //    hideOnSinglePage={this.state.queryRecord==undefined?true:false} 
        //    defaultCurrent={1} 
           current={this.state.pagenum}
           showTotal={function showTotal(total) {
            return '共'+total+'条';
          }}
           total={this.state.totalCount}     //总记录数
           onChange={
            (page,pageSize)=>{
                this.setState({pagenum:page})
                console.log(this.state.pagenum)   //setState设置后，不能立马获取到改变后state
                this.query(page);                //tab全部，调全部查询接口
            }} 
           pageSize={10}     //总数%每页条数=页数
           showSizeChanger={false} 
           showQuickJumper 
           />
        }
    </TabPane>
    <TabPane tab="未预约" key="1">
        <div className="box1 table-overflow m-b-2">
               <table width="100%" border="0" className="table1">
                   <tbody>
                   <tr>
                       <th>序号</th>
                       <th>体检人姓名</th>
                       <th>预约号</th>
                       <th>营销员</th>
                       <th>营销员电话</th>
                       <th>预约类型</th>
                       <th>任务来源</th>
                       <th>任务生成时间</th>
                       <th>操作</th>
                   </tr>
                    {this.state.queryRecord==undefined?[]:this.state.queryRecord.map((item,index)=>{
                        return(
                            <tr key={index} value={item.id}>
                                <td >{this.state.queryRecord==undefined?[]:index+1}</td>
                                <td >{item.healthName}</td>
                                <td >{item.healthOrgName}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contact}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contactphone}</td>
                                <td >{this.listTrans('bookingType',item.bookingType)}</td>
                                <td >{item.taskSource}</td>
                                <td >{item.taskGenerationTime}</td>
                                <td>
                                
                                    
                                    <Popover placement="bottomRight" content={
                                        <div>
                                        {this.listTrans('operation','1',item.healthOderCode).map((item,index)=>{
                                            return(
                                                <span>
                                                    <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                                    <br/>
                                                </span>
                                            )})
                                        }
                                        <NavLink to={{pathname:'/index/Detail',code:item.healthStatus,numb:item.healthOderCode}} isActive={false}>查看</NavLink>
                                        </div>
                                    } trigger="click" 
                                    // title={
                                    //     this.listTrans('operation','1',item.healthOderCode).map((item,index)=>{
                                    //         return(
                                    //             <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                    //         )})
                                    // } 
                                    onConfirm={true} >
                                    <Icon type="ellipsis" theme="outlined" />
                                    </Popover>
                                    
                                    {/* {this.listTrans('operation','1',item.healthOderCode).map((item,index)=>{
                                        return(
                                            <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                        )})} */}
                                </td>
                                {/* <td><a  data-reveal-id="edIt">修改</a><a  data-reveal-id="addalldata">删除</a><a  data-reveal-id="contectM">关联项目</a></td> */}
                            </tr>
                        )
                    })}
                   
                   </tbody>
               </table>
           </div>
           {this.state.queryRecord1==undefined?'':
           <Pagination style={{float:"right"}}
        //    hideOnSinglePage={true} 
        //    defaultCurrent={1} 
           current={this.state.pagenum}
           showTotal={function showTotal(total) {
            return '共'+total+'条';
          }}
           total={this.state.totalCount}     //总记录数
           onChange={
            (page,pageSize)=>{
                console.log(page)
                this.setState({pagenum:page})
                this.statusQuery('1',page);                //调预约状态接口，状态写死
            }} 
           pageSize={10}     //总数%每页条数=页数
           showSizeChanger={false} 
           showQuickJumper 
           />
        }
    </TabPane>
    <TabPane tab="已预约" key="2">
        <div className="box1 table-overflow m-b-2">
               <table width="100%" border="0" className="table1">
                   <tbody>
                   <tr>
                       <th>序号</th>
                       <th>体检人姓名</th>
                       <th>预约号</th>
                       <th>体检机构</th>
                       <th>营销员</th>
                       <th>营销员电话</th>
                       <th>体检项目</th>
                       <th>预约类型</th>
                       <th>体检时间</th>
                       <th>任务来源</th>
                       <th>操作</th>
                   </tr>
                    {this.state.queryRecord==undefined?[]:this.state.queryRecord.map((item,index)=>{
                        return(
                            <tr key={index} value={item.id}>
                                <td >{index+1}</td>
                                <td >{item.healthName}</td>
                                <td >{item.healthOderCode}</td>
                                <td >{item.healthOrgName}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contact}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contactphone}</td>
                                <td >
                                    {item.healthProject.map((item,index)=>{
                                        return(
                                            <span key={index} value={item.id} onClick={(e)=>alert(item.id+item.projectName)}>{item.projectName}</span>
                                        )
                                    })}
                                </td>
                                <td >{this.listTrans('bookingType',item.bookingType)}</td>
                                <td >{item.healthOrderTime}</td>
                                <td >{item.taskSource}</td>
                                <td>
                                    <Popover placement="bottomRight" content={
                                        <div>
                                                {this.listTrans('operation','2',item.healthOderCode).map((item,index)=>{
                                                    return(
                                                        <span>
                                                            <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                                        <br/>
                                                        </span>
                                                    )})
                                                }
                                            <NavLink to={{pathname:'/index/Detail',code:item.healthStatus,numb:item.healthOderCode}} isActive={false}>查看</NavLink>    
                                        </div>
                                            } trigger="click" 
                                            // title={
                                            // } 
                                            onConfirm={true} >
                                            <Icon type="ellipsis" theme="outlined" />
                                    </Popover>
                                    {/* {this.listTrans('operation','2',item.healthOderCode).map((item,index)=>{
                                        return(
                                            <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                        )})} */}
                                </td>
                                {/* <td><a  data-reveal-id="edIt">修改</a><a  data-reveal-id="addalldata">删除</a><a  data-reveal-id="contectM">关联项目</a></td> */}
                            </tr>
                        )
                    })}
                   
                   </tbody>
               </table>
           </div>
           {this.state.queryRecord1==undefined?'':
           <Pagination style={{float:"right"}}
        //    hideOnSinglePage={true} 
        //    defaultCurrent={1} 
           current={this.state.pagenum}
           showTotal={function showTotal(total) {
            return '共'+total+'条';
          }}
           total={this.state.totalCount}     //总记录数
           onChange={
            (page,pageSize)=>{
                this.setState({pagenum:page})
                this.query();                //tab全部，调全部查询接口
            }} 
           pageSize={10}     //总数%每页条数=页数
           showSizeChanger={false} 
           showQuickJumper 
           />
        }
    </TabPane>
    <TabPane tab="已确认" key="5">
        <div className="box1 table-overflow m-b-2">
               <table width="100%" border="0" className="table1">
                   <tbody>
                   <tr>
                       <th>序号</th>
                       <th>体检人姓名</th>
                       <th>预约号</th>
                       <th>体检机构</th>
                       <th>营销员</th>
                       <th>营销员电话</th>
                       <th>体检项目</th>
                       <th>预约类型</th>
                       <th>体检时间</th>
                       <th>任务来源</th>
                       <th>操作</th>
                   </tr>
                    {this.state.queryRecord==undefined?[]:this.state.queryRecord.map((item,index)=>{
                        return(
                            <tr key={index} value={item.id}>
                                <td >{index+1}</td>
                                <td >{item.healthName}</td>
                                <td >{item.healthOderCode}</td>
                                <td >{item.healthOrgName}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contact}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contactphone}</td>
                                <td >
                                    {item.healthProject.map((item,index)=>{
                                        return(
                                            <span key={index} value={item.id} onClick={(e)=>alert(item.id+item.projectName)}>{item.projectName}</span>
                                        )
                                    })}
                                </td>
                                <td >{this.listTrans('bookingType',item.bookingType)}</td>
                                <td >{item.healthOrderTime}</td>
                                <td >{item.taskSource}</td>
                                <td>
                                    <Popover placement="bottomRight" content={
                                        <div>
                                                {this.listTrans('operation','5',item.healthOderCode).map((item,index)=>{
                                                    return(
                                                        <span>
                                                            <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                                            <br/>
                                                        </span>
                                                    )})
                                                }
                                            <NavLink to={{pathname:'/index/Detail',code:item.healthStatus,numb:item.healthOderCode}} isActive={false}>查看</NavLink>    
                                        </div>
                                            } trigger="click" 
                                            // title={
                                            // } 
                                            onConfirm={true} >
                                            <Icon type="ellipsis" theme="outlined" />
                                    </Popover>
                                    {/* {this.listTrans('operation','5',item.healthOderCode).map((item,index)=>{
                                        return(
                                            <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                        )})} */}
                                </td>
                                {/* <td><a  data-reveal-id="edIt">修改</a><a  data-reveal-id="addalldata">删除</a><a  data-reveal-id="contectM">关联项目</a></td> */}
                            </tr>
                        )
                    })}
                   
                   </tbody>
               </table>
           </div>
           {this.state.queryRecord1==undefined?'':
           <Pagination style={{float:"right"}}
        //    hideOnSinglePage={true} 
        //    defaultCurrent={1} 
           current={this.state.pagenum}
           showTotal={function showTotal(total) {
            return '共'+total+'条';
          }}
           total={this.state.totalCount}     //总记录数
           onChange={
            (page,pageSize)=>{
                this.setState({pagenum:page})
                this.query();                //tab全部，调全部查询接口
            }} 
           pageSize={10}     //总数%每页条数=页数
           showSizeChanger={false} 
           showQuickJumper 
           />
        }
    </TabPane>
    <TabPane tab="已体检" key="7">
        <div className="box1 table-overflow m-b-2">
               <table width="100%" border="0" className="table1">
                   <tbody>
                   <tr>
                       <th>序号</th>
                       <th>体检人姓名</th>
                       <th>预约号</th>
                       <th>体检机构</th>
                       <th>营销员</th>
                       <th>营销员电话</th>
                       <th>体检项目</th>
                       <th>预约类型</th>
                       <th>体检时间</th>
                       <th>操作</th>
                   </tr>
                    {this.state.queryRecord==undefined?[]:this.state.queryRecord.map((item,index)=>{
                        return(
                            <tr key={index} value={item.id}>
                                <td >{index+1}</td>
                                <td >{item.healthName}</td>
                                <td >{item.healthOderCode}</td>
                                <td >{item.healthOrgName}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contact}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contactphone}</td>
                                <td >
                                    
                                    {item.healthProject.map((item,index)=>{
                                        return(
                                            <span key={index} value={item.id} onClick={(e)=>alert(item.id+item.projectName)}>{item.projectName}</span>
                                        )
                                    })}
                                </td>
                                <td >{this.listTrans('bookingType',item.bookingType)}</td>
                                <td >{item.healthOrderTime}</td>
                                <td>
                                    <Popover placement="bottomRight" content={
                                        <div>
                                                {this.listTrans('operation','7',item.healthOderCode).map((item,index)=>{
                                                    return(
                                                        <span>
                                                            <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                                            <br/>
                                                        </span>
                                                    )})
                                                }
                                                <NavLink to={{pathname:'/index/Detail',code:item.healthStatus,numb:item.healthOderCode}} isActive={false}>查看</NavLink>    
                                        </div>
                                            } trigger="click" 
                                            // title={
                                            // } 
                                            onConfirm={true} >
                                            <Icon type="ellipsis" theme="outlined" />
                                    </Popover>
                                    {/* {this.listTrans('operation','7',item.healthOderCode).map((item,index)=>{
                                        return(
                                            <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                        )})} */}
                                </td>
                                {/* <td><a  data-reveal-id="edIt">修改</a><a  data-reveal-id="addalldata">删除</a><a  data-reveal-id="contectM">关联项目</a></td> */}
                            </tr>
                        )
                    })}
                   
                   </tbody>
               </table>
           </div>
           {this.state.queryRecord1==undefined?'':
           <Pagination style={{float:"right",display:this.state.queryRecord==undefined?"none":"block"}}
        //    hideOnSinglePage={true} 
        //    defaultCurrent={1} 
           current={this.state.pagenum}
           showTotal={function showTotal(total) {
            return '共'+total+'条';
          }}
           total={this.state.totalCount}     //总记录数
           onChange={
            (page,pageSize)=>{
                this.setState({pagenum:page})
                this.query();                //tab全部，调全部查询接口
            }} 
           pageSize={10}     //总数%每页条数=页数
           showSizeChanger={false} 
           showQuickJumper 
           />
        }
    </TabPane>
    <TabPane tab="报告回齐" key="8">
        <div className="box1 table-overflow m-b-2">
               <table width="100%" border="0" className="table1">
                   <tbody>
                   <tr>
                       <th>序号</th>
                       <th>体检人姓名</th>
                       <th>体检机构</th>
                       <th>营销员</th>
                       <th>营销员电话</th>
                       <th>预约类型</th>
                       <th>体检项目</th>
                       <th>影像上传时间</th>
                       <th>任务来源</th>
                       <th>操作</th>
                   </tr>
                    {this.state.queryRecord==undefined?[]:this.state.queryRecord.map((item,index)=>{
                        return(
                            <tr key={index} value={item.id}>
                                <td >{index+1}</td>
                                <td >{item.healthName}</td>
                                <td >{item.healthOrgName}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contact}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contactphone}</td>
                                <td >{this.listTrans('bookingType',item.bookingType)}</td>
                                <td >
                                    {item.healthProject.map((item,index)=>{
                                        return(
                                            <span key={index} value={item.id} onClick={(e)=>alert(item.id+item.projectName)}>{item.projectName}</span>
                                        )
                                    })}
                                </td>
                                <td >{item.imageUploadTime}</td>
                                <td >{item.taskSource}</td>
                                <td>
                                    <Popover placement="bottomRight" content={
                                        <div>
                                                {this.listTrans('operation','8',item.healthOderCode).map((item,index)=>{
                                                    return(
                                                        <span>
                                                            {/* <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                                            <br/> */}
                                                        </span>
                                                    )})
                                                }
                                            <NavLink to={{pathname:'/index/Detail',code:item.healthStatus,numb:item.healthOderCode}} isActive={false}>查看</NavLink>    
                                        </div>
                                            } trigger="click" 
                                            // title={
                                            // } 
                                            onConfirm={true} >
                                            <Icon type="ellipsis" theme="outlined" />
                                    </Popover>
                                    {/* {this.listTrans('operation','8',item.healthOderCode).map((item,index)=>{
                                        return(
                                            <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                        )})} */}
                                </td>
                                {/* <td><a  data-reveal-id="edIt">修改</a><a  data-reveal-id="addalldata">删除</a><a  data-reveal-id="contectM">关联项目</a></td> */}
                            </tr>
                        )
                    })}
                   
                   </tbody>
               </table>
           </div>
           {this.state.queryRecord1==undefined?'':
           <Pagination style={{float:"right"}}
        //    hideOnSinglePage={true} 
        //    defaultCurrent={1} 
           current={this.state.pagenum}
           showTotal={function showTotal(total) {
            return '共'+total+'条';
          }}
           total={this.state.totalCount}     //总记录数
           onChange={
            (page,pageSize)=>{
                this.setState({pagenum:page})
                this.query();                //tab全部，调全部查询接口
            }} 
           pageSize={10}     //总数%每页条数=页数
           showSizeChanger={false} 
           showQuickJumper 
           />
        }
    </TabPane>
    <TabPane tab="录入完成" key="9">
        <div className="box1 table-overflow m-b-2">
               <table width="100%" border="0" className="table1">
                   <tbody>
                   <tr>
                       <th>序号</th>
                       <th>体检人姓名</th>
                       <th>体检机构</th>
                       <th>营销员</th>
                       <th>营销员电话</th>
                       <th>预约类型</th>
                       <th>体检项目</th>
                       <th>体检时间</th>
                       <th>任务来源</th>
                       <th>操作</th>
                   </tr>
                    {this.state.queryRecord==undefined?[]:this.state.queryRecord.map((item,index)=>{
                        return(
                            <tr key={index} value={item.id}>
                                <td >{index+1}</td>
                                <td >{item.healthName}</td>
                                <td >{item.healthOrgName}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contact}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contactphone}</td>
                                <td >{this.listTrans('bookingType',item.bookingType)}</td>
                                <td >
                                    {item.healthProject.map((item,index)=>{
                                        return(
                                            <span key={index} value={item.id} onClick={(e)=>alert(item.id+item.projectName)}>{item.projectName}</span>
                                        )
                                    })}
                                </td>
                                <td >2018.7.13</td>
                                <td >{item.taskSource}</td>
                                <td>
                                    <Popover placement="bottomRight" content={
                                        <div>
                                                {this.listTrans('operation','9',item.healthOderCode).map((item,index)=>{
                                                    return(
                                                        <span>
                                                            {/* <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                                            <br/> */}
                                                        </span>
                                                    )})
                                                }
                                            <NavLink to={{pathname:'/index/Detail',code:item.healthStatus,numb:item.healthOderCode}} isActive={false}>查看</NavLink>    
                                        </div>
                                            } trigger="click" 
                                            // title={
                                            // } 
                                            onConfirm={true} >
                                            <Icon type="ellipsis" theme="outlined" />
                                    </Popover>
                                    {/* {this.listTrans('operation','9',item.healthOderCode).map((item,index)=>{
                                        return(
                                            <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                        )})} */}
                                </td>
                                {/* <td><a  data-reveal-id="edIt">修改</a><a  data-reveal-id="addalldata">删除</a><a  data-reveal-id="contectM">关联项目</a></td> */}
                            </tr>
                        )
                    })}
                   
                   </tbody>
               </table>
           </div>
           
           <Pagination style={{float:"right",display:this.state.queryRecord1==undefined?'none':'block'}}
        //    hideOnSinglePage={true} 
        //    defaultCurrent={1} 
           current={this.state.pagenum}
           showTotal={function showTotal(total) {
            return '共'+total+'条';
          }}
           total={this.state.totalCount}     //总记录数
           onChange={
            (page,pageSize)=>{
                this.setState({pagenum:page})
                this.query();                //tab全部，调全部查询接口
            }} 
           pageSize={10}     //总数%每页条数=页数
           showSizeChanger={false} 
           showQuickJumper 
           />
        
    </TabPane>
    <TabPane tab="已撤回" key="10">
        <div className="box1 table-overflow m-b-2">
               <table width="100%" border="0" className="table1">
                   <tbody>
                   <tr>
                       <th>序号</th>
                       <th>体检人姓名</th>
                       <th>体检机构</th>
                       <th>营销员</th>
                       <th>营销员电话</th>
                       <th>预约类型</th>
                       <th>体检项目</th>
                       <th>体检时间</th>
                       <th>任务来源</th>
                       <th>操作</th>
                   </tr>
                    {this.state.queryRecord==undefined?[]:this.state.queryRecord.map((item,index)=>{
                        return(
                            <tr key={index} value={item.id}>
                                <td >{index+1}</td>
                                <td >{item.healthName}</td>
                                <td >{item.healthOrgName}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contact}</td>
                                <td >{item.healthCheckupRecord==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1]==undefined?'':item.healthCheckupRecord[item.healthCheckupRecord.length-1].contactphone}</td>
                                <td >{this.listTrans('bookingType',item.bookingType)}</td>
                                <td >
                                    {item.healthProject.map((item,index)=>{
                                        return(
                                            <span key={index} value={item.id} onClick={(e)=>alert(item.id+item.projectName)}>{item.projectName}</span>
                                        )
                                    })}
                                </td>
                                <td >2018.7.13</td>
                                <td >{item.taskSource}</td>
                                <td>
                                    <Popover placement="bottomRight" content={
                                        <div>
                                                {this.listTrans('operation','10',item.healthOderCode).map((item,index)=>{
                                                    return(
                                                        <span>
                                                            {/* <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                                            <br/> */}
                                                        </span>
                                                    )})
                                                }
                                            <NavLink to={{pathname:'/index/Detail',code:item.healthStatus,numb:item.healthOderCode}} isActive={false}>查看</NavLink>    
                                        </div>
                                            } trigger="click" 
                                            // title={
                                            // } 
                                            onConfirm={true} >
                                            <Icon type="ellipsis" theme="outlined" />
                                    </Popover>
                                    {/* {this.listTrans('operation','10',item.healthOderCode).map((item,index)=>{
                                        return(
                                            <a key={index} onClick={(e)=>this.popup(item.num,item.code)}>{item.name}</a>
                                        )})} */}
                                </td>
                                {/* <td><a  data-reveal-id="edIt">修改</a><a  data-reveal-id="addalldata">删除</a><a  data-reveal-id="contectM">关联项目</a></td> */}
                            </tr>
                        )
                    })}
                   
                   </tbody>
               </table>
           </div>
           {this.state.queryRecord1==undefined?'':
           <Pagination style={{float:"right"}}
        //    hideOnSinglePage={true} s
        //    defaultCurrent={1} 
           current={this.state.pagenum}
           showTotal={function showTotal(total) {
            return '共'+total+'条';
          }}
           total={this.state.totalCount}     //总记录数
           onChange={
            (page,pageSize)=>{
                console.log(page)
                this.setState({pagenum:page})
                this.query();                //tab全部，调全部查询接口
            }} 
           pageSize={10}     //总数%每页条数=页数
           showSizeChanger={false} 
           showQuickJumper 
           />  
        }      
    </TabPane>
  </Tabs> 
 
    <Modal
    //   title="Basic Modal"
    cancelText="取消"
    okText="确认"
    visible={this.state.informOpt}
    onOk={(e)=>this.setState({informOpt:false})}
    onCancel={(e)=>this.setState({informOpt:false})}
    width={700}
    mask={true}
    >
    <Information data={this.state.queryRecord3[0]}></Information>
    </Modal> 
    <Modal
    //   title="Basic Modal"
    cancelText="取消"
    okText="确认"
    visible={this.state.confirmedOpt}
    onOk={(e)=>this.setState({confirmedOpt:false})}
    onCancel={(e)=>this.setState({confirmedOpt:false})}
    width={700}
    mask={true}
    >
    <ConfirmedPopup data={this.state.queryRecord3[0]}></ConfirmedPopup>
    </Modal> 
    <Modal
    //   title="Basic Modal"
    cancelText="取消"
    okText="确认"
    visible={this.state.unreserveOpt}
    onOk={(e)=>this.setState({unreserveOpt:false})}
    onCancel={(e)=>this.setState({unreserveOpt:false})}
    width={700}
    mask={true}
    >
    <UnreservedPopup data={this.state.queryRecord3[0]}></UnreservedPopup>
    </Modal>
    <Modal
    //   title="Basic Modal"
    cancelText="取消"
    okText="确认"
    visible={this.state.reservedOpt}
    onOk={(e)=>this.setState({reservedOpt:false})}
    onCancel={(e)=>this.setState({reservedOpt:false})}
    width={700}
    mask={true}
    >
    <ReservedPopup data={this.state.queryRecord3[0]}></ReservedPopup>
    </Modal>
    <Modal
    //   title="Basic Modal"
    cancelText="取消"
    okText="确认"
    visible={this.state.updataOpt}
    onOk={(e)=>this.setState({updatadOpt:false})}
    onCancel={(e)=>this.setState({updataOpt:false})}
    width={700}
    mask={true}
    >
    <UpdataPopup data={this.state.queryRecord3[0]}></UpdataPopup>
    </Modal>
       </div>
   <Switch>
        <Route path="/index/Detail" component={Detail} />
   </Switch>
   </div> 
     
        )
    }
}

export default Administration;