import request from "@/utils/request";
const getOrderDetail =(orderNo)=>{
    return request({
        url:`/order/${orderNo}`,
        method:'get',
    })
}
export default getOrderDetail
