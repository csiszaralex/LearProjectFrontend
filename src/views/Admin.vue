<template>
  <div class="flex-grow-1 d-flex">
    <div class="admin flex-grow-1">
      <div class="navB bg-light p-2">
        <nav-bar @go="go"></nav-bar>
      </div>
      <div>
        <admin-user v-if="content === 'users' && role >= 4"></admin-user>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/admin/NavBar.vue';
import AdminUser from '../components/admin/AdminUser.vue';
export default {
  name: 'Admin',
  components: { NavBar, AdminUser },
  computed: {
    content() {
      return this.$route.query['content'];
    },
    role() {
      return this.$store.getters['getRole'];
    },
  },
  methods: {
    go(where) {
      this.$router.replace('/admin?content=' + where);
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  gap: 20px;
}
</style>
