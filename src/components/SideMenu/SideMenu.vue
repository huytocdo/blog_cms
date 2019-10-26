<template>
  <el-aside :width="!isCollapse ? '250px' : '64px'" class="aside-menu">
    <el-custom-menu 
    :default-active="$route.path" 
    :collapse="isCollapse"
    :collapseTransition="false"
    :router="true"
    menu-trigger="click"
    background-color="rgba(0,0,0,0.3)"
    text-color="#fff"
    hover-background-color="rgb(60, 72, 88, .3)"
    active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title" >
          <i class="el-icon-notebook-2"></i>
          <span slot="title" >Bài Viết</span>
        </template>
        <el-menu-item index="/dashboard/post/create">
          <i class="el-icon-plus"></i>
          <span>Tạo bài viết mới</span>
        </el-menu-item>
        <el-menu-item index="/dashboard/post">
          <i class="el-icon-menu"></i>
          <span>Quản lý</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-collection"></i>
          <span slot="title">Category</span>
        </template>
        <el-menu-item index="/dashboard/create-new-category">
          <i class="el-icon-plus"></i>
          <span>Tạo category mới</span>
        </el-menu-item>
        <el-menu-item index="/dashboard/category-list">
          <i class="el-icon-menu"></i>
          <span>Quản lý</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-picture-outline-round"></i>
          <span slot="title">Image</span>
        </template>
        <el-menu-item index="/dashboard/upload-image">
          <i class="el-icon-plus"></i>
          <span>Upload image mới</span>
        </el-menu-item>
        <el-menu-item index="/dashboard/image-list">
          <i class="el-icon-menu"></i>
          <span>Quản lý</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item @click="logout" index="/logout">
        <i class="el-icon-close"></i>
        <span>Đăng xuất</span>
      </el-menu-item>
    </el-custom-menu>
  </el-aside>
</template>

<script>
import { Aside, Submenu, MenuItem, MenuItemGroup } from 'element-ui';
import Menu from './CustomMenuElementUI.vue';
export default {
  components: {
    elAside: Aside,
    elCustomMenu: Menu,
    elSubmenu: Submenu,
    elMenuItem: MenuItem,
    elMenuItemGroup: MenuItemGroup
  },
  props: ['isCollapse', 'logout'],
  methods: {

  }
}
</script>

<style scoped>
  .aside-menu {
    background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(~@/assets/sidebar-1.jpg) top center;
  }
  .el-menu {
    border-right: none;
  }
  .el-menu--popup {
    padding: 0;
  }
</style>