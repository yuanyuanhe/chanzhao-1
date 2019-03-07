import React,{Component} from 'react'
import {load} from '../../config/api'
// import style from '../../style/css/look.mcss'
import {NavLink} from 'react-router-dom'
import  "../../style/css/look.css"
import { Tabs,Pagination,DatePicker,Checkbox, Calendar, Alert} from 'antd'
import moment from 'moment';
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple'];
const defaultCheckedList = ['Apple'];
function onPanelChange(value, mode) {
  console.log(value, mode);
}
function callback(key) {
    console.log(key);
  }
  function onChange(date, dateString) {
    console.log(date, dateString);

  }
class Look extends Component{

    // render(){
    //     return <div>this is Upload</div>
    // }
    state={
        message:{},//所有信息
        value: moment('2017-01-25'),
        selectedValue: moment('2017-01-25'),
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
    }
    onSelect = (value) => {
    this.setState({
      value,
      selectedValue: value,
    });
  }
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }


  onPanelChange = (value) => {
    this.setState({ value });
  }
    componentDidMount(){
        //根据ID查询
        
        load({
             id:this.props.match.params.id
        }).then(
             res=>this.setState({message:res.data.healthOrgManageLoad ?res.data.healthOrgManageLoad:{} })
        )

    }
    // componentWillReceiveProps(nextprops){
    //   console.log(456666,nextprops.id)
    //     if(nextprops.id!==this.props.match.params.id){
            
    //     load({
    //         id:nextprops.id,
    //     }).then(
            
    //         res=>this.setState({message:res.data.healthOrgManageLoad})
    //     )

    //     }else{
    //         return 
    //     }

        // <div className="introduce">
        //         <span>机构介绍</span>复旦大学附属华山医院是卫生部直属复旦大学（原上海医科大学）附属的一所综合性教学医院。建院于1907年，前身是中国红十字会总院，是上海地区中国人最早创办的医院，1991年重新恢复为中国红十字会直属医院。1992年首批通过国家三级甲等医院评审，目前已成为一所国家高层次的医疗机构，并为全国医疗、预防、教学、科研相结合的技术中心，在国内外 享有较高的声誉。 华山医院医疗技术力量雄厚，全院近1800名职工之中，医疗专业技术人员占80％，其中副高职以上专家教授290人，博士点10个，博士生导师39名，中国科学院院士、中国工程院院士各1名，开通博士后流动站2个；硕士点19个，硕士生导师79名。许多专家教授在国内外享有较高知名度。还有一整套行之有效的管理体制和管理人才。
        //         </div>
        //         <div className="tips">
        //         <span>
        //         备注
        //         </span>
        //         上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构
        //         </div>
       
    // }
    render(){
    const data=this.state.message
    const { value, selectedValue } = this.state;
    console.log(1233,data)
        return (
            <div className="content-right">
                <div className="tab">体检管理  /  <span> 体检管理</span></div>
                <div className="detail-content fl"> 
                    <div className="details">
                    <div className="institution clearfix">
                    <div className="institutionName fl">
                    <img className="" src="../../style/images/logo.png" alt=""/>
                    <div className="designation">
                    <h3>机构名称-分支机构</h3>
                    <ul>
                    <li><span>地址：</span>上海市静安区乌鲁木齐中路12号</li>
                    <li><span>地址：</span>上海市静安区乌鲁木齐中路12号</li>
                    <li><span>地址：</span>上海市静安区乌鲁木齐中路12号</li>
                    </ul>

                    </div>
                    </div>
                    <div className="quota fr">
                    <h5>预约时间名额</h5>
                    <div><span>上午 08:00-11:00</span><i>20</i>人</div>
                    <div><span>上午 08:00-11:00</span><i>20</i>人</div>
                    </div>
                    </div>
                    <div className="introduce clearfix">
                    <span>机构介绍</span>
                    <div className="intr fl" style={{width:" 88%"}}>
                    复旦大学附属华山医院是卫生部直属复旦大学（原上海医科大学）附属的一所综合性教学医院。建院于1907年，前身是中国红十字会总院，是上海地区中国人最早创办的医院，1991年重新恢复为中国红十字会直属医院。1992年首批通过国家三级甲等医院评审，目前已成为一所国家高层次的医疗机构，并为全国医疗、预防、教学、科研相结合的技术中心，在国内外 享有较高的声誉。 华山医院医疗技术力量雄厚，全院近1800名职工之中，医疗专业技术人员占80％，其中副高职以上专家教授290人，博士点10个，博士生导师39名，中国科学院院士、中国工程院院士各1名，开通博士后流动站2个；硕士点19个，硕士生导师79名。许多专家教授在国内外享有较高知名度。还有一整套行之有效的管理体制和管理人才。
                    </div>
                    </div>
                    <div className="tips clearfix">
                    <span>
                    备注
                    </span>
                    <div className="intr fl" style={{width:" 88%"}}>
                    上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构
                    </div>
                    </div>
                    
                    </div>
                    <div className="reports" style={{textAlign:"left",padding: "0 30px 54px",background: "#fff",width:"1200px"}}>
                    <Tabs style={{padding:0}}  defaultActiveKey="0" onChange={(key)=>{callback(key);}} className="clearfix header-table">
                        {/* 1:未预约 2:已预约 3:已邮件 4:已预约取消 5:已确认 6:已确认取消 7:已体检 8:资料回齐 9:录入完成 10:已撤销 */}
                        <TabPane tab="已关联项目" key="0">
                            <div className="box1 table-overflow m-b-2">
                            <div className="operation">
                            <button  className="addProject">新增项目</button>
                            <button  className="removeProject">删除</button>
                            <DatePicker style={{width:"250px"}} className="fr" defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} onChange={onChange} />
                            </div>
                            <ul className="checkboxList">
                                <li>
                                <Checkbox style={{color:"#333"}}
                                        indeterminate={this.state.indeterminate}
                                        onChange={this.onCheckAllChange}
                                        checked={this.state.checkAll}
                                    >
                                        全选
                                    </Checkbox>
                                </li>
                                <li className="col-md-3">
                                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                                <span className="price"><i></i>123</span>
                                </li>
                                <li className="col-md-3">
                                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                                <span className="price"><i></i>123</span>
                                </li>
                                <li className="col-md-3">
                                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                                <span className="price"><i></i>123</span>
                                </li>
                                <li className="col-md-3">
                                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                                <span className="price"><i></i>123</span>
                                </li>
                            </ul>
                            </div>
                            
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
                            showSizeChanger={true} 
                            showQuickJumper 
                            />
                            }
                        </TabPane>
                        <TabPane tab="已关联套餐" key="1">
                            <div className="box1 table-overflow m-b-2">
                            <div className="operation">
                            <button  className="addProject">新增项目</button>
                            <button  className="removeProject">删除</button>
                            <DatePicker style={{width:"250px"}} className="fr" defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} onChange={onChange} />
                            </div>
                            <ul className="checkboxList combo">
                                <li>
                                <Checkbox style={{color:"#333"}}
                                        indeterminate={this.state.indeterminate}
                                        onChange={this.onCheckAllChange}
                                        checked={this.state.checkAll}
                                    >
                                        全选
                                    </Checkbox>
                                </li>
                                <li className="col-md-3">
                                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                                <span className="price"><i></i>123</span>
                                </li>
                                <li className="col-md-3">
                                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                                <span className="price"><i></i>123</span>
                                </li>
                                <li className="col-md-3">
                                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                                <span className="price"><i></i>123</span>
                                </li>
                                <li className="col-md-3">
                                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                                <span className="price"><i></i>123</span>
                                </li>
                            </ul>
                            </div>
                            
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
                            showSizeChanger={true} 
                            showQuickJumper 
                            />
                            }
                            
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
                            showSizeChanger={true} 
                            showQuickJumper 
                            />
                            
                        </TabPane>
                        <TabPane tab="日历" key="2">
                            <div className="box1 table-overflow m-b-2">
                                <Calendar onPanelChange={onPanelChange} />
                            </div>
                        </TabPane>
                        </Tabs>
                    </div>
                </div>
                <div className="notes fr">
                <div className="notes-title">操作履历记录</div><div className="timerLineWrpaer">
                <ul className="ant-timeline">
                <li className="ant-timeline-item">
                <div className="ant-timeline-item-tail"></div>
                <div className="ant-timeline-item-head ant-timeline-item-head-#D7DDE4" style={{borderColor: "rgb(215, 221, 228)"}}>
                </div>
                <div className="ant-timeline-item-content">2015-09-01
                <p style={{fontSize: "14px", color: "rgb(102, 102, 102)"}}>
                王也  新增了预约体检</p><p>备注：新增了预约体检新增了预约体检新增了预约体检新增了预约体检新增了预约体检
                </p></div></li><li className="ant-timeline-item"><div className="ant-timeline-item-tail"></div>
                <div className="ant-timeline-item-head ant-timeline-item-head-#D7DDE4" style={{borderColor: "rgb(215, 221, 228)"}}>
                </div><div className="ant-timeline-item-content">2015-09-01</div>
                </li><li className="ant-timeline-item ant-timeline-item-last"><div className="ant-timeline-item-tail"></div>
                <div className="ant-timeline-item-head ant-timeline-item-head-red"></div>
                <div className="ant-timeline-item-content"><p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p></div></li></ul></div></div>
            </div>
        )
    }
}
export default Look;