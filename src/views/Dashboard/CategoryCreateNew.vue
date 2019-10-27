<template>
<div class="post-list">
  <el-form label-position="left" label-width="80px" :inline="true">
    <el-form-item label="Tên: ">
      <el-input v-model="name" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(name)" :disabled="loading">Tạo</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {Input, Form, FormItem, Button} from 'element-ui';
import {mapState, mapActions} from 'vuex';
export default {
  data() {
    return {
      name: ``
    }
  },
  computed: {
    ...mapState('category', {
      loading: state => state.loading,
      error: state => state.errorMsg
    }),
  },
  methods: {
    ...mapActions('category', {
      createCategory: 'CREATE_CATEGORY'
    }),
    async onSubmit(name) {
      if(!name) {
        this.$message({
          message: 'Tên không thể để trống',
          duration: 1000,
          type: 'error'
        });
        return;
      }
      try {
        await this.createCategory({name: this.name});
        this.$message({
          message: 'Tạo danh mục thành công',
          type: 'success',
          duration: 1000,
          onClose: () => {
            this.$router.push('/dashboard/category')
          }
        });
      } catch (error) {
        this.$message({
          message: 'Có lỗi xảy ra',
          duration: 1000,
          type: 'error'
        });
      }
    }
  },
  components: {
    elInput: Input,
    elForm: Form,
    elFormItem: FormItem,
    elButton: Button
  },
}
</script>

<style scoped>
  .post-list {
    padding: 20px;
  }
</style>