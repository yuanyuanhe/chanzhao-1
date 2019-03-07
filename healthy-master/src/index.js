import "babel-polyfill"
//IE兼容
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'
import App from './App';
import Login from './page/login'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn'
// 重置样式
// 公共样式
import  "../public/css/common.css"
import  "../public/css/style.css"
import  "../public/css/zyy.css"
//antd的样式
import 'antd/dist/antd.css'
ReactDOM.render(<HashRouter>
                <LocaleProvider locale={zh_CN}>
                <Switch>
                    <Route path='/login'  component={Login}></Route>
                    <Route path="/index" component={App}></Route>
                    <Redirect to="/login"></Redirect>
                </Switch></LocaleProvider>
</HashRouter>, document.getElementById('root'));
registerServiceWorker();
