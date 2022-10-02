import request from "@/utils/request";
const login = (data)=>{
    return request({
        url:'user/login',
        method:'post',
        data
    })
}
export default login
