import Vue from "vue";
import "./plugins/vuetify.js";
import App from "./App.vue";
import store from "./store/store.js"
import routes from "./router/index.js"
import VueRouter from "vue-router";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

