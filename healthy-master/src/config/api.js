// import '../../public/config'
import axios from 'axios'
import {
    promises
} from 'fs';
//SVN
// window.server = 'http://192.168.1.102:8080/MMS'
// window.server='http://10.22.224.110:8088/health/MMS'
// dit
window.server="http://10.22.224.106:9999/apis/health/MMS"
//  sit 
// window.server="http://10.22.224.37:9999/apis/health/MMS"
//后台调试
// window.server="http://10.22.224.38:8088/health/MMS/"
// 调试
// window.server="http://192.168.23.1:8080/MMS"
var server = window.server
// export const food=()=>{
//   return new Promise((resolve,reject)=>{
//       axios({
//           url:'https://www.apiopen.top/novelApi',
//           method:"get"
//       }).then(
//           res=>{
//               console.log(res)
//               resolve(res)
//           }
//       ).catch(
//           error=>{
//               console.log(error)
//               reject(error)
//           }
//       )
//   })
// }
// "proxy":{
//     "/api":{
//       "target":"https://baidu.com/",
//       "changeOrigin": true
//     }
// },

// 预约管理主界面条件查询
export const selectQuery = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            // 'Content-Type': 'application/json;charset=UTF-8'
            // headers: {
            // 'Access-Control-Allow-Origin':'*'},
            // {'X-Requested-With': 'XMLHttpRequest'},
            url: server + '/appointmentquery/selectQuery',
            method: "get",
            params
        }).then(
            res => {
                // console.log(res)
                // res.status=='200'
                resolve(res.data)
                console.log(res.data)
                if (res.data.result == 'RC100') {
                    console.log('请求成功!')
                } else {
                    console.log(res.data.result + ',' + res.data.errMsg)
                } //RC300 数据异常
            }
        ).catch(
            error => {
                reject(error)
                console.log('请求失败！')
            }
        )
    })
}

// 根据城市code显示当前城市下的体检机构
export const cityLoad = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            //headers: {'Access-Control-Allow-Origin':'*'},
            url: server + '/appointmentquery/cityLoad',
            method: "get",
            params
        }).then(
            res => {
                // console.log(res)
                resolve(res.data)
                console.log(res.data)
                if (res.data.result == 'RC100') {
                    console.log('请求成功!')
                } else {
                    console.log(res.data.result + ',' + res.data.errMsg)
                }
            }
        ).catch(
            error => {
                reject(error)
                console.log('请求失败！')
            }
        )
    })
}

//预约管理体检预约状态查询
export const statusQuery = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url: server + '/appointmentquery/queryByHealthStatus',
            method: "get",
            params
        }).then(
            res => {
                // console.log(res)
                resolve(res.data)
                console.log(res.data)
                if (res.data.result == 'RC100') {
                    console.log('请求成功!')
                } else {
                    console.log(res.data.result + ',' + res.data.errMsg)
                }
            }
        ).catch(
            error => {
                reject(error)
                console.log('请求失败！')
            }
        )
    })
}

//   预约详情查询
export const detailedQuery = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url: server + '/appointmentquery/detailedQuery',
            method: "get",
            params
        }).then(
            res => {
                // console.log(res)
                resolve(res.data)
                console.log(res.data)
                if (res.data.result == 'RC100') {
                    console.log('请求成功!')
                } else {
                    console.log(res.data.result + ',' + res.data.errMsg)
                }
            }
        ).catch(
            error => {
                reject(error)
                console.log('请求失败！')
            }
        )
    })
}

//   const ip="http://192.168.1.102:8080/MMS";
// 查询体检机构接口
export const healthOrgManager = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${server}/healthOrgManager/healthOrgManagerSelect`,
            method: "get",
            params,
        }).then(
            res => {
                resolve(res)
            }
        ).catch(
            error => {
                reject(error)
            }
        )
    })
}
// 新增体检机构接口
export const save = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${server}/healthOrgManager/healthOrgManagerSave`,
            method: "post",
            params,
            //  contentType:"application/json;charsetset=UTF-8",
            //  dataType:"json"
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}
// export const save=()=>{
//     return new Promise((resolve,reject)=>{
//            axios.post(`${server}/healthOrgManager/healthOrgManagerSave`,{})
//     })
// }

// 根据Id查询机构接口
export const load = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${server}/healthOrgManager/healthOrgManagerLoad`,
            method: "get",
            params
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}
// 删除体检机构接口
export const dele = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${server}/healthOrgManager/healthOrgManagerDelete`,
            method: "post",
            params
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}
//修改
export const update = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${server}/healthOrgManager/healthOrgManagerUpdate`,
            method: "post",
            params
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}
//套餐项目修改
export const momeal = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${server}/healthOrgManager/associatedProjects`,
            method: "post",
            params,
        }).then(
            res => {
                resolve(res)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    })
}
//套餐项目查询
export const meal = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${server}/healthOrgManager/getProjectInfo`,
            method: "get",
            params,
        }).then(
            res => {
                resolve(res)
            }
        ).catch(
            error => {
              reject(error)
            }
        )
    })
}
//新增体检大类
export const type=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/healthOrgManager/healthOrgManagerSaveBigType`,
            method:"post",
            params,
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            error=>{
                reject(error)
            }
        )
    })
}
//查询体检大类
export const setype=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/healthOrgManager/healthOrgManagerSelectBigType`,
            method:"get",
            params,
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            error=>{
                reject(error)
            }
        )
    })
}
//删除时间
export const delatetime=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/healthOrgManager/healthOrgDeleteOrderTimes`,
            method:"post",
            params,
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            error=>{
                reject(error)
            }
        )
    })
}
//新增时间
export const addtime=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/healthOrgManager/healthOrgAddOrderTimes`,
            method:"post",
            params,
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            error=>{
                reject(error)
            }
        )
    })
}
//机构项目或者套餐添加
export const projectsave=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/projectReference/projectReferenceSave`,
            method:"post",
            params,
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            error=>{
                reject(error)
            }
        )
    })
}
//机构项目或者套餐修改

