import request from "@/utils/request";
const getCartList =()=>{
    return request({
        url: '/shop-cart',
        method: 'get'
    })
}
export default getCartList
