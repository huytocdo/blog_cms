import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/store';

const Login = () => import('./views/Login.vue');
const Dashboard = () => import('./views/Dashboard/Dashboard.vue');
const PostList = () => import('./views/Dashboard/PostList.vue');
const PostCreateNew = () => import('./views/Dashboard/PostCreateNew.vue');
const ImageList = () => import('./views/Dashboard/ImageList.vue');
const ImageUploadNew = () => import('./views/Dashboard/ImageUploadNew.vue');
const CategoryList = () => import('./views/Dashboard/CategoryList.vue');
const CategoryCreateNew = () => import('./views/Dashboard/CategoryCreateNew.vue');
const TestEditor = () => import('./views/TestEditor.vue');

Vue.use(VueRouter);

const protectRoute = (redirect, query) => {
  return (to, from, next) => {
    const isLogin = store.getters['authenticate/isLogin'];
    if (isLogin) {
      next()
      return
    }
    if(query) {
      const query = to.path;
      next({path: redirect, query: {redirect: query}});
    } 
    next({path: redirect});
  }
}

const routes = [
  { path: '/', redirect: '/dashboard'},
  { 
    path: '/dashboard', 
    component: Dashboard, 
    beforeEnter: protectRoute('/login', true), 
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: PostList
      },
      {
        path: 'post-list',
        name: 'Quản lý bài viết',
        component: PostList
      },
      {
        path: 'create-new-post',
        name: 'Tạo bài viết mới',
        component: PostCreateNew
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
        path: 'category-list',
        name: 'Quản lý danh mục',
        component: CategoryList
      },
      {
        path: 'create-new-category',
        name: 'Tạo danh mục mới',
        component: CategoryCreateNew
      },
    ] 
  },
  { path: '/login', component: Login },
  { path: '/test-editor', component: TestEditor }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = store.getters['authenticate/isLogin'];
  if(to.path !== '/login') {
    if(!isLogin) {
      next(`/login?redirect=${to.path}`);
    }
  }
  if(to.path === '/login') {
    if(isLogin) {
      next(`/dashboard`);
    }
  }
  next();
})

export {router};