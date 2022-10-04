<template>
  <div style="background-color:#F8F8F8;height: 90vh;overflow: hidden">
    <van-card
        v-for="item in addressList"
        style="border-radius: 0.21333rem;width: 95%;margin: 0.5rem auto;background-color:#FFFFFF;height: 2rem"
        @click="$router.push('/address')"
    >
      <template #title>
        <van-tag plain type="danger" v-if="item.defaultFlag===1">默认</van-tag>
        <span style="margin-left: 0.2rem;">{{ item.provinceName + '-' + item.cityName + '-' + item.regionName }}</span>
      </template>
      <template #desc>
        <div style="font-size: 0.5rem;font-weight: bold;">{{ item.detailAddress }}
          <van-icon name="edit" style="float:right;" @click="$router.push({
                path:'/addressEdit',
                query:{
                  addressId: item.addressId
                }
            })"/>
        </div>
        <div>{{ item.userName }} {{ item.userPhone }}</div>
      </template>
    </van-card>
    <van-button round type="danger" style="width: 90%;position: absolute;left: 5%;bottom: 0.2rem;"
                @click="$router.push('/addressAdd')">新建地址
    </van-button>
  </div>
</template>

<script>
import getAddress from "@/api/address/getAddress";

export default {
  name: "index",
  data() {
    return {
      addressList: []
    }
  },
  mounted() {
    getAddress().then(res => {
      const {resultCode, data} = res.data
      if (resultCode === 200) {
        this.addressList = data.reverse()
      }
    })
  }
}
</script>

<style scoped>

</style>
