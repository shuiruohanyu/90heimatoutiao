<template>
  <!-- 卡片组件 -->
  <el-card  v-loading="loading">
    <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">评论管理</template>
    </bread-crumb>
    <!-- el-table -->
    <!-- 表格 -->
    <el-table :data="list">
      <!-- 放置列组件 width宽度 label表头 prop 字段名 -->
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <!-- 作用域插槽 -->
          <el-button size="small" type="text">修改</el-button>
          <!-- 需要根据状态来进行判断是关闭还是打开 -->
          <el-button
            @click="openOrCloseState(obj.row)"
            size="small"
            type="text"
          >{{ obj.row.comment_status ? '关闭' : '打开' }}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type='flex' justify="center" align="middle" style="height:80px">
      <!-- 分页组件 total 总页码  每页多少条-->
      <el-pagination background layout="prev, pager, next"
       :current-page="page.currentPage"
       :page-size="page.pageSize"
       :total="page.total"
       @current-change="changePage"
       ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 定义一个数据接收返回结果
      loading: false, // 默认不打开进度条
      page: {
        total: 0,
        pageSize: 10, // 默认每页条数为10
        currentPage: 1 // 默认页码为1
      } // 专门存放分页信息数据
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage // 最新的页码
      this.getComment()
    },
    async getComment () {
      this.loading = true // 打开进度条
      let result = await this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      })
      this.list = result.data.results
      this.page.total = result.data.total_count // 总条数
      this.loading = false
    },
    // 定义一个格式化的函数
    formatterBoolean (row, column, cellValue, index) {
      // row => 当前行数据
      // column => 当前列信息
      // celllValue => 当前的单元格的值
      // index 索引
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭评论
    async openOrCloseState (row) {
      // 直接调用接口
      let mess = row.comment_status ? '关闭' : '打开'
      try {
        await this.$confirm(`您是否确定要${mess}评论吗`, '提示')
        await this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status } // 因为当前如果是打开 ,就要关闭 如果是关闭 就要打开
        })
        this.getComment() // 重新拉取评论管理数据
      } catch (error) {

      }
    }
  },
  created () {
    this.getComment() // 获取数据
  }
}
</script>

<style>
</style>
