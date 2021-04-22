<template>
  <nav class="navbar navbar-light bg-primary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#">
        <img
          :src="require('@/assets/pics/logo/logo.png')"
          alt=""
          width="30"
          height="30"
          class="d-inline-block align-top"
        />
        Quizy
      </router-link>
      <div v-if="isLoggedIn" class="d-flex mr-n align-items-center">
        <!-- TODO Itt profil szerkesztés -->
        <span class="mx-2">{{ name }}</span>
        <base-button type="danger" outline @click="logout">
          <fa-icon icon="sign-out-alt" class="fa-1x mr-1" />
          Kijelentkezés
        </base-button>
      </div>
      <div v-else class="d-flex mr-n">
        <base-button to="/auth?mode=reg" type="info">Regisztráció</base-button>
        <base-button to="/auth?mode=login" type="success">Bejelentkezés</base-button>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'TheHeader',
  setup() {
    const store = useStore();

    const isLoggedIn = computed(() => {
      return store.getters.isLoggedIn;
    });
    const name = computed(() => {
      return store.getters.getName;
    });

    return { isLoggedIn, name };
  },

  methods: {
    async logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding-top: 0;
  padding-bottom: 0;
  margin-right: 0;
  overflow: hidden visible;
  // overflow-x: hidden;
  // overflow-y: visible;
  .dropdown-menu {
    overflow-y: visible;
  }
  .mr-n {
    .btn {
      padding: 0.5rem 1.2rem;
      float: right;
    }
    margin-right: -1rem;
  }
}
</style>
