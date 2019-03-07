import React, { Component } from "react";
import { Tabs, DatePicker, Button, InputNumber, Icon,Input} from "antd";
import {NavLink} from 'react-router-dom'
import {momeal} from '../../../config/api'
const TabPane = Tabs.TabPane;
class Meallook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: [],
      edit:false,
      list:[]
    };
  }
  componentDidMount() {
    console.log(this.props);
    this.setState({
      panes: this.props.location.state
    });
  }
  edit=e=>{
     this.setState({
        edit:true
     })
  }
  changemsg=(resourceName,fwdResourceCode,resourceCode,resourceOrgName,resourceOrgCode,resourceType,value)=>{
    console.log(value)
            var list=this.state.list
            list.push({ recourseCost:value,resourceCode, fwdResourceCode,  resourceName,  resourceOrgCode, resourceOrgName, resourceType,})
            this.setState({list,})
  }
  send=()=>{
    momeal({
      projectReference:{
        projectReferenceList:this.state.list
      }
    })
  }
  render() {
    const operations = (
      <div>
       <Icon type="edit" theme="outlined" onClick={this.edit}/> <NavLink to="/index/meal"><Icon type="fullscreen" theme="outlined" /></NavLink>
      </div>
    );
    
    return (
      <div style={{height:"870px"}}>
        <h4>操作</h4>
        <Tabs tabBarExtraContent={operations} type="editable-card" hideAdd
        tabBarStyle={{width:"1600px"}}
        >
          {this.state.panes
            ? this.state.panes.map((item, index) => {
                return (
                  <TabPane tab={item.time} key={index}>
                    {item.list.map((item, index) => {
                      return (
                        <li
                          key={index}
                          style={{ width: "200px", float: "left" }}
                        >
                          <span>{item.resourceName}</span>
                         {this.state.edit?<InputNumber  placeholder={item.recourseCost} onChange={(value)=>{
                           this.changemsg(item.resourceName,item.fwdResourceCode,item.resourceCode,item.resourceOrgName,item.resourceOrgCode,item.resourceType,value)
                         }}></InputNumber>:<span >{item.resourceCost}</span>}
                        </li>
                      );
                    })}
                  </TabPane>
                );
              })
            : ""}
        </Tabs>
      <div style={{position:"fixed",bottom:"100px",left:"850px"}}><Button>取消</Button><Button onClick={this.send}>确定</Button></div>
      </div>
    );
  }
}
export default Meallook;
