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
      console.log('KILÉP');
      context.commit('changeAuth', { user: null, token: null });
      localStorage.clear();
      axios.defaults.headers.common['Authorization'] = null;
      router.replace('/');
    },
    renew(context) {
      axios
        .put('/users/renew')
        .then(({ data }) => {
          context.dispatch('changeAuth', { token: data.accessToken });
        })
        .catch(() => {
          context.dispatch('logout');
        });
    },
    changeAuth(context, { token }) {
      if (!token) context.dispatch('logout', {});
      else {
        try {
          const jwtP = jwt.verify(token, 'topSecret69');
          setTimeout(() => {
            context.dispatch('renew');
          }, new Date(jwtP.exp * 1000) - new Date() - 10000);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('token', token);
          context.commit('changeAuth', { user: jwtP, token: token });
        } catch (err) {
          context.dispatch('logout');
        }
      }
    },
  },
};
