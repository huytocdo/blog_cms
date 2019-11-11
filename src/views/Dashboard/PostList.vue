<template>
<div class="post-list">
  <el-table
    v-loading="postLoading || categoryLoading"
    :data="posts"
    :height="height"
    :header-cell-style="headerCellStyle"
    style="width: 100%"
    stripe
    border
  >
    <el-table-column
      fixed
      prop="title"
      label="Tiêu đề bài viết"
      width="400">
    </el-table-column>
    <el-table-column
      prop="slug"
      label="Đường dẫn bài viết"
      width="400">
    </el-table-column>
    <el-table-column
      prop="thumbnail"
      label="Thumb"
      width="100">
      <template slot-scope="scope">
        <img class="thumbnail-image" :src="scope.row.thumbnail" alt="">
      </template>
    </el-table-column>
    <el-table-column
      label="Danh mục"
      width="200"
      :filters="filterCategoryCol"
      :filter-method="filterCategory"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          v-for="category in scope.row.categories"
          :key="category._id"
          type="info"
          class="tag">
          {{category.name}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="date"
      label="Ngày tạo"
      width="150"
    >
      <template slot-scope="scope">
        {{ scope.row.createdAt | formatDateTime }}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
    >
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="operationHandler('edit', scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="operationHandler('delete', scope.row)"></el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="Status"
    >
      <template slot-scope="scope">
        <el-switch 
          :value="scope.row.status"
          active-value="published"
          inactive-value="draft"
          active-text="Published"
          @change="switchStatusHandler($event, scope.row)">
        </el-switch>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { Table, TableColumn, Button, Tag, Switch, Dialog } from 'element-ui';
import {mapActions, mapState, mapGetters} from 'vuex';
export default {
  data() {
    return {
      height: undefined
    }
  },
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elButton: Button,
    elTag: Tag,
    elSwitch: Switch
  },
  filters: {
    formatDateTime: function(value) {
      if(!value) return '';
      const date = new Date(value);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
  },
  methods: {
    ...mapActions('post', {
      getAllPost: 'GET_ALL_POSTS',
      deletePost: 'DELETE_POST',
      editPostStatus: 'EDIT_POST_STATUS'
    }),
    ...mapActions('category', {
      getAllCategory: 'GET_ALL_CATEGORIES'
    }),
    filterCategory(value, row) {
      return row.categories.some(e => e.slug === value)
    },
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
      this.$router.push(`post/edit/${data._id}`);
    },
    deleteHandler(data) {
      this.$confirm('This will delete the post. Continue?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        try {
          await this.deletePost({id: data._id});
          await this.getAllPost();
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
    },
    switchStatusHandler(status, {id}) {
      this.editPostStatus({id, status})
    }
  },
  computed: {
    ...mapGetters('post',{
      posts: 'getAllPosts',
    }),
    ...mapGetters('category',{
      categories: 'getAllCategories',
    }),
    ...mapState('post', {
      postLoading: state => state.loading,
      postErr: state => state.errorMsg
    }),
    ...mapState('category', {
      categoryLoading: state => state.loading,
      categoryErr: state => state.errorMsg
    }),
    filterCategoryCol: function() {
      return this.categories.map((e) => {
        return {
          text: e.name,
          value: e.slug
        }
      })
    }
  },
  mounted() {
    this.height = this.$el.parentElement.getBoundingClientRect().height;
    this.getAllPost();
    this.getAllCategory();
  }
}
</script>

<style scoped>
  .thumbnail-image {
    width: 100%;
    height: auto;
  }
  .tag {
    margin-right: 5px;
    cursor: pointer;
  }
</style>