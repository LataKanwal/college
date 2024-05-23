<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 

const routes = [
  { path: "/sign-in", component: () => import ("../views/SignIn.vue") },
  { path: "/", component: () => import ("../views/HomePage.vue") },
  { path: "/register", component: () => import ("../views/RegisterPage.vue") },
  { 
    path: "/newsfeed", 
    component: () => import ("../components/NewsFeed.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/profile", component: () => import ("../components/UserProfile.vue") },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You don't have access!");
      next("/sign-in");
    }
  } else {
    next();
  }
});

export default router;
=======
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
 
>>>>>>> origin/master
