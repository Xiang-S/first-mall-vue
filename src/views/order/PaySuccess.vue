<template>
    <div style="display: flex;height: 80vh;flex-direction:column;align-items: center;justify-content: center">
      <van-icon name="checked" style="font-size: 110px"/>
      <div style="font-size: 20px;color:rgb(27, 174, 174) ">支付成功</div>
      <van-button round type="info" style="background-color: rgb(27, 174, 174);border: none;width: 5rem;margin-top: 1rem" @click="$router.push('/totalOrder')">查看订单</van-button>
      <van-button round type="info" style="background-color: rgb(27, 174, 174);border: none;width: 5rem;margin: 0.2rem 0" @click="$router.push('/')">返回首页</van-button>
    </div>
</template>

<script>
export default {
  name: "PaySuccess"
}
</script>

<style scoped>
.van-icon-checked{
  color: rgb(27, 174, 174);

}
</style>
