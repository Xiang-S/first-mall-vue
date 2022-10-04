<template>
  <div style="background-color:#F8F8F8;height: 80vh">
    <div class="top-1">
      <div style="display: flex;align-items: center;">
        <div style="flex: 1;text-align: center;font-size: 1rem;color: #E4E7ED;">{{ nickName }}</div>
      </div>
    </div>
    <div style="margin:7.5rem auto 0 auto;border-radius: 0.21333rem;border:1px solid #FFFFFF;width: 90%">
      <van-cell title="我的订单" icon="todo-list-o" @click="$router.push('/totalOrder')"/>
    </div>
    <div style="margin: 8px auto;border-radius: 0.21333rem;border:1px solid #FFFFFF;width: 90%">
      <van-cell title="我的地址" icon="location-o" @click="$router.push('/address')"/>
    </div>
    <div style="margin: 8px auto;border-radius: 0.21333rem;border:1px solid #FFFFFF;width: 90%">
      <van-cell title="修改密码" icon="setting-o" @click="$router.push('/changePassword')"/>
    </div>

    <van-button type="danger" style="width: 100%;position: absolute;top: 85%" @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import getUserInfo from "@/api/user/getUserInfo";
import logout from "@/api/user/logout";
import {Toast} from "vant";
import Cookie from "js-cookie";

export default {
  name: "index",
  data() {
    return {
      nickName: ''
    }
  },
  methods: {
    logout() {
      logout().then(res => {
        const {resultCode} = res.data
        if (resultCode === 200) {
          Toast('退出成功')
          Cookie.remove('token')
          this.$router.push('/login')
        }
      })
    }

  },
  mounted() {
    getUserInfo().then(res => {
      const {data, resultCode} = res.data
      if (resultCode === 200) {
        this.nickName = data.nickName
      }
    })
  }
}
</script>

<style scoped>
.top-1 {
  background-image: url(@/static/userBg.png);
  padding: 15px;
  border-bottom-right-radius: 16%;
  border-bottom-left-radius: 16%;
}
</style>
