import React, { Component } from "react";
// import style from "../../style/css/modify.mcss";
import { load, update } from "../../../config/api";
import { Input, Select, Upload, message, Button, Icon } from "antd";
import {NavLink} from 'react-router-dom'
const Option = Select.Option;
class Model extends Component {
  state = {
    message: {},
    healthOrgCode: "", //机构代码
    id: "", //机构Id
    healthOrgName: "", //名称
    province: "", //省
    city: "", //市
    bookableEndtimeAm: "", //上午结束时间
    bookableEndtimePm: "", //下午结束时间
    bookableStarttimeAm: "", //上午开始时间
    bookableStarttimePm: "", //下午开始时间
    latestBookTime: "", //截至时间
    branchName: "", //分支
    contact: "", //联系人
    createTime: "", //创建时间
    createUser: "", //创建者
    healthOrgOrderTime: "", //预定时间
    latitude: "", //经度
    longitude: "", //维度
    note: "", //备注
    operationStatus: "", //操作状态
    orgImage: "", //图片
    orgIntroduce: "", //介绍
    orgState: "", //状态
    phone: "", //联系电话
    specificAdress: "", //地址
    updateTime: "", //更新时间
    updateUser: "", //更新人
    id: 0
  };
  componentDidMount() {
    console.log(this.props.location);
    this.setState({ id: this.props.id });
    //根据ID查询
    // load({
    //   id: this.props.id
    // }).then(res => this.setState({ message: res.data.healthOrgManageLoad }));
  }
  // componentWillReceiveProps(nextprops) {
  //   //    console.log(this.props)
  //   if (nextprops.id !== this.props.id) {
  //     this.setState({id:nextprops.id})
  //     load({
  //       id: nextprops.id
  //     }).then(res => this.setState({ message: res.data.healthOrgManageLoad }));
  //   } else {
  //     return;
  //   }
  // }
  //更改机构名称
  name = e => this.setState({ healthOrgName: e.target.value });
  // 分支名
  branchName = e => this.setState({ branchName: e.target.value });
  // 更改省份
  province = value => this.setState({ province: value });
  // 更改城市
  city = value => this.setState({ city: value });
  // 更改详细地址
  address = e => this.setState({ specificAdress: e.target.value });
  //更改联系电话
  phone = e => this.setState({ phone: e.target.value });
  // 更改联系人
  contanct = e => this.setState({ contact: e.target.value });
  // 更改状态
  status = value => this.setState({ orgState: value });
  //更改图片
  image = e => console.log(e);
  // 更改可预约上午时间
  am = e => {
    var value = e.target.value;
    var bookableStarttimeAm = value.split("~")[0];
    var bookableEndtimeAm = value.split("~")[1];
    this.setState({ bookableStarttimeAm, bookableEndtimeAm });
  };
  // 更改可预约下午时间
  pm = e => {
    var value = e.target.value;
    var bookableStarttimePm = value.split("~")[0];
    var bookableEndtimePm = value.split("~")[1];
    this.setState({ bookableStarttimePm, bookableEndtimePm });
  };
  //预约名额
  addPerson = e => this.setState({});
  // 最晚预约时间
  latest = e => this.setState({ latestBookTime: e.target.value });
  //更改机构介绍
  introduce = e => this.setState({ orgIntroduce: e.target.value });
  //更改备注
  note = e => this.setState({ note: e.target.value });
  //修改
  update = () => {
    let {
      healthOrgCode, //机构代码
      id, //机构Id
      healthOrgName, //名称
      province, //省
      city, //市
      bookableEndtimeAm, //上午结束时间
      bookableEndtimePm, //下午结束时间
      bookableStarttimeAm, //上午开始时间
      bookableStarttimePm, //下午开始时间
      latestBookTime, //截至时间
      branchName, //分支
      contact, //联系人
      createTime, //创建时间
      createUser, //创建者
      healthOrgOrderTime, //预定时间
      latitude, //经度
      longitude, //维度
      note, //备注
      operationStatus, //操作状态
      orgImage, //图片
      orgIntroduce, //介绍
      orgState, //状态
      phone, //联系电话
      specificAdress, //地址
      updateTime, //更新时间
      updateUser //更新人
    } = this.state;
    update({
      healthOrgCode, //机构代码
      id, //机构Id
      healthOrgName, //名称
      province, //省
      city, //市
      bookableEndtimeAm, //上午结束时间
      bookableEndtimePm, //下午结束时间
      bookableStarttimeAm, //上午开始时间
      bookableStarttimePm, //下午开始时间
      latestBookTime, //截至时间
      branchName, //分支
      contact, //联系人
      createTime, //创建时间
      createUser, //创建者
      healthOrgOrderTime, //预定时间
      latitude, //经度
      longitude, //维度
      note, //备注
      operationStatus, //操作状态
      orgImage, //图片
      orgIntroduce, //介绍
      orgState, //状态
      phone, //联系电话
      specificAdress, //地址
      updateTime, //更新时间
      updateUser //更新人
    }).then(res => console.log(res));
  };
  render() {
    // console.log(this.props.id, this.state.message);
    const props = {
      name: "file",
      action: "//jsonplaceholder.typicode.com/posts/",
      headers: {
        authorization: "authorization-text"
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };

    let {
      healthOrgCode, //机构代码
      id, //机构Id
      healthOrgName, //名称
      province, //省
      city, //市
      bookableEndtimeAm, //上午结束时间
      bookableEndtimePm, //下午结束时间
      bookableStarttimeAm, //上午开始时间
      bookableStarttimePm, //下午开始时间
      latestBookTime, //截至时间
      branchName, //分支
      contact, //联系人
      createTime, //创建时间
      createUser, //创建者
      healthOrgOrderTime, //预定时间
      latitude, //经度
      longitude, //维度
      note, //备注
      operationStatus, //操作状态
      orgImage, //图片
      orgIntroduce, //介绍
      orgState, //状态
      phone, //联系电话
      specificAdress, //地址
      updateTime, //更新时间
      updateUser //更新人
    } = this.state.message;
    console.log(province, city, orgState);
    return (
      <div style={{ padding: "20px", fontSize: "16px", width: "100%" }}>
        <h4>当前位置： 体检机构管理 > 体检机构修改</h4>
        <div>
          <h3
            style={{
              fontSize: "18px",
              background: "#cccccc;height:50px",
              width: "100%",
              lineHeight: "50px",
              fontweight: "bold"
            }}
          >
            {" "}
            <span style={{ float: "left", marginLeft: "30px" }}>
              体检机构内容
            </span>{" "}
            <span style={{ float: "right", marginRight: "30px" }}>
            <NavLink to="/index/configure">回退</NavLink></span>
          </h3>
          <div
            style={{
              clear: "both",
              height: "50px",
              display: "flex",
              lineHeight: "50px"
            }}
          >
            <span>机构</span>{" "}
            <select name="" id="">
              <option value="">请选择</option>
            </select>
          </div>
          <div style={{ height: "50px", display: "flex", lineHeight: "50px" }}>
            <span>分支机构</span>
            <input type="text" />
            <span>分支机构</span>
            <input type="text" />
          </div>
          <div style={{ height: "50px", display: "flex", lineHeight: "50px" }}>
            <span>地址</span>
            <select name="" id="">
              <option value="上海">请选省</option>
            </select>
            <select name="" id="">
              <option value="黄埔">请选市</option>
            </select>
            <select name="" id="">
              <option value="广东">请选择区</option>
            </select>
            <input type="text" />
          </div>
          <div style={{ height: "50px", display: "flex", lineHeight: "50px" }}>
            <span>联系电话</span>
            <input type="text" />
            <span>联系人</span>
            <input type="text" />
          </div>
          <div style={{ height: "50px", display: "flex", lineHeight: "50px" }}>
            <span>状态</span>
            <input type="text" />
            <span>机构图片</span>
            <input type="text" />
          </div>
          <div style={{ height: "50px", display: "flex", lineHeight: "50px" }}>
            <span>可预约时间</span>
            <input type="text" />
            <i>am</i>
            <input type="text" />
            <i>pm</i>
            <span>交通</span>
            <input type="text" />
          </div>
          <div style={{ height: "50px", display: "flex", lineHeight: "50px" }}>
            <span>预约时间/名额(人)</span>
            <input type="text" />
            <input type="text" /> <button>新增</button>
            <span>最晚预约时间</span>
            <input type="text" />
          </div>
          <div>
            <span>机构介绍</span>
            <textarea name="" id="" cols="100" rows="5" />
          </div>
          <div>
            <span>备注</span>
            <textarea name="" id="" cols="100" rows="5" />
          </div>
          <div style={{ width: "600px", margin: "40px auto" }}>
            <button
              style={{
                width: "125px",
                height: "40px",
                border: "1px solid #cccccc",
                borderRadius: "10px",
                backgroundColor: "#FF9800",
                marginRight:"100px"
              }}
            >
              保存
            </button>
            <button
              style={{
                width: "125px",
                height: "40px",
                border: "1px solid #FF9800",
                borderRadius: "10px",
                backgroundColor:"#FFFFFF"
               
              }}
            >
              取消
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Model;
