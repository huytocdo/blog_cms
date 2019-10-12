<template>
  <el-row>
    <el-col :span="1">
      <el-button icon="el-icon-s-fold" circle @click="toggleCollapse"></el-button>
    </el-col>
    <el-col :span="23">
      <h2>{{$route.name}}</h2>
    </el-col>
    <!-- <el-col :span="1" style="text-align: right">
      <el-dropdown trigger="click">
        <el-button type="primary" icon="el-icon-user-solid" circle>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>Profile</el-dropdown-item>
          <el-dropdown-item disabled>Change Password</el-dropdown-item>
          <el-dropdown-item divided>Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col> -->
  </el-row>
</template>

<script>
import { Button, Row, Col } from 'element-ui';
export default {
  components: {
    elButton: Button,
    elRow: Row,
    elCol: Col
  },
  props: ['toggleCollapse'],
  mounted() {
    console.log(this.$route);
  }
}
</script>

<style scoped>
  h2 {
    text-align: center;
    font-size: 24px;
    text-transform: uppercase
  }
</style>