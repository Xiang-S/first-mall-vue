<template>
  <div>
    <form>
      <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
      />
    </form>
    <van-row>
      <van-card
          v-for="item in searchGoods"
          :price="item.sellingPrice"
          :desc="item.goodsIntro"
          :title="item.goodsName"
          :thumb="$baseApi+ item.goodsCoverImg"
          @click="go(item.goodsId)"
      />
    </van-row>
  </div>
</template>

<script>
import {Toast} from "vant";
import search from "@/api/goods/search";

export default {
  name: "Search",
  data() {
    return {
      value: '',
      searchGoods: []
    };
  },
  methods: {
    onSearch(val) {
      if(val === ''){
        Toast('请输入内容')
      }
      search({
        keyword: val
      }).then(res => {
        const {resultCode, data} = res.data
        if (resultCode === 200) {
          if(data.list.length === 0){
            Toast('没有找到商品')
          }
          this.searchGoods = data.list
        }
      })
    },
    onCancel() {
      this.$router.go(-1)
    },
    go(id){
      this.$router.push({
        path:'productDetail',
        query:{
          id : id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
