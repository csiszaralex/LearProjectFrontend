<template>
  <ul class="navbar-nav menu flex-column mt-1">
    <li class="nav-item my-0 text-center" @click="change">
      <div class="btn mx-1 px-1 bigtext d-flex mb-4">
        <fa-icon v-if="opened" icon="angle-double-left" class="fa-2x mr-1 align-self-center" />
        <fa-icon
          v-else
          icon="angle-double-right"
          class="fa-2x mr-1 align-self-center justify-self-center"
        />
        <span v-if="opened" class="align-self-center">Becsuk</span>
      </div>
    </li>
    <li v-if="role >= 3" class="nav-item my-0 text-center">
      <router-link to="/admin/users" class="btn mx-1 px-1 bigtext d-flex">
        <fa-icon icon="users" class="fa-2x mr-1 align-self-center" />
        <span v-if="opened" class="align-self-center">Felhasználók</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return { opened: false };
  },
  computed: {
    role() {
      return this.$store.getters.getRole;
    },
  },
  methods: {
    change() {
      this.opened = !this.opened;
    },
  },
};
</script>

<style lang="scss" scoped>
.bigtext {
  font-size: 1.2rem;
}
li > a:hover,
li > div:hover {
  background-color: lighten($dark, 15);
  span,
  svg {
    color: $light;
  }
}
.router-link-active {
  background-color: lighten($dark, 48);
  span,
  svg {
    color: lighten($dark, 5);
  }
}
.justify-self-center {
  justify-self: center;
}
</style>
