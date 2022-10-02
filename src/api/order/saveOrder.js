import request from "@/utils/request";
const saveOrder=(data)=>{
    return request({
        url:"/saveOrder",
        method:'post',
        data
    })
}
export default saveOrder
