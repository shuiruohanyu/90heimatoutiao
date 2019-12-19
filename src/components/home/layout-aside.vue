<template>
  <div class='layout-aside'>
      <div class='title'>
          <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 左侧导航组件  开启路由 :router="true" 或者 router-->
      <el-menu  router background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
          <!-- 没有折叠选项 -->
          <el-menu-item index="/home">首页</el-menu-item>
          <!-- 二级折叠菜单 -->
          <el-submenu index="1">
              <!-- 具名插槽 -->
              <span slot='title'>内容管理</span>
              <!-- 匿名插槽 -->
             <el-menu-item index="/home/publish">发布文章</el-menu-item>
             <el-menu-item index="/home/articles">文章列表</el-menu-item>
             <el-menu-item index="/home/comment">评论管理</el-menu-item>
             <el-menu-item index="/home/material">素材管理</el-menu-item>

          </el-submenu>
          <el-submenu index="2">
              <!-- 具名插槽 -->
              <span slot='title'>粉丝管理</span>
              <!-- 匿名插槽 -->
             <el-menu-item index="/home/picture">图文数据</el-menu-item>
             <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
             <el-menu-item index="/home/fanspicture">粉丝画像</el-menu-item>
             <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="/home/userinfo">账户信息</el-menu-item>

      </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
 .layout-aside {
     width: 230px;
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
