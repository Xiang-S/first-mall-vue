import request from "@/utils/request";
const orderConfirm =(orderNo)=>{
    return request({
        url:`/order/${orderNo}/finish`,
        method:'put',
    })
}
export default orderConfirm
