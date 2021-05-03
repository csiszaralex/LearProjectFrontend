<template>
  <nav class="navbar navbar-expand-md navbar-light bg-primary">
    <router-link to="/" class="navbar-brand ml-2 logoholder">
      <img
        :src="require('@/assets/pics/logo/logo.png')"
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
      <ul v-if="isLoggedIn" class="navbar-nav ml-2 mr-auto menu">
        <li class="nav-item">
          <router-link to="/home" class="btn">
            <fa-icon icon="home" class="fa-1x mr-1" />
            Főoldal
          </router-link>
          <router-link to="/file" class="btn">
            <fa-icon icon="file" class="fa-1x mr-1" />
            Fájl
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li v-if="isLoggedIn" class="nav-item btn dropdown p-0">
          <a id="fiok" class="btn dropdown-toggle" role="button" data-toggle="dropdown">
            <fa-icon icon="user-circle" class="fa-1x mr-1" />
            {{ name }}
          </a>
          <div class="dropdown-menu dropdown-menu-right pb-0">
            <router-link to="/profile" class="dropdown-item">
              <fa-icon icon="user" class="fa-1x mr-1" />
              Saját fiók
            </router-link>
            <router-link v-if="role > 1" to="/admin" class="dropdown-item">
              <fa-icon icon="toolbox" class="fa-1x mr-1" />
              Adminisztráció
            </router-link>
            <div class="dropdown-divider"></div>
            <base-button type="danger" class="w-100 border-0" outline @click="logout">
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
    const role = computed(() => {
      return store.getters.getRole;
    });

    return { isLoggedIn, name, role };
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
  a:hover:not(.logoholder),
  ul.menu a.router-link-active {
    background-color: darken($primary, 15);
  }
}
</style>
