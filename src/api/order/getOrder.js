import request from "@/utils/request";
const getOrder =(params)=>{
    return request({
        url:'/order',
        method:'get',
        params
    })
}
export default getOrder
