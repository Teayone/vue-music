import globalLoading from "../components/global-loading/global-loading.vue";
let show = null;
let hide = null;

export default {
  install(Vue) {
    let isLoading = null;
    let vm = null;
    Vue.component("global-loading", globalLoading);
    show = function (cb) {
      if (!isLoading) {
        const loadingCtor = Vue.extend({
          render(h) {
            return h("global-loading");
          },
        });

        isLoading = new loadingCtor();
        vm = isLoading.$mount();
        document.body.appendChild(vm.$el);
      }
    };
    hide = function (cb) {
      if (vm && vm.$el && isLoading) {
        document.body.removeChild(vm.$el);
        isLoading = null;
      }
    };
  },
};

export { show, hide };
