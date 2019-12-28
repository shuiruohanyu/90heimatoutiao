<template>
  <div class='layout-aside'>
      <div class='title'>
          <img :src="collapse ? smallImg : bigImg" alt="">
      </div>
      <!-- 左侧导航组件  开启路由 :router="true" 或者 router-->
      <el-menu :collapse="collapse" router background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
          <!-- 没有折叠选项 -->
          <el-menu-item index="/home">
          <i class='el-icon-s-home'></i>
          <span>首页</span></el-menu-item>
          <!-- 二级折叠菜单 -->
          <el-submenu index="1">
              <!-- 具名插槽 -->
              <template  slot='title'>
                    <i   class='el-icon-document-copy'></i>
                 <span>内容管理</span>
              </template>
              <!-- 匿名插槽 -->
             <el-menu-item index="/home/publish">发布文章</el-menu-item>
             <el-menu-item index="/home/articles">文章列表</el-menu-item>
             <el-menu-item index="/home/comment">评论管理</el-menu-item>
             <el-menu-item index="/home/material">素材管理</el-menu-item>

          </el-submenu>
          <el-submenu index="2">
              <!-- 具名插槽 -->
              <template slot='title'>
                <i class='el-icon-female'></i>
                 <span >粉丝管理</span>
              </template>
              <!-- 匿名插槽 -->
             <el-menu-item index="/home/picture">图文数据</el-menu-item>
             <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
             <el-menu-item index="/home/fanspicture">粉丝画像</el-menu-item>
             <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="/home/account">
          <i class='el-icon-s-custom'></i>
          <span>账户信息</span>
          </el-menu-item>

      </el-menu>
  </div>
</template>

<script>
export default {
  props: ['collapse'],
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang='less' scoped>
 .layout-aside {
    //  width: 230px;
     .el-menu {
       border-right:none;
     };
     .title {
         background-color: #2e2f32;
         text-align: center;
         padding: 10px 0;
         img {
             height: 35px;
         }
     }
 }
</style>
