import { createRouter, createWebHistory } from "vue-router";
import UserProfile from "./pages/UserProfile.vue";
import HomePage from "./pages/HomePage.vue";
import RegisterPage from "./pages/RegisterPage.vue";

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: HomePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user/:username",
    name: "user",
    component: UserProfile,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes, //routes: routes (c'est pareil)
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //vérifie s'il y a bien requiresAuth
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      next({ name: "register" }); //si pas de user, retourne vers la création de compte
    } else {
      next(); // autoriser à aller sur la prochaine route
    }
  } else {
    next(); //si la route n'est pas protégée, pas de vérif'
  }
});

export default router;
