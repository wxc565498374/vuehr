import axios from "axios";
import { Message } from 'element-ui';
import message from "element-ui/packages/message";

axios.interceptors.response.use(
    success => {
        if (success.status && success.status==200 && success.data.status==500) {
            Message.error({message: success.data.msg});
            return;
        }
        return success.data;
    },
    error => {
        if (error.response.status == 504 || error.response.status == 404) {
            Message.error({message: '服务器资源未找到'});
        } else if (error.response.status == 403) {
            Message.error({message: '权限不足，请联系管理员'});
        } else if (error.response.status == 401) {
            Message.error({message: '尚未登陆'});
        } else {
            if (error.response.data.msg) {
                Message.error({message: error.data.msg});
            } else {
                Message.error({message: '未知错误'});
            }
        }
        return;
    }
)

let base = '';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

