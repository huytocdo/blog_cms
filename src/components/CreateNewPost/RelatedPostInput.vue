<template>
  <div class="custom-el-transfer">
    <h2>Related Post</h2>
    <el-transfer
      filterable
      @change="handleChange"
      :data="allPostsData"
      :value="relatedPosts">
      <!-- <span slot-scope="{ option }">{{ option._id }}</span> -->
    </el-transfer>
  </div>
</template>

<script>
import {Transfer} from 'element-ui';
export default {
  props: ["posts", "relatedPosts"],
  computed: {
    allPostsData() {
      if(this.posts) {
        return this.posts.map(el => {
          return {
            label: el.title,
            key: el._id
          }
        })
      }
      return []
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      this.$emit('changeRelatedPost', value);
    }
  },

  components: {
    elTransfer: Transfer
  }
};
</script>

<style>
  .custom-el-transfer .el-transfer-panel {
    width: 150px;
  }
  .custom-el-transfer .el-transfer__buttons {
    padding: 0 10px;
  }
  .custom-el-transfer .el-transfer-panel__header {
    display: none;
  }
</style>