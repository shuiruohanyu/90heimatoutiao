<template>
  <div class='cover-image'>
    <div @click="openDialog" v-for="(item,index) in list" :key="index" class='cover-image-item'>
      <img :src="item ? item : defaultImg" alt="">
    </div>
    <!-- 放置一个对话框 -->
    <el-dialog :visible="dialogVisible" @close="closeDialog" title="选择封面图片">
          <!-- 放置另外一个组件 素材库组件 和上传组件 -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false // 用来控制弹层的开关
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true // 打开弹层
    },
    closeDialog () {
      this.dialogVisible = false // 关闭弹层
    }
  }
}
</script>

<style lang='less' scoped>
   .cover-image {
     margin: 20px 100px;
     display: flex;
     .cover-image-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 20px;
       img {
         width: 100%;
         height: 100%;
       }
     }
   }
</style>
