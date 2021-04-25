<template>
  ADMINUSER
  <br />
  <base-table :data="users"> </base-table>
</template>

<script>
import { ref } from 'vue';
import axios from '@/config/axios.js';
export default {
  name: 'AdminUser',
  setup() {
    const users = ref();

    function fetchAll() {
      axios.get('/users').then(({ data }) => {
        users.value = data;
      });
    }
    fetchAll();

    return { users };
  },
};
</script>
