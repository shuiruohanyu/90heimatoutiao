<template>
  <el-card v-loading="loading">
      <bread-crumb slot='header'>
        <template slot='title'>
            发布文章
        </template>
      </bread-crumb>
      <!-- 容器 -->
      <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
          <el-form-item prop="title" label="标题">
              <el-input v-model="formData.title" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
                <quill-editor
                v-model="formData.content"
                style="height:300px"
                ></quill-editor>
          </el-form-item>
          <el-form-item style="margin-top:120px"  prop="cover" label="封面">
              <el-radio-group @change="changeType"  v-model="formData.cover.type">
                  <!-- // 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 封面组件 -->
          <cover-image @selectTwoImg="receiveImg" :list="formData.cover.images"></cover-image>
          <el-form-item prop="channel_id" label="频道">
              <el-select v-model="formData.channel_id">
                  <el-option v-for="item in channels" :value="item.id" :label="item.name" :key="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="publishArticle()" type='primary'>发布</el-button>
              <el-button @click="publishArticle(true)">存入草稿</el-button>
              <el-button @click="preview()">预览</el-button>

          </el-form-item>
      </el-form>
      <el-dialog width="375px" :visible="dialogPreview" modal @close="dialogPreview=false">
      <el-row type="flex" justify="center">
        <div class="back">
            <!-- 标题 -->
          <div class="title">{{ formData.title }}</div>
          <!-- 内容 -->
          <div class="content" v-html="formData.content"></div>
        </div>
      </el-row>
    </el-dialog>
  </el-card>
</template>

<script>
import { getChannels } from '../../actions/articles'
export default {
  data () {
    return {
      loading: false,
      channels: [], // 接收频道数据
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 放置封面地址的数组
        },
        channel_id: null // 频道id
      },
      publishRules: {
        //   校验规则 title/content/channel_id 必填项
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }, {
          min: 5,
          max: 30,
          message: '标题的长度在5到30个字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '文章频道不能为空', trigger: 'blur' }]
      },
      dialogPreview: false // 预览
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  //   next()
  // },
  watch: {
    // 处理 两个地址对应同一个组件跳转的时候 组件不销毁 但是数据没有重置的问题
    $route: function (to, from) {
      if (to.params.articleId) {
        // 是修改
      } else {
        // 是发布
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 放置封面地址的数组
          },
          channel_id: null // 频道id
        }
      }
    }
    // // 监听 封面类型的改变
    // 'formData.cover.type': function () {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = [] // 无图或者自动
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = [''] // 单图
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', ''] // 3图
    //   }
    // }
  },
  methods: {
    preview (obj) {
      this.dialogPreview = true
    },
    // 接收子组件数据
    receiveImg (url, index) {
      // 现在拿到的url地址 还要拿到下标
      // 但是要改的是数组
      // this.formData.cover.images[index] = url //  这种写法 错误!!!!! 不能保证每次都成功
      // 响应式数据 => 数据变化 => 视图变化
      // 数据变化 =>vuejs => 检测到了数据变化 =>vuejs 对于数组的检测变化 不能通过索引来处理
      // Vuejs会检测到 新数组 替换原数组 => 进行响应式更新
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (index === i) {
      //     // 说明找到了要替换的地址
      //     return url
      //   }
      //   // 如果没找到 要直接返回原来的数据
      //   return item
      // })
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = [] // 无图或者自动
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 3图
      }
    },
    //   获取所有的频道
    async getChannels () {
      let result = await getChannels()
      this.channels = result.data.channels
    },
    // 发布文章 发布到草稿 /正式文章
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          // 判断是修改还是发布文章
          let { articleId } = this.$route.params // 获取动态路由参数
          this.$axios({
            url: articleId ? `/articles/:articleId` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft, articleId }, // 查询参数
            data: this.formData // 请求体参数
          }).then(result => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 跳转到文章列表页
            this.$router.push('/home/articles')
          })
          // if (articleId) {
          //   // 修改文章接口
          //   this.$axios({
          //     url: `/articles/${articleId}`,
          //     params: { draft }, // 查询参数
          //     data: this.formData // 请求体参数
          //   }).then(result => {
          //     this.$message({
          //       type: 'success',
          //       message: '保存成功'
          //     })
          //     // 跳转到文章列表页
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   // 调用发布接口
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft }, // 查询参数
          //     data: this.formData // 请求体参数
          //   }).then(() => {
          //     this.$message({
          //       type: 'success',
          //       message: '保存成功'
          //     })
          //     // 跳转到文章列表页
          //     this.$router.push('/home/articles')
          //   })
          // }
        }
      })
    },
    // 通过id查询文章数据
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.loading = false
        this.formData = result.data // 将数据赋值data
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params // 获取动态路由参数
    articleId && this.getArticleById(articleId) // 如果文章id存在 直接查询文章的数据
  }
}
</script>

<style lang='less' scoped>
 /deep/ .el-dialog {
    background-color: transparent !important;
    .el-dialog__headerbtn .el-dialog__close::before {
      color:#fff
    }
  }
  .back {
    width: 375px;
    height: 667px;
    background-repeat: no-repeat;
    border: 10px solid #000;
    border-radius: 30px;
    background-color: #fff;
    overflow-x:hidden;
    overflow-y: auto;
      box-sizing: border-box;

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
      height: 80% ;
       white-space: pre-wrap;
    word-break: break-all;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
    /deep/ code{
      white-space: pre-wrap;
    }
    }
  }
</style>
