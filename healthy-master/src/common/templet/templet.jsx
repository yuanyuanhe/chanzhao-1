import React,{Component} from 'react'
import style from './templet.mcss'
class Templet extends Component{
    render(){
        return (
            <div className="App">
            {/* nav 导航栏*/}
            <div className="index-head">
               <div className="logo">
               <img src="./images/logo.png" alt=""/>
                <span>任务工作台</span>
                  </div>
                 <div className="right-user">
                  <div className="head-user"><span className="user-photo"><img src="images/mine_fill.png" /></span><span className="user-name">你好！管理员李健锋<i><img src="./images/message.png" alt=""/></i><a href="#"><img src="./images/退出.png" alt=""/></a></span></div>
                </div>
                </div>
    
              <div className="content">
                <div className="list">
                   <ul className="yiji">
                       <li><a href="#" className="inactive inactives">体检管理</a>
                         <ul style={{display: "block"}}>
                          <li><a href="#" className="inactive active inactives"><span>*</span>&nbsp;体检管理</a>
                            </li>
                             <li><a href="#" className="inactive">预约体检</a>
                          </li>
                   </ul>
                 </li>
               <li><a href="#" className="inactive">影像上传管理</a>
                   <ul style={{display: "none"}}>
                       <li><a href="#" className="inactive active">查询中心1</a>
                       </li>
                   </ul>
               </li>
               <li><a href="#" className="inactive">体检配置管理</a>
                   <ul style={{display: "none"}}>
                       <li><a href="#" className="inactive active">报表中心1</a>
                       </li>
                   </ul>
               </li>
               <li><a href="#" className="inactive">权限管理</a>
                   <ul style={{display: "none"}}>
                       <li><a href="#" className="inactive active">系统后台设置</a>
                       </li>
                   </ul>
               </li>
               <li><a href="#" className="inactive">发送管理</a>
                   <ul style={{display: "none"}}>
                       <li><a href="#" className="inactive active">体检机构维护</a>
   
                       </li>
                   </ul>
               </li>
               <li><a href="#" className="inactive">节假日及特别时间</a>
                   <ul style={{display: "none"}}>
                       <li><a href="#" className="inactive active">体检机构维护</a>
                       </li>
                   </ul>
               </li>
               <li><a href="#" className="inactive">推送及影像历史</a>
                   <ul style={{display: "none"}}>
                       <li><a href="#" className="inactive active">体检机构维护</a>
                       </li>
                   </ul>
               </li>
           </ul>
       </div>
       <div className="content-right">
           <div className="tab">
               体检管理  /  <span> 体检管理</span>
           </div>
   
           <div className="main1">
               <div className="box2">
                   <div className="clearfix"></div>
                   <ul className="clearfix chaxunlist">
                       <li className="col-mod-3">
                           <label className="fl" for="">体检预约号</label>
                           <input type="text" className="tl fl width20" placeholder="项目代码" data-input-clear="5"/>
                       </li>
                       <li className="col-mod-3">
                           <label className="fl" for="">体检城市</label>
                           <select className="fl-none fl width20" name="choose" id="choose">
                           <option value="请选择" selected="selected">请选择</option>
                           <option value="请选择1">请选择1</option>
                           <option value="请选择2">请选择2</option>
                           </select>
                       </li>
                       <li className="col-mod-3">
                           <label className="fl" for="">体检机构</label>
                           <select className="fl-none fl width20" name="choose" id="choose">
                           <option value="请选择" selected="selected">请选择</option>
                           <option value="请选择1">请选择1</option>
                           <option value="请选择2">请选择2</option>
                           </select>
                       </li>
                       <li className="col-mod-3">
                           <label className="fl" for="">体检日期</label>
                           <select className="fl-none fl width20" name="choose" id="choose">
                           <option value="请选择" selected="selected">请选择</option>
                           <option value="请选择1">请选择1</option>
                           <option value="请选择2">请选择2</option>
                           </select>
                       </li>
                       <li className="col-mod-3" style={{position: "relative"}}>
                           <label className="fl" for="">投保人姓名</label>
                           <input type="text" className="tl fl width20" placeholder="项目代码" data-input-clear="5"/>
                           <ul className="hover_ul">
                               <i className="down"></i>
                               <li>新单核保体检</li>
                               <li>新单核保体检</li>
                               <li>新单核保体检</li>
                               <li>新单核保体检</li>
                               <li>新单核保体检</li>
                           </ul>
                       </li>
                       <li className="col-mod-3">
                           <label className="fl" for="">客户姓名</label>
                           <input type="text" className="tl fl width20" placeholder="项目代码" data-input-clear="5"/>
                       </li>
                       <li className="col-mod-3">
                           <label className="fl" for="">预约类型</label>
                           <select className="fl-none fl width20" name="choose" id="choose">
                           <option value="请选择" selected="selected">请选择</option>
                           <option value="请选择1">请选择1</option>
                           <option value="请选择2">请选择2</option>
                           </select>
                       </li>
                       <div className="title-add"><a href="javaScript:;" className="add-data fr" data-reveal-id="edIt">查询</a></div>
                   </ul>
               </div>
           </div>
               <div className="clear"></div>
               <div className="main1 content"  id="myTab2_2Content0">
               {/* <div className="title-add"><a href="javaScript:;" className="add-data" data-reveal-id="edIt">+新增</a></div> */}
               <ul className="clearfix header-table">
                   <li>未预约</li>
                   <li>已预约</li>
                   <li>已确认</li>
                   <li>已体检</li>
                   <li>报告回齐</li>
                   <li>录入完成</li>
                   <li>已撤回</li>
               </ul>
               <div className="box1 table-overflow m-b-2">
                   <table width="100%" border="0" className="table1">
                       <tbody>
                       <tr>
                           <th>序号</th>
                           <th>用户组代码</th>
                           <th>机构名称</th>
                           <th>用户组名称</th>
                           <th>操作</th>
                           <th>操作</th>
                           <th>操作</th>
                           <th>操作</th>
                           <th>操作</th>
                       </tr>
                       <tr>
                           <td>1</td>
                           <td>上海</td>
                           <td>上海爱康国宾</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td><a href="#" data-reveal-id="edIt">修改</a><a href="#" data-reveal-id="addalldata">删除</a><a href="#" data-reveal-id="contectM">关联项目</a></td>
                           
                       </tr>
                       <tr>
                           <td>1</td>
                           <td>上海</td>
                           <td>上海爱康国宾</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td><a href="#" data-reveal-id="edIt">修改</a><a href="#" data-reveal-id="addalldata">删除</a><a href="#" data-reveal-id="contectM">关联项目</a></td>
                           
                       </tr>
                       <tr>
                           <td>1</td>
                           <td>上海</td>
                           <td>上海爱康国宾</td>
                           <td>T0001</td>
   
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td><a href="#" data-reveal-id="edIt">修改</a><a href="#" data-reveal-id="addalldata">删除</a><a href="#" data-reveal-id="contectM">关联项目</a></td>
                           
                       </tr>
                       <tr>
                           <td>1</td>
                           <td>上海</td>
                           <td>上海爱康国宾</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td><a href="#" data-reveal-id="edIt">修改</a><a href="#" data-reveal-id="addalldata">删除</a><a href="#" data-reveal-id="contectM">关联项目</a></td>
                           
                       </tr>
                       <tr>
                           <td>1</td>
                           <td>上海</td>
                           <td>上海爱康国宾</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td>T0001</td>
                           <td><a href="#" data-reveal-id="edIt">修改</a><a href="#" data-reveal-id="addalldata">删除</a><a href="#" data-reveal-id="contectM">关联项目</a></td>
                           
                       </tr>
                       
                       </tbody>
                   </table>
               </div>
               <ul className="mui-pagination mui-pagination-lg tr">
                   <span className="totle">共45条</span>
                   <li className="mui-previous">
                       <a href="#">
                           &gt;
                       </a>
                   </li>
                   <li>
                       <a href="#" className="active">
                           1
                       </a>
                   </li>
                   <li>
                       <a href="#">
                           2
                       </a>
                   </li>
                   <li>
                       <a href="#">
                           3
                       </a>
                   </li>
                   <li>
                       <a href="#">
                           4
                       </a>
                   </li>
                   <li className="mui-active">
                       <a href="#">
                           5
                       </a>
                   </li>
                   <li className="mui-next">
                       <a href="#">
                           >
                       </a>
                   </li>
                   <li className="mui-next">
                       <a href="#">
                           25条/页<i></i>
                       </a>
                   </li>
                   <span>
                       跳至 
                   </span>
                   <li className="mui-next">
                       <a href="#">
                           5
                       </a>
                   </li>
                   <span>
                       页
                   </span>
               </ul>
           </div>
       </div>  
       </div>
   
       <div id="edIt" className="reveal-modal all-eit">
       <h1>编辑体检套餐</h1>
       <div className="main">
           <div className="clearfix"></div>
           <div className="edit-time">
               <label className="fl" for="">体检套餐代码:</label>
               <input type="text" className="tl fl width20" placeholder="可预约体检日期" data-input-clear="5"/>
               <label className="fl" for="">体检套餐名称:</label>
               <input type="text" className="tl fl width20" placeholder="可预约体检日期" data-input-clear="5"/>
               <label className="fl" for="">套餐价格:</label>
               <input type="text" className="tl fl width20" placeholder="可预约体检日期" data-input-clear="5"/>
           </div>
           <div className="clearfix"></div>
           <div className="edit-time">
               <label className="fl" for="">分公司</label>
               <select className="fl-none fl width20" name="choose" id="choose">
                   <option value="请选择" selected="selected">请选择</option>
                   <option value="请选择1">请选择1</option>
                   <option value="请选择2">请选择2</option>
               </select>
               <label className="fl" for="">城市</label>
               <select className="fl-none fl width20" name="choose" id="choose">
                   <option value="请选择" selected="selected">请选择</option>
                   <option value="请选择1">请选择1</option>
                   <option value="请选择2">请选择2</option>
               </select>
               <label className="fl" for="">体检机构</label>
               <select className="fl-none fl width20" name="choose" id="choose">
                   <option value="请选择" selected="selected">请选择</option>
                   <option value="请选择1">请选择1</option>
                   <option value="请选择2">请选择2</option>
               </select>
   
           </div>
           <div className="clearfix"></div>
           <div className="edit-time">
               <label className="fl" for="">备注:</label>
               <textarea   className="tl fl width70" id="textarea" rows="5" placeholder="多行文本框"></textarea>
           </div>
           <div className="clearfix"></div>
           <div className="btn-main m-t-2">
               <span><a href="#" className="button btn-color-red">确 认</a></span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span><a href="#" className="button">取 消</a></span>
           </div>
       </div>
       <a className="close-reveal-modal">&#215;</a>
   </div>
   
   <div id="contectM" className="reveal-modal">
       <h1>关联体检项目</h1>
       <div className="main">
           <div className="main1"  id="">
               <div className="box1 table-overflow m-b-2">
                   <table width="100%" border="0" className="table1">
                       <tbody>
                       <tr>
   
                           <th><input type="checkbox"/>全选</th>
                           <th>名称</th>
                           <th>费用</th>
                           <th><input type="checkbox"/>全选</th>
                           <th>名称</th>
                           <th>费用</th>
                           <th><input type="checkbox"/>全选</th>
                           <th>名称</th>
                           <th>费用</th>
                           <th><input type="checkbox"/>全选</th>
                           <th>名称</th>
                           <th>费用</th>
                       </tr>
                       <tr>
                           <td><input name="checkbox" type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                       </tr>
                       <tr>
                           <td><input name="checkbox" type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                       </tr>
                       <tr>
                           <td><input name="checkbox" type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                       </tr>
                       <tr>
                           <td><input name="checkbox" type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                           <td><input type="checkbox"/></td>
                           <td>抽血</td>
                           <td>50.00</td>
                       </tr>
                       </tbody>
                   </table>
               </div>
           </div>
           <div className="btn-main m-t-2">
               <span><a href="#" className="button btn-color-red">确 认</a></span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span><a href="#" className="button btn-color-red">取 消</a></span>
           </div>
       </div>
       <a className="close-reveal-modal">&#215;</a>
   </div>
   
   
         </div>
        )
    }
}
export default Templet