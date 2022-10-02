import axios from 'axios'
import Cookie from "js-cookie";

const request = axios.create({
    baseURL: '/api/v1'
})

request.interceptors.request.use(config => {
    if (Cookie.get('token')) {
        config.headers['token'] = Cookie.get('token')
    }
    return config
}, error => {
    return Promise.reject(error)
})
export default request
