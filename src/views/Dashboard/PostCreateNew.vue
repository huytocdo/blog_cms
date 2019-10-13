<template>
<el-row type="flex" class="create-post">
  <el-col :span="18" class="main-create-post">
    <medium-editor 
    v-model="content"
    :readOnly="false"
    :options="options"
    ></medium-editor>
  </el-col>
  <el-col :span="6" class="side-create-post">
    Category SelectBox
  </el-col>
</el-row>
</template>

<script>
import MediumEditor from '@/components/MediumEditor/MediumEditor.vue';
import * as apiResource from '@/service/api/upload';
import {makeID} from '@/utils/makeRandom';
import {Row, Col} from 'element-ui';

const apiDomain = process.env.VUE_APP_API_DOMAIN;
export default {
  data() {
    return {
      content: ``,
      options: {
        customAction: async({file}, component) => {
          const {status, data} = await apiResource.uploadImage(file, makeID(5));
          const link = `${apiDomain}${data.data.data.link}`
          component.files[0].response.url = link;
        }
      }
    }
  },
  components: {
    mediumEditor: MediumEditor,
    elRow: Row,
    elCol: Col
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
</style>