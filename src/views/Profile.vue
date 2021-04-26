<template>
  <div class="flex-grow-1 mt-2 px-3 pb-3">
    <base-dialog
      :show="!!sureDelete"
      title="Biztosan törölni akarod?"
      type="danger"
      close-text="Mégse"
      btn="outline-warning"
      btn2-text="Törlés"
      btn2-type="outline-danger"
      reverse
      @close="sureDelete = 0"
      @send="del"
    ></base-dialog>
    <h3 v-if="!imported" class="mb-4">Személyes adatok</h3>
    <div
      v-if="showErr"
      class="alert alert-dismissible fade position-absolute z-100"
      :class="[{ show: !!error }, showErr === 'Sikeres mentés!' ? 'alert-success' : 'alert-danger']"
      role="alert"
    >
      <strong v-if="showErr !== 'Sikeres mentés!'" class="mr-2">Hiba!</strong>
      {{ error }}
    </div>
    <form
      v-if="myProfile"
      class="row mx-0 d-flex flex-column align-items-center"
      @submit.prevent="save"
    >
      <base-input
        v-model="editProfile.fullName"
        type="text"
        icon="signature"
        pattern="fullName"
        class="w-75 my-3"
        autofocus
        :no-check="myProfile.fullName === editProfile.fullName"
      >
        Teljes név
      </base-input>
      <base-input
        v-model="editProfile.name"
        type="text"
        icon="user"
        pattern="name"
        class="w-75 my-3"
        :no-check="myProfile.name === editProfile.name"
      >
        Felhasználónév
      </base-input>
      <base-input
        v-model="editProfile.email"
        type="text"
        icon="at"
        pattern="email"
        class="w-75 my-3"
        :no-check="myProfile.email === editProfile.email"
      >
        E-mail cím
      </base-input>
      <base-input
        v-model="editProfile.password"
        type="password"
        icon="lock"
        pattern="password"
        class="w-75 my-3"
      >
        Jelszó
      </base-input>
      <base-input
        v-model="editProfile.phoneNumber"
        type="text"
        icon="phone"
        pattern="phone"
        class="w-75 my-3"
        :no-check="
          myProfile.phoneNumber === editProfile.phoneNumber && editProfile.phoneNumber !== ''
        "
      >
        Telefonszám
      </base-input>
      <base-select
        v-if="role > 1"
        v-model="editProfile.role"
        icon="user-tag"
        :nums="id ? role - 1 : myProfile.role"
        :values="roleEnum"
        :def="myProfile.role"
        class="w-75 my-3"
      >
        Jogosultság
      </base-select>
      <div class="d-flex justify-content-around mt-4">
        <base-button type="warning" class="w-25 align-self-center" @click="megse">
          Mégse
        </base-button>
        <base-button
          v-if="!imported"
          type="outline-danger"
          class="w-25 align-self-center"
          @click="sureDelete = 1"
        >
          Fiók törlése
        </base-button>
        <base-button type="primary" submit class="w-25 align-self-center">Mentés</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '@/config/axios.js';
import rolesEnum from '@/config/role.enum.js';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Profile',
  props: { id: { type: String, default: '' }, imported: { type: Boolean, required: false } },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();
    const sureDelete = ref(0);
    const error = ref('');
    const showErr = ref('');
    const roleEnum = rolesEnum;
    const myProfile = ref();
    const editProfile = ref();
    function getFromServer() {
      axios.get(`/users/whoami/${props.id}`).then(res => {
        myProfile.value = { ...res.data, password: '' };
        if (!myProfile.value.phoneNumber) myProfile.value.phoneNumber = '';
        editProfile.value = JSON.parse(JSON.stringify(myProfile.value));
      });
    }
    function save() {
      axios
        .patch(`/users/${props.id}`, editProfile.value)
        .then(({ data }) => {
          if (!props.id) store.dispatch('changeAuth', { token: data.accessToken });
          myProfile.value = JSON.parse(JSON.stringify(editProfile.value));
          error.value = 'Sikeres mentés!';
          setTimeout(() => {
            error.value = '';
            if (props.imported) emit('close');
          }, 3000);
        })
        .catch(err => {
          error.value = err.response.data.statusCode + ' - ' + err.response.data.message;
          setTimeout(() => {
            error.value = '';
          }, 3000);
        });
    }
    function megse() {
      editProfile.value = JSON.parse(JSON.stringify(myProfile.value));
      if (props.imported) emit('close');
    }
    function del() {
      axios.delete('/users').then(() => {
        store.dispatch('logout');
      });
    }
    //TODO Mentés után a select nem kékül vissza

    watch(error, val => {
      const timer = val ? 0 : 250;
      setTimeout(() => {
        showErr.value = val;
      }, timer);
    });

    getFromServer();
    return {
      myProfile,
      getFromServer,
      save,
      editProfile,
      roleEnum,
      error,
      megse,
      showErr,
      sureDelete,
      del,
    };
  },
  computed: {
    role() {
      return this.$store.getters['getRole'];
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  width: 50%;
  top: 3rem;
  left: 45%;
}
</style>
