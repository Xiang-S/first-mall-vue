import request from "@/utils/request";

const updateCart = (data) => {
    return request({
        url: '/shop-cart',
        method: 'put',
        data
    })
}
export default updateCart
