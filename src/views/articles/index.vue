<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 表单容器 -->
    <el-form style="padding-left:50px">
      <el-form-item label="文章状态:">
        <!-- 放置一个单选组  文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部-->
        <!-- 第一种 用监听组件的形式去做搜索 -->
        <!-- <el-radio-group v-model="searchForm.status" @change="changeCondition">
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>-->
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
        <!-- 第一种 用监听组件的形式去做搜索 -->
        <!-- <el-select @change="changeCondition" placeholder="请选择频道" v-model="searchForm.channel_id">
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>-->
        <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
          <!-- el-option label是显示值 value是存储值 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <!-- 日期选择器 日期范围-->
        <!-- 第一种 用监听组件的形式去做搜索 -->
        <!-- <el-date-picker @change="changeCondition" value-format="yyyy-MM-dd" v-model="searchForm.dateRange" type="daterange"></el-date-picker> -->
        <el-date-picker value-format="yyyy-MM-dd" v-model="searchForm.dateRange" type="daterange"></el-date-picker>
      </el-form-item>
    </el-form>
    <el-row class="total" type="flex" align="middle">
      <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
      <!-- 左侧 -->
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
        <div class="info">
          <span>{{ item.title }}</span>
          <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
          <el-tag :type="item.status | filterType" class="tag">{{ item.status | filterStatus }}</el-tag>
          <span class="date">{{ item.pubdate }}</span>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <span @click="preview(item)">
          <i class="el-icon-video-play"></i>预览
        </span>

        <span @click="$router.push(`/home/publish/${item.id.toString()}`)">
          <i class="el-icon-edit"></i>修改
        </span>
        <!-- 注册删除按钮事件 -->
        <span @click="delMaterial(item.id)">
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <el-row type="flex" justify="center" align="middle" style="height:60px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
      ></el-pagination>
    </el-row>

  </el-card>
</template>

<script>
/******
 * author gaoly
 * created by 2019-12-21
 * modify  by liun
 * ********/
import { getArticles, getChannels } from '../../actions/articles'
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认应该选中全部
        channel_id: null, // 默认不选中任何一个分类
        dateRange: [] // 日期范围
      },
      channels: [], // 接收频道数据
      list: [],
      defaultImg: require('../../assets/img/default.jpg'), // 默认图片
      backImg: require('../../assets/img/wap-preview.png'),
      page: {
        currentPage: 1,
        pageSize: 10, // 黑马头条后端限制 最低10条 => 文章列表
        total: 0
      }
    }
  },
  watch: {
    searchForm: {
      handler: function () {
        // 此时数据已经变成最新的了
        // this 指向组件实例
        this.changeCondition() // 直接调用条件改变的方法
      },
      deep: true
    }
  },
  filters: {
    //   过滤器第一个参数 是value
    filterStatus (value) {
      //  文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      //  文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 预览
    preview (obj) {
      this.previewObj = obj
      this.dialogPreview = true
    },
    // 去修改页面 => 实际上就是发布页面
    toModify (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 删除文章
    async delMaterial (id) {
      await this.$confirm('是否要删除该文章?')
      // 调用删除接口
      await this.$axios({
        method: 'delete',
        url: `/articles/${id.toString()}`
      })
      // 提示
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      // 重新拉取数据
      // this.page.currentPage = 1 // 根据业务 处理 如果删除了数据 是否回到第一页根据具体业务而定
      this.getConditionArticle()
    },
    //   改变页码方法
    changePage (newPage) {
      this.page.currentPage = newPage // 最新页码
      this.getConditionArticle() // 调用获取文章数据
    },
    //   改变条件
    changeCondition () {
      this.page.currentPage = 1 // 强制将页码重置第一页
      this.getConditionArticle() // 调用获取文章数据
    },
    getConditionArticle () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 因为5是前端定义的一个标识, 如果等于5 表示查全部, 全部应该什么都不传 直接传null
        channel_id: this.searchForm.channel_id,
        begin_pubdate:
          this.searchForm.dateRange && this.searchForm.dateRange.length
            ? this.searchForm.dateRange[0]
            : null, // 开始时间
        end_pubdate:
          this.searchForm.dateRange && this.searchForm.dateRange.length > 1
            ? this.searchForm.dateRange[1]
            : null // 截止时间
      }
      // 加上一个非空处理
      this.getArticles(params)
    },
    //   获取所有的频道
    async getChannels () {
      let result = await getChannels()
      this.channels = result.data.channels
    },
    // 获取文章列表数据
    async getArticles (params) {
      let result = await getArticles(params) // 调用获取文章模块
      this.list = result.data.results // 获取文章列表数据
      this.page.total = result.data.total_count // 总数
    }
  },
  created () {
    this.getChannels() // 获取文章数据
    this.getArticles({ page: 1, per_page: 10 }) // 获取文章列表数据
  }
}
</script>

<style lang='less' scoped>
.articles {

  .back {
    width: 375px;
    height: 667px;
    background-repeat: no-repeat;
    border: 10px solid #000;
    border-radius: 30px;
    background-color: #fff;
    .title {
       font-size: 20px;
       font-weight: bold;
       padding:  20px;
    }
    .date {
      font-size: 12px;
      color: #999;
      padding:  20px;
    }
    .content {
      padding: 20px;
    }
  }
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
          font-size: 12px;
        }
        .tag {
          text-align: center;
          width: 60px;
        }
      }
    }
    .right {
      span {
        font-size: 14px;
        margin-right: 8px;
        cursor: pointer;
      }
    }
  }
}
</style>
