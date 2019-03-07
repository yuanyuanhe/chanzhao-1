import React,{Component} from "react"
import style from "./yiyuyueModel.mcss"
import {DatePicker} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Select } from 'antd';
import { Cascader } from 'antd';
import { TimePicker } from 'antd';

//已预约
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }, {
      value: 'xiasha',
      label: 'Xia Sha',
      disabled: true,
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua men',
    }],
  }],
}];
const Option = Select.Option;
function onChange(time, timeString) {
  console.log(time, timeString);
}

function onChange(value, selectedOptions) {
  console.log(value, selectedOptions);
}

function filter(inputValue, path) {
  return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
}
 function handleChange(value) {
  console.log(`selected ${value}`);
}
function onChange(date, dateString) {
    console.log(date, dateString);
  }

  
class ReservedPopup extends Component {
   /**
	 * 构造函数
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
    this.state = ({
        data:this.props.data==undefined?{}:this.props.data,
    })
    console.log(this.props.data)
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
          <li className={style['col-md-2']}><span>体检类型</span>{this.props.data==undefined?'':this.props.data.healthName}</li>
          <li className={style['col-md-2']}><span>体检预约号</span>{this.props.data==undefined?'':this.props.data.healthOderCode}</li>
          <li className={style['col-md-2']}><span>保单号</span>{this.props.data==undefined?'':this.props.data.policyNo}</li>
          <li className={style['col-md-2']}><span>任务来源</span>{this.props.data==undefined?'':this.props.data.taskSource}</li>
          <li className={style['col-md-2']}><span>任务生成时间</span>{this.props.data==undefined?'':this.props.data.taskGenerationTime}</li>
        </ul>
        <div className={style['Title']}>
        <span className='ellipse'></span>体检人信息
        </div>
        <ul className="clearfix">
          <li className={style['col-md-2']}><span>体检人姓名</span>{this.props.data==undefined?'':this.props.data.healthName}</li>
          <li className={style['col-md-2']}><span>分公司</span>{this.props.data==undefined?'':this.props.data.branchCompany}</li>
          <li className={style['col-md-2']}><span>证件类型</span>{this.props.data==undefined?'':this.props.data.cardType}</li>
          <li className={style['col-md-2']}><span>证件号码</span>{this.props.data==undefined?'':this.props.data.cardNum}</li>
          <li className={style['col-md-2']}><span>投保人姓名</span>{this.props.data==undefined?'':this.props.data.healthName}</li>
          <li className={style['col-md-2']}><span>营销员姓名</span>{this.props.data==undefined?'':this.props.data.contact}</li>
          <li className={style['col-md-2']}><span>营销员电话</span>{this.props.data==undefined?'':this.props.data.contactphone}</li>
        </ul>
        <div className={style['Title']}>
        <span className='ellipse'></span>预约信息
        </div>
        <ul className="clearfix">
          <li className={style['lh20']}><span>体检机构</span> 
          <Cascader
            style={{ width: 150 }}
            options={options}
            onChange={onChange}
            placeholder="Please select"
            showSearch={{ filter }}
          />
          </li>
          <li className={style['lh20']}><span>体检时间</span><DatePicker style={{ width: '189px' }} defaultValue={moment('2018-09-14', 'YYYY-MM-DD')} onChange={onChange} /><TimePicker onChange={onChange}  style={{ width: '189px' }} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /></li>
          <li className={style['lh20']}><span>体检套餐</span><input type="text" /></li>
          <li className={style['lh20']}><span>追加体检项目</span><input type="text" /></li>
        </ul>
        </div>
        </div>
        </div>
    }
}
export default ReservedPopup;