import request from "@/utils/request";
const itemDetail =(params)=>{
    return request({
        url:'/shop-cart/settle',
        method: 'get',
        params
    })
}
export default itemDetail
