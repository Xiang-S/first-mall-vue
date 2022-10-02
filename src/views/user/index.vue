<template>
  <div>
    <div style="display: flex;align-items: center;background-color:skyblue;">
      <van-image
          round
          width="3rem"
          height="3rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div style="flex: 1;text-align: center;font-size: 1rem;color: #E4E7ED;">{{ nickName }}</div>
    </div>

    <div style="margin: 30px 0">
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

</style>
