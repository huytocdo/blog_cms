<template>
<el-row type="flex" :gutter="30" class="create-post" v-loading="loading">
  <el-col :span="18" class="main-create-post">
    <medium-editor
    :class="{'is-error': errorFields.html}" 
    v-model="html"
    :readOnly="false"
    :options="options" />
  </el-col>
  <el-col :span="6" class="side-create-post">
    <el-input
      type="text"
      placeholder="Tiêu đề bài viết"
      :class="{'is-error': errorFields.title}" 
      v-model="title"
      maxlength="100"
      minlength="10"
      show-word-limit />
    <el-input
      type="text"
      placeholder="Thời gian đọc bài viết"
      :class="{'is-error': errorFields.duration}" 
      v-model="duration"
      maxlength="30"
      show-word-limit />
    <el-input
      type="textarea"
      placeholder="Mô tả ngắn"
      :class="{'is-error': errorFields.description}" 
      v-model="description"
      rows="5" />
    <app-thumbnail-input
      :file="thumbnail"
      :isError="errorFields.thumbnail"
      @fileChange="thumbnailChange"
    ></app-thumbnail-input>
    <app-category-input
      :categories="categories"
      :category="category"
      :isError="errorFields.categories" 
      @deleteTag="deleteCategory"
      @addTag="addCategory"
    ></app-category-input>
    <app-related-post-input
      :posts="posts"
      :relatedPosts="related"
      @changeRelatedPost="changeRelatedPost"
    ></app-related-post-input>
    <el-row type="flex" justify="end" class="cta-row">
      <el-button plain @click="createNewPost('draft')" :disabled="loading">Save</el-button>
      <el-button type="primary" @click="createNewPost('published')" :disabled="loading">Publish</el-button>
    </el-row>
  </el-col>
</el-row>
</template>

<script>
import {Row, Col, Input, Button} from 'element-ui';
import {mapActions, mapGetters} from 'vuex';

import MediumEditor from '@/components/MediumEditor/MediumEditor.vue';
import CategoryInput from '@/components/CreateNewPost/CategoryInput.vue';
import ThumbnailInput from '@/components/CreateNewPost/ThumbnailInput.vue';
import RelatedPostInput from '@/components/CreateNewPost/RelatedPostInput.vue';
import * as apiResource from '@/service/api/upload';
import * as apiPost from '@/service/api/post';
import {makeID} from '@/utils/makeRandom';


const apiDomain = process.env.VUE_APP_API_DOMAIN;
export default {
  name: 'create-new-post',
  data() {
    return {
      html: ``,
      options: {
        customAction: async({file}, component) => {
          const {data} = await apiResource.uploadImage(file, makeID(5));
          const link = `${apiDomain}${data.data.data.link}`
          component.files[0].response.url = link;
        },
        placeholder: {
          text: "Write something great!!"
        },
      },
      title: ``,
      description: ``,
      duration: ``,
      category: [],
      related: [],
      thumbnail: null,
      rules: {
        html: ['required'],
        title: ['required'],
        description: ['required'],
        duration: ['required'],
        categories: ['required'],
        thumbnail: ['required'],
      },
      errorFields: {},
      loading: false
    }
  },
  computed: {
    ...mapGetters('category',{
      categories: 'getAllCategories',
    }),
    ...mapGetters('post',{
      posts: 'getAllPosts',
    }),
  },
  methods: {
    ...mapActions('category', {
      getAllCategory: 'GET_ALL_CATEGORIES'
    }),
    ...mapActions('post', {
      getAllPost: 'GET_ALL_POSTS'
    }),
    deleteCategory(index) {
      this.category.splice(index, 1);
    },
    addCategory(newCategory) {
      this.category.push(newCategory);
    },
    thumbnailChange(newThumbnailFile) {
      this.thumbnail = newThumbnailFile;
    },
    changeRelatedPost(newRelatedList) {
      this.related = [...newRelatedList];
    },
    validator(obj, rule) {
      const validResult = {};
      const isEmpty = (value) => {
        // check empty for primitive case
        if(!value) return true;
        if(typeof value === 'object') {
          // check empty for array & object
          if(value.length !== 'undefined' && value.length === 0) {
            return true;
          } else if(value.constructor.name === 'object' && Object.keys(value).length === 0) {
            return true;
          }
        }
        return false;
      }
      for(let key in rule) {
        const value = obj[key];
        rule[key].forEach(r => {
          switch (r) {
            case 'required':
              if(isEmpty(value)) {
                validResult[key] = true;
              }
              break;
            default:
              break;
          }
        });
      }
      return validResult;
    },
    async createNewPost(status) {
      const {title, description, duration, html, category, thumbnail, related} = this,
        newPostData = {};
      this.loading = true;
      this.errorFields = {};
      newPostData.title = title;
      newPostData.thumbnail = thumbnail;
      newPostData.description = description;
      newPostData.duration = duration;
      newPostData.html = html;
      newPostData.categories = category.map(el => el._id);
      newPostData.status = status;
      newPostData.related = related;
      const validResult = this.validator(newPostData, this.rules);
      if(Object.keys(validResult).length === 0) {
        try {
          const {data} = await apiResource.uploadImage(thumbnail, makeID(5));
          newPostData.thumbnail = `${apiDomain}${data.data.data.link}`;
          await apiPost.createNew(newPostData);
          this.$message({
            message: 'Bài đã được lưu thành công',
            type: 'success',
            onClose: () => {
              this.$router.push('/dashboard/post')
            }
          });
        } catch (error) {
          this.$message({
            message: 'Có lỗi xảy ra',
            type: 'error'
          });
        }
      } else {
        this.errorFields = validResult;
      }
      this.loading = false;
    }
  },
  components: {
    mediumEditor: MediumEditor,
    elRow: Row,
    elCol: Col,
    elInput: Input,
    elButton: Button,
    appCategoryInput: CategoryInput,
    appThumbnailInput: ThumbnailInput,
    appRelatedPostInput: RelatedPostInput
  },
  mounted() {
    this.getAllCategory();
    this.getAllPost();
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
    background-color: rgba(0,0,0,.1);
    position: sticky;
    height: calc(100vh - 60px);
    top: 0;
    right: 0;
    padding-bottom: 20px;
  }
  .side-create-post > *:not(:first-child) {
    margin-top: 10px;
  }
  .side-create-post .cta-row {
    margin-top: 20px;
  }
  .is-error {
    border: 1px solid red;
    border-radius: 4px;
  }
</style>