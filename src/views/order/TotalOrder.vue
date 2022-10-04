<template>
  <div style="overflow: hidden">
    <van-tabs v-model="active" sticky>
      <van-tab title="待支付">
        <van-empty description="空空如也" v-if="orderList.length === 0"/>
        <div v-for="item in orderList" style="width: 95%;margin: 0.5rem auto;background-color:#FFFFFF;">
          <van-cell
              :title="item.createTime"
              :value="item.orderStatusString"
          >
          </van-cell>
          <van-card
              style="background-color:#FFFFFF"
              v-for="(orderItem,index) in item.mallOrderItemVOS"
              :price="orderItem.sellingPrice"
              :num="orderItem.goodsCount"
              :title="orderItem.goodsName"
              :thumb="$baseApi+ orderItem.goodsCoverImg"

          >
            <template #footer v-if="index === item.mallOrderItemVOS.length-1">
              <van-button size="mini" @click="pay(item.orderNo)">立即付款</van-button>
              <van-button size="mini" @click="$router.push({
              path:'/orderDetail',
              query:{
                orderNo:item.orderNo
              }
              })">查看订单
              </van-button>
            </template>
          </van-card>
          <van-cell title="总价格" :value="item.totalPrice"></van-cell>
        </div>
      </van-tab>
      <van-tab title="待确认">
        <van-empty description="空空如也" v-if="orderList.length === 0"/>
        <div v-for="item in orderList" style="width: 95%;margin: 0.5rem auto;background-color:#FFFFFF;">
          <van-cell
              :title="item.createTime"
              :value="item.orderStatusString"
          >
          </van-cell>
          <van-card
              style="background-color:#FFFFFF"
              v-for="(orderItem,index) in item.mallOrderItemVOS"
              :price="orderItem.sellingPrice"
              :num="orderItem.goodsCount"
              :title="orderItem.goodsName"
              :thumb="$baseApi+ orderItem.goodsCoverImg"
          >
            <template #footer v-if="index === item.mallOrderItemVOS.length-1">
              <van-button size="mini" @click="$router.push({
              path:'/orderDetail',
              query:{
                orderNo:item.orderNo
              }
              })">查看订单</van-button>
            </template>
          </van-card>
          <van-cell title="总价格" :value="item.totalPrice"></van-cell>
        </div>
      </van-tab>
      <van-tab title="待发货">
        <van-empty description="空空如也"/>
      </van-tab>
      <van-tab title="已发货">
        <van-empty description="空空如也" v-if="orderList.length === 0"/>
        <div v-for="item in orderList" style="width: 95%;margin: 0.5rem auto;background-color:#FFFFFF;">
          <van-cell
              :title="item.createTime"
              :value="item.orderStatusString"
          >
          </van-cell>
          <van-card
              style="background-color:#FFFFFF"
              v-for="(orderItem,index) in item.mallOrderItemVOS"
              :price="orderItem.sellingPrice"
              :num="orderItem.goodsCount"
              :title="orderItem.goodsName"
              :thumb="$baseApi+ orderItem.goodsCoverImg"
          >
            <template #footer v-if="index === item.mallOrderItemVOS.length-1">
              <van-button size="mini" @click="confirm(item.orderNo)">确认订单</van-button>
              <van-button size="mini" @click="$router.push({
              path:'/orderDetail',
              query:{
                orderNo:item.orderNo
              }
              })">查看订单</van-button>
            </template>
          </van-card>
          <van-cell title="总价格" :value="item.totalPrice"></van-cell>
        </div>
      </van-tab>
      <van-tab title="交易成功">
        <van-empty description="空空如也" v-if="orderList.length === 0"/>
        <div v-for="item in orderList" style="width: 95%;margin: 0.5rem auto;background-color:#FFFFFF;">
          <van-cell
              :title="item.createTime"
              :value="item.orderStatusString"
          >
          </van-cell>
          <van-card
              style="background-color:#FFFFFF"
              v-for="(orderItem,index) in item.mallOrderItemVOS"
              :price="orderItem.sellingPrice"
              :num="orderItem.goodsCount"
              :title="orderItem.goodsName"
              :thumb="$baseApi+ orderItem.goodsCoverImg"
          >
            <template #footer v-if="index === item.mallOrderItemVOS.length-1">
              <van-button size="mini" @click="$router.push({
              path:'/orderDetail',
              query:{
                orderNo:item.orderNo
              }
              })">查看订单</van-button>
            </template>
          </van-card>
          <van-cell title="总价格" :value="item.totalPrice"></van-cell>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import getOrder from "@/api/order/getOrder";
import paySuccess from "@/api/order/paySuccess";
import {Toast} from "vant";
import orderConfirm from "@/api/order/orderConfirm";

export default {
  name: "TotalOrder",
  data() {
    return {
      active: 0,
      orderList: [],
    }
  },
  methods: {
    pay(orderNo) {
      paySuccess({
        orderNo: orderNo,
        payType: 1
      }).then(res => {
        console.log(res.data)
        if (res.data.resultCode === 200) {
          Toast('支付成功')
          this.getCurrentOrder()
        }
      })
    },
    getCurrentOrder() {
      getOrder({
        status: this.active
      }).then(res => {
        const {resultCode, data} = res.data
        if (resultCode === 200) {
          this.orderList = data.list
        }
      })
    },
    confirm(orderNo) {
      orderConfirm(orderNo).then(res => {
        console.log(res.data)
        if (res.data.resultCode === 200) {
          Toast('确定成功')
          this.getCurrentOrder()
        }
      })
    }
  },
  mounted() {

  },
  watch: {
    active: {
      handler(val) {
        getOrder({
          status: val
        }).then(res => {
          const {resultCode, data} = res.data
          if (resultCode === 200) {
            this.orderList = data.list
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
