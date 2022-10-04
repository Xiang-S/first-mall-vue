<template>
  <div style="background-color:#F8F8F8;height: 100vh;overflow: hidden">
    <van-card
        v-if="defaultAddress.length === 0"
        style="border-radius: 0.21333rem;width: 95%;margin: 0.5rem auto;background-color:#FFFFFF;height: 2rem"
        @click="$router.push('/address')"
    >
      <template #title>
        <span style="margin-left: 0.2rem;">{{
            addressList[0].provinceName + '-' + addressList[0].cityName + '-' + addressList[0].regionName
          }}</span>
      </template>
      <template #desc>
        <div style="font-size: 0.5rem;font-weight: bold;">{{ addressList[0].detailAddress }}</div>
        <div>{{ addressList[0].userName }} {{ addressList[0].userPhone }}</div>
      </template>
    </van-card>
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
    <van-card
        style="border-radius: 0.21333rem;width: 90%;margin: 0.5rem auto;background-color:#FFFFFF;height: 3rem"
        v-for="item in orderItem"
        :price="item.sellingPrice"
        :title="item.goodsName"
        :thumb="$baseApi+ item.goodsCoverImg"
        :num="item.goodsCount"
    />
    <van-submit-bar :price="Number($route.query.totalCount)*100" button-text="立即付款" @submit="onSubmit"/>
  </div>
</template>

<script>
import {Toast} from "vant";
import getAddress from "@/api/address/getAddress";
import itemDetail from "@/api/shoppingCart/itemDetail";
import saveOrder from "@/api/order/saveOrder";
import paySuccess from "@/api/order/paySuccess";

export default {
  name: "index",
  data() {
    return {
      addressList: [
        {provinceName: ''}
      ],
      orderItem: [],
      addressId: ''
    };
  },
  methods: {
    onSubmit() {
      if (this.defaultAddress.length === 0) {
        this.addressId = this.addressList[0].addressId
      } else {
        this.addressId = this.defaultAddress[0].addressId
      }
      saveOrder({
        "addressId": this.addressId,
        "cartItemIds": this.$route.query.cartItemIds
      }).then(res => {
        const {resultCode, data} = res.data
        if (resultCode === 200) {
          paySuccess({
            orderNo: data,
            payType: 1
          }).then(res => {
            console.log(res.data)
            if (res.data.resultCode === 200) {
              Toast('支付成功')
            }
          })
          this.$router.push({
            path: '/paySuccess',
            query: {
              orderId: data
            }
          })
        }
      })
    }
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
        if (data.length === 0) {
          Toast('您还没有地址')
          this.$router.push('/addressAdd')
        }
      }
    })
    itemDetail({
      'cartItemIds': this.$route.query.cartItemIds
    }).then(res => {
      const {resultCode, data} = res.data
      if (resultCode === 200) {
        this.orderItem = data
      }
    })
  }
}
</script>

<style scoped>

</style>
