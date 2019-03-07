import React,{Component} from "react"
import style from "./updateImageModel.mcss"
import {DatePicker} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Select } from 'antd';
import { Cascader } from 'antd';
import { TimePicker } from 'antd';
import { Upload, message, Button, Icon } from 'antd';
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
const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
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
class UpdatePopup extends Component {
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
        <div className={style["Model-head"]}> 影像上传</div>  
        <div className={style['Content']}>
        
        <ul className="clearfix">
          <li className={style['types']}><span>体检类型</span>新保单核保体检</li>
        </ul>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> 上传文件
          </Button>
        </Upload>
        <div className={style['Title']}>
        <span className='ellipse'></span>已上传影像资料
        <a className={style['lookImage']}>查看全部影像></a>
        </div>
        <table width="100%" border="0" className={style['table2']}>
                   <tbody>
                   <tr>
                       <th>影像类型</th>
                       <th>影像名称</th>
                       <th>操作人员</th>
                       <th>操作日期</th>
                       <th>操作</th>
                   </tr>
                   <tr>
                       <td>1</td>
                       <td>102</td>
                       <td>{this.props.data==undefined?'':this.props.data.healthName}</td>
                       <td>T0001</td>
                       <td><a  data-reveal-id="addalldata">删除</a>&nbsp;|&nbsp;<a  data-reveal-id="contectM">查看</a></td>
                       
                   </tr>
                   
                   
                   <tr>
                       <td>1</td>
                       <td>102</td>
                       <td>{this.props.data==undefined?'':this.props.data.healthName}</td>
                       <td>T0001</td>
                       <td><a  data-reveal-id="addalldata">删除</a>&nbsp;|&nbsp;<a  data-reveal-id="contectM">查看</a></td>
                       
                   </tr>
                   
                   </tbody>
               </table>
        
        
        </div>
        </div>
        </div>
    }
}
export default UpdatePopup;