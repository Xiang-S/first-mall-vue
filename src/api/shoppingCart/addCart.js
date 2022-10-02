import request from "@/utils/request";

const addCart = (data) => {
    return request({
        url: '/shop-cart',
        method: 'post',
        data
    })
}
export default addCart
