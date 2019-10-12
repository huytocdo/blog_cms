<template>
  <el-row class="login-wrapper">
    <el-col :span="8" :offset="8">
      <el-form ref="loginForm" label-width="120px" :model="loginForm" :rules="rules" :disabled="loading">
        <h1>WELCOME TO CMS</h1>
        <el-form-item label="Username" prop="email">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item :error="error">
          <el-button type="primary" @click="submitForm('loginForm')" :loading="loading">Login</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { Input, Button, Row, Col, Form, FormItem } from 'element-ui';
import {mapActions, mapState, mapGetters} from 'vuex';
export default {
  components: {
    elInput: Input,
    elButton: Button,
    elRow: Row,
    elCol: Col,
    elForm: Form,
    elFormItem: FormItem
  },
  data() {
    const emailValidate = (rule, value, cb) => {
      function validateEmail(email) {
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
      }
      if(value === '') {
        cb(new Error('Please input your email'))
      }
      if(!validateEmail(value)) {
        cb(new Error('Please provide valid email'))
      } else {
        cb()
      }
    },
    passwordValidate = (rule, value, cb) => {
      if(value === '') {
        cb(new Error('Please input your password'))
      }
      if(value.split('').length < 8) {
        cb(new Error('Length should be 8'))
      }
    }
    return {
      // loading: false,
      loginForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { validator: emailValidate, trigger: 'blur' }
        ],
        password: [
          { validator: passwordValidate, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState('authenticate', {
      error: state => state.errorMsg,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions('authenticate', {
      login: 'LOGIN'
    }),
    async submitForm(formName) {
      console.log(formName);
      console.log(this.$refs[formName]);
          try {
            const { login, loginForm } = this;
            const isLogin = await login(loginForm);
            if(isLogin) {
              await this.$router.replace(this.$route.query.redirect || '/');
            }
          } catch(err) {
            console.log(err);
          }
    }
  }
}
</script>

<style scoped>
  h1 {
    text-align: center;
    font-size: 28px;
  }
  .login-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
  .el-button--primary {
    width: 100%;
  }
</style>