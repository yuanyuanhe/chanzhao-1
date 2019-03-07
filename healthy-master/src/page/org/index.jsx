import React,{Component} from 'react'
import { Select } from 'antd';
const Option = Select.Option;
class Org extends Component{
    render(){
        return <div>
            <div >当前位置：预约报表&gt;体检机构管理</div>
            <div className='search'>
             <p>分公司
             <Select defaultValue="lucy" style={{ width: 120 }}>
             <Option value="jack">Jack</Option>
             <Option value="lucy">Lucy</Option>
             <Option value="disabled" disabled>Disabled</Option>
             <Option value="Yiminghe">yiminghe</Option>
            </Select>
             </p>
            </div>
            <div></div>
        </div>
    }
}