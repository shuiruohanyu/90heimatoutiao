<template>
  <div class="login">
    <!-- 放置一个el-card组件 -->
    <el-card class='login-card'>
      <!-- 放置标题图片 -->
      <div class='title'>
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 放置表单  el-form model  绑定数据对象 -->
      <el-form ref="myForm" :model="loginForm" :rules="loginRules">
        <!-- 表单域 里面  prop要写要检验的字段名  放置 input/select/checkbox 相当于一行-->
        <el-form-item prop="mobile">
           <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 表单域 -->
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:65%" placeholder="验证码"></el-input>
            <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <!-- 复选框 -->
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选 同意被坑
      },
      loginRules: {
        // 验证规则对象 key(字段名):value(规则 => [])
        mobile: [{ required: true, message: '请输入您的手机号', trigger: 'blur' }, {
          pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        code: [{ required: true, message: '请输入你的验证码', trigger: 'blur' }, {
          pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur'
        }],
        check: [{ validator: function (rule, value, callback) {
          // 自定义校验函数
          // rule 规则 没啥用
          // value 要校验的字段的  值
          // callback 是一个回调函数
          if (value) {
            // 认为已经勾选
            callback() // 认为当前的规则校验通过了
          } else {
            // 认为没有勾选
            callback(new Error('您应该同意我们的霸王条款,让我们欺负你')) // 如果没有勾选 认为当前校验失败 应该停止
          }
        } }]

      }
    }
  },
  methods: {
    submitLogin () {
    //  手动校验
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          //  说明校验通过  应该调用登录接口
          // axios  body参数 get参数地址参数 路由参数  查询参数
          // body参数 axios  data
          // get参数  axios params
          this.$axios({
            url: '/authorizations', // 请求地址 axios 没有指定 类型 默认走get类型
            method: 'post', // 类型
            data: this.loginForm // body 参数
          }).then(result => {
            // 只接受正确结果
            // 前端缓存 登录成功返回给我们的令牌
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/home') // 跳转到home页
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .login  {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before {
     background-image: url('../../assets/img/back.jpg');
     background-size: cover;
     filter: blur(10px);
     content: '';
     width:100%;
     height: 100%;
     left:0;
     top:0;
     position: absolute;

    }
    .login-card {
      width: 440px;
      height: 350px;
      z-index: 2;
      background-color: transparent;
      .title {
        text-align: center;
        margin-bottom: 30px;
        img {
          height: 45px;
        }
      }
    }
  }
</style>
