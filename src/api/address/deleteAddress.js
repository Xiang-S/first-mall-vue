import request from "@/utils/request";

const deleteAddress = (addressId) => {
    return request({
        url: `/address/${addressId}`,
        method: 'delete',
    })
}
export default deleteAddress
