import { createStore } from "vuex";
import auth from "./modules/auth/auth";
import chartStore from "./modules/chart/chartStore";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    chartStore,
  },
});
