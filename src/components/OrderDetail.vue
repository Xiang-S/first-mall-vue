<template>
    <div>
      <div style="width: 95%;margin: 0.5rem auto;background-color:#FFFFFF;">
        <van-cell
            title="订单状态"
            :value="orderDetail.orderStatusString"
        >
        </van-cell>
        <van-card
            style="background-color:#FFFFFF"
            v-for="(orderItem,index) in orderDetail.mallOrderItemVOS"
            :price="orderItem.sellingPrice"
            :num="orderItem.goodsCount"
            :title="orderItem.goodsName"
            :thumb="$baseApi+ orderItem.goodsCoverImg"
        >
        </van-card>
        <van-cell title="订单号" :value="orderDetail.orderNo"></van-cell>
        <van-cell title="总金额" :value="orderDetail.totalPrice"></van-cell>
        <van-cell title="下单时间" :value="orderDetail.createTime"></van-cell>
        <van-cell title="支付方式" :value="orderDetail.payTypeString"></van-cell>

      </div>
    </div>
</template>

<script>
import getOrderDetail from "@/api/order/getOrderDetail";

export default {
  name: "OrderDetail",
  data(){
    return{
        orderDetail: []
    }
  },
  mounted() {
    getOrderDetail(this.$route.query.orderNo).then(res=>{
      const {resultCode,data} = res.data
      if(resultCode === 200){
        this.orderDetail = data
      }
    })
  }
}
</script>

<style scoped>

</style>