// 机构项目或者套餐删除 
export const projectdelete=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/projectReference/projectReferenceDelete`,
            method:"post",
            params,
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            error=>{
                reject(error)
            }
        )
    })
}
//机构项目列表

export const projectselect=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/projectReference/projectReferenceSelect`,
            method:"get",
            params,
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            error=>{
                reject(error)
            }
        )
    })
}
//机构名称查询
export const orgselect=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/projectReference/orgSelect`,
            method:"get",
            params,
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            error=>{
                reject(error)
            }
        )
    })
}
//机构项目列表
export const projectlist=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/packageProjectManager/getProjectList`,
            method:"get",
            params,
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            error=>{
                reject(error)
            }
        )
    })
}
//机构套餐列表
export const packtlist=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/projectReference/getPackageList`,
            method:"get",
            params,
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(
            error=>{
                reject(error)
            }
        )
    })
}


//体检项目

export const projectManagerSelect = (params = {}) => {

    return new Promise((resolve, reject) => {
        axios.get(`${server}/projectManager/projectManagerSelect`, {
                params,
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}

//体检大类
export const healthTypeManagerList=(params={})=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:`${server}/healthTypeManager/healthTypeManagerList`,
            method:"get",
            params
        }).then(res=>{resolve(res)}).catch(error=>{reject(error)})
    })
}
//体检项目添加
export const projectManagerSave = (params) => {
 
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${server}/projectManager/projectManagerSave`,
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
//体检项目或者套餐修改
export const loadCheckBoxRole = (params) => {
    
       return new Promise((resolve, reject) => {
           axios({
               method: 'post',
               url: `${server}/projectManager/projectManagerUpdate`,
               data: params,
               headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
               }
           }).then(function(response) {
               resolve(response.data)
           }).catch(function(error) {
               reject(error.message);
           });
       });
   }
//   删除体检项目或者套餐 
export const projectManagerDelete = (params) => {
    
       return new Promise((resolve, reject) => {
           axios({
               method: 'post',
               url: `${server}/projectManager/projectManagerDelete`,
               data: params,
               headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
               }
           }).then(function(response) {
               resolve(response.data)
           }).catch(function(error) {
               reject(error.message);
           });
       });
   }
   //体检大类添加
   export const healthTypeManagerSave = (params) => {
    
       return new Promise((resolve, reject) => {
           axios({
               method: 'post',
               url: `${server}/healthTypeManager/healthTypeManagerSave`,
               data: params,
               headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
               }
           }).then(function(response) {
               resolve(response.data)
           }).catch(function(error) {
               reject(error.message);
           });
       });
   }
   //.改体检大类
   export const healthTypeManagerUpdate = (params) => {
    
       return new Promise((resolve, reject) => {
           axios({
               method: 'post',
               url: `${server}/healthTypeManager/healthTypeManagerUpdate`,
               data: params,
               headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
               }
           }).then(function(response) {
               resolve(response.data)
           }).catch(function(error) {
               reject(error.message);
           });
       });
   }

      //.套餐添加
      export const packageProjectManagerSave = (params) => {
    
       return new Promise((resolve, reject) => {
           axios({
               method: 'post',
               url: `${server}/packageProjectManager/packageProjectManagerSave`,
               data: params,
               headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
               }
           }).then(function(response) {
               resolve(response.data)
           }).catch(function(error) {
               reject(error.message);
           });
       });
   }
   //体检项目列表查询
   export const getProjectList = (params = {}) => {

    return new Promise((resolve, reject) => {
        axios.get(`${server}/packageProjectManager/getProjectList`, {
                params,
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}
//套餐关联项目修改

export const packageProjectsUpdate = (params) => {
    
       return new Promise((resolve, reject) => {
           axios({
               method: 'post',
               url: `${server}/packageProjectManager/packageProjectsUpdate`,
               data: params,
               headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
               }
           }).then(function(response) {
               resolve(response.data)
           }).catch(function(error) {
               reject(error.message);
           });
       });
   }

  // 套餐详细信息查询
  export const getProjectManagerByPackId = (params = {}) => {
    
        return new Promise((resolve, reject) => {
            axios.get(`${server}/packageProjectManager/getProjectManagerByPackId`, {
                    params,
                }).then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(error.message);
                });
        });
    }