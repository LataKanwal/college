import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DiscussionForm from '../views/DiscussionForm.vue'
import NewsFeed from '../views/NewsFeed.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/loginPage',
    name: 'loginPage',
    component: LoginPage,
    meta:{
      requiresAuth:false
      
    }
  },
  {
    path: '/registerPage',
    name: 'registerPage',
    component: RegisterPage,
    meta:{
      requiresAuth:false
    }
    
  },
  {
    path: '/discussion',
    name: 'discussion',
    component: DiscussionForm,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/newsFeed',
    name: 'newsFeed',
    component: NewsFeed,
    meta: {
      requiresAuth: true
    }
  }
  
]
let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes

})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(localStorage.getItem('jwt') == null) {
    next({
      path : '/loginPage',
      params : { nextUrl: to.fullPath}
})
} else {
  next()
}
} else {
next()
}
});

export default router;
 
