import request from "@/utils/request";
const getAddress =()=>{
    return request({
        url:'/address',
        method:'get'
    })
}
export default getAddress
