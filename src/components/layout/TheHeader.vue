<template>
  <nav class="navbar navbar-expand-md navbar-light bg-primary">
    <router-link to="/" class="navbar-brand ml-2">
      <img
        :src="require('@/assets/pics/logo/logo.png')"
        alt=""
        width="30"
        height="30"
        class="d-inline-block align-top"
      />
      Quizy
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navb">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navb" class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li v-if="isLoggedIn" class="nav-item btn dropdown">
          <a id="fiok" class="btn dropdown-toggle" href="#" role="button" data-toggle="dropdown">
            {{ name }}
          </a>
          <div class="dropdown-menu dropdown-menu-right pb-0">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
            <base-button type="danger" class="w-100" outline @click="logout">
              <fa-icon icon="sign-out-alt" class="fa-1x mr-1" />
              Kijelentkezés
            </base-button>
          </div>
        </li>
        <template v-else>
          <li class="nav-item">
            <base-button to="/auth?mode=reg" type="info">Regisztráció</base-button>
          </li>
          <li class="nav-item">
            <base-button to="/auth?mode=login" type="success">Bejelentkezés</base-button>
          </li>
        </template>
      </ul>
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
  // overflow: hidden visible;
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
