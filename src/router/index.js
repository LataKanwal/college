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
