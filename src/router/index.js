import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/LoganTest/HelloWorld'
import Login from '@/views/UserComponent/Login'
import Register from '@/views/UserComponent/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})