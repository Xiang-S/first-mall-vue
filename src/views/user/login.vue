<template>
  <div>
    <van-image
        width="10rem"
        height="8rem"
        fit="contain"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <van-form validate-first @submit="onSubmit">
      <van-field
          label="用户名"
          v-model="loginName"
          name="loginName"
          placeholder="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
      />
      <van-field
          label="密码"
          v-model="passwordMd5"
          name="passwordMd5"
          type="password"
          placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div>
        <Verify
            ref="loginVerifyRef"
            @error="error"
            @success="success"
            :showButton="false"
            :width="'5rem'"
            :height="'1rem'"
            :fontSize="'16px'"
            :type="2"
        />
      </div>
      <span style="margin-left: 0.5rem;font-size: 0.4rem;color: darkgrey"
            @click="$router.push('/register')">立即注册</span>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
                    style="background-color:rgb(27, 174, 174);border-color: rgb(27, 174, 174)">登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Verify from 'vue2-verify'
import login from "@/api/user/login";
import {Toast} from "vant";
import Cookie from "js-cookie";

export default {
  name: "login",
  components: {
    Verify
  },
  data() {
    return {
      loginName: '',
      passwordMd5: '',
      verify: false
    }
  },
  methods: {
    onSubmit(values) {
      this.dealTriVer()
      if (this.verify) {
        login({
          "loginName": values.loginName,
          "passwordMd5": this.$md5(values.passwordMd5)
        }).then(res => {
          const {resultCode, data} = res.data
          if (resultCode === 200) {
            Cookie.set('token', data)
            Toast('登录成功')
            this.$router.push({
              path:'/',
            })
            localStorage.setItem('active', 'home')
            this.$router.go(0)
          } else {
            Toast('账号或密码错误')
            this.loginName = ''
            this.passwordMd5 = ''
          }
        })
      } else {
        Toast('请输入正确的验证码')
      }
    },
    //检查验证码是否正确
    dealTriVer() {
      this.$refs.loginVerifyRef.$refs.instance.checkCode()
    },
    error(obj) {
      this.verify = false
      obj.refresh()
    },
    success(obj) {
      this.verify = true
      obj.refresh()
    }
  }
}
</script>

<style scoped>
>>> .cerify-code-panel {
  display: flex;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
}

>>> .verify-input-area {
  margin-left: 0.2rem;
  margin-top: 0.1rem;
}

>>> .verify-change-area {
  margin-top: 0.1rem;
  margin-left: 0.2rem;
}
</style>
