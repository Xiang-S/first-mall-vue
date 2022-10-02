import request from "@/utils/request";
const addAddress =(data)=>{
    return request({
        url:'/address',
        method:'post',
        data
    })
}
export default addAddress
