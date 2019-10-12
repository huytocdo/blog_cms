<template>
  <el-row>
    <el-col :span="1">
      <el-button icon="el-icon-s-fold" circle @click="toggleCollapse"></el-button>
    </el-col>
    <el-col :span="23">
      <h2>{{$route.name}}</h2>
    </el-col>
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
}
</script>

<style scoped>
  h2 {
    text-align: center;
    font-size: 24px;
    text-transform: capitalize;
    font-weight: bold;
  }
</style>