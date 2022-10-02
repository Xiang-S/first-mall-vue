import request from "@/utils/request";
const getUserInfo = ()=>{
    return request({
        url: '/user/info',
        method: 'get',
    })
}
export default getUserInfo
