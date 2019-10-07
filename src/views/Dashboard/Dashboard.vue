<template>
  <el-container style="height: 100vh">
    <app-side-menu :isCollapse="isCollapse" />
    <el-container>
      <el-header class="el-header">
        <app-header :toggleCollapse="toggleCollapse" />
      </el-header>
      <el-main class="el-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Container, Main, Header, Table, TableColumn, Dropdown, DropdownItem, DropdownMenu, Aside, Button } from 'element-ui';
import AppSideMenu from '@/components/SideMenu/SideMenu.vue';
import AppHeader from '@/components/Header/Header.vue';
  export default {
    components: {
      elContainer: Container,
      elMain: Main,
      elHeader: Header,
      elTable: Table,
      elTableColumn: TableColumn,
      elDropdown: Dropdown,
      elDropdownMenu: DropdownMenu,
      elDropdownItem: DropdownMenu,
      elAside: Aside,
      appSideMenu: AppSideMenu,
      appHeader: AppHeader
    },
    data() {
      return {
        isCollapse: false
      }
    },
    methods: {
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
      }
    }
  };
</script>

<style>
  .el-header {
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-main {
    background-color: #fff;
    border-radius: 12px 12px 0 0;
    padding: 15px;
    margin: 0 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    height: 100%;
  }
</style>