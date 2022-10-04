<template>
  <div>
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">系统登陆</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placehoder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="text" auto-complete="off" placehoder="请输入用密码"></el-input>
      </el-form-item>

      <el-checkbox v-model="checked" class="loginRemember"></el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
import {postKeyValueRequest} from "@/utils/api";

export default {
  name: "Login",
  data(){
    return {
      loginForm: {
        username: 'admin',
        password: '123',
      },
      checked: true,
      rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入用密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitLogin(){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          //alert('登陆成功!');
          //console.log(this.loginForm)
          postKeyValueRequest('/doLogin', this.loginForm).then(resp=>{
            if (resp) {
              alert(JSON.stringify(resp))
            }
          })
        } else {
          this.$message.error('请输入所有字段');
          return false;
        }
      });
    }
  }
}
</script>

<style>
  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto ;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .loginTitle {
    margin: 15px auto 20px auto;
    text-align: center;
    color: #505498
  }

  .loginRemember {
    text-align: left;
    margin: 0px 0px 15px 0px;
  }

</style>