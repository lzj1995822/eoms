/*
 * @Author: Hano.zhang 
 * @Date: 2017-11-09 12:01:20 
 * @Last Modified by: Hano.zhang
 * @Last Modified time: 2018-03-06 09:40:02
 */

import axios from 'axios'
let base = '/eoms-parent'

// 默认接收参数
// 第一个总是authorization（用户token验证），
// 第二个为path 路径 ，
// 第三个为接收的DATA

//  新增发送POST请求， 接收三个参数
/**
 * Hano
 * @param {*} authorization  用户验证
 * @param {*} path 地址
 * @param {*} params 参数
 */
export const postAppend = (authorization, path, params) => {
    return axios({
        method: 'POST',
        url: `${base}/${path}`,
        headers: {
            'authorization': authorization
        },
        data: params
    })
}
//  删除单个发送DELETE请求， 接收两个参数
export const deleteSingle = (authorization, path) => {
    return axios({
        method: 'DELETE',
        url: `${base}/${path}`,
        headers: {
            'authorization': authorization
        }
    });
}

// 根据ID查询单个信息， 接收3个参数
export const getSingle = (authorization, path, params) => {
    return axios({
        method: 'GET',
        url: `${base}/${path}/${params}`,
        headers: {
            'authorization': authorization
        },
        data:{subjectId:params}
    });
}


//  删除多个发送DELETE请求， 接收三个个参数
//  params 为删除ID？
/**
 * Hano
 * @param {*} authorization  用户验证
 * @param {*} path 地址
 * @param {*} params 参数
 */
export const deleteCouple = (authorization, path, params) => {
    return axios({
        method: 'DELETE',
        url: `${base}/${path}`,
        headers: {
            'authorization': authorization
        },
        data: params
    });
}


// 编辑发送PUT请求 封装接收三个参数 
// params 为修改过的数据
export const putEditor = (authorization, path, params) => {
    return axios({
        method: 'PUT',
        url: `${base}/${path}`,
        headers: {
            'authorization': authorization
        },
        data: params
    })
}

// 拉取用户信息 
export const getResourceInfo = (authorization, path) => {
    return axios({
        method: 'GET',
        url: `${base}/${path}`,
        headers: {
            'authorization': authorization
        }
    })
}
// 查询分页信息,接收三个参数.
//  params 为分页信息
export const PostInfoPg = (authorization, path, params) => {
    return axios({
        method: 'POST',
        url: `${base}/${path}`,
        headers: {
            'authorization': authorization
        },
        data: params
    });
};
