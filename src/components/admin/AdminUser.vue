<template>
  <div class="h3 my-3">Felhasználói fiókok</div>
  <base-dialog :show="!!selectedId" upper footless>
    <profile :id="selectedId" imported @close="close"></profile>
  </base-dialog>
  <base-loader v-if="loading">Loading...</base-loader>
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
import roleEnum from '@/config/role.enum';
import axios from '@/config/axios.js';
import moment from 'moment';
import Profile from '../../views/Profile.vue';
export default {
  name: 'AdminUser',
  components: { Profile },
  setup() {
    const selectedId = ref(0);
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
            Jogosultság: user.role < 6 ? roleEnum[user.role] : user.role,
            'Létrehozás dátuma': moment(user.createdAt)
              .locale('hu')
              .format('ll'),
            'Utolsó belépés': moment(user.signedIn)
              .locale('hu')
              .format('YYYY MMM Do'),
          };
        });
        loading.value = false;
      });
    }
    fetchAll();

    function edit(id) {
      selectedId.value = id.toString();
    }
    function close() {
      selectedId.value = 0;
      fetchAll();
    }
    function del(id) {
      axios.delete('/users/' + id).then(() => {
        fetchAll();
      });
    }

    return { users, loading, edit, del, selectedId, close };
  },
};
</script>
