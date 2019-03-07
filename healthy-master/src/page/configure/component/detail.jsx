import React, { Component } from "react";
import { load, meal,setype } from "../../../config/api";
// import style from '../../style/css/look.mcss'
import json from '../../../../public/address.json'
import "../../../../public/css/look.css";
import {
  Tabs,
  Pagination,
  DatePicker,
  Checkbox,
  Calendar,
  Alert,
  Table
} from "antd";
import moment from "moment";
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Apple"];
const defaultCheckedList = ["Apple"];
function onPanelChange(value, mode) {
  console.log(value, mode);
}

function onChange(date, dateString) {
  console.log(date, dateString);
}
class Look extends Component {
  state = {
    message: {}, //所有信息
    value: moment("2017-01-25"),
    selectedValue: moment("2017-01-25"),
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
    program: [], //项目
    meal: [], //套餐
    sName:""
  };
  onSelect = value => {
    this.setState({
      value,
      selectedValue: value
    });
  };
  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  onPanelChange = value => {
    this.setState({ value });
  };
  componentDidMount() {
    var a = this.props.location.state ? this.props.location.state : "1&&&&aaa&&&&11";
    console.log(a)
    // 根据ID查询
    load({
      id: a.split("&&&&")[0]
    }).then(res =>
      this.setState({
        message: res.data.healthOrgManageLoad
          ? res.data.healthOrgManageLoad
          : {}
      })
    );
    meal({
      orgId: a.split("&&&&")[2],
      createUser: a.split("&&&&")[1],
      projectType: "1"
    })
      .then(res => {
        // console.log(res)
        this.setState({ program: res.data.projectReferenceList });
      })
      .catch(error => {
        console.log(error);
      });
      setype().then(
        res=>{
          this.setState({sName:res.data.orgBigTypeList})
          console.log(res)
          // for(var i=0;i<res.data.orgBigTypeList.length;i++){
          //   if(a.split("&&&&")[4]==res.data.orgBigTypeList[i].code){
          //     this.setState({sName:res.data.orgBigTypeList[i].name})
          //   }
          // }
          
        }
      )
  }
  callback = key => {
    var a = this.props.location.state ? this.props.location.state : "1&&&&aaa&&&&11";
    meal({
      orgId: a.split("&&&&")[2],
      createUser: a.split("&&&&")[1],
      projectType: "0"
    }).then(res => {
      this.setState({
        meal: res.data.projectReferenceList
      });
    });
  };
  render() {
    
    const columns = [
      {
        title: "全选",
        dataIndex: "resourceName",
        key: "resourceName"
      },
      {
        title: "",
        dataIndex: "resoucerCost",
        key: "resoucerCost"
      }
    ];
    let data1 = this.state.program;
    for (var i = 0; i < data1.length; i++) {
      data1[i].key = `${i}`;
    }
    let data2 = this.state.meal;
    for (var j = 0; j < data2.length; j++) {
      data2[j].key = `${j}`;
    }

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      }
    };
    const data = this.state.message;
    const { value, selectedValue } = this.state;
    for(var i=0;i<json.length;i++){
      if(data.province==json[i].code){
        data.province=json[i].name
      }
    }
    for(var i=0;i<json.length;i++){
      for(var j=0;j<json[i].cityList.length;j++){
        // console.log(json[i].cityList[i])
         if(data.city==json[i].cityList[j].code){
           data.city=json[i].cityList[j].name
         }
      }
    }
    for(var i=0;i<json.length;i++){
      for(var j=0;j<json[i].cityList.length;j++){
        for(var n=0;n<json[i].cityList[j].areaList.length;n++){
          // console.log(json[i].cityList[j].areaList[n])
          if(data.region==json[i].cityList[j].areaList[n].code){
            data.region=json[i].cityList[j].areaList[n].name
          }
        }
      }
    }
    var name=''
  for(var i=0;i<this.state.sName.length;i++){
    if(data.branchName=this.state.sName[i].code){
          name=this.state.sName[i].name
    }
  }
    // var personam=0,starttimeam='',endtimeam='';
    // var personpm=0,starttimepm='',endtimepm='';
  // if(data.healthOrgOrderTime){  for(var i=0;i<data.healthOrgOrderTime.length;i++){
  //     if(parseInt(data.healthOrgOrderTime.split(":")[0]<=12)){
  //         personam+=parseInt(data.healthOrgOrderTime[i].quota)
  //         starttimeam=data.healthOrgOrderTime[i].bookableStarttime
  //         endtimeam=data.healthOrgOrderTime[i].bookableEndtime
  //     }else{
  //       personpm+=parseInt(data.healthOrgOrderTime[i].quota)
  //       starttimepm=data.healthOrgOrderTime[i].bookableStarttime
  //       endtimepm=data.healthOrgOrderTime[i].bookableEndtime
  //     }
  //   }}
    return (
      <div className="content-right">
        <div className="tab">
          体检管理 / <span> 体检管理</span>
        </div>
        <div style={{display:"flex",padding:"30px 0 0 30px"}}>
        <div className="detail-content fl">
          <div className="details">
            <div className="institution clearfix">
              <div className="institutionName fl">
               
                <div className="designation">
                  <h3>
                  {name}-{data.healthOrgName}
                  </h3>
                  <ul>
                    <li>
                      <span>地址：</span>
                      
                      {`${data.province}${data.city}${data.region}${
                        data.specificAdress
                      }`}
                    </li>
                    <li style={{wordSpacing:"3px"}}>
                      <span>经纬度：</span>
                     {data.longitude}&ordm;E&nbsp;.&nbsp;
                      <span>{data.latitude}&ordm;N</span>
                    </li>
                    <li>
                      <span>联系人：</span>
                      {data.contact} <span>联系电话</span>
                      {data.phone}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="quota fr">
                <h5>预约时间名额</h5>

                <div>
                  {/* <li>{starttimeam}{endtimeam}{personam}</li>
                  <li>{starttimepm}{endtimepm}{personpm}</li> */}
                  {data.healthOrgOrderTime?data.healthOrgOrderTime.map((item,index)=>{
                          return <li key={index}>
                          {parseInt(item.bookableStarttime.split(":")[0])<=12?"上午"+item.bookableStarttime+"~"+item.bookableEndtime+"   "+item.quota+"人":"下午"+item.bookableStarttime+"~"+item.bookableEndtime+"  "+item.quota+"人"}
                               
                          </li>
                  }):""}
                  {/* <span>
                    {data.healthOrgOrderTime? data.healthOrgOrderTime[0].bookableStarttime?data.healthOrgOrderTime[0].bookableStarttime:"" +"~" +data.healthOrgOrderTime[0].bookableEndtime?data.healthOrgOrderTime[0].bookableEndtime:"": ""}
                  </span> */}
                  {/* <i>
                    {data.healthOrgOrderTime
                      ? data.healthOrgOrderTime[0].quota
                      : 0}
                  </i> */}
                  {/* 人 */}
                </div>
                {/* <div><span>{data.healthOrgOrderTime}</span></div> */}
              </div>
            </div>
            <div className="introduce clearfix">
              <span>机构介绍</span>
              <div className="intr fl" style={{ width: " 88%" }}>
                {data.orgIntroduce}
                {/* 复旦大学附属华山医院是卫生部直属复旦大学（原上海医科大学）附属的一所综合性教学医院。建院于1907年，前身是中国红十字会总院，是上海地区中国人最早创办的医院，1991年重新恢复为中国红十字会直属医院。1992年首批通过国家三级甲等医院评审，目前已成为一所国家高层次的医疗机构，并为全国医疗、预防、教学、科研相结合的技术中心，在国内外 享有较高的声誉。 华山医院医疗技术力量雄厚，全院近1800名职工之中，医疗专业技术人员占80％，其中副高职以上专家教授290人，博士点10个，博士生导师39名，中国科学院院士、中国工程院院士各1名，开通博士后流动站2个；硕士点19个，硕士生导师79名。许多专家教授在国内外享有较高知名度。还有一整套行之有效的管理体制和管理人才。 */}
              </div>
            </div>
            <div className="tips clearfix">
              <span>备注</span>
              <div className="intr fl" style={{ width: " 88%" }}>
                {data.note}
                {/* 上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构上海市一家专业的体检机构 */}
              </div>
            </div>
          </div>
          <div
            className="reports"
            style={{
              textAlign: "left",
              padding: "0 30px 54px",
              background: "#fff",
              width: "1200px"
            }}
          >
            <Tabs
              style={{ padding: 0 }}
              defaultActiveKey="0"
              onChange={key => {
                this.callback(key);
              }}
              className="clearfix header-table"
            >
              {/* 1:未预约 2:已预约 3:已邮件 4:已预约取消 5:已确认 6:已确认取消 7:已体检 8:资料回齐 9:录入完成 10:已撤销 */}
              <TabPane tab="已关联项目" key="0">
                <div className="box1 table-overflow m-b-2">
                  <div className="operation">
                    <button className="addProject">新增项目</button>
                    <button className="removeProject">删除</button>
                    <DatePicker
                      style={{ width: "250px" }}
                      className="fr"
                      defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
                      onChange={onChange}
                    />
                  </div>
                  <ul className="checkboxList">
                    <Table
                      dataSource={data1}
                      columns={columns}
                      rowSelection={rowSelection}
                      defaultExpandAllRows={false}
                      pagination={false}
                    />
                    {/* <Checkbox style={{color:"#333"}}
                                        indeterminate={this.state.indeterminate}
                                        onChange={this.onCheckAllChange}
                                        checked={this.state.checkAll}
                                    >
                                        全选
                                    </Checkbox> */}

                    {/* {this.state.program.map((item,index)=>{
                                    return (
                                           <li>
                                               {item.resourceName}/{item.resourceCost}
                                           </li>
                                    )
                                })} */}
                    {/* <li className="col-md-3">
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
                                </li> */}
                  </ul>
                </div>

                {/* {this.state.queryRecord==undefined?'':
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
                            } */}
              </TabPane>
              <TabPane tab="已关联套餐" key="1" onChange={this.mealF}>
                <div className="box1 table-overflow m-b-2">
                  <div className="operation">
                    <button className="addProject">新增套餐</button>
                    <button className="removeProject">删除</button>
                    <DatePicker
                      style={{ width: "250px" }}
                      className="fr"
                      defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
                      onChange={onChange}
                    />
                  </div>
                  <ul className="checkboxList combo">
                    <Table
                      dataSource={data2}
                      columns={columns}
                      rowSelection={rowSelection}
                      defaultExpandAllRows={false}
                      pagination={false}
                    />
                    {/* <li>
                                <Checkbox style={{color:"#333"}}
                                        indeterminate={this.state.indeterminate}
                                        onChange={this.onCheckAllChange}
                                        checked={this.state.checkAll}
                                    >
                                        全选
                                    </Checkbox>
                                </li> */}
                    {/* <li className="col-md-3">
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
                                </li> */}
                  </ul>
                </div>

                {this.state.queryRecord == undefined ? (
                  ""
                ) : (
                  <Pagination
                    style={{ float: "right" }}
                    //    hideOnSinglePage={this.state.queryRecord==undefined?true:false}
                    //    defaultCurrent={1}
                    current={this.state.pagenum}
                    showTotal={function showTotal(total) {
                      return "共" + total + "条";
                    }}
                    total={this.state.totalCount} //总记录数
                    onChange={(page, pageSize) => {
                      this.setState({ pagenum: page });
                      console.log(this.state.pagenum); //setState设置后，不能立马获取到改变后state
                      this.query(page); //tab全部，调全部查询接口
                    }}
                    pageSize={10} //总数%每页条数=页数
                    showSizeChanger={true}
                    showQuickJumper
                  />
                )}
                {/*                             
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
                            /> */}
              </TabPane>
              <TabPane tab="日历" key="2">
                <div className="box1 table-overflow m-b-2" style={{display:"flex"}}>
                  <Calendar onPanelChange={onPanelChange} style={{flex:"3"}} />
                  <div style={{flex:"1",paddingTop:"60px"}}>
                    <h4>预约时间名额</h4>
                    {data.healthOrgOrderTime?data.healthOrgOrderTime.map((item,index)=>{
                      return (
                        <span>{item.bookableStarttime}-{item.bookableEndtime}&nbsp;&nbsp;{item.quota}人</span>
                      )
                    }):""}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="notes fr">
        </div>
         
          <div className="timerLineWrpaer">
          <div className="notes-title">操作履历记录</div>
            <ul className="ant-timeline">
              {/* <li className="ant-timeline-item"> */}
                {/* <div className="ant-timeline-item-tail" />
                <div
                  className="ant-timeline-item-head ant-timeline-item-head-#D7DDE4"
                  style={{ borderColor: "rgb(215, 221, 228)" }}
                />
                <div className="ant-timeline-item-content">
                  2015-09-01
                  <p style={{ fontSize: "14px", color: "rgb(102, 102, 102)" }}>
                    王也 新增了预约体检
                  </p>
                  <p>
                    备注：新增了预约体检新增了预约体检新增了预约体检新增了预约体检新增了预约体检
                  </p>
                </div>
              </li> */}
              {data.healthOrgHistoryList?data.healthOrgHistoryList.map((item,index)=>{
                   return (
                    <li className="ant-timeline-item" key={index}>
                    <div className="ant-timeline-item-tail" />
                    <div
                      className="ant-timeline-item-head ant-timeline-item-head-#D7DDE4"
                      style={{ borderColor: "rgb(215, 221, 228)" }}
                    />
                    <div className="ant-timeline-item-content">
                      {/* 2015-09-01 */}
                      {item.createTime}
                      <p style={{ fontSize: "14px", color: "rgb(102, 102, 102)" }}>
                      {item.createUser}&nbsp;&nbsp;&nbsp;&nbsp;{item.operationStatus}&nbsp;&nbsp;&nbsp;{item.context}
                      </p>
                      {/* <p>
                        备注：新增了预约体检新增了预约体检新增了预约体检新增了预约体检新增了预约体检
                      </p> */}
                    </div>
                  </li>
                   )
              }):""}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Look;
