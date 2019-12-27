<template>
  <div class='cover-image'>
    <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class='cover-image-item'>
      <img :src="item ? item : defaultImg" alt="">
    </div>
    <!-- 放置一个对话框 -->
    <el-dialog :visible="dialogVisible" @close="closeDialog" >
          <!-- 放置另外一个组件 素材库组件 和上传组件 -->
          <!-- 监听谁的事件就在谁的标签上写监听 -->
           <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 用来控制弹层的开关
      selectIndex: -1 // 用来存储点击的哪个图片的下标
    }
  },
  methods: {
    // 接收方法
    receiveImg (url) {
      // props  只能读取 不能修改
      this.$emit('selectTwoImg', url, this.selectIndex) // 再次传递
      this.closeDialog() // 关闭弹层
    },
    openDialog (index) {
      this.dialogVisible = true // 打开弹层
      this.selectIndex = index // 记录当前点击的是哪个图片
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
