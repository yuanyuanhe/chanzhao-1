import React, { Component } from "react";
import { Tree, Tabs, Button, Table, Divider, Tag, Popover, Input,Modal} from "antd";
import {orgselect,projectlist,packtlist,projectdelete,projectsave} from '../../../config/api'
import css from '../mcss/program.mcss'
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
var rule=/^S{3}/;
function addkey(x){
     for(var i=0;i<x.length;i++){
       x[i].key=x[i].id;
       return x
     }
}
class Ad extends Component {
  state = {
    id: 1, //通过id值区查询相关机构
    name: "门诊部", //标题
    treedata:[],
    projectlist:[],//项目信息
    packtlist:[],//套餐信息
    adproV:false,//新增窗
    moproV:false,//修改窗
    adpageV:false,//套餐
    mopageV:false,//
    
  };
  componentDidMount(){
         orgselect().then(
           res=>this.setState({treedata:res.data.list})
         )
  }
  onSelect=(selectedKeys,e)=>{
    console.log(selectedKeys,e)
    
    if(!rule.test(selectedKeys)){
      this.setState({
        name:e.node.props.title,
        id:selectedKeys
      })
    projectlist().then(
      res=>{
           
           this.setState({
            projectlist:addkey(res.data.projectManagements)             
           })
      }
    )
    packtlist().then(
      res=>{
        this.setState({packtlist:addkey(res.data.projectManagements)})
      }
    )
    }
  }
  //
  // 新增项目
  addpro=e=>{
     this.setState({
       adproV:true
     })
   
  }
  okAddpro=e=>{
    this.setState({adproV:false})
    projectsave({
      projectReference:{
      fwdResourceCode: "XM008",
      resourceCode:"12",
      resourceName: "机构项目",
      resourceOrgCode:this.state.id,
      resourceOrgName:this.state.name,
      resourceType: "1"
    }}).then(
      res=>console.log(res)
    )
  }
  cancelAddpro=e=>{
    this.setState({adproV:false})
  }
  //修改项目
  mopro=e=>{
    this.setState({
      moproV:true
    })
 }
 okMopro=e=>{
   this.setState({moproV:false})
 }
 cancelMopro=e=>{
   this.setState({moproV:false})
 }
 //新增套餐
 addpage=e=>{
  this.setState({
    adpageV:true
  })
}
okAdpage=e=>{
 this.setState({adpageV:false})
}
cancelAdpage=e=>{
 this.setState({adpageV:false})
}
//修改套餐
mopage=e=>{
  this.setState({
    mopageV:true
  })
}
okMopage=e=>{
 this.setState({mpageV:false})
}
cancelMopage=e=>{
 this.setState({mopageV:false})
}
//删除套餐项目
demsg=(id)=>{
  console.log(id)
  projectdelete({id,}).then(
    res=>{
      projectlist().then(
        res=>{
             
             this.setState({
              projectlist:addkey(res.data.projectManagements)             
             })
        }
      )
      packtlist().then(
        res=>{
          this.setState({packtlist:addkey(res.data.projectManagements)})
        }
      )
    }
  )
}
  render() {
    console.log(this.state.id)
    const columns = [
      {
        title: "机构项目代码",
        key: " healthTypeCode",
        dataIndex: " healthTypeCode"
      },
      {
        title: "机构项目名称",
        key: "healthTypeName",
        dataIndex: "healthTypeName"
      },
      {
        title: "体检系统项目代码",
       
        dataIndex: "projectCode",
        key: "projectCode"
      },
      {
        title: "体检系统项目名称",
       
        dataIndex: "projectName",
        key: "projectName"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <Popover
              content={
                <div>
                  <p ><Button onClick={this.mopro}>修改</Button></p>
                  <p><Button
                  //  onClick={this.desmsg(record.id)}
                     onClick={()=>{
                      // window.confirm("是否确认删除")
                      if( window.confirm("是否确认删除")){
                       
                        this.demsg(record.id)
                      }else{
                       
                      }
                      //  
                     }}
                  >删除</Button></p>
                </div>
              }
              placement="bottomRight"
            >
              <Button>...</Button>
            </Popover>
          </span>
        )
      }
    ];
    const columns1 = [
      {
        title: "机构套餐代码",
        dataIndex: "projectCode",
        key: "projectCode"
      },
      {
        title: "机构套餐名称",
        dataIndex: "projectName",
        key: "projectName"
      },
      {
        title: "富卫套餐代码",
        key: " healthTypeCode",
        dataIndex: " healthTypeCode"
      },
      {
        title: "富卫套餐名称",
        key: "healthTypeName",
        dataIndex: "healthTypeName"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <Popover
              content={
                <div>
                  <p ><Button onClick={this.mopage}>修改</Button></p>
                  <p><Button
                  //  onClick={this.desmsg(record.id)}
                     onClick={()=>{
                       window.confirm("是否确认删除")
                       this.demsg(record.id)
                     }}
                  >删除</Button></p>
                </div>
              }
              placement="bottomRight"
            >
              <Button>...</Button>
            </Popover>
          </span>
        )
      }
    ];

    const data =this.state.projectlist;//项目数据
    
    const data1=this.state.packtlist//套餐数据
   
    console.log(data)
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
    console.log(data)
    return (
      <div
        style={{ background: "#F8F8F8", fontSize: "16px", marginLeft: "20px" }}
      >
        <h4 style={{ height: "60px", lineHeight: "60px", textIndent: "10px" }}>
          体检管理 / 体检管理
        </h4>
        <div style={{ display: "flex" }}>
          {/* 树状机构图 */}
          <ul style={{ width: "305px", height: "10000px" }}>
            <Tree style={{ fontSize: "18px" }} onSelect={(selectedKeys,e)=>{
              this.onSelect(selectedKeys,e)
            }}>
              {this.state.treedata.map((item,index)=>{
                return (
                  <TreeNode key={`SSS${index}`} title={item.orgName}>
                    {item.orgVOS?item.orgVOS.map((item,index)=>{
                      return (
                        <TreeNode key={item.orgCode} title={item.orgName}></TreeNode>
                      )
                    }):""}
                  </TreeNode>
                )
              })}
            </Tree>
          </ul>
          {/* 详细机构表 */}
          <ul
            style={{
              width: "1300px",
              background: "white",
              paddingLeft: "30px",
              paddingTop: "20px"
            }}
          >
            <li
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginBottom: "20px"
              }}
            >
              {this.state.name}
            </li>
            <li>
              <Tabs defaultActiveKey="1" onChange={this.onChange}>
                <TabPane tab="体检项目" key="1">
                  <h4>
                    <Button
                      style={{
                        width: "100px",
                        height: "34px",
                        background: "#E87722",
                        marginRight: "10px"
                      }}
                      onClick={this.addpro}
                    >
                      新增项目
                    </Button>
                    <Button
                      style={{
                        width: "100px",
                        height: "34px",
                        marginRight: "10px"
                      }}
                    >
                      批量导入
                    </Button>
                    <Button style={{ width: "100px", height: "34px" }}>
                      批量删除
                    </Button>
                    <Input
                      placeholder="请输入体检项目代码/体检项目名称"
                      style={{
                        width: "470px",
                        height: "34px",
                        float: "right",
                        display: "block"
                      }}
                    />
                  </h4>
                  <Table
                    dataSource={data}
                    columns={columns}
                    rowSelection={rowSelection}
                    pagination={false}
                    style={{height:"500px",overflow:"auto"}}
                  />
                </TabPane>
                <TabPane tab="体检套餐" key="2">
                <h4>
                    <Button
                      style={{
                        width: "100px",
                        height: "34px",
                        background: "#E87722",
                        marginRight: "10px"
                      }}
                      onClick={this.addpage}
                    >
                      新增套餐
                    </Button>
                    <Button
                      style={{
                        width: "100px",
                        height: "34px",
                        marginRight: "10px"
                      }}
                    >
                      批量导入
                    </Button>
                    <Button style={{ width: "100px", height: "34px" }}>
                      批量删除
                    </Button>
                    <Input
                      placeholder="请输入体检套餐/体检套餐名称"
                      style={{
                        width: "470px",
                        height: "34px",
                        float: "right",
                        display: "block"
                      }}
                    />
                  </h4>
                  <Table
                    dataSource={data1}
                    columns={columns1}
                    rowSelection={rowSelection}
                    pagination={false}
                    style={{height:"500px",overflow:"auto"}}
                  />
                </TabPane>
              </Tabs>
            </li>
          </ul>
        </div>
        {/* 新增项目或套餐 */}
        <Modal
        visible={this.state.adproV}
        onOk={this.okAddpro}
        onCancel={this.cancelAddpro}
        destroyOnClose
        title="新增体检项目">
      
          <ul className={css["projectadd"]}>
            <h3>{this.state.name}</h3>
            <li><span>机构项目名称</span><Input></Input><span>机构项目代码</span><Input></Input></li>
            <li><span>机构项目名称</span><Input></Input><span>机构项目代码</span><Input></Input></li>
          </ul>
        </Modal>
        <Modal
        visible={this.state.moproV}
        onOk={this.okMopro}
        onCancel={this.cancelMopro}
        title="修改体检项目">
      
          <ul className={css["projectadd"]}>
            <h3>{this.state.name}</h3>
            <li><span>机构项目名称</span><Input></Input><span>机构项目代码</span><Input></Input></li>
            <li><span>机构项目名称</span><Input></Input><span>机构项目代码</span><Input></Input></li>
          </ul>
        </Modal>
        {/* 修改项目或套餐 */}
        <Modal
        visible={this.state.adpageV}
        onOk={this.okAdpage}
        onCancel={this.cancelAdpage}
        title="新增体检套餐">
      
          <ul className={css["projectadd"]}>
            <h3>{this.state.name}</h3>
            <li><span>机构项目名称</span><Input></Input><span>机构项目代码</span><Input></Input></li>
            <li><span>机构项目名称</span><Input></Input><span>机构项目代码</span><Input></Input></li>
          </ul>
        </Modal>
        <Modal
        visible={this.state.mopageV}
        onOk={this.okMopage}
        onCancel={this.cancelMopage}
        title="修改体检套餐">
      
          <ul className={css["projectadd"]}>
            <h3>{this.state.name}</h3>
            <li><span>机构项目名称</span><Input></Input><span>机构项目代码</span><Input></Input></li>
            <li><span>机构项目名称</span><Input></Input><span>机构项目代码</span><Input></Input></li>
          </ul>
        </Modal>
      </div>
    );
  }
}
export default Ad;
