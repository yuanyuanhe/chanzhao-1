import React, { Component } from "react";
import {
  Select,
  DatePicker,
  Input,
  Button,
  Modal,
  Pagination,
  Popover,
  Upload,
  Icon,
  message,
  TimePicker
} from "antd";
import moment from "moment";
import { NavLink } from "react-router-dom";
import style from "./combo.mcss";
import json from "../../../public/address.json";
import Add from "./component/add";
import {
  healthOrgManager,
  save,
  load,
  dele,
  update,
  type,
  setype,
  delatetime,
  addtime
} from "../../config/api";
// import Search from "antd/lib/transfer/search";
import $ from "jquery";
const Option = Select.Option;
const rule = /^1[0-9]{10}$/;
const Search = Input.Search;
function motime(time) {
  time = time.split(":");
  return time;
}
class Configure extends Component {
  state = {
    vLook: false, //修改弹窗
    vModify: false, //查看弹窗
    vType: false, //新增大类
    vdemsg: false, //删除提示框
    data: [], //机构数据
    id: 0, //数据查询ID
    vAdd: false, //新增
    healthOrgName: "", //分支机构名称
    branchName: "", //机构编码
    healthOrgCode: "", //code
    province: "", //省
    city: "", //市
    region: "", //区
    specificAdress: "", //详细地址
    phone: "", //联系电话
    contact: "", //联系人
    orgState: "", //状态
    orgImage: "", //图片
    bookableEndtimeAm: "", //上午结束时间
    bookableEndtimePm: "", //下午结束时间
    bookableStarttimeAm: "", //上午开始时间
    bookableStarttimePm: "", //下午开始时间
    bookableStarttime: "", //预定开始时间
    bookableEndtime: "", //预定结束时间
    quota: "", //人数
    latitude: "", //经度
    longitude: "", //维度
    healthOrgOrderTime: [], //预定时间
    latestBookTime: "", //截至时间
    orgIntroduce: "", //介绍
    list: [], //预约人数、时间
    note: "", //备注
    //分页内容
    current: 0, //当前页
    pageSize: 10, //每页条数
    total: 0, //总数据
    code: 0,
    name: "",
    allName: [],
    allcode: "",
    citylist: [], //所有市
    coutry: [] //所有区
  };
  componentDidMount() {
    setype().then(res => this.setState({ allName: res.data.orgBigTypeList }));
    // program({
    //   id:1
    // }).then(
    //   res=>{console.log(res)}
    // )
    // meal({
    //   orgId:1001,
    //   createUser:"aaa",
    //   projectType:"1"
    //   //0 套餐 1 项目
    // }).then(
    //   res=>{console.log(res)}
    // )
    //查询大类
    // setype().then(
    //   res=>console.log(res)
    // )
    //查询所有机构
    healthOrgManager().then(res => {
      this.setState({
        data: res.data.pager.pageItems,
        current: res.data.pager.currentPage, //当前页
        pageSize: res.data.pager.pageSize, //每页条数
        total: res.data.pager.totalCount //总数据
      });
    });
  }

  query = (currentPage, e) => {
    healthOrgManager({ currentPage }).then(res => {
      this.setState({
        data: res.data.pager.pageItems,
        current: res.data.pager.currentPage
      });
    });
  };
  showModel = (e, num) => {
    // console.log(e, num);
  };

  //弹出查看窗
  look = e => {
    this.setState({
      id: e.target.parentNode.parentNode.childNodes[0].innerHTML,
      vLook: true
      // type:0
    });

    load({ id: this.state.id }).then(res => {
      this.setState({ data1: res.data.healthOrgManageLoad });
    });
  };
  okLook = e => {
    this.setState({
      vLook: false
    });
  };
  cancelLook = e => {
    this.setState({
      vLook: false
    });
  };
  // 弹出修改窗
  modify = (index, code, e) => {
    //  console.log(index)
    this.setState({
      id: index,
      healthOrgCode: code,
      vModify: true
      // type:1
    });
    load({
      id: index,
      healthOrgcode: code
    }).then(res => {
      let {
        healthOrgName, //名称
        branchName, //分支
        healthOrgCode, //code
        province, //省
        city, //市
        region, //区
        specificAdress, //详细地址
        phone, //联系电话
        contact, //联系人
        orgState, //状态
        orgImage, //图片
        bookableEndtimeAm, //上午结束时间
        bookableEndtimePm, //下午结束时间
        bookableStarttimeAm, //上午开始时间
        bookableStarttimePm, //下午开始时间
        bookableStarttime, //预定开始时间
        bookableEndtime, //预定结束时间
        quota, //人数
        latitude, //经度
        longitude, //维度
        healthOrgOrderTime, //预定时间
        latestBookTime, //截至时间
        orgIntroduce, //介绍
        note,
        id //备注
      } = res.data.healthOrgManageLoad;
      this.setState({
        healthOrgName, //名称
        branchName, //分支
        healthOrgCode, //code
        province, //省
        city, //市
        region, //区
        specificAdress, //详细地址
        phone, //联系电话
        contact, //联系人
        orgState, //状态
        orgImage, //图片
        bookableEndtimeAm, //上午结束时间
        bookableEndtimePm, //下午结束时间
        bookableStarttimeAm, //上午开始时间
        bookableStarttimePm, //下午开始时间
        bookableStarttime, //预定开始时间
        bookableEndtime, //预定结束时间
        quota, //人数
        latitude, //经度
        longitude, //维度
        healthOrgOrderTime, //预定时间
        latestBookTime, //截至时间
        orgIntroduce, //介绍
        note,
        id
      });
    });
  };
  okModify = e => {
    let {
      healthOrgName, //名称
      branchName, //分支
      healthOrgCode, //code
      province, //省
      city, //市
      region, //区
      specificAdress, //详细地址
      phone, //联系电话
      contact, //联系人
      orgState, //状态
      orgImage, //图片
      bookableEndtimeAm, //上午结束时间
      bookableEndtimePm, //下午结束时间
      bookableStarttimeAm, //上午开始时间
      bookableStarttimePm, //下午开始时间
      bookableStarttime, //预定开始时间
      bookableEndtime, //预定结束时间
      quota, //人数
      latitude, //经度
      longitude, //维度
      healthOrgOrderTime, //预定时间
      latestBookTime, //截至时间
      orgIntroduce, //介绍
      note,
      id //备注
    } = this.state;
    var healthOrgManageObject = {
      healthOrgName, //名称
      branchName, //分支
      healthOrgCode, //code
      province, //省
      city, //市
      region, //区
      specificAdress, //详细地址
      phone, //联系电话
      contact, //联系人
      orgState, //状态
      orgImage, //图片
      bookableEndtimeAm, //上午结束时间
      bookableEndtimePm, //下午结束时间
      bookableStarttimeAm, //上午开始时间
      bookableStarttimePm, //下午开始时间
      latitude, //经度
      longitude, //维度
      healthOrgOrderTime, //预定时间
      latestBookTime, //截至时间
      orgIntroduce, //介绍
      note,
      id //备注
    };
    // if (rule.test(healthOrgManageObject.phone)) {
    //   save({
    //     healthOrgManageObject
    //   }).then(res => {});
    //   this.setState({ vModify: false });

    // } else {
    //   message.error("电话号码");
    // }
    update({
      healthOrgManageObject,
      userCode: "王也"
    }).then(res => {
      healthOrgManager().then(res => {
        this.setState({
          data: res.data.pager.pageItems,
          current: res.data.pager.currentPage, //当前页
          pageSize: res.data.pager.pageSize, //每页条数
          total: res.data.pager.totalCount //总数据
        });
      });
      
    });
    this.setState({
      vModify: false
    });
    this.setState({city:'',orgState:'',province:'',region:''})
  };

