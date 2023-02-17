<!--
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-05 09:03:06
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-10 08:45:40
 * @FilePath: \vue\src\components\Header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--  -->
<template>
  <div style="line-height: 60px; display: flex">
    <div style="flex: 1; font-size: 18px">
      <span
        :class="collapseBtnClass"
        style="cursor: pointer"
        @click="collapse"
      ></span>

      <el-breadcrumb
        separator="/"
        style="display: inline-block; margin-left: 10px"
      >
        <el-breadcrumb-item :to="'/'" >首页</el-breadcrumb-item>
        <el-breadcrumb-item >{{currentPathName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 150px; cursor: pointer;text-align: right;">
      <div style="display: inline-block;">
      <img :src="user.avatarUrl" alt="" style="width: 30px; height: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px;">
      <span>{{user.nickname}}</span
      ><i class="el-icon-arrow-down" style="margin-left: 5px"></i></div>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center;">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0;"><router-link to="/person" class="size">个人信息</router-link></el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0;">
          <span to="" class="size" @click="logout">退出</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods:{
    collapse(){
      this.$emit("asideCollapse")
    },
    logout(){
      this.$store.commit("logout")
      this.$message.success("退出成功")
    },
  },
  computed:{
    currentPathName(){
        return this.$store.state.currentPathName;
    }
  },
  watch:{
    currentPathName(newVal,oldVal){
        console.log(newVal);
    }
  },
  props: {
    collapseBtnClass: String,
    user: Object,
  },
};
</script>

<style scoped>
.size{
  text-decoration: none; color: #606266;
}
</style>
