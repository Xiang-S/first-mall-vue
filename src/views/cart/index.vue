<template>
  <div>
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <van-swipe-cell v-for="item in cartList">
        <van-card
            :price="item.sellingPrice"
            :desc="item.goodsIntro"
            :title="item.goodsName"
            :thumb="$baseApi+ item.goodsCoverImg"
            :tag="item.tag"
            :num="item.goodsCount"
            class="goods-card">
          <template #footer>
            <van-stepper
                v-model="item.goodsCount"
                @change="onChange(item.goodsCount,{id : item.cartItemId})"
                @plus="plus(item)"
                @minus="minus(item)"
            />
          </template>
        </van-card>
        <van-checkbox :name="item.cartItemId"
                      style="position: absolute;top: 0;left: 0"
                      @click="toggle(item.cartItemId,item.sellingPrice*item.goodsCount)">
        </van-checkbox>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="removeItem(item.cartItemId)"/>
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
    <van-submit-bar :price="money*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="toggleAll(checked)">全选</van-checkbox>
      <template #tip>
        左滑删除商品
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import getCartList from "@/api/shoppingCart/getCartList";
import updateCart from "@/api/shoppingCart/updateCart";
import deleteItem from "@/api/shoppingCart/deleteItem";
import {Toast} from "vant";

export default {
  name: "index",
  data() {
    return {
      cartList: [],
      checked: false,
      result: [],
      money: 0
    }
  },
  methods: {
    onChange(value, detail) {
      updateCart({
        "cartItemId": detail.id,
        "goodsCount": value
      }).then(res => {
        // const {resultCode} = res.data
        // if (resultCode === 200) {
        //
        // }
      })
    },
    removeItem(id) {
      deleteItem(id).then(res => {
        const {resultCode} = res.data
        if (resultCode === 200) {
          Toast('删除成功')
          this.getCartList()
        }
      })
    },
    getCartList() {
      getCartList().then(res => {
        const {resultCode, data} = res.data
        if (resultCode === 200) {
          this.cartList = data
        }
      })
    },
    toggleAll(checked) {
      this.money = 0
      this.$refs.checkboxGroup.toggleAll(checked);
      this.result = []
      let money = 0
      if (checked) {
        //计算总金额
        this.cartList.forEach(item => {
          money = money + item.sellingPrice * item.goodsCount
          this.result.push(item.cartItemId)
        })
        this.money = money
      } else {
        this.money = money
      }
    },
    toggle(id, money) {
      let flag = true
      for (let i = 0; i < this.result.length; i++) {
        if (this.result[i] === id) {
          flag = false
          this.money += money
          break
        }
      }
      if (flag) {
        this.money -= money
      }
    },
    plus(item) {
      this.result.forEach(temp => {
        if (item.cartItemId == temp) {
          this.money += Number(item.sellingPrice)
        }
      })
    },
    minus(item) {
      this.result.forEach(temp => {
        if (item.cartItemId == temp) {
          this.money -= Number(item.sellingPrice)
        }
      })
    },
    onSubmit() {
      this.$router.push('/order')
    }
  },
  watch: {
    result() {
      this.checked = (this.result.length === this.cartList.length)
    }
  },
  mounted() {
    this.getCartList()
  }
}
</script>

<style scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>
