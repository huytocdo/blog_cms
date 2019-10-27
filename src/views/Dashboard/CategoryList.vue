<template>
<div class="post-list">
  <el-table
    v-loading="categoryLoading"
    :data="categories"
    :height="height"
    :header-cell-style="headerCellStyle"
    style="width: 100%"
    stripe
    border
  >
    <el-table-column
      fixed
      prop="name"
      label="Tên dạnh mục">
    </el-table-column>
    <el-table-column
      prop="slug"
      label="Đường dẫn danh mục">
    </el-table-column>
    <el-table-column
      label="Operations"
    >
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="operationHandler('edit', scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="operationHandler('delete', scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { Table, TableColumn, Button } from 'element-ui';
import {mapActions, mapState, mapGetters} from 'vuex';
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elButton: Button
  },
  methods: {
    ...mapActions('category', {
      getAllCategory: 'GET_ALL_CATEGORIES',
      deleteCategory: 'DELETE_CATEGORY'
    }),
    headerCellStyle() {
      const style = {};
      style.textAlign = 'center';
      style.fontSize = '18px';
      style.color = '#333';
      return style;
    },
    operationHandler(type, data) {
      switch (type) {
        case 'edit':
          this.editHandler(data);
          break;
        case 'delete':
          this.deleteHandler(data);
          break;
        default:
          break;
      }
    },
    editHandler(data) {
      this.$router.push(`category/edit/${data._id}`);
    },
    deleteHandler(data) {
      this.$confirm('This will delete the category. Continue?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        try {
          await this.deleteCategory({id: data._id});
          await this.getAllCategory();
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
        } catch (error) {
          this.$message({
            type: 'error',
            message: 'Delete error'
          });
        }
      })     
    }
  },
  computed: {
    ...mapGetters('category',{
      categories: 'getAllCategories',
    }),
    ...mapState('category', {
      categoryLoading: state => state.loading,
      categoryErr: state => state.errorMsg
    }),
  },
  data() {
    return {
      height: undefined,
    }
  },
  mounted() {
    this.height = this.$el.parentElement.getBoundingClientRect().height;
    this.getAllCategory();
  }
}
</script>

<style scoped>

</style>