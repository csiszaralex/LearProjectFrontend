<template>
  <div>Felhasználói fiókok</div>
  <div v-if="loading">Loading...</div>
  <base-table
    v-else
    :data="users"
    :ignore="['id']"
    editable="id"
    deletable="id"
    @edit="edit"
    @delete="del"
  ></base-table>
</template>

<script>
import { ref } from 'vue';
import axios from '@/config/axios.js';
import moment from 'moment';
export default {
  name: 'AdminUser',
  setup() {
    const users = ref();
    const loading = ref(true);

    function fetchAll() {
      loading.value = true;
      axios.get('/users').then(({ data }) => {
        users.value = data.map(user => {
          return {
            id: user.id,
            Név: user.name,
            'E-mail cím': user.email,
            'Létrehozás dátuma': moment(user.createdAt)
              .locale('hu')
              .format('ll'),
            'Utolsó frissítés dátuma': moment(user.updatedAt)
              .locale('hu')
              .format('YYYY MMM Do'),
          };
        });
        loading.value = false;
      });
    }
    fetchAll();

    function edit(id) {
      console.log('EDIT', id);
    }
    function del(id) {
      console.log('DELETE', id);
    }

    return { users, loading, edit, del };
  },
};
</script>
