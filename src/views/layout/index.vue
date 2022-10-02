<template>
  <div>
<!--    顶部导航是否显示-->
    <div>
      <van-sticky :offset-top="0">
        <van-nav-bar left-arrow v-if="$route.meta.navBar" @click-left="$router.go(-1)">
          <template #right>
            <van-icon name="ellipsis"/>
          </template>
          <template #title>
            {{ $route.meta.title }}
          </template>
        </van-nav-bar>
      </van-sticky>
    </div>
    <div>
      <router-view/>
    </div>
<!--    底部导航是否显示-->
    <div v-if="$route.meta.TabBar">
      <van-tabbar v-model="active" @change="change">
        <van-tabbar-item icon="home-o" :to="'/home'" name="home">首页</van-tabbar-item>
        <van-tabbar-item icon="search" :to="'/category'" name="category">分类</van-tabbar-item>
        <van-tabbar-item icon="friends-o" :to="'/cart'" name="cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="setting-o" :to="'/user'" name="user">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
      active: 'home'
    }
  },
  created() {
    this.active = localStorage.getItem('active');
  },
  methods:{
    change(val){
      localStorage.setItem('active', val)
    }
  }
}
</script>

<style scoped>

</style>
