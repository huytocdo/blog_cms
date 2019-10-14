<template>
<el-row type="flex" :gutter="30" class="create-post">
  <el-col :span="18" class="main-create-post">
    <medium-editor 
    v-model="content"
    :readOnly="false"
    :options="options" />
  </el-col>
  <el-col :span="6" class="side-create-post">
    <el-input
      type="text"
      placeholder="Tiêu đề bài viết"
      v-model="title"
      maxlength="100"
      minlength="10"
      show-word-limit />
    <el-input
      type="textarea"
      placeholder="Mô tả ngắn"
      v-model="description"
      rows="8" />
    <app-thumbnail-input></app-thumbnail-input>
    <app-category-input></app-category-input>
    <el-row type="flex" justify="end" class="cta-row">
      <el-button plain>Save</el-button>
      <el-button type="primary">Publish</el-button>
    </el-row>
  </el-col>
</el-row>
</template>

<script>
import MediumEditor from '@/components/MediumEditor/MediumEditor.vue';
import CategoryInput from '@/components/CreateNewPost/CategoryInput.vue';
import ThumbnailInput from '@/components/CreateNewPost/ThumbnailInput.vue';
import * as apiResource from '@/service/api/upload';
import {makeID} from '@/utils/makeRandom';
import {Row, Col, Input, Button} from 'element-ui';

const apiDomain = process.env.VUE_APP_API_DOMAIN;
export default {
  data() {
    return {
      content: ``,
      options: {
        customAction: async({file}, component) => {
          const {data} = await apiResource.uploadImage(file, makeID(5));
          const link = `${apiDomain}${data.data.data.link}`
          component.files[0].response.url = link;
        }
      },
      title: ``,
      description: ``,
      category: ``,
      thumbnail: ``
    }
  },
  components: {
    mediumEditor: MediumEditor,
    elRow: Row,
    elCol: Col,
    elInput: Input,
    elButton: Button,
    appCategoryInput: CategoryInput,
    appThumbnailInput: ThumbnailInput
  }
}
</script>

<style scoped>
  .create-post {
    padding-left: 60px;
    position: relative;
  }
  .main-create-post {
    padding-right: 20px;
  }
  .side-create-post {
    height: calc(100vh - 60px);
    background-color: rgba(0,0,0,.1);
    position: sticky;
    top: 0;
    right: 0;
  }
  .side-create-post > *:not(:first-child) {
    margin-top: 10px;
  }
  .side-create-post .cta-row {
    margin-top: 50px;
  }
</style>