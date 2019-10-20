<template>
<div>
  <h2>Categories</h2>
  <el-tag
    :key="tag._id"
    v-for="tag in category"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)">
    {{tag.name}}
  </el-tag>
  <el-autocomplete
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue"
    ref="saveTagInput"
    size="mini"
    :fetch-suggestions="querySearch"
    @select="handleSelect"
    @keyup.enter.native="handleInputConfirm"
    @keyup.esc.native="handleInputClear"
  >
    <template slot-scope="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </el-autocomplete>
  <el-button v-else class="button-new-tag" size="small" @click="showInput" :class="{'is-error': isError}">+ New Tag</el-button>
</div>
</template>

<script>
import {Input, Button, Tag, Row, Autocomplete} from 'element-ui';
export default {
  props: ['categories', 'category', 'isError'],
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    handleClose(tag) {
      this.$emit('deleteTag', this.category.indexOf(tag))
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if(inputValue) {
        const {categories, category} = this;
        const newCategory = categories.find(el => el.name === inputValue);
        if (newCategory && !category.some(e => newCategory._id === e._id)) {
          this.$emit('addTag', newCategory);
        }
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    handleInputClear() {
      this.inputVisible = false;
      this.inputValue = '';
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },


    querySearch(queryString, cb) {
      var categories = this.categories;
      var results = queryString ? categories.filter(this.createFilter(queryString)) : categories;
      // call callback function to return suggestions
      cb(results);
    },

    createFilter(queryString) {
      return (category) => {
        return (category.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.inputValue = item.name;
      this.handleInputConfirm();
    }
  },
  components: {
    elInput: Input,
    elButton: Button,
    elTag: Tag,
    elRow: Row,
    elAutocomplete: Autocomplete
  }
}
</script>

<style>
  .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .button-new-tag {
    width: 120px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .button-new-tag.is-error {
    border: 1px solid red;
  }
  .input-new-tag input {
    width: 120px !important;
    line-height: 32px !important;
    height: 32px !important;
  }
</style>