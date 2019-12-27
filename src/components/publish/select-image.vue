<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <!-- 外层容器 -->
      <div class="select-image-list">
        <!-- 循环生成多个el-card -->
        <el-card v-for="item in list" :key="item.id" class="img-card">
            <!-- 给图片注册点击事件 -->
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <!-- 放置一个分页组件 -->
      <el-row type="flex" justify="center">
        <el-pagination background layout="prev, pager, next"
         :total="page.total"
         :current-page="page.currentPage"
         :page-size="page.pageSize"
         @current-change="changePage"
         ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <!-- 给action不报错 -->
      <el-upload action="" :http-request="uploadImg" class='upload-img' :show-file-list="false">
        <i class='el-icon-plus'></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选中是素材库
      list: [], // 接收素材管理的数据
      page: {
        currentPage: 1, // 默认请求页码
        pageSize: 8,
        total: 0 // 总页码
      }
    }
  },
  methods: {
    // 上传组件方法
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file) // 加入参数
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        // result.data.url
        this.$emit('selectOneImg', result.data.url) // 自定义事件名 可以不用全小写了
      })
    },
    //   点击图片时触发
    clickImg (url) {
      //  点击图片时  => 要把图片传给显示的封面 自定义事件
      this.$emit('selectOneImg', url) // 自定义事件名 可以不用全小写了
    },
    //   改变页码事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    //   获取所有素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 获取总数
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
.select-image-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-card {
    width: 150px;
    height: 150px;
    margin: 20px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.upload-img {
  display: flex;
  justify-content: center;
  i {
    font-size:50px;
    padding: 50px;
    border:1px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
