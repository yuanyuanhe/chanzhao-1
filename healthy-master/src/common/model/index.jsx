import React,{Component} from "react"
import style from "./index.mcss"
import {DatePicker} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
function onChange(date, dateString) {
    console.log(date, dateString);
  }
//体检预约
class Information extends Component {
  /**
	 * 构造函数
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
    this.state = ({
        data:this.props.data || {},
    })
    console.log(this.state.data)
  }
    render (){
        return <div className="box2">
        <div className= {style['Wraper']}>
        <div className={style["Model-head"]}> 预约体检信息</div>  
        <div className={style['Content']}>
        <div className={style['Title']}>
        <span className='ellipse'></span>预约信息
        </div>
        <ul className="clearfix">
          <li className={style['col-md-2']}><span>体检类型</span>
          <select><option value="请选择" selected>请选择</option></select>
          </li>
          <li className={style['col-md-2']}><span>体检预约号</span><input type="text" /></li>
          <li className={style['col-md-2']}><span>保单号</span><input type="text" /></li>
          <li className={style['col-md-2']}><span>任务来源</span><select><option value="请选择" selected>请选择</option></select></li>
          <li><span>任务生成时间</span><DatePicker style={{width:'180px'}}  defaultValue={moment('2018-09-04', 'YYYY-MM-DD')} onChange={onChange} /></li>
        </ul>
        <div className={style['Title']}>
        <span className='ellipse'></span>体检人信息
        </div>
        <ul className="clearfix">
          <li className={style['col-md-2']}><span>体检人姓名</span>
          <select><option value="请选择" selected>请选择</option></select>
          </li>
          <li className={style['col-md-2']}><span>分公司</span><input type="text" /></li>
          <li className={style['col-md-2']}><span>证件类型</span><input type="text" /></li>
          <li className={style['col-md-2']}><span>证件号码</span><input type="text" /></li>
          <li className={style['col-md-2']}><span>投保人姓名</span><input type="text" /></li>
          <li className={style['col-md-2']}><span>营销员姓名</span><input type="text" /></li>
          <li className={style['col-md-2']}><span>营销员电话</span><input type="text" /></li>
        </ul>
        </div>
        </div>
        </div>
    }
}
export default Information;