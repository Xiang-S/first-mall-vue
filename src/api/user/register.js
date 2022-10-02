import request from "@/utils/request";
const register =(data)=>{
    return request({
        url:'/user/register',
        method: 'post',
        data
    })
}
export default register
