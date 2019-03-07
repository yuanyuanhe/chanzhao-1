import React, { Component } from "react";
import { Route, Switch, NavLink,Redirect } from "react-router-dom";
//体检管理
import Adminstration from "../../page/administration";
import Detail from "../../page/detail";
// import Model from '../model/index'
// import QuerenEnModel from '../model/querEnModel'
// import YiYuYueModel from '../model/yiyuyueModel'
import Configure from "../../page/configure/";
import History from "../../page/history";
import Holiday from "../../page/holiday";
import Send from "../../page/send";
import Upload from "../../page/upload";
import Jurisdiction from "../../page/jurisdiction";
import OrgDetail from '../../page/configure/component/detail'
import OrgAdd from '../../page/configure/component/add'
import OrgModify from '../../page/configure/component/modify'
import ProgramAd from '../../page/configure/component/programad'
import { Menu } from "antd";
import Meal from '../../page/configure/component/meal'
import Meallook from '../../page/configure/component/meallook'
import Project from '../../page/configure/project'
const SubMenu = Menu.SubMenu;
class Menus extends Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5", "sub6", "sub7"];
  state = {
    openKeys: ["sub1"]
  };
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };
  render() {
    return (
      <div className="content" style={{display:"flex"}}>
        <Menu
          className="yiji"
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{ width:"220px",fontSize:"18px",fontWeight:"bold",color:"black" }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                {/* <Icon type="mail" /> */}
                <span>体检管理</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <NavLink
                to="/index/adminstration"
                className="inactive active inactives"
              >
                体检管理
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              {/* <NavLink
                to="/index/model"
                className="inactive active inactives"
              > */}
              {/* <NavLink
                to="/index/YiYuYueModel"
                className="inactive active inactives"
              > */}
              {/* <NavLink
                to="/index/QuerenEnModel"
                className="inactive active inactives"
              > */}
                预约体检
              {/* </NavLink> */}
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                {/* <Icon type="appstore" /> */}
                <span>
                  <NavLink to="/index/upload" className="inactive">
                    影像上传管理
                  </NavLink>
                </span>
              </span>
            }
          >
            <Menu.Item key="5"> 查询中心1</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                {/* <Icon type="setting" /> */}
                <span>
                  {" "}
                
                    体检配置管理
                 
                </span>
              </span>
            }
          >
            <Menu.Item key="9"><NavLink to="/index/program">机构项目管理</NavLink></Menu.Item>
            <Menu.Item key="10"><NavLink to='/index/project'>富卫项目管理</NavLink></Menu.Item>
            <Menu.Item key="11">  <NavLink to="/index/configure" className="inactive">体检机构项目管理 </NavLink></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                {/* <Icon type="setting" /> */}
                <span>
                  <NavLink to="/index/juriisdiction" className="inactive">
                    权限管理
                  </NavLink>
                </span>
              </span>
            }
          >
            <Menu.Item key="9">系统后台设置</Menu.Item>
            {/* <Menu.Item key="10">Option 10</Menu.Item> */}
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                {/* <Icon type="setting" /> */}
                <span>
                  <NavLink to="/index/send" className="inactive">
                    发送管理
                  </NavLink>
                </span>
              </span>
            }
          >
            <Menu.Item key="9">体检机构维护</Menu.Item>
            {/* <Menu.Item key="10">Option 10</Menu.Item> */}
          </SubMenu>
          <SubMenu
            key="sub6"
            title={
              <span>
                {/* <Icon type="setting" /> */}
                <span>
                  {" "}
                  <NavLink to="/index/holiday" className="inactive">
                    节假日及特别时间
                  </NavLink>
                </span>
              </span>
            }
          >
            <Menu.Item key="9">体检机构维护</Menu.Item>
            {/* <Menu.Item key="10">Option 10</Menu.Item> */}
          </SubMenu>
          <SubMenu
            key="sub7"
            title={
              <span>
                {/* <Icon type="setting" /> */}
                <span>
                  {" "}
                  <NavLink to="/index/history" className="inactive">
                    推送及影像历史
                  </NavLink>
                </span>
              </span>
            }
          >
            <Menu.Item key="9">体检机构维护</Menu.Item>
            {/* <Menu.Item key="10">Option 10</Menu.Item> */}
          </SubMenu>
        </Menu>

        <Switch style={{width:"1700px"}}>
          <Route  path="/index/adminstration" component={Adminstration} />
          <Route path="/index/Detail" component={Detail} />
          {/* <Route path="/index/model" component={Model} /> */}
          {/* <Route path="/index/QuerenEnModel" component={QuerenEnModel} /> */}
          {/* <Route path="/index/YiYuYueModel" component={YiYuYueModel} /> */}
          
          <Route path="/index/configure" component={Configure} />
          <Route path="/index/orgdetail" component={OrgDetail}/>
          <Route path="/index/program" component={ProgramAd}/>
          <Route path="/index/project" component={Project}/>
          <Route path="/index/history" component={History} />
          <Route path="/index/holiday" component={Holiday} />
          <Route path="/index/juriisdiction" component={Jurisdiction} />
          <Route path="/index/send" component={Send} />
          <Route path="/index/upload" component={Upload} />
          <Route path="/index/meal" component={Meal} />
          <Route path="/index/meallook" component={Meallook} />
          <Route  exact path="/index/" component={Adminstration} />
        </Switch>
      </div>
    );
  }
}
export default Menus;
