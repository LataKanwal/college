<<<<<<< HEAD
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";
import './index.css'
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDGnnmAC7znLilOcW6Mqkg1fUk5FV1kSh4",
  authDomain: "college123-36b80.firebaseapp.com",
  projectId: "college123-36b80",
  storageBucket: "college123-36b80.appspot.com",
  messagingSenderId: "81626968862",
  appId: "1:81626968862:web:029b281bc19865cb9ecf0f"
};

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = JSON.parse(localStorage.getItem("user"));

  if (requiresAuth && !user) {
    console.log("You are not authorized to access this area.");
    next("login");
  } else {
    next();
  }
});
initializeApp(firebaseConfig);
    createApp(App)
      .use(router)
      .mount("#app");

=======
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
>>>>>>> origin/master
