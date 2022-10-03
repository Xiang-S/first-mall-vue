import request from "@/utils/request";
const getIndexInfos = ()=>{
    return request({
        url:'/index-infos',
        method:'get'
    })
}
export default getIndexInfos
