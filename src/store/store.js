import Vue from "vue";
import Vuex from "vuex";
import UI from "./modules/ui";
import User from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui: UI,
    user: User
  }
});
