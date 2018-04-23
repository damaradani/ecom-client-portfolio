import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Admin from './views/Admin.vue'
import Guitar from './components/Guitar.vue'
import Bass from './components/Bass.vue'
import Keyboard from './components/Keyboard.vue'
import Drumset from './components/Drumset.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home // ,
      // childern: [
      //   {
      //     path: 'guitar',
      //     component: Guitar
      //   }
      // ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/guitar',
      name: 'guitar',
      component: Guitar
    },
    {
      path: '/bass',
      name: 'bass',
      component: Bass
    },
    {
      path: '/keyboard',
      name: 'keyboard',
      component: Keyboard
    },
    {
      path: '/drumset',
      name: 'drumset',
      component: Drumset
    }
  ]
})
