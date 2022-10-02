import request from "@/utils/request";
const goodsDetail = (goodsId)=>{
    return request({
        url:`goods/detail/${goodsId}`,
        method:'get'
    })
}
export default goodsDetail
