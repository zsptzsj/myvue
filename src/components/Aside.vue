<!--
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-05 08:05:22
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-10 09:05:24
 * @FilePath: \vue\src\components\Aside.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 侧边栏 -->
<template>
  <div style="height: 100%">
    <el-menu
      :default-openeds="opens"
      style="min-height: 100%; overflow-x: hidden; border: 0"
      background-color="rgb(48,65,86)"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      :collapse="isCollapse"
      router
      @select="handleSelect"
    >
      <div style="height: 60px; line-height: 60px; text-align: center">
        <img
          src="../assets/logo.png"
          alt=""
          style="width: 20px; position: relative; top: 5px; margin-right: 5px"
        />
        <b style="color: white" v-show="logoTextShow">后台管理系统</b>
      </div>
      <div v-for="item in menus" :key="item.id">
        <div v-if="item.path">
          <el-menu-item :index="item.path"
            ><i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </div>
        <div v-else>
          <el-submenu :index="item.id+''">
            <template slot="title"
              ><i :class="item.icon"></i
              ><span slot="title" v-show="logoTextShow">{{ item.name }}</span></template
            >
            <div v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.path"
                ><i :class="subItem.icon"></i>
                <span slot="title">{{ subItem.name }}</span>
              </el-menu-item>
            </div>
          </el-submenu>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus:localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")):[],
      opens:localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")).map(v => v.id +''):[],
    };
  },
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
  methods: {
    handleSelect(index) {},
  },
};
</script>

<style scoped></style>
