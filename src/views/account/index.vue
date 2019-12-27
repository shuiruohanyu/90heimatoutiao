<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot='title'>账户信息</template>
      </bread-crumb>
      <!-- 表单 => 表单容器 -->
      <el-form style="margin-left:100px" label-width="100px">
          <el-form-item label="用户名">
              <el-input style="width:40%"></el-input>
          </el-form-item>
           <el-form-item label="简介">
               <el-input style="width:40%"></el-input>
           </el-form-item>
           <el-form-item label="邮箱">
               <el-input style="width:40%"></el-input>
           </el-form-item>
           <el-form-item label="手机号">
               <el-input disabled style="width:40%"></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type="primary">保存信息</el-button>
           </el-form-item>
      </el-form>
      <!-- 上传组件 -->
      <el-upload class='head-upload' action="" :show-file-list="false">
          <img src="../../assets/img/cat.jpg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
   .head-upload {
      position: absolute;
      right: 300px;
      top:200px;
       img {
          width: 200px;
          height: 200px;
           border-radius: 50%;
       }
   }
</style>
