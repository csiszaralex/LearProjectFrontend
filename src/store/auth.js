import axios from '@/config/axios.js';
import jwt from 'jsonwebtoken';
import router from '@/router.js';

export default {
  state() {
    return {
      user: null,
      token: null,
    };
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
    getName(state) {
      return state.user.name;
    },
    getRole(state) {
      return state.user?.role ? state.user.role : 0;
    },
  },
  mutations: {
    changeAuth(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },
  },
  actions: {
    logout(context) {
      context.commit('changeAuth', { user: null, token: null });
      localStorage.clear();
      axios.defaults.headers.common['Authorization'] = null;
      router.replace('/');
    },
    changeAuth(context, payload) {
      if (!payload.token) context.dispatch('logout', {});
      else {
        const jwtP = jwt.verify(payload.token, 'topSecret69');
        axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`;
        localStorage.setItem('token', payload.token);
        context.commit('changeAuth', { user: jwtP, token: payload.token });
      }
    },
  },
};
