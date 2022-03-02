<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">用户名：</div>
      </el-col>
      <el-col :span="10">
        <EuiInput v-model="username"></EuiInput>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="item">
      <el-col :span="6">
        <div class="grid-content bg-purple">密码：</div>
      </el-col>
      <el-col :span="10">
        <EuiInput v-model="password" title="密码："></EuiInput>
      </el-col>
    </el-row>

    <EuiButton type="text" class="buttonLogin" @click="loginClick">登录</EuiButton>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput'
import { Button as EuiButton, Message, Input as EuiInput, Layout, Container } from 'element-ui'
import Api from '../../api/apis'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginClick () {
      if (this.username === undefined || this.username === '' || this.username === null) {
        Message('用户名不能为空')
        return
      }
      if (this.password === undefined || this.password === '' || this.password === null) {
        Message('密码不能为空')
        return
      }
      Api.login({ 'username': this.username, 'password': this.password })
        .then(response => {
          Message('登录成功')
          this.$store.commit('setToken', response.data.data.token)
          this.$router.replace({
            path: '/chartline'
          })
        })
        .catch(response => {
          if (response != null && response.data != null && response.data.message != null) {
            Message(response.data.message)
          } else {
            Message('登录失败')
          }
        })
    }
  },
  components: {
    CustomInput,
    EuiButton,
    Message,
    EuiInput,
    Layout,
    Container
  },
  mounted () {
  }
}
</script>

<style scoped>
.buttonLogin {
  width: 30%;
  margin-top: 40px;
  background: aquamarine;
}
.item {
  margin-top: 10px;
}
</style>
