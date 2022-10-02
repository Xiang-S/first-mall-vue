import request from "@/utils/request";
const updateAddress =(data)=>{
    return request({
        url:'/address',
        method:'put',
        data
    })
}
export default updateAddress
