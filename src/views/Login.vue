<!--  -->
<template>
  <div class="wrapper">
    <div
      style="
        margin: 200px auto;
        background-color: #fff;
        width: 350px;
        height: 300px;
        padding: 20px;
        border-radius: 10px;
      "
    >
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>登录</b>
      </div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input
            size="medium"
            v-model="user.username"
            style="margin: 10px 0"
            prefix-icon="el-icon-user"
          ></el-input></el-form-item
        ><el-form-item prop="password">
          <el-input
            size="medium"
            v-model="user.password"
            show-password
            style="margin: 10px 0"
            prefix-icon="el-icon-lock"
          ></el-input
        ></el-form-item>
        <div style="margin: 10px 0; text-align: right">
          <el-button type="primary" autocomplete="off" @click="login"
            >登录</el-button
          >
          <el-button type="warning" autocomplete="off" @click="$router.push('/register')">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setRoutes } from '@/router';
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
      },
    };
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.request.post('/user/login', this.user).then((res) => {
            if (res.code === '200') {
                localStorage.setItem("user",JSON.stringify(res.data))
                localStorage.setItem("menus",JSON.stringify(res.data.menus))
                setRoutes()
              this.$router.push('/');
              this.$message.success('登录成功');
            } else {
              this.$message.error('用户名或密码错误');
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
