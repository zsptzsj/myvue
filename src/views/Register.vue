<!--
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-07 00:35:34
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-07 01:06:09
 * @FilePath: \vue\src\views\Register.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 注册  -->
<template>
  <div class="wrapper">
    <div
      style="
        margin: 100px auto;
        background-color: #fff;
        width: 350px;
        height: 400px;
        padding: 20px;
        border-radius: 10px;
    "
    >
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>注册</b>
      </div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input
          placeholder="请输入账号"
            size="medium"
            v-model="user.username"
            style="margin: 5px 0"
            prefix-icon="el-icon-user"
          ></el-input> </el-form-item
        ><el-form-item prop="password">
          <el-input
          placeholder="请输入密码"
            size="medium"
            v-model="user.password"
            show-password
            style="margin: 5px 0"
            prefix-icon="el-icon-lock"
          ></el-input
        ></el-form-item>
        <el-form-item prop="confirmpassword">
          <el-input
            placeholder="请确认密码"
            size="medium"
            v-model="user.confirmpassword"
            show-password
            style="margin: 5px 0"
            prefix-icon="el-icon-lock"
          ></el-input
        ></el-form-item>
        <div style="margin: 10px 0; text-align: right">
          <el-button type="primary" autocomplete="off" @click="login"
            >注册</el-button
          >
          <el-button
            type="warning"
            autocomplete="off"
            @click="$router.push('/login')"
            >返回登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        confirmpassword: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if(this.user.password!==this.user.confirmpassword){
            this.$message.error('两次输入密码不一致');
            return false;
          }
          this.request.post('/user/register', this.user).then((res) => {
            if (res.code === '200') {
              this.$message.success('注册成功');
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #fc4668, #3f5ef8);
  overflow: hidden;
}
</style>
