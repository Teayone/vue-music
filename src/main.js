import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "element-ui/lib/theme-chalk/index.css";
import filter from "./filter";
import Loading from "./plugins/loading";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);
Vue.use(Loading);
Vue.use(filter);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
}).$mount("#app");
