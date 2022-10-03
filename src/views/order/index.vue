<template>
  <div style="background-color:#F8F8F8;height: 100vh;overflow: hidden">
    <van-cell
        v-if="addressList.length === 0"
        title="请选择地址"
        is-link
        style="border-radius: 0.21333rem;width: 95%;margin: 0.5rem auto"
    />
    <van-card
        v-else
        v-for="item in defaultAddress"
        style="border-radius: 0.21333rem;width: 95%;margin: 0.5rem auto;background-color:#FFFFFF;height: 2rem"
        @click="$router.push('/address')"
    >
      <template #title>
        <van-tag plain type="danger">默认</van-tag>
        <span style="margin-left: 0.2rem;">{{ item.provinceName + '-' + item.cityName + '-' + item.regionName }}</span>
      </template>
      <template #desc>
        <div style="font-size: 0.5rem;font-weight: bold;">{{ item.detailAddress }}</div>
        <div>{{ item.userName }} {{ item.userPhone }}</div>
      </template>
    </van-card>


  </div>
</template>

<script>
import {Toast} from "vant";
import getAddress from "@/api/address/getAddress";

export default {
  name: "index",
  data() {
    return {
      addressList: []
    };
  },
  methods: {

  },
  computed: {
    defaultAddress() {
      return this.addressList.filter((item) => {
        return item.defaultFlag === 1
      })
    }
  },
  mounted() {
    getAddress().then(res => {
      const {resultCode, data} = res.data
      if (resultCode === 200) {
        this.addressList = data
      }
    })
  }
}
</script>

<style scoped>

</style>
