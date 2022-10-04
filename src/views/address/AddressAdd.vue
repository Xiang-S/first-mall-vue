<template>
  <div>
    <van-address-edit
        :area-list="areaList"
        :show-postal="false"
        :tel-validator="validator"
        show-delete
        show-set-default
        show-search-result
        @save="onSave"
    />
  </div>
</template>

<script>
import {areaList} from "@vant/area-data";
import {Toast} from "vant";
import addAddress from "@/api/address/addAddress";

export default {
  name: "AddressAdd",
  data() {
    return {
      areaList,
    }
  },
  methods: {
    onSave(content) {
      const {province, city, county, isDefault, name, tel, addressDetail} = content
      addAddress({
        "cityName": city,
        "defaultFlag": isDefault ? 1 : 0,
        "detailAddress": addressDetail,
        "provinceName": province,
        "regionName": county,
        "userName": name,
        "userPhone": tel
      }).then(res => {
        const {resultCode} = res.data
        if(resultCode === 200){
          Toast('新增地址成功')
          this.$router.go(-1)
        }
      })
    },
    validator(val) {
      return /^1[13456789]\d{9}$/.test(val)
    }
  }
}
</script>

<style scoped>

</style>
