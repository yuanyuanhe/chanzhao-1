import React, { Component } from "react";
import { Tabs, DatePicker, Button, InputNumber, Icon, Modal } from "antd";
import { NavLink } from "react-router-dom";
import { setype, meal, momeal } from "../../../config/api";
const TabPane = Tabs.TabPane;
class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      panes: [], //集合
      name: "", //机构名称
      id: "", //机构ID
      createUser: "", //创建者名称
      branchName: "", //机构code
      sName: "", //机构标题
      smeal: [], //套餐列表
      program: [], //项目列表
      time: "", //项目时间
      time1: "", //套餐时间
      list: [], //遍历的项目列表，包括时间
      list1: [], //套餐列表
      vProgram: false, //项目弹窗
      vMeal: false, //套餐弹窗
      type: 0, //项目是否可以编辑
      type1: 0, //套餐是否可以编辑
      List: [], //弹窗后，更改的项目列表
      List1: [] //弹窗后更改的套餐列表
    };
  }
  componentDidMount() {
    if (this.props.location.state) {
      var msg = this.props.location.state;
      //设置用户信息
      this.setState({
        id: msg.split("&&&&")[0],
        createUser: msg.split("&&&&")[1],
        branchName: msg.split("&&&&")[2],
        name: msg.split("&&&&")[3]
      });
      //设置标题
      setype().then(res => {
        for (var i = 0; i < res.data.orgBigTypeList.length; i++) {
          if (msg.split("&&&&")[2] == res.data.orgBigTypeList[i].code) {
            this.setState({ sName: res.data.orgBigTypeList[i].name });
          }
        }
      });
      //1项目 2套餐
      //设置项目
      meal({
        orgId: msg.split("&&&&")[0],
        createUser: msg.split("&&&&")[1],
        projectType: "1",
        getType: "Y"
      }).then(res => {
        // console.log(res.data.projectReferenceList)
        this.setState({ program: res.data.projectReferenceList });
      });
      //设置套餐
      meal({
        orgId: msg.split("&&&&")[0],
        createUser: msg.split("&&&&")[1],
        projectType: "0",
        getType: "Y"
      }).then(res => {
        this.setState({ smeal: res.data.projectReferenceList });
      });
    }
  }
  //点击确认时修改数据重新渲染项目
  submit = e => {
    console.log(this.state.time, this.state.list);
    var list = this.state.list;
    for (var i = 0; i < list.length; i++) {
      if (this.state.time == list[i].time) {
        var List = list[i].list;
        var a = [];
        for (var j = 0; j < List.length; j++) {
          a.push(List[i]);
        }
        momeal({
          projectReference: {
            projectReferenceList: a
          }
        });
      }
    }
  };
  //点击确认时，套餐
  sunmit1 = e => {
    var list1 = this.state.list1;
    for (var i = 0; i < list1.length; i++) {
      if (this.state.time1 == list1[i].time) {
        var List = list1[i].list;
        var a = [];
        for (var j = 0; j < List.length; j++) {
          a.push(List[i]);
        }
        momeal({
          projectReference: {
            projectReferenceList: a
          }
        });
      }
    }
  };
  //设置时间时，设置时间，并查询项目
  timeProgram = (data, dataString) => {
    var list = this.state.list;
    list.push({ time: dataString, list: [] });
    this.setState({ list });
    this.setState({ time: dataString });
    meal({
      orgId: this.state.id,
      createUser: this.state.createUser,
      projectType: "1",
      getType: "S",
      dataTime: dataString
    }).then(res => {
      this.setState({
        program: res.data.projectReferenceList
      });
    });
  };
  //改变项目价格
  changeprice = (
    resourceName,
    fwdResourceCode,
    resourceCode,
    resourceOrgName,
    resourceOrgCode,
    resourceType,
    value
  ) => {
    // console.log(resourceName,fwdResourceCode,resourceCode,resourceOrgName,resourceOrgCode,resourceType,value)

    // var List={resourceName,fwdResourceCode,resourceCode,resourceOrgName,resourceOrgCode,resourceType,resourceCost:value};
    var list = this.state.list;
    // console.log(this.state.time,this.state.list)
    for (var i = 0; i < list.length; i++) {
      if (this.state.time == list[i].time) {
        list[i].list.push({
          resourceName,
          fwdResourceCode,
          resourceCode,
          resourceOrgName,
          resourceOrgCode,
          resourceType,
          recourseCost: value
        });
        this.setState({ list });
      }
    }
  };
  //弹窗改变项目价格
  change1 = (
    resourceName,
    fwdResourceCode,
    resourceCode,
    resourceOrgName,
    resourceOrgCode,
    resourceType,
    value
  ) => {
    var List = this.state.List;
    List.push({
      resourceName,
      fwdResourceCode,
      resourceCode,
      resourceOrgName,
      resourceOrgCode,
      resourceType,
      recourseCost: value
    });
    this.setState({ List });
  };
  //弹窗改变套餐价格
  change2 = (
    resourceName,
    fwdResourceCode,
    resourceCode,
    resourceOrgName,
    resourceOrgCode,
    resourceType,
    value
  ) => {
    var List1 = this.state.list1;
    List1.push({
      resourceName,
      fwdResourceCode,
      resourceCode,
      resourceOrgName,
      resourceOrgCode,
      resourceType,
      recourseCost: value
    });
    this.setState({ List1 });
  };
  //设置时间时，设置时间，并查询套餐
  timeMeal = (data, dataString) => {
    var list1 = this.state.list1;
    list1.push({ time: dataString, list: [] });
    this.setState({ list1 });
    this.setState({ time1: dataString });
    meal({
      orgId: this.state.id,
      createUser: this.state.createUser,
      projectType: "0",
      getType: "S",
      dataTime: dataString
    }).then(res => {
      this.setState({
        smeal: res.data.projectReferenceList
      });
    });
  };
  //改变套餐价格
  changeMeal = (
    resourceName,
    fwdResourceCode,
    resourceCode,
    resourceOrgName,
    resourceOrgCode,
    resourceType,
    value
  ) => {
    var list1 = this.state.list1;
    for (var i = 0; i < list1.length; i++) {
      if (this.state.time1 == list1[i].time) {
        list1[i].list.push({
          resourceName,
          fwdResourceCode,
          resourceCode,
          resourceOrgName,
          resourceOrgCode,
          resourceType,
          recourseCost: value
        });
        this.setState({ list1 });
      }
    }
  };
  //项目弹窗设置
  // 点击重置
  showProgram = e => {
    this.setState({ vProgram: true });
  };
  okProgram = e => {
    this.setState({
      vProgram: false,
      type: 0
    });
    var list = this.state.List;
    momeal({
      projectReference: {
        projectReferenceList: list
      }
    });
   
  };
  cancelProgram = e => {
    this.setState({
      vProgram: false,
      type: 0
    });
  };
  showMeal = e => {
    this.setState({ vMeal: true });
  };
  okMeal = e => {
    this.setState({ vMeal: false });
    var list=this.state.list1;
    momeal({
      projectReference: {
        projectReferenceList: list
      }
    })
  };
  cancelMeal = e => {
    this.setState({ vMeal: false });
  };
  render() {
    console.log(this.state.list1);
    const operations = <Button icon="fullscreen" onClick={this.showProgram} />;
    return (
      <div style={{ width: "100%", height: "1080px", position: "relative" }}>
        <h3>
          {this.state.sName}-{this.state.name}
        </h3>
        <Tabs defaultActiveKey="1">
          <TabPane tab="关联项目" key="1">
            <div>
              <DatePicker onChange={this.timeProgram} />
              <Button
                style={{
                  float: "right",
                  right: "240px",
                  width: "100px",
                  height: "36px"
                }}
              >
                重置
              </Button>
              <Button
                style={{
                  float: "right",
                  right: "30px",
                  width: "100px",
                  height: "36px",
                  background: "#EB7722",
                  color: "white"
                }}
                onClick={this.submit}
              >
                确认
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "15px",
                justifyContent: "space-around",
                border: "1px solid #cccccc"
              }}
            >
              <ul
                style={{
                  display: "flex",
                  width: "100%",
                  textAlign: "center",
                  height: "50px",
                  lineHeight: "50px"
                }}
              >
                <li
                  style={{
                    flex: "1",
                    display: "flex",
                    borderRight: "1px solid #cccccc"
                  }}
                >
                  <span style={{ flex: "4" }}>机构项目名称</span>
                  <span style={{ flex: "1" }}>费用/元</span>
                </li>
                <li
                  style={{
                    flex: "1",
                    display: "flex",
                    borderRight: "1px solid #cccccc"
                  }}
                >
                  <span style={{ flex: "4" }}>机构项目名称</span>
                  <span style={{ flex: "1" }}>费用/元</span>
                </li>
                <li
                  style={{
                    flex: "1",
                    display: "flex",
                    borderRight: "1px solid #cccccc"
                  }}
                >
                  <span style={{ flex: "4" }}>机构项目名称</span>
                  <span style={{ flex: "1" }}>费用/元</span>
                </li>
              </ul>
            </div>
            <div>
              <ul
                style={{
                  width: "100%",
                  height: "500px",
                  border: "1px solid #cccccc",
                  overflowY: "auto"
                }}
              >
                {this.state.program
                  ? this.state.program.map((item, index) => {
                      return (
                        <li
                          key={index}
                          style={{
                            width: "33.3%",
                            height: "50px",
                            borderRight: "1px solid #cccccc",
                            borderBottom: "1px solid #cccccc",
                            float: "left",
                            display: "flex",
                            lineHeight: "50px"
                          }}
                        >
                          <span style={{ flex: "4" }}>{item.resourceName}</span>
                          <InputNumber
                            placeholder={item.recourseCost}
                            onChange={value =>
                              this.changeprice(
                                item.resourceName,
                                item.fwdResourceCode,
                                item.resourceCode,
                                item.resourceOrgName,
                                item.resourceOrgCode,
                                item.resourceType,
                                value
                              )
                            }
                            style={{
                              flex: "1",
                              marginTop: "10px",
                              marginRight: "20px"
                            }}
                          />
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
            {this.state.list.length > 0 ? (
              <Tabs tabBarExtraContent={operations}>
                {this.state.list.map((item, index) => {
                  return (
                    <TabPane tab={item.time} key={index}>
                      {item.list.map((item, index) => {
                        return (
                          <li
                            style={{ width: "200px", float: "left" }}
                            key={index}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                width: "100px"
                              }}
                            >
                              {item.resourceName}
                            </span>
                            <span
                              style={{
                                display: "inline-block",
                                width: "100px"
                              }}
                            >
                              {item.recourseCost}
                            </span>
                          </li>
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            ) : (
              ""
            )}
            <Modal
              closable={false}
              visible={this.state.vProgram}
              onOk={this.okProgram}
              onCancel={this.cancelProgram}
              width={1700}
              style={{ height: "600px" }}
              destroyOnClose
            >
              {this.state.list.length > 0 ? (
                <Tabs
                  tabBarExtraContent={
                    <div>
                      <Button
                        icon="edit"
                        onClick={() => {
                          this.setState({ type: 1 });
                        }}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button
                        icon="fullscreen-exit"
                        onClick={this.cancelProgram}
                      />
                    </div>
                  }
                >
                  {this.state.list.map((item, index) => {
                    return (
                      <TabPane
                        tab={item.time}
                        key={index}
                        style={{ width: "100%", height: "600px" }}
                      >
                        {item.list.map((item, index) => {
                          return (
                            <li
                              style={{ width: "200px", float: "left" }}
                              key={index}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "100px"
                                }}
                              >
                                {item.resourceName}
                              </span>
                              {this.state.type ? (
                                <InputNumber
                                  placeholder={item.recourseCost}
                                  onChange={value =>
                                    this.change1(
                                      item.resourceName,
                                      item.fwdResourceCode,
                                      item.resourceCode,
                                      item.resourceOrgName,
                                      item.resourceOrgCode,
                                      item.resourceType,
                                      value
                                    )
                                  }
                                />
                              ) : (
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "100px"
                                  }}
                                >
                                  {item.recourseCost}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              ) : (
                ""
              )}
            </Modal>
          </TabPane>
          <TabPane tab="关联套餐" key="2">
            <div>
              {" "}
              <DatePicker onChange={this.timeMeal} />
              <Button
                style={{
                  float: "right",
                  right: "240px",
                  width: "100px",
                  height: "36px"
                }}
              >
                重置
              </Button>
              <Button
                style={{
                  float: "right",
                  right: "30px",
                  width: "100px",
                  height: "36px",
                  background: "#EB7722",
                  color: "white"
                }}
                onClick={this.sunmit1}
              >
                确认
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "15px",
                justifyContent: "space-around",
                border: "1px solid #cccccc"
              }}
            >
              <ul
                style={{
                  display: "flex",
                  width: "100%",
                  textAlign: "center",
                  height: "50px",
                  lineHeight: "50px"
                }}
              >
                <li
                  style={{
                    flex: "1",
                    display: "flex",
                    borderRight: "1px solid #cccccc"
                  }}
                >
                  <span style={{ flex: "4" }}>机构套餐名称</span>
                  <span style={{ flex: "1" }}>费用/元</span>
                </li>
                <li
                  style={{
                    flex: "1",
                    display: "flex",
                    borderRight: "1px solid #cccccc"
                  }}
                >
                  <span style={{ flex: "4" }}>机构套餐名称</span>
                  <span style={{ flex: "1" }}>费用/元</span>
                </li>
                <li
                  style={{
                    flex: "1",
                    display: "flex",
                    borderRight: "1px solid #cccccc"
                  }}
                >
                  <span style={{ flex: "4" }}>机构套餐名称</span>
                  <span style={{ flex: "1" }}>费用/元</span>
                </li>
              </ul>
            </div>
            <div>
              <ul
                style={{
                  width: "100%",
                  height: "500px",
                  border: "1px solid #cccccc",
                  overflowY: "auto"
                }}
              >
                {this.state.smeal
                  ? this.state.smeal.map((item, index) => {
                      return (
                        <li
                          key={index}
                          style={{
                            width: "33.3%",
                            height: "50px",
                            borderRight: "1px solid #cccccc",
                            borderBottom: "1px solid #cccccc",
                            float: "left",
                            display: "flex",
                            lineHeight: "50px"
                          }}
                        >
                          <span style={{ flex: "4" }}>{item.resourceName}</span>
                          <InputNumber
                            placeholder={item.recourseCost}
                            onChange={value =>
                              this.changeMeal(
                                item.resourceName,
                                item.fwdResourceCode,
                                item.resourceCode,
                                item.resourceOrgName,
                                item.resourceOrgCode,
                                item.resourceType,
                                value
                              )
                            }
                            style={{
                              flex: "1",
                              marginTop: "10px",
                              marginRight: "20px"
                            }}
                          />
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
            {this.state.list1.length > 0 ? (
              <Tabs
                tabBarExtraContent={
                  <Button icon="fullscreen" onClick={this.showMeal} />
                }
              >
                {this.state.list1.map((item, index) => {
                  return (
                    <TabPane tab={item.time} key={index}>
                      {item.list.map((item, index) => {
                        return (
                          <li
                            style={{ width: "200px", float: "left" }}
                            key={index}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                width: "100px"
                              }}
                            >
                              {item.resourceName}
                            </span>
                            <span
                              style={{
                                display: "inline-block",
                                width: "100px"
                              }}
                            >
                              {item.recourseCost}
                            </span>
                          </li>
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            ) : (
              ""
            )}
            <Modal
              closable={false}
              visible={this.state.vMeal}
              onOk={this.okMeal}
              onCancel={this.cancelMeal}
              width={1700}
              style={{ height: "600px" }}
              destroyOnClose
            >
              {this.state.list1.length > 0 ? (
                <Tabs
                  tabBarExtraContent={
                    <div>
                      <Button
                        icon="edit"
                        onClick={() => {
                          this.setState({ type1: 1 });
                        }}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button
                        icon="fullscreen-exit"
                        onClick={this.cancelMeal}
                      />
                    </div>
                  }
                >
                  {this.state.list1.map((item, index) => {
                    return (
                      <TabPane
                        tab={item.time}
                        key={index}
                        style={{ width: "100%", height: "600px" }}
                      >
                        {item.list.map((item, index) => {
                          return (
                            <li
                              style={{ width: "200px", float: "left" }}
                              key={index}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "100px"
                                }}
                              >
                                {item.resourceName}
                              </span>
                              {this.state.type1 ? (
                                <InputNumber
                                  placeholder={item.recourseCost}
                                  onChange={value =>
                                    this.change2(
                                      item.resourceName,
                                      item.fwdResourceCode,
                                      item.resourceCode,
                                      item.resourceOrgName,
                                      item.resourceOrgCode,
                                      item.resourceType,
                                      value
                                    )
                                  }
                                />
                              ) : (
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "100px"
                                  }}
                                >
                                  {item.recourseCost}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              ) : (
                ""
              )}
            </Modal>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default Meal;
