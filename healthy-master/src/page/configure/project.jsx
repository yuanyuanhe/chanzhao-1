import React,{Component} from 'react'
import { Route, Switch, NavLink,Link } from "react-router-dom";
import { projectManagerSelect ,healthTypeManagerList,projectManagerSave} from "../../config/api";
import * as api from '../../config/api.js'
import { Button,Pagination,message} from 'antd'
import Layer from '../Layer/Layer.js';
import $ from "jquery";
import "./project.css"
class Tab0 extends Component{
    constructor(){
        super();
        this.state={
            pageItems:[],
            title:"新增",
            showLayer:false,
            action:"adde",
            healthTypeManagerList:[],
            healthTypeCode:"",
            projectName:"",
            shower:false,
            showers:false,
            addshowers:false,
            healthTypeName:"",
            editshowers:false,
            id:"",
        }
    }
    deleteCourseIdhideModel(){
        this.setState({
            showLayer:false,
        })
    }
    deleteCourseIdhideModel(){
        this.setState({
            showLayer:false,
        })
    }
    Modelshower(){
        this.setState({
            shower:false,
        })
    }
    Modelshowers(){
        this.setState({
            showers:false,
        })
    }
    deleteModel(){
        this.setState({
            shower:false,
        })
    }
    addModelshowers(){
        this.setState({
            addshowers:false
        })
    }
    addModels(){
        this.setState({
            addshowers:false
        })
    }
    editModelshowers(){
        this.setState({
            editshowers:false
        })
    }
    editdeleteModels(){
        this.setState({
            editshowers:false
        })
    }
    componentDidMount(){
        healthTypeManagerList({
    
    }).then(res => {
        if(res.data.result==="RC100"){
            this.setState({
                healthTypeManagerList:res.data.healthTypeManagerList
            })
        }
    });
    }
add(){
this.setState({
    action:"adde",
    title:"新增",
    showLayer:true,
    healthTypeCode:"",
    projectName:""
})
    }
    edits(item,id){
        this.setState({
    action:"edit",
    title:"修改",
    showLayer:true,
    healthTypeCode:item.healthTypeCode,
    projectName:item.projectName,
   id
})
    }  
    adde(){
        if(this.state.healthTypeCode===""){
            message.error("请输入项目大类")
            return;
        }
        if(this.state.projectName===""){
            message.error("请输入项目名称")
            return;
        }
       
        let     params={
            healthTypeCode:this.state.healthTypeCode,
            projectName:this.state.projectName
        }
        api.projectManagerSave(params).then((data)=>{
      if(data.result==='RC100'){
       this.props.show()
       this.setState({
        showLayer:false,  
       })
      }
      
    })
    }
    edit(){
        if(this.state.healthTypeCode===""){
            message.error("请输入项目大类")
            return;
        }
        if(this.state.projectName===""){
            message.error("请输入项目名称")
            return;
        }
        let params={
            id:this.state.id,
            healthTypeCode:this.state.healthTypeCode,
            projectName:this.state.projectName
        }
        api.loadCheckBoxRole(params).then((data)=>{
      if(data.result==='RC100'){
       this.props.show()
       this.setState({
        showLayer:false,  
       })
      }
    })
    }
    deleteManCourse(){
        if(this.state.action==="adde"){
            this.adde()
        }else{
            this.edit()
        }
        
    }
    remove(id){
        this.setState({
            shower:true,
            id
        })
    }
    chuorse(){
        let params={
            id:this.state.id,
        }
        api.projectManagerDelete(params).then((data)=>{
      if(data.result==='RC100'){
       this.props.show()
       this.setState({
        shower:false,  
       })
      }
    })  
    }
    biglei(){
this.setState({
    showers:true
})
    }
    deleteModels(){
        this.setState({
          addshowers:true,
          showers:false

        })
    }
    addchuorses(){
        if(this.state.healthTypeName===""){
            message.error("请输入体检大类名称")
            return;
        }
        let params={
            healthTypeName:this.state.healthTypeName,
        }
        api.healthTypeManagerSave(params).then((data)=>{
      if(data.result==='RC100'){
       this.props.show()
       this.setState({
        addshowers:false,  
       })
      }
    })   
    }
    chuorses(){
        this.setState({
            editshowers:true,
            showers:false
        })
    }
    editchuorses(){
        if(this.state.id===""){
            message.error("请输入已有体检大类")
            return;
        }
        if(this.state.healthTypeName===""){
            message.error("请输入修改体检大类")
            return;
        }
        let params={
            id:this.state.id,
            healthTypeName:this.state.healthTypeName,
        }
        api.healthTypeManagerSave(params).then((data)=>{
      if(data.result==='RC100'){
       this.props.show()
       this.setState({
        editshowers:false,  
       })
      }
    })   
    }
    render(){
        let pageItems=this.props.pageItems
        return(
            <div>
         <div className="clear"></div>
            
            <div className="main1"  id="myTab2_2Content0">
 
            <div style={{marginBottom:"10px"}}>
            <a className="button" style={{background: "#E87722",color:"#fff",marginRight:"40px"}} onClick={()=>this.add()}>新增项目</a>
            <a className="button" style={{background: "#12AFBE",marginRight: "30px",color:"#fff"}}>批量导入</a>
            <a className="button" style={{background: "#12AFBE",marginRight: "30px",color:"#fff"}} onClick={()=>this.biglei()}>管理体检大类</a>
            </div>
                <div className="box1 table-overflow m-b-2">
                    <table width="100%" border="0" className="table1">
                        <tbody>
                        <tr>
                            <th>序号</th>
                            <th>体检大类代码</th>
                            <th>体检大类名称</th>
                            <th>体检项目代码</th>
                            <th>体检项目名称</th>
                            <th>操作</th>
    
                        </tr>
                        {
                            pageItems.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                            <td>{item.healthTypeCode}</td>
                            <td>{item.healthTypeName}</td>
                            <td>{item.projectCode}</td>
                            <td>{item.projectName}</td>
                            <td><a data-reveal-id="edIt" onClick={()=>this.edits(item,item.id)} style={{marginRight:"5px",color:"#E87722"}}>修改</a><a  data-reveal-id="addalldata" onClick={()=>this.remove(item.id)} style={{color:"#E87722"}}>删除</a></td>
                                    </tr>
                                )
                            })
                        }
                        {/* <tr>
                            
                        </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
            <Layer 
						title = {this.state.title}
						show={this.state.showLayer} 
						hide={this.deleteCourseIdhideModel.bind(this)}
						width="500px"
						height="300px"
					>
					    <div className="row">
					
                        <div style={{margin:"30px",width:"100%",height:"30px"}}>        																				
                        <label className="fl" >项目大类： </label>
                        <select  value={this.state.healthTypeCode} onChange={(e)=>this.setState({healthTypeCode:e.target.value})}>
                        <option value="">请选择</option>
                            {
                                this.state.healthTypeManagerList.map((item,index)=>{
                                    
                                    return(
                                        <option key={index} value={item.healthTypeCode}>{item.healthTypeName}</option>
                                    )
                                })
                            }
                                
                        </select>
                        </div>
                        <div style={{margin:"30px"}}>
                        <label className="fl" >项目名称：</label>
                        <input type="text" className="tl fl width20"data-input-clear="5" style={{width:"76%"}} value={this.state.projectName} onChange={(e)=>this.setState({projectName:e.target.value})}/>	</div>								
							</div>
									<div className="pop-btn" style={{padding:'7px 0',position: 'absolute',bottom: "24px",textAlign: "center",width:"100%"}}>
										<Button onClick={()=>this.deleteCourseIdhideModel()} className="btn btn-blue" style={{marginRight:"20px"}}>取消</Button>
										<Button  className="btn btn-blue" onClick={()=>{this.deleteManCourse()}}>确认</Button>
									</div>
			        </Layer>

                    <Layer 
						title ="删除"
						show={this.state.shower} 
						hide={this.Modelshower.bind(this)}
						width="400px"
						height="200px"
					>
					    <div className="row">
                        <div style={{margin:"30px",width:"100%",height:"30px"}}>     
                        <p>你确定要删除吗？确定后将不能恢复！</p>	   																				
                        </div>							
							</div>
									<div className="pop-btn" style={{padding:'7px 0',position: 'absolute',bottom: "24px",textAlign: "center",width:"100%"}}>
										<Button onClick={()=>this.deleteModel()} className="btn btn-blue" style={{marginRight:"20px"}}>取消</Button>
										<Button  className="btn btn-blue" onClick={()=>{this.chuorse()}}>确认</Button>
									</div>
			        </Layer> 

                    <Layer 
						title ="管理体检大类"
						show={this.state.showers} 
						hide={this.Modelshowers.bind(this)}
						width="400px"
						height="200px"
					>
									<div className="pop-btn" style={{padding:'7px 0',position: 'absolute',bottom: "24px",textAlign: "center",width:"100%"}}>
										<Button onClick={()=>this.deleteModels()} className="btn btn-blue" style={{marginRight:"20px"}}>新增大类</Button>
										<Button  className="btn btn-blue" onClick={()=>{this.chuorses()}}>修改大类</Button>
									</div>
			        </Layer> 

                    <Layer 
						title ="管理体检大类新增"
						show={this.state.addshowers} 
						hide={this.addModelshowers.bind(this)}
						width="400px"
						height="200px"
					>
                    <div style={{margin:"30px",width:"100%",height:"30px"}}>
                    <label className="fl" >体检大类名称：</label>
                        <input type="text" className="tl fl width20"data-input-clear="5" style={{width:"51%"}} value={this.state.healthTypeName} onChange={(e)=>this.setState({healthTypeName:e.target.value})}/>
                    </div>
									<div className="pop-btn" style={{padding:'7px 0',position: 'absolute',bottom: "24px",textAlign: "center",width:"100%"}}>
										<Button onClick={()=>this.addModels()} className="btn btn-blue" style={{marginRight:"20px"}}>取消</Button>
										<Button  className="btn btn-blue" onClick={()=>{this.addchuorses()}}>确认</Button>
									</div>
			        </Layer> 

                    <Layer 
						title ="管理体检大类修改"
						show={this.state.editshowers} 
						hide={this.editModelshowers.bind(this)}
						width="600px"
						height="260px"
					>
                    <div style={{margin:"30px",width:"100%",height:"30px"}}>        																				
                        <label className="fl" >已有体检项目大类： </label>
                        <select  value={this.state.id} onChange={(e)=>this.setState({id:e.target.value})}>
                        <option value="">请选择</option>
                            {
                                this.state.healthTypeManagerList.map((item,index)=>{
                                    
                                    return(
                                        <option key={index} value={item.id}>{item.healthTypeName}</option>
                                    )
                                })
                            }
                                
                        </select>
                        </div>
                    <div style={{margin:"30px",width:"100%",height:"30px"}}>
                    <label className="fl" >修改体检大类：</label>
                        <input type="text" className="tl fl width20"data-input-clear="5" style={{width:"51%"}} value={this.state.healthTypeName} onChange={(e)=>this.setState({healthTypeName:e.target.value})}/>
                    </div>
									<div className="pop-btn" style={{padding:'7px 0',position: 'absolute',bottom: "24px",textAlign: "center",width:"100%"}}>
										<Button onClick={()=>this.editdeleteModels()} className="btn btn-blue" style={{marginRight:"20px"}}>取消</Button>
										<Button  className="btn btn-blue" onClick={()=>{this.editchuorses()}}>确认</Button>
									</div>
			        </Layer> 
                   
            </div>
        )
    }
}
class Tab1 extends Component{
    constructor(){
        super();
        this.state={
            pageItem:[],
            addshowers:false,
            projectManagements:[],
            projectName:"",
            action:"add",
            shower:false,
            guanlianshowe:false
        }
    }
    addModelshowers(){
        this.setState({
            addshowers:false,
        })
    }
    Modelshower(){
        this.setState({
            shower:false,
        })
    }
    deleteModel(){
        this.setState({
            shower:false,
        })
    }
    adddeleteModels(){
        this.setState({
            addshowers:false,
        })
    }
    guanlians(){
        this.setState({
            guanlianshowe:false
        })
    }
    guanlianModels(){
        this.setState({
            guanlianshowe:false
        })
    }

    addtaocan(){
      this.setState({
          action:"add",
        addshowers:true,
        projectName:"",
        id:"",
        packageProjects:[]
      })
    }
    add(){
        // let packageProjects = []
        // $('input[name="checkbox"]:checked').each(function(index, el) {
        //     if($(el).val()!=null){
        //       let  healthProjectCode ={healthProjectCode:$(el).val()}
        //       packageProjects.push(healthProjectCode)
        //     }
            
        // });
        if(this.state.projectName===""){
            message.error("请输入套餐名称")
            return;
        }
        let params={
            projectName:this.state.projectName,
        }
        api.packageProjectManagerSave(params).then((data)=>{
            if(data.result==='RC100'){
                this.props.shows()
             this.setState({
                addshowers:false,
             })

            }
          }) 
    }
    edits(item,id){

      this.setState({
          id,
          action:"edit",
        addshowers:true,
        projectName:item.projectName
      })
    }
    edit(){
        if(this.state.projectName===""){
            message.error("请输入套餐名称")
            return;
        }
        let params={
            id:this.state.id,
            projectName:this.state.projectName
        }
        api.loadCheckBoxRole(params).then((data)=>{
      if(data.result==='RC100'){
       this.props.shows()
       this.setState({
        addshowers:false,  
       })
      }
    })
    }
    addchuorses(){
        if(this.state.action==="add"){
            this.add()
        }else{
            this.edit()
        }

    }

    remove(id){
        this.setState({
              id,
              shower:true   
        })
    }
    chuorse(){
        let params={
            id:this.state.id,
        }
        api.projectManagerDelete(params).then((data)=>{
      if(data.result==='RC100'){
       this.props.shows()
       this.setState({
        shower:false,  
       })
      }
    })  
    }
    guanlian(projectCode,id){
        this.setState({
            projectCode,
            guanlianshowe:true,
            id
        })
        this.guliantijian(id)
    }
    guanlianchuorses(){
        let packageProjects=[]
        $('input[name="checkbox"]:checked').each(function(index, el) {
            if($(el).val()!=null){
              let  healthProjectCode ={healthProjectCode:$(el).val()}
              packageProjects.push(healthProjectCode)
            }
        });
        
        let params={
            packageProjects,
            projectCode:this.state.projectCode
        }
        api.packageProjectsUpdate(params).then((data)=>{
            if(data.result==='RC100'){
                this.props.shows()
             this.setState({
                guanlianshowe:false,
             })

            }
          }) 
    }

    project(id){
        let params={
            id:id
        }
        api.getProjectManagerByPackId(params).then((data)=>{

           
            if(data.result==='RC100'){
                let guanliancode=""
                let packageProjects = data.projectManagement.packageProjects;
                for (let i in packageProjects) {
                    let  code= packageProjects[i].healthProjectCode
                     guanliancode+=  `${code},`
                  }
                 
                $("input[name=checkbox]").each(function(index, el){
                    if($(el).val()===""){
                        return;
                    }
                    if (guanliancode.indexOf($(el).val()) != -1) {
                        $(el).prop("checked", true);
                      }
                   
                    
                  });
            
            }
          })
    }
    guliantijian(id){
          api.getProjectList().then((data)=>{
            if(data.result==='RC100'){
             this.setState({
                projectManagements:data.projectManagements
             },()=>{
                 this.project(id)
             })
            }
          })

    }
    render(){
        let pageItem= this.props.pageItem
        return(
            <div>
            <div className="clear"></div>
               
               <div className="main1"  id="myTab2_2Content0">
    
               <div style={{marginBottom:"10px"}}>
               <a className="button" style={{background: "#E87722",color:"#fff",marginRight:"40px"}} onClick={()=>this.addtaocan()}>新增项目</a>
               <a className="button" style={{background: "#12AFBE",marginRight: "30px",color:"#fff"}}>批量导入</a>
               </div>
                   <div className="box1 table-overflow m-b-2">
                       <table width="100%" border="0" className="table1">
                           <tbody>
                           <tr>
                               <th>序号</th>
                               <th>体检套餐代码</th>
                               <th>体检套餐名称</th>
                               <th>操作</th>
       
                           </tr>
                           {
                               pageItem.map((item,index)=>{
                                   return(
                            <tr key={index}>
                                       <td>{index+1}</td>
                               <td>{item.projectCode}</td>
                               <td>{item.projectName}</td>
                               <td><a data-reveal-id="edIt" onClick={()=>this.edits(item,item.id)} style={{marginRight:"5px",color:"#E87722"}}>修改</a><a  data-reveal-id="addalldata" onClick={()=>this.guanlian(item.projectCode,item.id)} style={{color:"#E87722",marginRight:"5px"}}>关联项目</a><a  data-reveal-id="addalldata" onClick={()=>this.remove(item.id)} style={{color:"#E87722"}}>删除</a></td>
                                       </tr>
                                   )
                               })
                           }
                           </tbody>
                       </table>
                   </div>
                   <Layer 
						title ={this.state.action==="add"?"新增体检套餐":"修改体检套餐"}
						show={this.state.addshowers} 
						hide={this.addModelshowers.bind(this)}
						width="400px"
						height="300px"
					>
                    <div style={{margin:"30px",width:"100%",height:"30px"}}>
                    <label className="fl" >套餐名称：</label>
                        <input type="text" className="tl fl width20"data-input-clear="5" style={{width:"51%"}} value={this.state.projectName} onChange={(e)=>this.setState({projectName:e.target.value})}/>
                    </div>
                 
									<div className="pop-btn" style={{padding:'7px 0',position: 'absolute',bottom: "24px",textAlign: "center",width:"100%"}}>
										<Button onClick={()=>this.adddeleteModels()} className="btn btn-blue" style={{marginRight:"20px"}}>取消</Button>
										<Button  className="btn btn-blue" onClick={()=>{this.addchuorses()}}>确认</Button>
									</div>
			        </Layer> 
                    <Layer 
						title ="删除"
						show={this.state.shower} 
						hide={this.Modelshower.bind(this)}
						width="400px"
						height="200px"
					>
					    <div className="row">
                        <div style={{margin:"30px",width:"100%",height:"30px"}}>     
                        <p>你确定要删除吗？确定后将不能恢复！</p>	   																				
                        </div>							
							</div>
									<div className="pop-btn" style={{padding:'7px 0',position: 'absolute',bottom: "24px",textAlign: "center",width:"100%"}}>
										<Button onClick={()=>this.deleteModel()} className="btn btn-blue" style={{marginRight:"20px"}}>取消</Button>
										<Button  className="btn btn-blue" onClick={()=>{this.chuorse()}}>确认</Button>
									</div>
			        </Layer> 

                    <Layer 
						title ="关联项目"
						show={this.state.guanlianshowe} 
						hide={this.guanlians.bind(this)}
						width="750px"
						height="400px"
					>
                    
                    <div className="main">
                    <div className="main1"  id="">
                        <div className="box1 table-overflow m-b-2" style={{height:"300px",overflow:"hidden",overflowY:"scroll"}}>
                            <table width="100%" border="0" className="table1">
                                <tbody>
                                <tr>
                                    <th><input type="checkbox"/>全选</th>
                                    <th>套餐名称</th>
                                </tr>
                                {
                                    this.state.projectManagements.map((item,index)=>{
                                        return(
                                <tr key={index}>
                                    <td><input defaultValue={item.healthTypeCode} name="checkbox" type="checkbox" /></td>
                                    <td>{item.projectName}</td>
                                </tr>
                                        )
                                    })
                                } 
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                 
									<div className="pop-btn" style={{padding:'7px 0',position: 'absolute',bottom: "24px",textAlign: "center",width:"100%"}}>
										<Button onClick={()=>this.guanlianModels()} className="btn btn-blue" style={{marginRight:"20px"}}>取消</Button>
										<Button  className="btn btn-blue" onClick={()=>{this.guanlianchuorses()}}>确认</Button>
									</div>
			        </Layer>
               </div>
               </div>
        )
    }
}
class Project extends Component{
    constructor(){
        super();
        this.state={
            tab:0,
            pageItems:[],
            projectName:"",
            projectCode:"",
            pagenum:1,
            pagenums:1,
            totalPage:0,	        //总页数
            pageSize:0,            //一页数据的大小
            totalCount:0,	        //总记录数
            pageItem:[]
        }
    }
    clickeMe(tab){
        this.setState({
            tab:tab
        },()=>{
            this.rest()
        })
    }
    componentDidMount() {
        this.show()
        this.shows()
    }
    rest(){
        this.setState({
            projectName:"",
            projectCode:""
        })
    }
    showse(){
        if(this.state.tab===0){
            this.show()
        }else{
            this.shows()
        }
    }
    show(){
        let params={
            projectName:this.state.projectName,
            projectCode:this.state.projectCode,
            projectType:1,
            pageno:this.state.pagenum
        }
        api.projectManagerSelect(params).then((data)=>{
            if(data.result==='RC100'){
                let pageItems=[]
                       for(let i=0;i<data.pagerList.pageItems.length;i++){
                           if(data.pagerList.pageItems[i].projectType==="1"){
                            pageItems.push(data.pagerList.pageItems[i])
                            this.setState({
                                pageItems,
                                totalCount:data.pagerList.totalCount,
                            })
                           }
                       }
            }else{
                message.error(data.errMsg)
            }
          })
    }

    shows(){
        let params={
            projectName:this.state.projectName,
            projectCode:this.state.projectCode,
            projectType:0,
            pageno:this.state.pagenums
        }
    api.projectManagerSelect(params).then((data)=>{
        if(data.result==='RC100'){
            let pageItem=[]
                   for(let i=0;i<data.pagerList.pageItems.length;i++){
                       if(data.pagerList.pageItems[i].projectType==="0"){
                        pageItem.push(data.pagerList.pageItems[i])
                        this.setState({
                            pageItem,
                            totalCounts:data.pagerList.totalCount,
                        })
                       }
                   }
        }else{
            message.error(data.errMsg) 
        }
      })
    }
    

    render(){
        return(
            <div className="content-right">
            <div className="tab">
                当前位置：预约报表- <span> >体检机构管理</span>
            </div>
          
            <div className="main1">
            <div className="clearfix"></div>
                    <div style={{lineHeight:"70px"}}>
                        <label className="fl" >{this.state.tab===0?"体检项目代码:":"套餐项目代码:"}</label>
                        <input type="text" className="tl fl width20"data-input-clear="5" style={{marginTop:"18px"}} value={this.state.projectCode} onChange={(e)=>this.setState({projectCode:e.target.value})}/>
                        <label className="fl" >{this.state.tab===0?"体检项目名称:":"体检套餐名称:"}</label>
                        <input type="text" className="tl fl width20" data-input-clear="5" style={{marginTop:"18px"}}  value={this.state.projectName} onChange={(e)=>this.setState({projectName:e.target.value})}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 
                           <a className="button" style={{background: "#E87722",color:"#fff",marginTop:"18px"}} onClick={()=>this.showse()}>查 询</a>
                          
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="button" style={{background: "#12AFBE",marginRight: "30px",color:"#fff",marginTop:"18px"}} onClick={()=>this.rest()}>重 置</a>
    
                    </div>
            <ul className="filter-ul nav clearFix">
            <li className={this.state.tab === 0 ? 'active' : ''} onClick={() =>this.clickeMe(0)}><a>体检项目</a></li>
            <li className={this.state.tab === 1 ? 'active' : ''} onClick={() => this.clickeMe(1)}><a>体检套餐</a></li>
        </ul>
        {(() => {
      switch (this.state.tab) {
      case 0: return <Tab0 ref='tab' pageItems={this.state.pageItems} show={this.show.bind(this)}/>;
      case 1: return <Tab1 ref='tab' pageItem={this.state.pageItem} shows={this.shows.bind(this)}/>;
      default: break;               
      }
  })()} 


            
                
            
        </div>
         {
            this.state.tab===0? 
            <Pagination style={{float:"right"}} current={this.state.pagenum} showTotal={function showTotal(total) {return '共'+total+'条';}} total={this.state.totalCount} onChange={(page,pageSize)=>{this.setState({pagenum:page},()=>{this.show()})}} pageSize={10} showSizeChanger={false} showQuickJumper />:
            <Pagination style={{float:"right"}} current={this.state.pagenums} showTotal={function showTotals(total) {return '共'+total+'条';}} total={this.state.totalCounts} onChange={(page,pageSize)=>{this.setState({pagenums:page},()=>{this.shows()})}} pageSize={10} showSizeChanger={false} showQuickJumper />  
           
        } 
        
        </div>
        )
    }
}
export default Project;