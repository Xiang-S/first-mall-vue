import request from "@/utils/request";
const search = (params)=>{
    return request({
        url:'/search',
        method:'get',
        params
    })
}
export default search