  cancelModify = e => {
    this.setState({
      vModify: false
    });
  };
  //删除
  del = e => {
    this.setState({});
  };
  handleOk = e => {
    this.setState({});
  };

  handleCancel = e => {
    this.setState({});
  };
  //弹出新增窗
  add = e => {
    setype().then(res => this.setState({ allName: res.data.orgBigTypeList }));
    this.setState({ vAdd: true, healthOrgOrderTime: [], province:'',
    region:'',city:'' });
  };
  // submit=()=>{

  //   save({
  //   healthOrgName:"中山医院",
  //   // healthOrgCode:"HO1536291858230"
  // }).then(
  //     res=>console.log(res)
  //   )
  // }
  新增机构接口;
  submit = () => {
    let {
      healthOrgName, //名称
      branchName, //分支
      healthOrgCode, //code
      province, //省
      city, //市
      region, //区
      specificAdress, //详细地址
      phone, //联系电话
      contact, //联系人
      orgState, //状态
      orgImage, //图片
      bookableEndtimeAm, //上午结束时间
      bookableEndtimePm, //下午结束时间
      bookableStarttimeAm, //上午开始时间
      bookableStarttimePm, //下午开始时间
      latitude, //经度
      longitude, //维度
      healthOrgOrderTime, //预定时间
      bookableStarttime, //预定开始时间
      bookableEndtime, //预定结束时间
      quota, //人数
      latestBookTime, //截至时间
      orgIntroduce, //介绍
      note //备注
    } = this.state;
    var healthOrgManageObject = {
      healthOrgName, //名称
      branchName, //分支
      healthOrgCode, //code
      province, //省
      city, //市
      region, //区
      specificAdress, //详细地址
      phone, //联系电话
      contact, //联系人
      orgState, //状态
      orgImage, //图片
      bookableEndtimeAm, //上午结束时间
      bookableEndtimePm, //下午结束时间
      bookableStarttimeAm, //上午开始时间
      bookableStarttimePm, //下午开始时间
      latitude, //经度
      longitude, //维度
      healthOrgOrderTime, //预定时间
      latestBookTime, //截至时间
      orgIntroduce, //介绍
      note //备注
    };
    healthOrgManageObject.healthOrgOrderTime = this.state.list;
    // if( rule.test(healthOrgManageObject.phone)){
    //    if( healthOrgManageObject.healthOrgName){
    //      if(healthOrgManageObject.healthOrgCode){
    //        if(healthOrgManageObject.orgState==="0" || healthOrgManageObject.orgState==="1"){
    //         save({
    //           healthOrgManageObject,
    //           userCode: "王也"
    //         }).then(res => {
    //           healthOrgManager().then(
    //             res=>this.setState({ data: res.data.pager.pageItems,
    //               current: res.data.pager.currentPage, //当前页
    //               pageSize: res.data.pager.pageSize, //每页条数
    //               total: res.data.pager.totalCount //总数据
    //             })
    //           )
    //         });
    //         this.setState({ vAdd: false });
    //        }else{message.error("请选择状态")}
    //      }else{
    //        message.error("分支机构code不正确")
    //      }
    //    }else{
    //      message.error("分支机构名不正确")
    //    }
    // }else{
    //   message.error("电话号码不正确")
    // }
    if (healthOrgManageObject.branchName) {
      if (
        healthOrgManageObject.orgState === "0" ||
        healthOrgManageObject.orgState === "1"
      ) {
        if (healthOrgManageObject.healthOrgName) {
          if (healthOrgManageObject.healthOrgCode) {
            if (healthOrgManageObject.province) {
              if (healthOrgManageObject.city) {
                if (healthOrgManageObject.region) {
                  if (healthOrgManageObject.specificAdress) {
                    if (healthOrgManageObject.contact) {
                      if (rule.test(healthOrgManageObject.phone)) {
                        if (healthOrgManageObject.latitude) {
                          if (healthOrgManageObject.longitude) {
                            if (healthOrgManageObject.bookableStarttimeAm) {
                              if (healthOrgManageObject.bookableEndtimeAm) {
                                if (healthOrgManageObject.bookableStarttimePm) {
                                  if (healthOrgManageObject.bookableEndtimePm) {
                                    if (
                                      healthOrgManageObject.healthOrgOrderTime
                                        .length !== 0 && healthOrgManageObject.healthOrgOrderTime
                                        .length<=8
                                    ) {
                                      if (
                                        healthOrgManageObject.latestBookTime
                                      ) { 

                                        // save({
                                        //       healthOrgManageObject,
                                        //       userCode: "王也"
                                        //     }).then(res => {
                                        //       healthOrgManager().then(res =>
                                        //         this.setState({
                                        //           data: res.data.pager.pageItems,
                                        //           current:
                                        //             res.data.pager.currentPage, //当前页
                                        //           pageSize: res.data.pager.pageSize, //每页条数
                                        //           total: res.data.pager.totalCount, //总数据
                                        //           city:'',
                                        //           orgState:''
                                        //         })
                                        //       );
                                        //     });
                                        //     this.setState({ vAdd: false });

                                        if(healthOrgManageObject.healthOrgOrderTime.length==1){
                                          save({
                                            healthOrgManageObject,
                                            userCode: "王也"
                                          }).then(res => {
                                            healthOrgManager().then(res =>
                                              this.setState({
                                                data: res.data.pager.pageItems,
                                                current:
                                                  res.data.pager.currentPage, //当前页
                                                pageSize: res.data.pager.pageSize, //每页条数
                                                total: res.data.pager.totalCount, //总数据
                                                city:'',
                                                orgState:'',
                                                province:'',
                                                region:''
                                              })
                                            );
                                            console.log(res)
                                            if(res.data.result=="RC200"){
                                              alert(res.data.errMsg)
                                            }else{
                                              this.setState({ vAdd: false,city:'',orgState:'' });
                                            }
                                          });
                                          
                                        }else{
                                          for(var i=1;i<healthOrgManageObject.healthOrgOrderTime.length;i++){
                                            if(healthOrgManageObject.healthOrgOrderTime[i].bookableStarttime!=healthOrgManageObject.healthOrgOrderTime[i-1].bookableStarttime){
                                              save({
                                                healthOrgManageObject,
                                                userCode: "王也"
                                              }).then(res => {
                                                healthOrgManager().then(res =>
                                                  this.setState({
                                                    data: res.data.pager.pageItems,
                                                    current:
                                                      res.data.pager.currentPage, //当前页
                                                    pageSize: res.data.pager.pageSize, //每页条数
                                                    total: res.data.pager.totalCount, //总数据
                                                    city:'',
                                                    orgState:'',
                                                    province:'',
                                                    region:''
                                                  })
                                                );
                                                if(res.data.result=="RC200"){
                                                  alert(res.data.errMsg)
                                                }else{
                                                  this.setState({ vAdd: false,city:'',orgState:'' });
                                                }
                                              });
                                              // this.setState({ vAdd: false });
                                            }else{
                                              message.error("时间名额时间段重复")
                                              return
                                            }
                                          }
                                        }

                                       
                                      } else {
                                        message.error("最晚预约时间不能为空");
                                      }
                                    } else {
                                      message.error("时间名额不能为空且长度不能超过8");
                                    }
                                  } else {
                                    message.error("下午预约结束时间不能为空");
                                  }
                                } else {
                                  message.error("下午预约开始时间不能为空");
                                }
                              } else {
                                message.error("上午预约结束时间不能为空");
                              }
                            } else {
                              message.error("上午预约开始时间不能为空");
                            }
                          } else {
                            message.error("纬度不能为空");
                          }
                        } else {
                          message.error("经度不能为空");
                        }
                      } else {
                        message.error("电话号码不正确");
                      }
                    } else {
                      message.error("联系人不能为空");
                    }
                  } else {
                    message.error("地址不能为空");
                  }
                } else {
                  message.error("请选择区");
                }
              } else {
                message.error("请选择市");
              }
            } else {
              message.error("请选择省份");
            }
          } else {
            message.error("分支机构code不能为空");
          }
        } else {
          message.error("分支机构名为空");
        }
      } else {
        message.error("请选择状态");
      }
    } else {
      message.error("机构名称不正确或为空");
    }
  };
  canceladd = () => {
    this.setState({ vAdd: false, province:'',city:'',
    region:'' });
  };
  //弹出新增大类框
  type = e => {
    this.setState({ vType: true });
  };
  oktype = e => {
    type({
      name: this.state.name,
      code: this.state.code
    }).then(res => console.log(res));
    //  window.location.reload()
    this.setState({ vType: false });
  };
  canceltype = e => {
    this.setState({ vType: false });
  };
  //删除机构接口
  demsg = (index, code, e) => {
    var id = index;
    var healthOrgCode = code;
    if(window.confirm("是否确定删除")){
      dele({
        id,
        healthOrgCode,
      }).then(res => {
        healthOrgManager().then(res => {
          this.setState({
            data: res.data.pager.pageItems,
            current: res.data.pager.currentPage, //当前页
            pageSize: res.data.pager.pageSize, //每页条数
            total: res.data.pager.totalCount //总数据
          });
        });
      });
    }else{
      
    }
    
  };
  demessage = () => {};
  demsgok = () => {
    this.setState({
      vdemsg: false
    });
   
  };
  demsgcancel = () => {
    this.setState({
      vdemsg: false
    });
  };
  //获取值的方法
  //设置机构编码
  healthOrgName = value => {
    console.log(value);
    this.setState({ branchName: value });
  };
  //设置分支机构名称
  branchName = e => {
    console.log(e);

    this.setState({ healthOrgName: e.target.value });
  };
  //设置code
  healthOrgcode = e => {
    console.log(e);
    this.setState({ healthOrgCode: e.target.value });
  };
  // 设置省
  province = value => {
    console.log(value);
    for (var i = 0; i < json.length; i++) {
      if (value == json[i].code) {
        this.setState({ citylist: json[i].cityList });
        // console.log(json[i].cityList[0].areaList);
      }
    }
    this.setState({ province: value,city:'',region:'',cityList:[]});
    console.log(this.state.city)
  };
  // 设置市
  city = value => {
    // console.log(value);
    // console.log(this.state.citylist)
    for (var i = 0; i < this.state.citylist.length; i++) {
      console.log(this.state.citylist[i]);
      if (value == this.state.citylist[i].code) {
        this.setState({ coutry: this.state.citylist[i].areaList });
      }
    }
    this.setState({ city: value,region:'',areaList:[]});
    console.log(this.state.region)
  };
  // 设置区
  region = value => {
    console.log(value);
    this.setState({ region: value, });
  };
  // 设置详细地址
  adress = e => {
    console.log(e);
    this.setState({ specificAdress: e.target.value });
  };
  // 设置电话
  phone = e => {
    console.log(e);
    this.setState({ phone: e.target.value });
  };
  // 设置联系人
  contact = e => {
    console.log(e);
    this.setState({ contact: e.target.value });
  };
  //设置状态
  orgState = value => {
    if (value === "1") {
      this.setState({ orgState: "1" });
      console.log(this.state.orgState, value);
    }
    if (value === "0") {
      this.setState({ orgState: "0" });
      console.log(this.state.orgState, value);
    }
  };
  //设置经度
  longitude = e => this.setState({ longitude: e.target.value });
  //设置纬度
  latitude = e => this.setState({ latitude: e.target.value });
  // orgImage = e => this.setState({ orgImage: e.target.value });
  // 设置上午时间
  startam = e => {
    // console.log(e._d.toString().split(' ')[4]);
    if (
      e._d
        .toString()
        .split(" ")[4]
        .split(":")[0] <= 12
    ) {
      this.setState({
        bookableStarttimeAm: e._d.toString().split(" ")[4]
      });
    } else {
      message.error("选择时间不能大于12");
    }
  };
  endam = e => {
    console.log(e);
    var am = this.state.bookableStarttimeAm;
    let m = motime(am);
    let n = motime(e._d.toString().split(" ")[4]);
    let zero =
      parseInt(n[0] * 60) +
      parseInt(n[1]) -
      parseInt(m[0] * 60) -
      parseInt(m[1]);
    if (
      e._d
        .toString()
        .split(" ")[4]
        .split(":")[0] <= 12
    ) {
      if (zero > 0) {
        this.setState({
          bookableEndtimeAm: e._d.toString().split(" ")[4]
        });
      } else {
        message.error("上午结束时间不能早于开始时间");
      }
    } else {
      message.error("选择时间不能大于12");
    }
  };
  //设置下午时间
  startpm = e => {
    if (
      e._d
        .toString()
        .split(" ")[4]
        .split(":")[0] >= 12
    ) {
      this.setState({
        bookableStarttimePm: e._d.toString().split(" ")[4]
      });
    } else {
      message.error("选择时间不能小于12");
    }
  };
  endpm = e => {
    var pm = this.state.bookableStarttimePm;
    let m = motime(pm);
    let n = motime(e._d.toString().split(" ")[4]);
    let zero =
      parseInt(n[0] * 60) +
      parseInt(n[1]) -
      parseInt(m[0] * 60) -
      parseInt(m[1]);
    if (
      e._d
        .toString()
        .split(" ")[4]
        .split(":")[0] >= 12
    ) {
      if (zero > 0) {
        this.setState({
          bookableEndtimePm: e._d.toString().split(" ")[4]
        });
      } else {
        message.error("下午结束时间不能早于开始时间");
      }
    } else {
      message.error("选择时间不能小于12");
    }
  };
  // trans=e=>this.setState({})
  //预定时间人数待定
  starttime = e => {
    console.log(e);
    this.setState({
      bookableStarttime: e._d.toString().split(" ")[4]
    });
  };
  endtime = e => {
    console.log(e);
    this.setState({ bookableEndtime: e._d.toString().split(" ")[4] });
  };
  quota = e => {
    this.setState({ quota: e.target.value });
  };
  onlist = e => {
    var b = this.state.healthOrgOrderTime;
    let { bookableStarttime, bookableEndtime, quota } = this.state;

    let m = motime(bookableStarttime);
    let n = motime(bookableEndtime);
    let zero =
      parseInt(n[0] * 60) +
      parseInt(n[1]) -
      parseInt(m[0] * 60) -
      parseInt(m[1]);
    let i = motime(this.state.bookableStarttimeAm);
    let j = motime(this.state.bookableEndtimePm);
    let s_am =
      parseInt(n[0] * 60) +
      parseInt(n[1]) -
      parseInt(i[0] * 60) -
      parseInt([1]);
    let s_pm =
      parseInt(m[0] * 60) +
      parseInt(m[1]) -
      parseInt(j[0] * 60) -
      parseInt(j[1]);
    if (zero <= 60 && zero >= 0 && s_am > 0 && s_pm < 0) {
      let a = { bookableStarttime, bookableEndtime, quota };
      b.push(a);
      // if(b.length==0){
      //   b.push(a);
      //   this.setState({list:b})
      // }
      // if(b.length==1){
      //   b.push(a);
      //   this.setState({list:b})
      // }
      // if(b.length>=1){
      //   for(var s=1;s<b.length;s++){
      //       if(b[s].bookableStarttime!=b[s-1].bookableStarttime){
      //         b.push(a);
      //         this.setState({list:b})
      //       }else{
      //         message.error("时间段不能重复")
      //         return
      //       }
      //   }
      // }
      this.setState({
        list: b
      });
    } else {
      message.error(
        "预定前后时间不得超过1小时或结束时间大于起始或者超出预约时间范围"
      );
    }
  };
  uplist = e => {
    var b = this.state.healthOrgOrderTime;
    let {
      bookableStarttime,
      bookableEndtime,
      quota,
      healthOrgCode
    } = this.state;
    function motime(time) {
      time = time.split(":");
      return time;
    }
    let m = motime(bookableStarttime);
    let n = motime(bookableEndtime);
    let zero =
      parseInt(n[0] * 60) +
      parseInt(n[1]) -
      parseInt(m[0] * 60) -
      parseInt(m[1]);
    console.log(zero);
    if (zero <= 60) {
      let a = { bookableStarttime, bookableEndtime, quota };
      b.push(a);
      this.setState({
        list: b
      });
      let { healthOrgCode } = this.state;
      addtime({
        bookableStarttime,
        bookableEndtime,
        quota,
        healthOrgCode,
        userCode: "1"
      }).then(
        healthOrgManager().then(res => {
          this.setState({
            data: res.data.pager.pageItems,
            current: res.data.pager.currentPage, //当前页
            pageSize: res.data.pager.pageSize, //每页条数
            total: res.data.pager.totalCount //总数据
          });
        })
      );
    } else {
      message.error("预定前后时间不得超过1小时");
    }
    // let a = { bookableStarttime, bookableEndtime, quota };
    // b.push(a);
    // this.setState({
    //   list: b
    // });
    // let {healthOrgCode}=this.state
    // addtime({
    //   bookableStarttime,
    //   bookableEndtime,
    //   quota,
    //   healthOrgCode,
    //   userCode: "1"
    // }).then(res => console.log(res));
  };
  //设置截至时间
  latestBookTime = e => {
    console.log(e);
    let m = motime(e._d.toString().split(" ")[4]);
    let n = motime(this.state.bookableEndtimePm);
    let zero =
      parseInt(n[0] * 60) +
      parseInt(n[1]) -
      parseInt(m[0] * 60) -
      parseInt(m[1]);
    if (zero > 0) {
      this.setState({ latestBookTime: e._d.toString().split(" ")[4] });
    } else {
      message.error("最晚预约时间不得小于可预约的最晚时间");
    }
  };
  //设置介绍
  orgIntroduce = e => {
    console.log(e);
    this.setState({ orgIntroduce: e.target.value });
  };
  //设置备注
  note = e => this.setState({ note: e.target.value });
  name = e => this.setState({ name: e.target.value });
  code = e => this.setState({ code: e.target.value });
  deltime = (orderTimeId, healthOrgCode, index,bookableStarttime,bookableEndtime,quota) => {
    delatetime({ orderTimeId, healthOrgCode,bookableStarttime,bookableEndtime,quota,userCode:"王也" }).then(res => {
      console.log(res);
    });
    console.log( $(`#add${index}`))
    $(`#add${index}`).remove();
  };
  smove=(index,e)=>{
    // $(`#move${index}`).remove();
    console.log(e)
    // $(`#move${index}`).remove()
    var list=this.state.list;
        list.splice(index,1)
        // console.log(this.state.list,list)
        this.setState({
          list:list
        })
        console.log(list)
      
  }
  //搜索功能
  citysee = e => this.setState({ city: e });
  statussee = e => {
    console.log(e);
    this.setState({ orgState: e });
    console.log(this.state.orgState);
  };
  search = e => {
    // if (this.state.city && this.state.orgState === "0") {
    //   healthOrgManager({
    //     city: this.state.city,
    //     orgState: this.state.orgState
    //   }).then(res => {
    //     this.setState({
    //       data: res.data.pager.pageItems,
    //       current: res.data.pager.currentPage, //当前页
    //       pageSize: res.data.pager.pageSize, //每页条数
    //       total: res.data.pager.totalCount
    //     });
    //   });
    // }
    //城市存在，状态为0 1
    if (this.state.city) {
      if (this.state.orgState === "1") {
        healthOrgManager({
          city: this.state.city,
          orgState: this.state.orgState
        }).then(res => {
          this.setState({
            data: res.data.pager.pageItems,
            current: res.data.pager.currentPage, //当前页
            pageSize: res.data.pager.pageSize, //每页条数
            total: res.data.pager.totalCount
          });
        });
      } else if (this.state.orgState === "0") {
        healthOrgManager({
          city: this.state.city,
          orgState: this.state.orgState
        }).then(res => {
          this.setState({
            data: res.data.pager.pageItems,
            current: res.data.pager.currentPage, //当前页
            pageSize: res.data.pager.pageSize, //每页条数
            total: res.data.pager.totalCount
          });
        });
      } else {
        healthOrgManager({
          city: this.state.city
          // orgState: this.state.orgState
        }).then(res => {
          this.setState({
            data: res.data.pager.pageItems,
            current: res.data.pager.currentPage, //当前页
            pageSize: res.data.pager.pageSize, //每页条数
            total: res.data.pager.totalCount
          });
        });
      }
    }
    if (!this.state.city) {
      if (this.state.orgState === "1") {
        healthOrgManager({
          // city: this.state.city,
          orgState: this.state.orgState
        }).then(res => {
          this.setState({
            data: res.data.pager.pageItems,
            current: res.data.pager.currentPage, //当前页
            pageSize: res.data.pager.pageSize, //每页条数
            total: res.data.pager.totalCount
          });
        });
      } else if (this.state.orgState === "0") {
        healthOrgManager({
          // city: this.state.city,
          orgState: this.state.orgState
        }).then(res => {
          this.setState({
            data: res.data.pager.pageItems,
            current: res.data.pager.currentPage, //当前页
            pageSize: res.data.pager.pageSize, //每页条数
            total: res.data.pager.totalCount
          });
        });
      }
    }
    if (
      !this.state.city &&
      this.state.orgState !== "0" &&
      this.state.orgState !== "1"
    ) {
      message.error("请选择对应查询条件");
    }
    // if (this.state.city && this.state.orgState === "1") {
    //   healthOrgManager({
    //     city: this.state.city,
    //     orgState: this.state.orgState
    //   }).then(res => {
    //     this.setState({
    //       data: res.data.pager.pageItems,
    //       current: res.data.pager.currentPage, //当前页
    //       pageSize: res.data.pager.pageSize, //每页条数
    //       total: res.data.pager.totalCount
    //     });
    //   });
    // }

    // if (this.state.city && this.state.orgState !== "0") {
    //   healthOrgManager({
    //     city: this.state.city
    //   }).then(res => {
    //     this.setState({
    //       data: res.data.pager.pageItems,
    //       current: res.data.pager.currentPage, //当前页
    //       pageSize: res.data.pager.pageSize, //每页条数
    //       total: res.data.pager.totalCount
    //     });
    //   });
    // }

    // if (this.state.city && this.state.orgState !== "1") {
    //   healthOrgManager({
    //     city: this.state.city
    //   }).then(res => {
    //     this.setState({
    //       data: res.data.pager.pageItems,
    //       current: res.data.pager.currentPage, //当前页
    //       pageSize: res.data.pager.pageSize, //每页条数
    //       total: res.data.pager.totalCount
    //     });
    //   });
    // }

    // if (this.state.city == false && this.state.orgState === "0") {
    //   healthOrgManager({
    //     orgState: this.state.orgState
    //   }).then(res => {
    //     this.setState({
    //       data: res.data.pager.pageItems,
    //       current: res.data.pager.currentPage, //当前页
    //       pageSize: res.data.pager.pageSize, //每页条数
    //       total: res.data.pager.totalCount
    //     });
    //   });
    // }
    // if (this.state.city == false && this.state.orgState === "1") {
    //   healthOrgManager({
    //     orgState: this.state.orgState
    //   }).then(res => {
    //     this.setState({
    //       data: res.data.pager.pageItems,
    //       current: res.data.pager.currentPage, //当前页
    //       pageSize: res.data.pager.pageSize, //每页条数
    //       total: res.data.pager.totalCount
    //     });
    //   });
    // }
    // if (
    //   this.state.city == false &&
    //   this.state.orgState !== "0" &&
    //   this.state.orgState !== "1"
    // ) {
    //   message.error("请选择对应查询条件");
    // }
  };
  reload = e => window.location.reload();

