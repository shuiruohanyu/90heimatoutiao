<template>
  <el-card>
      <!-- 头部内容 -->
      <bread-crumb slot="header">
        <template slot="title">
           素材管理
        </template>
      </bread-crumb>
      <!-- 标签页 -->
      <el-tabs v-model="activeName">
          <!-- 标签 -->
          <el-tab-pane label="全部图片" name="all">全部</el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect">收藏</el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all' // 当前选中的标签
    }
  }
}
</script>

<style>

</style>
