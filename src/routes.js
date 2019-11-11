import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/store';

const Login = () => import('./views/Login.vue');
const DashboardLayout = () => import('./views/Dashboard/_DashboardLayout.vue');
const Dashboard = () => import('./views/Dashboard/Dashboard.vue');
const PostList = () => import('./views/Dashboard/PostList.vue');
const PostCreateNew = () => import('./views/Dashboard/PostCreateNew.vue');
const PostEdit = () => import('./views/Dashboard/PostEdit.vue');
const ImageList = () => import('./views/Dashboard/ImageList.vue');
const ImageUploadNew = () => import('./views/Dashboard/ImageUploadNew.vue');
const CategoryList = () => import('./views/Dashboard/CategoryList.vue');
const CategoryCreateNew = () => import('./views/Dashboard/CategoryCreateNew.vue');
const CategoryEdit = () => import('./views/Dashboard/CategoryEdit.vue');

Vue.use(VueRouter);
const protectRoute = (redirect, query) => {
  return (to, from, next) => {
    const isLogin = store.getters['authenticate/isLogin'];
    if (isLogin) {
      next()
      return
    }
    if(query) {
      const redirectTo = to.path;
      const toOption = {
        path: redirect,
        query: {
          redirect: redirectTo
        }
      }
      next(toOption);
    } 
    next({path: redirect});
  }
}

const routes = [
  { path: '/', redirect: '/dashboard'},
  { 
    path: '/dashboard', 
    component: DashboardLayout, 
    beforeEnter: protectRoute('/login', true), 
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'post',
        name: 'Quản lý bài viết',
        component: PostList
      },
      {
        path: 'post/create',
        name: 'Tạo bài viết mới',
        component: PostCreateNew
      },
      {
        path: 'post/edit/:id',
        name: 'Chỉnh sửa bài viết',
        component: PostEdit,
        props: true
      },
      {
        path: 'image-list',
        name: 'Quản lý hình',
        component: ImageList
      },
      {
        path: 'upload-image',
        name: 'Upload hình',
        component: ImageUploadNew
      },
      {
        path: 'category',
        name: 'Quản lý danh mục',
        component: CategoryList
      },
      {
        path: 'category/create',
        name: 'Tạo danh mục mới',
        component: CategoryCreateNew
      },
      {
        path: 'category/edit/:id',
        name: 'Sửa danh mục',
        component: CategoryEdit,
        props: true
      },
    ] 
  },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export {router};