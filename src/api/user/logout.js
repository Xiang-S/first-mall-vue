import request from "@/utils/request";
const logout =()=>{
    return request({
        url:'/user/logout',
        method:'post',
    })
}
export  default logout
