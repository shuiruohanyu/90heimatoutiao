<template>
 <el-carousel height="500px" type="card" :interval="5000" arrow="always">
    <el-carousel-item  v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: ['http://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b21c8701a18b87d608167af6050828381e30fd87.jpg', 'http://file.mumayi.com/forum/201401/16/202014h22z6jt6vpajypd0.jpg', 'http://g.hiphotos.baidu.com/zhidao/pic/item/fd039245d688d43f499c5b3e7f1ed21b0ff43bc1.jpg']
    }
  }
}
</script>

<style>

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
