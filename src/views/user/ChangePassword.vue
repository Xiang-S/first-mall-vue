<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
          v-model="introduceSign"
          name="introduceSign"
          label="个性签名"
          placeholder="个性签名"
          :rules="[{ required: true, message: '请填写个性签名' },]"
      />
      <van-field
          v-model="nickName"
          name="nickName"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称'}]"

      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' },
            {pattern,message: '密码长度需要6位以上且包含字母和数字'}]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
                    style="background-color:rgb(27, 174, 174);border-color: rgb(27, 174, 174)">修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import updateUserInfo from "@/api/user/updateUserInfo";
import {Toast} from "vant";

export default {
  name: "ChangePassword",
  data() {
    return {
      introduceSign: '',
      nickName: '',
      password: '',
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\W]{6,}$/
    }
  },
  methods: {
    onSubmit(value) {
      updateUserInfo({
        "introduceSign": value.introduceSign,
        "nickName": value.nickName,
        "passwordMd5": this.$md5(value.password)
      }).then(res => {
        const {resultCode} = res.data
        if (resultCode === 200) {
          Toast('修改成功')
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
