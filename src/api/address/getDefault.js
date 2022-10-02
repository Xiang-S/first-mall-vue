import request from "@/utils/request";
const getDefault =()=>{
    return request({
        url:'/address/default',
        method:'get'
    })
}
export default getDefault
