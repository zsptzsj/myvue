<!--
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-01 01:09:53
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-10 04:12:55
 * @FilePath: \vue\src\views\Manage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-01 01:09:53
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-05 08:32:29
 * @FilePath: \vue\src\views\Manage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-container style="height: 100%">
    <el-aside
      :width="sideWidth + 'px'"
      style="
        background-color: rgb(238, 241, 246);
        box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
        min-height: 100vh;
      "
    >
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"></Aside>
    </el-aside>

    <el-container>
      <el-header style="border-bottom: 1px solid #ccc">
        <Header
          :collapseBtnClass="collapseBtnClass"
          :collapse="isCollapse"
          @asideCollapse="collapse"
          :user="user"
        ></Header>
      </el-header>
      <el-main>
        <router-view @refreshUser="getUser"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Aside from '@/components/Aside.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'Manage',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {},
    };
  },
  created(){
    this.getUser()
  },
  components: {
    Aside,
    Header,
  },
  methods: {
    collapse() {
      console.log(this.isCollapse);
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.sideWidth = 64;
        this.collapseBtnClass = 'el-icon-s-unfold';
        this.logoTextShow = false;
      } else {
        this.sideWidth = 200;
        this.collapseBtnClass = 'el-icon-s-fold';
        this.logoTextShow = true;
      }
    },
    getUser() {
      let username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username:""
      this.request.get('/user/username/' + username).then((res) => {
        this.user = res.data;
        console.log("----------------");
        console.log(this.user);

      });
    },
  },
};
</script>

<style></style>
