import request from "@/utils/request";
const paySuccess=(params)=>{
    return request({
        url:'/paySuccess',
        method:'get',
        params
    })
}
export default paySuccess
