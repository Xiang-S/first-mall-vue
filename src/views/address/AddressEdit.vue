<template>
  <div>
    <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        :show-postal="false"
        :tel-validator="validator"
        show-delete
        show-set-default
        show-search-result
        @save="onSave"
        @delete="onDelete"
    />

  </div>
</template>

<script>
import {Toast} from "vant";
import {areaList} from '@vant/area-data';
import getAddressDetail from "@/api/address/getAddressDetail";
import updateAddress from "@/api/address/updateAddress";
import user from "@/views/user";
import deleteAddress from "@/api/address/deleteAddress";

export default {
  name: "AddressEdit",
  data() {
    return {
      areaList,
      addressInfo: {
        id: '',
        name: '',
        tel: '',
        areaCode: '',
        addressDetail: '',
        isDefault: false
      },
      userId: ''
    }
  },
  methods: {
    onSave(content) {
      const {province, city, county, id, isDefault, name, tel, addressDetail} = content
      updateAddress({
        "addressId": id,
        "cityName": city,
        "defaultFlag": isDefault ? 1 : 0,
        "detailAddress": addressDetail,
        "provinceName": province,
        "regionName": county,
        "userId": this.userId,
        "userName": name,
        "userPhone": tel
      }).then(res => {
        const {resultCode} = res.data
        if (resultCode === 200) {
          Toast('地址修改成功')
          this.$router.go(-1)
        }
      })
    },
    onDelete() {
      deleteAddress(this.addressInfo.id).then(res=>{
        const {resultCode} = res.data
        if(resultCode === 200){
          Toast('删除成功')
          this.$router.go(-1)
        }
      })
    },
    validator(val) {
      return /^1[13456789]\d{9}$/.test(val)
    }
  },
  mounted() {
    if (this.$route.query.addressId) {
      getAddressDetail(this.$route.query.addressId).then(res => {
        const {
          addressId, userName, userPhone,
          regionName, detailAddress, defaultFlag, userId
        } = res.data.data
        this.userId = userId
        this.addressInfo.id = addressId
        this.addressInfo.name = userName
        this.addressInfo.tel = userPhone
        this.addressInfo.addressDetail = detailAddress
        this.addressInfo.isDefault = defaultFlag === 1
        let areaData = this.areaList
        let tempData = ''
        for (let countyListKey in areaData.county_list) {
          if (regionName === areaData.county_list[countyListKey]) {
            tempData = countyListKey
            break
          }
        }
        this.addressInfo.areaCode = tempData
      })
    }
  }
}
</script>

<style scoped>

</style>
