import request from "@/utils/request";
const addressDetail =(addressId)=>{
    return request({
        url:`/address/${addressId}`,
        method:'get'
    })
}
export default addressDetail
