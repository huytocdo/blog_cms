<template>
<div>
  <h2>Categories</h2>
  <el-tag
    :key="tag"
    v-for="tag in dynamicTags"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)">
    {{tag}}
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
  </el-autocomplete>
  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
</div>
</template>

<script>
import {Input, Button, Tag, Row, Autocomplete} from 'element-ui';
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    querySearch(queryString, cb) {
      var links = this.links;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;
      // call callback function to return suggestions
      cb(results);
    },

    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    loadAll() {
      return [
        { "value": "vue", "link": "https://github.com/vuejs/vue" },
        { "value": "element", "link": "https://github.com/ElemeFE/element" },
        { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
        { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
        { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
        { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
        { "value": "babel", "link": "https://github.com/babel/babel" }
      ];
    },
    handleSelect(item) {
      this.inputValue = item.value;
      this.handleInputConfirm();
      console.log(item);
    }
  },
  mounted() {
    this.links = this.loadAll();
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
  .input-new-tag input {
    width: 120px !important;
    line-height: 32px !important;
    height: 32px !important;
  }
</style>