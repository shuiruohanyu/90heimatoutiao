<template>
  <el-card class='articles'>
      <bread-crumb slot='header'>
         <template slot='title'>文章列表</template>
      </bread-crumb>
      <!-- 表单容器 -->
      <el-form style="padding-left:50px">
          <el-form-item label="文章状态:">
              <!-- 放置一个单选组  文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部-->
              <el-radio-group v-model="searchForm.status">
                  <!-- label -->
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表:">
              <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                  <!-- el-option label是显示值 value是存储值 -->
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="时间选择:">
              <!-- 日期选择器 日期范围-->
              <el-date-picker v-model="searchForm.dateRange" type="daterange"></el-date-picker>
          </el-form-item>
      </el-form>
      <el-row class='total' type='flex' align="middle">
          <span>
              共找到10000条符合条件的内容
          </span>
      </el-row>
      <div class='article-item' v-for="item in 100" :key="item">
          <!-- 左侧 -->
          <div class='left'>
              <img src="../../assets/img/default.jpg" alt="">
              <div class='info'>
                  <span>90期的弟弟们，哈哈哈啊哈哈哈嗝</span>
                  <el-tag class='tag'>标签一</el-tag>
                  <span class='date'>2019-12-24 15:07:01</span>
              </div>
          </div>
          <!-- 右侧 -->
          <div class='right'>
              <span><i class="el-icon-edit"></i>修改</span>
              <span><i class="el-icon-delete"></i>删除</span>
          </div>
      </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认应该选中全部
        channel_id: null, // 默认不选中任何一个分类
        dateRange: [] // 日期范围
      },
      channels: [] // 接收频道数据
    }
  },
  methods: {
    //   获取所有的频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels() // 获取文章数据
  }
}
</script>

<style lang='less' scoped>
  .articles {
      .total {
          height: 60px;
          border-bottom: 1px dashed #ccc;
      }
      .article-item {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid #f2f3f5;
          .left {
              display: flex;
              img {
                  width: 180px;
                  height: 100px;
                  border-radius: 4px;
              }
              .info {
                  height: 100px;
                  margin-left: 10px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  .date {
                      color: #999;
                      font-size:12px;
                  }
                  .tag {
                      text-align: center;
                      width:60px;
                  }
              }
          }
          .right {
              span {
                  font-size:14px;
                  margin-right: 8px;
                  cursor: pointer;
              }
          }
      }
  }
</style>
