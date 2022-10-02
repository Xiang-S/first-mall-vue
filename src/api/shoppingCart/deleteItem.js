import request from "@/utils/request";
const deleteItem =(newBeeMallShoppingCartItemId)=>{
    return request({
        url:`/shop-cart/${newBeeMallShoppingCartItemId}`,
        method:'delete'
    })
}
export default deleteItem
