<template>
  <div>
    <van-sticky>
      <van-search placeholder="请输入搜索关键词" @click="$router.push('/search')"/>
    </van-sticky>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in carousels" :key="index">
        <img v-lazy="$baseApi + item.carouselUrl" style="width: 100%;"/>
      </van-swipe-item>
    </van-swipe>
    <van-row>
      <van-cell value="热门商品" />
        <van-card
            v-for="item in hotGoods"
            :price="item.sellingPrice"
            :desc="item.goodsIntro"
            :title="item.goodsName"
            :thumb="$baseApi+ item.goodsCoverImg"
            @click="go(item.goodsId)"
        />
      <van-cell value="最新商品" />
      <van-card
          v-for="item in newGoods"
          :price="item.sellingPrice"
          :desc="item.goodsIntro"
          :title="item.goodsName"
          :thumb="$baseApi+ item.goodsCoverImg"
          :tag="item.tag"
          @click="go(item.goodsId)"
      />
      <van-cell value="猜你喜欢" />
      <van-card
          v-for="item in recommendGoods"
          :price="item.sellingPrice"
          :desc="item.goodsIntro"
          :title="item.goodsName"
          :thumb="$baseApi+ item.goodsCoverImg"
          :tag="item.tag"
          @click="go(item.goodsId)"
      />
    </van-row>
  </div>
</template>

<script>
import getIndexInfos from "@/api/index/getIndexInfos";

export default {
  name: "index",
  data() {
    return {
      carousels: [],      //轮播图
      hotGoods: [],       //热门商品
      newGoods: [],       //新品
      recommendGoods: []  //猜你喜欢
    }
  },
  methods:{
    go(id){
      this.$router.push({
        path:'/productDetail',
        query:{
          id : id
        }
      })
    }
  },
  mounted() {
    getIndexInfos().then(res => {
      const {resultCode} = res.data
      const {carousels,hotGoodses,newGoodses,recommendGoodses} = res.data.data
      if (resultCode === 200) {
        this.carousels =carousels
        this.hotGoods = hotGoodses
        this.newGoods = newGoodses
        this.recommendGoods = recommendGoodses
      }
    })
  }
}
</script>

<style scoped>

</style>
