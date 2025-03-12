import { createRouter, createWebHistory } from "vue-router";
import UserProfile from "./pages/UserProfile.vue";
import HomePage from "./pages/HomePage.vue";

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: HomePage,
  },
  {
    path: "/user/:username",
    name: "user",
    component: UserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes, //routes: routes (c'est pareil)
});

export default router;
