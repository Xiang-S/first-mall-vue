import request from "@/utils/request";
const getGoodsDetail = (goodsId)=>{
    return request({
        url:`goods/detail/${goodsId}`,
        method:'get'
    })
}
export default getGoodsDetail
