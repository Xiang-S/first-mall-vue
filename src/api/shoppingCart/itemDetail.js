import request from "@/utils/request";
import qs from 'qs'

const itemDetail = (params) => {
    return request({
        url: '/shop-cart/settle',
        method: 'get',
        params,
        paramsSerializer: params => qs.stringify(params, {indices: false})
    })
}
export default itemDetail
