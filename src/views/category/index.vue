<template>
    <div>
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
      </van-sidebar>
    </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeKey: 0,
    };
  },
}
</script>

<style scoped>

</style>
