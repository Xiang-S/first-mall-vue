import request from "@/utils/request";
const updateUserInfo=(data)=>{
    return request({
        url:'/user/info',
        method:'put',
        data
    })
}
export default updateUserInfo
