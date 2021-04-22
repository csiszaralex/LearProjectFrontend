import axios from '@/config/axios.js';

export default {
  state() {
    return {
      userName: null,
      token: null,
    };
  },
  getters: {
    isLoggedIn(state) {
      return !!state.userName;
    },
    getName(state) {
      return state.userName;
    },
  },
  mutations: {
    changeAuth(state, payload) {
      state.userName = payload.userName;
      state.token = payload.token;
      console.log('U', state.userName);
      console.log('T', state.token);
    },
  },
  actions: {
    logout() {
      console.log('KILÉPÉS');
    },
    changeAuth(context, payload) {
      context.commit('changeAuth', {
        userName: payload?.name ? payload.name : null,
        token: payload?.token ? payload.token : null,
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`;
      localStorage.setItem('token', payload.token);
    },
  },
};