  render() {
    let today = new Date();
    let year = today.getFullYear(),
      month = today.getMonth() + 1,
      day = today.getDate();
    let provincename = "",
      cityname = "",
      regionname = "";
    function showTotal(total) {
      return `共${total}条`;
    }
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

    for (var i = 0; i < json.length; i++) {
      if (this.state.province == json[i].code) {
        // console.log(json[i].name);
        provincename = json[i].name;
        // this.setState({
        //   city:''
        // });
      }
    }
    for (var i = 0; i < json.length; i++) {
      for (var j = 0; j < json[i].cityList.length; j++) {
        if (this.state.city == json[i].cityList[j].code) {
          cityname = json[i].cityList[j].name;
          // this.setState({
          //   city: json[i].cityList[j].name
          // });
        }
      }
    }
    for (var i = 0; i < json.length; i++) {
      for (var j = 0; j < json[i].cityList.length; j++) {
        for (var n = 0; n < json[i].cityList[j].areaList.length; n++) {
          // console.log(json[i].cityList[j].areaList[n])
          if (this.state.region == json[i].cityList[j].areaList[n].code) {
            regionname = json[i].cityList[j].areaList[n].name;
            // this.setState({
            //   region: json[i].cityList[j].areaList[n].name
            // });
          }
        }
      }
    }
    var cityall = [];
    for (var i = 0; i < json.length; i++) {
      for (var j = 0; j < json[i].cityList.length; j++) {
        // cityall=json[i].cityList[j]
        //  console.log(json[i].cityList[j])
        cityall.push(json[i].cityList[j]);
      }
    }
    let {
      latestBookTime,
      bookableEndtimeAm,
      bookableStarttimePm,
      bookableEndtimePm
    } = this.state;
    var bookableStarttimeAm = "";
    if (this.state.bookableStarttimeAm) {
      bookableStarttimeAm = this.state.bookableStarttimeAm;
    }
    var name = "";
    for (var i = 0; i < this.state.allName.length; i++) {
      if (this.state.branchName == this.state.allName[i].code) {
        name = this.state.allName[i].name;
      }
    }
    return (
      <div className={style["org"]}>
        <div className={style["head"]}>体检管理 / 体检管理</div>
        <div style={{ background: "#ffffff", height: "148px" }}>
          <div className={style["city"]}>
            <h4>
              分公司&nbsp;&nbsp;&nbsp;
              <Select
                defaultValue="请选择市"
                style={{ width: 250, height: 34 }}
                onChange={this.citysee}
              >
                {cityall.map((item, index) => {
                  return (
                    <Option value={item.code} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
                {/* <Option value="北京">北京</Option>
                <Option value="广州">广州</Option>
                <Option value="苏州">苏州</Option>
                <Option value="南京">南京</Option> */}
              </Select>
            </h4>
            <h4>
              状态&nbsp;&nbsp;&nbsp;
              <Select
                defaultValue="请选择"
                style={{ width: 250, height: 34 }}
                onChange={this.statussee}
              >
              <Option value="">请选择</Option>
                <Option value="0">开放</Option>
                <Option value="1">暂停</Option>
              </Select>
            </h4>
            <h4>
              开放时间&nbsp;&nbsp;&nbsp;
              <DatePicker
                format={"YYYY/MM/DD"}
                style={{ width: 250, height: 34 }}
              />
              {/* <RangePicker
               
                // defaultValue={[
                //   moment(`${year}/${month}/${day}`, "YYYY/MM/DD"),
                //   moment(`${year}/${month}/${day}`, "YYYY/MM/DD")
                // ]}
                format={"YYYY/MM/DD"}
              /> */}
            </h4>
          </div>

          <div className={style["program"]}>
            <span>体检套餐</span>
            <Search
              // placeholder="添加体检套餐"
              style={{ width: 490, height: 34 }}
              prefix={
                <div style={{ color: "#EB7722" }}>
                  <span
                    style={{ marginRight: "10px", border: "1px solid #EB7722" }}
                  >
                    体检项目A
                  </span>
                  <span style={{ border: "1px solid #EB7722" }}>体检项目B</span>
                </div>
              }
            />
            <span>追加体检项目</span>
            <Search
              placeholder="添加体检项目"
              style={{ width: 490, height: 34 }}
            />
            {/* <span>体检项目A</span><span>体检项目B</span> */}

            <Button
              type="primary"
              style={{ background: "#12AFBE", color: "white" }}
              onClick={this.reload}
            >
              重置
            </Button>
            <Button
              // type="primary"
              style={{ background: "#E87722", color: "white" }}
              onClick={this.search}
            >
              搜索
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "20px",backgroundColor:"#ffffff",paddingTop:"20px" }}>
          <h6>
            <Button
              style={{
                background: "#E87722",
                width: "100px",
                height: "34px",
                marginLeft: "20px"
              }}
              onClick={this.add}
            >
              新增机构
            </Button>
            {/* <NavLink to="/index/orgadd"> 新增机构</NavLink> */}
            <Button
              style={{ width: "110px", height: "34px", marginLeft: "20px" }}
              onClick={this.type}
            >
              新增机构大类
            </Button>
            <Button
              style={{ width: "100px", height: "34px", marginLeft: "20px" }}
              disabled
            >
              批量导入
            </Button>
            <Button
              style={{ width: "100px", height: "34px", marginLeft: "20px" }}
              disabled
            >
              {" "}
              删除
            </Button>
          </h6>

          <div className={style["tTable"]} style={{ display: "flex",backgroundColor:"#FEF8F4" }}>
            <span style={{ flex: "1" }}>
              <input type="checkbox" />
            </span>
            <span style={{ flex: "1" }}>体检机构</span>
            <span style={{ flex: "1" }}>地址</span>
            <span style={{ flex: "1" }}>联系方式</span>
            {/* <span  style={{flex:"1"}}>交通</span> */}
            <span style={{ flex: "1" }}>联系人</span>
            <span style={{ flex: "1" }}>状态</span>
            <span style={{ flex: "1" }}>操作</span>
          </div>
          <ul style={{backgroundColor:"#ffffff"}}>
            {this.state.data.map((item, index) => {
              return (
                <li
                  key={index}
                  className={style["tDetail"]}
                  style={{ borderBottom: "1px solid #cccccc" }}
                >
                  <span>
                    <input type="checkbox" />
                  </span>
                  <span>{item.healthOrgName}</span>
                  <span>{item.specificAdress}</span>
                  <span>{item.phone}</span>
                  {/* <span>{item.branchName}</span> */}
                  <span>{item.contact}</span>
                  <span>{item.orgState == "0" ? "开放" : "暂停"}</span>
                  <span>
                    {/* <Button onClick={this.look}>查看</Button> */}
                    {/* <NavLink
                      to={{ pathname: "/index/orgdetail", state: item.id }}
                    >
                      查看
                    </NavLink> */}
                    {/* <NavLink to={{pathname:'/index/orgmodify',state:item.id}}>修改</NavLink> */}
                    {/* <Button onClick={this.modify}>修改</Button> */}
                    {/* <Button onClick={this.demsg}>删除</Button> */}
                    <Popover
                      placement="bottom"
                      content={
                        <div>
                          <p>
                            {" "}
                            <Button>
                              <NavLink
                                to={{
                                  pathname: "/index/orgdetail",
                                  state:
                                    item.id +
                                    "&&&&" +
                                    item.createUser +
                                    "&&&&" +
                                    item.healthOrgCode+"&&&&"+
                                    item.branchName
                                }}
                              >
                                查看
                              </NavLink>
                            </Button>
                          </p>
                          <p>
                            <Button
                              onClick={this.modify.bind(
                                this,
                                item.id,
                                item.healthOrgCode
                              )}
                            >
                              修改
                            </Button>
                          </p>
                          <p>
                            <Button
                              onClick={this.demsg.bind(
                                this,
                                item.id,
                                item.healthOrgCode
                              )}
                            >
                              删除
                            </Button>
                          </p>
                          <p>
                            <Button>
                              <NavLink
                                to={{
                                  pathname: "/index/meal",
                                  state:
                                    item.healthOrgCode +
                                    "&&&&" +
                                    item.createUser +
                                    "&&&&" +
                                    item.branchName +
                                    "&&&&" +
                                    item.healthOrgName
                                }}
                              >
                                设置项目及套餐
                              </NavLink>
                            </Button>
                          </p>
                        </div>
                      }
                      trigger="click"
                    >
                      ...
                    </Popover>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <Pagination
          size="small"
          total={this.state.total}
          showQuickJumper={true}
          current={this.state.current}
          pageSize={this.state.pageSize}
          showTotal={showTotal}
          onChange={(page, pageSize) => {
            this.query(page);
          }}
          style={{ float: "right" }}
        />
        {/* 详情 */}
        <Modal
          title="修改信息"
          visible={this.state.vModify}
          onOk={this.okModify}
          onCancel={this.cancelModify}
          width={1000}
        >
          <div className="box2">
            <div className={style["Wraper"]}>
              {/* <div className={style["Model-head"]}> 预约体检信息</div> */}
              <div className={style["Content"]}>
                <div className={style["Title"]}>
                  <span className="ellipse" />
                  机构基本信息
                </div>
                <ul className="clearfix">
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>机构名称</span>
                    <Select
                      style={{ width: 250 }}
                      onChange={this.healthOrgName}
                      placeholder={name}
                    >
                      {this.state.allName.map((item, index) => {
                        return (
                          <Option value={item.code} key={index}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                    {/* {this.state.branchName} */}
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>状态</span>
                    <Select
                      placeholder={this.state.orgState == "0" ? "开放" : "暂停"}
                      style={{ width: 250 }}
                      onChange={this.orgState}
                    >
                      <Option value="0">开放</Option>
                      <Option value="1">暂停</Option>
                    </Select>
                    {/* {this.state.orgState} */}
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>分支机构</span>
                    <Input
                      type="text"
                      onChange={this.branchName}
                      style={{ width: "250px" }}
                      // placeholder={this.state.healthOrgName}
                      value={this.state.healthOrgName}
                    >
                      {/* {this.state.healthOrgName} */}
                    </Input>
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>分支机构code</span>
                    <Input
                      type="text"
                      onChange={this.healthOrgcode}
                      style={{ width: "250px" }}
                      placeholder={this.state.healthOrgCode}
                      disabled
                    />
                  </li>
                  <li className="col-md-12" style={{ height: "auto" }}>
                    <span className={style["col-666"]}>机构地址</span>
                    {/* {this.state.province} */}
                    <Select
                      onChange={this.province}
                      style={{ width: "100px" }}
                      placeholder={provincename}
                      value={provincename}
                    >
                    <Option value="">请选择省</Option>
                      {json.map((item, index) => {
                        return (
                          <Option key={index} value={item.code}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                    <Select
                      placeholder={cityname}
                      onChange={this.city}
                      style={{ width: "100px" }}
                      value={cityname}
                    >
                      {this.state.citylist
                        ? this.state.citylist.map((item, index) => {
                            return (
                              <Option key={index} value={item.code}>
                                {item.name}
                              </Option>
                            );
                          })
                        : ""}
                    </Select>
                    <Select
                      placeholder={regionname}
                      onChange={this.region}
                      style={{ width: "100px" }}
                      value={regionname}
                    >
                    <Option value="">请选择区</Option>
                      {this.state.coutry
                        ? this.state.coutry.map((item, index) => {
                            return (
                              <Option key={index} value={item.code}>
                                {item.name}
                              </Option>
                            );
                          })
                        : ""}
                    </Select>
                    {/* {this.state.province + this.state.city + this.state.region} */}
                  </li>
                  <li
                    className="col-md-12"
                    style={{ marginTop: "-10px", textAlign: "left" }}
                  >
                    <span style={{ color: "transparent", marginRight: "10px" }}>
                      机构地址
                    </span>
                    <Input
                      style={{ width: "648px" }}
                      value={this.state.specificAdress}
                      onChange={this.adress}
                    />
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>联系人</span>
                    <Input
                      value={this.state.contact}
                      onChange={this.contact}
                      style={{ width: "250px" }}
                    />
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>联系电话</span>
                    <Input
                      value={this.state.phone}
                      onChange={this.phone}
                      style={{ width: "250px" }}
                    />
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>经度</span>
                    <Input
                      type="text"
                      style={{ width: "80px" }}
                      value={this.state.longitude}
                      onChange={this.longitude}
                    />
                    <span className={style["col-666"]} >
                      纬度
                    </span>
                    <Input
                      type="text"
                      style={{ width: "80px" }}
                      value={this.state.latitude}
                      onChange={this.latitude}
                    />
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>机构图片</span>
                    <Upload>
                      <Button>
                        <Icon type="upload" />
                        上传文件
                      </Button>
                    </Upload>
                  </li>
                  <li
                    style={{ width: "100%", height: "auto" }}
                    className={style["col-md-2"]}
                  >
                    <span className={style["col-666"]}>机构介绍</span>
                    <textarea
                      style={{ width: "648px", height: "71px", color: "black" }}
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={this.state.orgIntroduce}
                      onChange={this.orgIntroduce}
                    />
                  </li>
                </ul>
                <div className={style["Title"]}>
                  <span className="ellipse" />
                  预约信息
                </div>
                <ul
                  className="clearfix appointment-info"
                  style={{ marginBottom: "0px" }}
                >
                  <li className={style["lh20"]}>
                    <span className={style["col-666"]}>可预约时间</span>
                    {/*<Cascader
            style={{ width: 150 }}
            options={options}
            onChange={onChange}
            placeholder="Please select"
            showSearch={{ filter }}
          />*/}
                    <TimePicker
                      // defaultOpenValue={moment(this.state.bookableEndtimeAm, "HH:mm")}
                      // defaultvalue={moment(bookableStarttimeAm,'HH:mm')}
                      placeholder={bookableStarttimeAm}
                      onChange={this.startam}
                      format="HH:mm"
                    />
                    -
                    <TimePicker
                      // defaultOpenValue={moment("00:00", "HH:mm")}
                      // defaultValue={moment(bookableEndtimeAm,'HH:mm')}
                      placeholder={bookableEndtimeAm}
                      onChange={this.endam}
                      format="HH:mm"
                    />
                    <span style={{ color: "#EB7722", width: "50px" }}>am</span>
                    <TimePicker
                      // defaultOpenValue={moment("00:00", "HH:mm")}
                      // defaultValue={moment(bookableStarttimePm?bookableStarttimePm:"12:00",'HH:mm')}
                      placeholder={bookableStarttimePm}
                      onChange={this.startpm}
                      format="HH:mm"
                    />
                    -
                    <TimePicker
                      // defaultOpenValue={moment("00:00", "HH:mm")}
                      // defaultValue={moment(bookableEndtimePm?bookableEndtimePm:"12:00",'HH:mm')}
                      placeholder={bookableEndtimePm}
                      onChange={this.endpm}
                      format="HH:mm"
                    />
                    <span style={{ color: "#EB7722", width: "50px" }}>pm</span>
                    {/* {this.state.bookableStarttimeAm +
                      "~" +
                      this.state.bookableEndtimeAm +
                      "am"}
                    &nbsp;
                    {this.state.bookableStarttimeAm +
                      "~" +
                      this.state.bookableEndtimePm +
                      "pm"} */}
                  </li>
                  <li
                    style={{ textAlign: "left", float: "left", width: "58%" }}
                    className={style["lh20"]}
                  >
                    <span
                      className={style["col-666"]}
                      style={{ float: "left" }}
                    >
                      时间/名额
                    </span>
                    <TimePicker
                      style={{
                        width: "140px",
                        float: "left",
                        textAlign: "center"
                      }}
                      defaultOpenValue={moment("00:00", "HH:mm")}
                      onChange={this.starttime}
                      format="HH:mm"
                    />
                    <TimePicker
                      style={{ width: "140px", float: "left" }}
                      defaultOpenValue={moment("18:00", "HH:mm")}
                      onChange={this.endtime}
                      format="HH:mm"
                    />
                    <Input
                      style={{ width: "80px", float: "left" }}
                      onChange={this.quota}
                    />
                    <div
                      className="addQuota"
                      style={{ float: "left", color: "#EB7722" }}
                      onClick={this.uplist}
                    >
                      <img src="../../style/images/add.png" alt="" />+ 新增
                    </div>
                  </li>
                  <li
                    style={{
                      float: "left",
                      width: "42%",
                      marginBottom: "0px",
                      textAlign: "right"
                    }}
                    className={style["lh20"]}
                  >
                    <span className={style["col-666"]}>最晚预约时间</span>
                    <TimePicker
                      style={{ width: 150 }}
                      // defaultOpenValue={moment("18:00", "HH:mm")}
                      placeholder={latestBookTime}
                      onChange={this.latestBookTime}
                      format="HH:mm"
                      // defaultValue={moment("18:00", "HH:mm")}
                    />
                    {/* {this.state.latestBookTime} */}
                  </li>
                  <li
                    style={{
                      float: "left",
                      width: "100%",
                      marginBottom: "0px",
                      marginLeft: "95px",
                      textAlign: "left",
                      height: "80px"
                    }}
                    className={style["lh20 col-md-2"]}
                  >
                    <div className={style["container"]}>
                      {this.state.healthOrgOrderTime
                        ? this.state.healthOrgOrderTime.map((item, index) => {
                            return (
                              <span
                                ref="ad"
                                className="ad"
                                id={`add${index}`}
                                key={index}
                                style={{
                                  width: "150px",
                                  display: "inline-block"
                                }}
                                onClick={this.deltime.bind(
                                  this,
                                  item.orderTimeId,
                                  item.healthOrgCode,
                                  index,
                                  item.bookableStarttime,
                                  item.bookableEndtime,
                                  item.quota,
                                )}
                              >
                                {item.bookableStarttime}~{item.bookableEndtime}
                                &nbsp;
                                {item.quota}
                                &nbsp;&chi;
                              </span>
                            );
                          })
                        : ""}
                      {/* <span>体检项目A</span>
                      <span>体检项目A</span> */}
                    </div>
                  </li>
                  <li style={{ height: "auto" }} className="col-md-12">
                    <span className={style["col-666"]}>备注</span>
                    <textarea
                      style={{ width: "648px", height: "71px", color: "black" }}
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={this.note}
                      value={this.state.note}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Modal>
        {/* 新增机构 */}
        <Modal
          title="新增机构"
          visible={this.state.vAdd}
          onOk={this.submit}
          onCancel={this.canceladd}
          width={1000}
          destroyOnClose={true}
        >
          <div className="box2" style={{ color: "black" }}>
            <div className={style["Wraper"]}>
              {/* <div className={style["Model-head"]}> 预约体检信息</div> */}
              <div className={style["Content"]}>
                <div className={style["Title"]}>
                  <span className="ellipse" />
                  机构基本信息
                </div>
                <ul className="clearfix">
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>机构名称</span>
                    <Select
                      defaultValue="请选择"
                      style={{ width: 250 }}
                      onChange={this.healthOrgName}
                    >
                      {this.state.allName.map((item, index) => {
                        return (
                          <Option value={item.code} key={index}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>状态</span>
                    <Select
                      defaultValue="请选择状态"
                      style={{ width: 250 }}
                      onChange={this.orgState}
                    >
                      <Option value="0">开放</Option>
                      <Option value="1">暂停</Option>
                    </Select>
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>分支机构</span>
                    <Input
                      type="text"
                      onChange={this.branchName}
                      style={{ width: "250px" }}
                    />
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>分支机构code</span>
                    <Input
                      type="text"
                      onChange={this.healthOrgcode}
                      style={{ width: "250px" }}
                    />
                  </li>
                  <li className="col-md-12" style={{ height: "auto" }}>
                    <span className={style["col-666"]}>机构地址</span>
                    <Select 
                    // defaultValue="请选择省"
                    value={provincename}
                    onChange={this.province}>
          
                    <Option value=''>请选择省</Option>
                      {json.map((item, index) => {
                        return (
                          <Option key={index} value={item.code}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                    <Select 
                    // defaultValue="请选择市"
                    value={cityname}
                     onChange={this.city}>
                    <Option value=''>请选择市</Option>
                      {this.state.citylist
                        ? this.state.citylist.map((item, index) => {
                            return (
                              <Option key={index} value={item.code}>
                                {item.name}
                              </Option>
                            );
                          })
                        : ""}
                    </Select>
                    <Select 
                    // defaultValue="请选择区" 
                    value={regionname}
                    onChange={this.region}>
                    <Option value=''>请选择区</Option>
                      {this.state.coutry
                        ? this.state.coutry.map((item, index) => {
                            return (
                              <Option key={index} value={item.code}>
                                {item.name}
                              </Option>
                            );
                          })
                        : ""}
                    </Select>
                  </li>
                  <li
                    className="col-md-12"
                    style={{ marginTop: "-10px", textAlign: "left" }}
                  >
                    <span style={{ color: "transparent", marginRight: "10px" }}>
                      机构地址
                    </span>
                    <Input
                      style={{ width: "648px" }}
                      type="text"
                      onChange={this.adress}
                    />
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>联系人</span>
                    <Input
                      type="text"
                      onChange={this.contact}
                      style={{ width: "250px" }}
                    />
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>联系电话</span>
                    <Input
                      type="text"
                      onChange={this.phone}
                      style={{ width: "250px" }}
                    />
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>经度</span>
                    <Input
                      type="text"
                      style={{ width: "80px" }}
                      onChange={this.longitude}
                    />
                    <span className={style["col-666"]}>纬度</span>
                    <Input
                      type="text"
                      style={{ width: "80px" }}
                      onChange={this.latitude}
                    />
                  </li>
                  <li className={style["col-md-2"]}>
                    <span className={style["col-666"]}>机构图片</span>
                    <Upload>
                      <Button>
                        <Icon type="upload" />
                        上传文件
                      </Button>
                    </Upload>
                  </li>
                  <li
                    style={{ width: "100%", height: "auto" }}
                    className={style["col-md-2"]}
                  >
                    <span className={style["col-666"]}>机构介绍</span>
                    <textarea
                      style={{ width: "648px", height: "71px", color: "black" }}
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={this.orgIntroduce}
                    />
                  </li>
                </ul>
                <div className={style["Title"]}>
                  <span className="ellipse" />
                  预约信息
                </div>
                <ul
                  className="clearfix appointment-info"
                  style={{ marginBottom: "0px" }}
                >
                  <li className={style["lh20"]}>
                    <span className={style["col-666"]}>可预约时间</span>
                    {/*<Cascader
            style={{ width: 150 }}
            options={options}
            onChange={onChange}
            placeholder="Please select"
            showSearch={{ filter }}
          />*/}
                    <TimePicker
                      defaultOpenValue={moment("00:00", "HH:mm")}
                      onChange={this.startam}
                      format="HH:mm"
                    />
                    -
                    <TimePicker
                      defaultOpenValue={moment("00:00", "HH:mm")}
                      onChange={this.endam}
                      format="HH:mm"
                    />
                    <span style={{ color: "#EB7722", width: "50px" }}>am</span>
                    <TimePicker
                      defaultOpenValue={moment("00:00", "HH:mm")}
                      onChange={this.startpm}
                      format="HH:mm"
                    />
                    -
                    <TimePicker
                      defaultOpenValue={moment("00:00", "HH:mm")}
                      onChange={this.endpm}
                      format="HH:mm"
                    />
                    <span style={{ color: "#EB7722", width: "50px" }}>pm</span>
                  </li>

                  <li
                    style={{ textAlign: "left", float: "left", width: "58%" }}
                    className={style["lh20"]}
                  >
                    <span
                      className={style["col-666"]}
                      style={{ float: "left" }}
                    >
                      时间/名额
                    </span>
                    <TimePicker
                      style={{
                        width: "140px",
                        float: "left",
                        textAlign: "center"
                      }}
                      defaultOpenValue={moment("00:00", "HH:mm")}
                      format="HH:mm"
                      onChange={this.starttime}
                    />
                    <TimePicker
                      style={{ width: "140px", float: "left" }}
                      defaultOpenValue={moment("00:00", "HH:mm")}
                      format="HH:mm"
                      onChange={this.endtime}
                    />
                    <Input
                      style={{ width: "80px", float: "left" }}
                      onChange={this.quota}
                    />
                    <div
                      className="addQuota"
                      style={{ float: "right", color: "#EB7722" }}
                      onClick={this.onlist}
                    >
                      <img src="../../style/images/add.png" alt="" />+ 新增
                    </div>
                  </li>
                  <li
                    style={{
                      float: "left",
                      width: "42%",
                      marginBottom: "0px",
                      textAlign: "right"
                    }}
                    className={style["lh20"]}
                  >
                    <span className={style["col-666"]}>最晚预约时间</span>
                    <TimePicker
                      style={{ width: 150 }}
                      defaultOpenValue={moment("00:00", "HH:mm")}
                      onChange={this.latestBookTime}
                      format="HH:mm"
                    />
                  </li>
                  <li
                    style={{
                      float: "left",
                      width: "100%",
                      marginBottom: "0px",
                      marginLeft: "95px",
                      textAlign: "left",
                      height: "80px"
                    }}
                    className={style["lh20 col-md-2"]}
                  >
                    <div className={style["container"]}>
                      {this.state.healthOrgOrderTime
                        ? this.state.healthOrgOrderTime.map((item, index) => {
                            return (
                              <span
                                key={index}
                                id={`move${index}`}
                                onClick={
                                  ()=>{
                                    this.smove(index)
                                  }
                                  // this.move.bind(this,index)
                                }
                                style={{
                                  width: "150px",
                                  display: "inline-block"
                                }}
                              >
                                {item.bookableStarttime}~{item.bookableEndtime}
                                &nbsp;
                                {item.quota}
                                &nbsp;&chi;
                              </span>
                            );
                          })
                        : ""}
                      {/* <span>体检项目A</span>
                      <span>体检项目A</span> */}
                    </div>
                  </li>
                  <li style={{ height: "auto" }} className="col-md-12">
                    <span className={style["col-666"]}>备注</span>
                    <textarea
                      style={{ width: "648px", height: "71px", color: "black" }}
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={this.note}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Modal>
        {/* 新增机构大类 */}
        <Modal
          title="新增机构大类"
          visible={this.state.vType}
          onOk={this.oktype}
          onCancel={this.canceltype}
          destroyOnClose
        >
          <ul style={{ height: "200px" }}>
            <li style={{ display: "flex", marginTop: "10px" }}>
              <h4>机构名称</h4>
              <Input
                onChange={this.name}
                style={{ width: "200px", height: "34px", marginLeft: "30px" }}
              />
            </li>
            <li style={{ display: "flex", marginTop: "10px" }}>
              <h4>机构代码</h4>
              <Input
                onChange={this.code}
                style={{ width: "200px", height: "34px", marginLeft: "30px" }}
              />
            </li>
          </ul>
        </Modal>
        {/* 删除确认框 */}
      </div>
    );
  }
}
export default Configure;
