import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/Pages/Home.vue";
import Organize from "@/components/Pages/Organize.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/organize/:fileId", name: "organize", component: Organize },
  { path: "*", redirect: "/" }
];

export default new VueRouter({
  routes,
  mode: "history"
});
