<template>
  <el-container style="height: 100vh">
    <app-side-menu 
      :isCollapse="isCollapse" 
      :logout="logout"
    />
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
import { Container, Main, Header } from 'element-ui';
import {mapActions} from 'vuex';
import AppSideMenu from '@/components/SideMenu/SideMenu.vue';
import AppHeader from '@/components/Header/Header.vue';
  export default {
    components: {
      elContainer: Container,
      elMain: Main,
      elHeader: Header,
      appSideMenu: AppSideMenu,
      appHeader: AppHeader
    },
    data() {
      return {
        isCollapse: false
      }
    },
    methods: {
      ...mapActions('authenticate', {
        logoutStore: 'LOGOUT'
      }),
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
      },
      async logout() {
        if(await this.logoutStore()) {
          this.$router.push('/login');
        } else {
          //TODO ERROR
        }
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
    /* border-radius: 12px 12px 0 0; */
    padding: 0;
    margin: 0 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    height: 100%;
  }
</style>