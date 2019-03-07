import React,{Component} from "react"
import style from "./weiyuyuemodel.mcss"
import {DatePicker} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Select } from 'antd';
import { Cascader } from 'antd';
import { TimePicker,message} from 'antd';
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
class UnreservedPopup extends Component {
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
          <li className={style['col-md-2']}><span className={style['col-666']}>体检类型</span>
          <Select defaultValue="lucy" style={{ width: 189 }} onChange={handleChange}>
                        <Option value="jack">新单核保体检</Option>
                        <Option value="lucy">新单核保体检</Option>
                        <Option value="disabled" disabled>新单核保体检</Option>
                        <Option value="Yiminghe">新单核保体检</Option>
                        </Select>
          </li>
          <li className={style['col-md-2']}><span className={style['col-666']}>体检预约号</span><input type="text" /></li>
          <li className={style['col-md-2']}><span className={style['col-666']}>保单号</span><input type="text" /></li>
          <li className={style['col-md-2']}><span className={style['col-666']}>任务来源</span><Select defaultValue="lucy" style={{ width: 189 }} onChange={handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                        </Select></li>
          <li className={style['col-md-2']}><span className={style['col-666']}>任务生成时间</span><DatePicker style={{ width: 189 }}  defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} onChange={onChange} /></li>
        </ul>
        <div className={style['Title']}>
        <span className='ellipse'></span>体检人信息
        </div>
        <ul className="clearfix">
          <li className={style['col-md-2']}><span className={style['col-666']}>体检人姓名</span>
          <input type="text" />
          
          </li>
          <li className={style['col-md-2']}><span className={style['col-666']}>分公司</span><Select defaultValue="lucy" style={{ width: 189 }} onChange={handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                        </Select></li>
          <li className={style['col-md-2']}><span className={style['col-666']}>证件类型</span><Select defaultValue="lucy" style={{ width: 189 }} onChange={handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                        </Select></li>
          <li className={style['col-md-2']}><span className={style['col-666']}>证件号码</span><input type="text" /></li>
          <li className={style['col-md-2']}><span className={style['col-666']}>投保人姓名</span><input type="text" /></li>
          <li className={style['col-md-2']}><span className={style['col-666']}>营销员姓名</span><input type="text" /></li>
          <li className={style['col-md-2']}><span className={style['col-666']}>营销员电话</span><input type="text" /></li>
        </ul>
        <div className={style['Title']}>
        <span className='ellipse'></span>预约信息
        </div>
        <ul className="clearfix appointment-info" style={{marginBottom:"0px"}}>
          <li className={style['lh20']}><span className={style['col-666']}>体检机构</span> 
          <Cascader
            style={{ width: 150 }}
            options={options}
            onChange={onChange}
            placeholder="Please select"
            showSearch={{ filter }}
          />
          </li>
          <li className={style['lh20']}><span className={style['col-666']}>体检时间</span><DatePicker style={{ width: 189 }} defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} onChange={onChange} /><TimePicker onChange={onChange}  style={{ width: 250 }} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /></li>
          <li style={{float:"left",width:"50%",marginBottom:"0px"}} className={style['lh20']}><span className={style['col-666']}>体检套餐</span>
          <div className={style['container']}>
          <span>体检项目A</span>
          <span>体检项目A</span>
          </div></li>
          <li style={{float:"left",width:"50%",marginBottom:"0px"}} className={style['lh20 col-md-2']}>
          <span className={style['col-666']}>追加体检项目</span>
          
          <div className={style['container']}>
          <span>体检项目A</span>
          <span>体检项目A</span>
          </div>
          </li>
        </ul>
        </div>
        </div>
        </div>
    }
}
export default UnreservedPopup;