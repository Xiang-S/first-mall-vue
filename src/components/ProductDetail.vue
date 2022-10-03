<template>
  <div style="background-color:#F8F8F8;height: 100vh">
    <van-row type="flex" justify="center">
      <van-col span="22">
        <img v-lazy="baseApi + goodsCoverImg" style="border-radius: 0.21333rem;width: 9rem;height: 9rem"/>
      </van-col>
      <van-col span="22" offset="4"
               style="background-color:#FFFFFF;border-radius: 0.21333rem;padding: 0.3rem;color: #333;font-size: 0.5rem;margin: 0.3rem 0rem;">
        <van-card
            :price="sellingPrice"
            :desc="goodsIntro"
            :title="goodsName"
            :origin-price="originalPrice"
            style="background-color:#FFFFFF;"
        />
      </van-col>
      <!--      <van-swipe :autoplay="3000">-->
      <!--        <van-swipe-item v-for="(image, index) in goodsCarouselList" :key="index">-->
      <!--          <img v-lazy="baseApi + image"/>-->
      <!--        </van-swipe-item>-->
      <!--      </van-swipe>-->
      <van-col>
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服"/>
          <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/cart')"/>
          <van-goods-action-button color="#7232dd" type="danger" text="加入购物车" @click="show = true"/>
          <van-goods-action-button color="#7232dd" type="danger" text="立即购买" @click="show = true"/>
        </van-goods-action>
      </van-col>
    </van-row>
    <van-sku
        v-model="show"
        :goods="goods"
        :sku="sku"
        :hide-stock="true"
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
        @stepper-change="changeNum"
    />
  </div>
</template>

<script>
import getGoodsDetail from "@/api/goods/getGoodsDetail";
import addCart from "@/api/shoppingCart/addCart";
import {Toast} from "vant";

export default {
  name: "ProductDetail",
  data() {
    return {
      goodsId: '',
      goodsName: '',
      goodsIntro: '',
      goodsCoverImg: '',
      sellingPrice: 0,
      tag: '',
      goodsCarouselList: [],
      originalPrice: 0,
      goodsDetailContent: '',
      baseApi: this.$baseApi,
      show: false,
      num: 1,
      goods: {
        picture: ''
      },
      sku: {
        tree: [],
        list: [],
        price: '', // 默认价格（单位元）
        none_sku: true,
        stock_num: 1000
      }
    }
  },
  methods: {
    onBuyClicked() {

    },
    onAddCartClicked() {
      console.log(this.num)
      addCart({
        "goodsCount": this.num,
        "goodsId": this.goodsId
      }).then(res => {
        const {resultCode,message} =res.data
        if(resultCode === 200){
          Toast('加入购物车成功')
          this.$router.go(0)
        }else {
          Toast(message)
        }
      })
    },
    changeNum(val) {
      this.num = val
      this.sku.price = this.sellingPrice * val
    }
  },
  mounted() {
    getGoodsDetail(this.$route.query.id).then(res => {
      const {resultCode, data} = res.data
      if (resultCode === 200) {
        const {
          goodsId, goodsName, goodsIntro, goodsCoverImg, sellingPrice,
          tag, goodsCarouselList, originalPrice, goodsDetailContent
        } = data
        this.goodsId = goodsId
        this.goodsName = goodsName
        this.goodsIntro = goodsIntro
        this.goodsCoverImg = goodsCoverImg
        this.goods.picture = this.$baseApi + goodsCoverImg
        this.sellingPrice = sellingPrice
        this.sku.price = sellingPrice
        this.tag = tag
        this.goodsCarouselList = goodsCarouselList
        this.originalPrice = originalPrice
        this.goodsDetailContent = goodsDetailContent
      }
    })
  }
}
</script>

<style scoped>

</style>
