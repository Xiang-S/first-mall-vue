import request from "@/utils/request";
const getAddressDetail =(addressId)=>{
    return request({
        url:`/address/${addressId}`,
        method:'get'
    })
}
export default getAddressDetail
