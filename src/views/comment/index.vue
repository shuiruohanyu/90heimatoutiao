<template>
  <!-- 卡片组件 -->
  <el-card>
      <bread-crumb slot="header">
        <!-- 插槽内容 -->
         <template slot="title">
             评论管理
         </template>
      </bread-crumb>
      <!-- el-table -->
      <!-- 表格 -->
      <el-table :data="list">
          <!-- 放置列组件 width宽度 label表头 prop 字段名 -->
          <el-table-column prop="title" width="600" label="标题"></el-table-column>
          <el-table-column  :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="obj">
             <!-- 作用域插槽 -->
            <el-button size="small" type="text">修改</el-button>
            <!-- 需要根据状态来进行判断是关闭还是打开 -->
            <el-button  size="small" type="text"> {{ obj.row.comment_status ? '关闭' : '打开' }}评论
</el-button>
            </template>

          </el-table-column>

      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [] // 定义一个数据接收返回结果
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
      })
    },
    // 定义一个格式化的函数
    formatterBoolean (row, column, cellValue, index) {
      // row => 当前行数据
      // column => 当前列信息
      // celllValue => 当前的单元格的值
      // index 索引
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment() // 获取数据
  }
}
</script>

<style>

</style>
