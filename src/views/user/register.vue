<template>
  <div>
    <van-image
        width="10rem"
        height="8rem"
        fit="contain"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <van-form @submit="onSubmit">
      <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' },
            { pattern , message: '请输入正确的手机号格式'}]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码'},
            { pattern: passwordPattern ,message : '密码长度需要6位以上且包含字母和数字'}]"
      />
      <van-field
          v-model="rePassword"
          type="password"
          name="rePassword"
          label="密码确认"
          placeholder="密码确认"
          :rules="[{ required: true, message: '请填写密码确认' },
            { validator, message: '两次密码不一致'}]"
      />
      <div style="color: cornflowerblue;font-size: 0.35rem;margin-left: 0.52rem;margin-top: 0.2rem;"
           @click="$router.push('/login')">
        已有登录账号
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
                    style="background-color:rgb(27, 174, 174);border-color: rgb(27, 174, 174)">注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import register from "@/api/user/register";
import {Toast} from "vant";

export default {
  name: "register",
  data() {
    return {
      username: '',
      password: '',
      rePassword: '',
      pattern: /^1[13456789]\d{9}$/,
      passwordPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\W]{6,}$/
    }
  },
  methods: {
    onSubmit(value) {
      register({
        "loginName": value.username,
        "passwordMd5": this.$md5(value.password)
      }).then(res => {
        const {resultCode} = res.data
        if (resultCode === 200) {
          Toast('注册成功')
          this.$router.push('/login')
        }
      })
    },
    validator() {
      if (this.rePassword !== this.password) {
        return false
      } else {
        return true
      }
    },
  }
}
</script>

<style scoped>

</style>
