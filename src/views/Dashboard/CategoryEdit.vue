<template>
<div class="post-list">
  <el-form label-position="left" label-width="80px" :inline="true">
    <el-form-item label="Tên: ">
      <el-input v-model="name" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(name)" :disabled="loading">Sửa</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import _ from 'underscore';
import {Input, Form, FormItem, Button} from 'element-ui';
import {mapState, mapActions} from 'vuex';
export default {
  props: ['id'],
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
      editCategory: 'EDIT_CATEGORY',
      getCategory: 'GET_CATEGORY'
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
      const data = { name },
        id = this.id,
        payload = { data, id };
      try {
        await this.editCategory(payload);
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
  async mounted() {
    const rawCategory = await this.getCategory({id: this.id});
    const name = _.property(['data', 'data', 'name'])(rawCategory);
    this.name = name;
  },
  components: {
    elInput: Input,
    elForm: Form,
    elFormItem: FormItem,
    elButton: Button
  }
}
</script>

<style scoped>
  .post-list {
    padding: 20px;
  }
</style>