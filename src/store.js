import { createStore } from 'vuex';
import Auth from '@/store/auth';

export default createStore({
  modules: {
    Auth,
  },
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  getters: {},
});

/**
 *. return this.$store.getters['numbers/getOtherCounter'];
 *? getters: state, getters, rootState, rootGetters
 *? mutations: state, payload
 *? actions: context, payload
 */
