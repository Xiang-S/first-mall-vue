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
        @delete="onDelete"
    />

  </div>
</template>

<script>
import {Toast} from "vant";
import {areaList} from '@vant/area-data';
import getAddressDetail from "@/api/address/getAddressDetail";

export default {
  name: "AddressEdit",
  data() {
    return {
      searchResult: [],
      areaList
    }
    ;
  },
  methods: {
    onSave() {

    },
    onDelete() {
      Toast('delete');
    },
    validator(val) {
      return /^1[13456789]\d{9}$/.test(val)
    }
  },
  mounted() {
    if (this.$route.query.addressId) {
      getAddressDetail(this.$route.query.addressId).then(res => {

      })
    }
  }
}
</script>

<style scoped>

</style>
