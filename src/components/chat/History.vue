<template>
  <router-link
    v-for="item in items"
    :key="item.id"
    :to="`/chat/${item.id}`"
    class="d-flex h6 p-2 py-3 m-0 borders text-decoration-none text-dark"
  >
    <fa-icon icon="user-circle" class="fa-2x mr-3" />
    <div class="d-flex flex-column">
      <div class="pb-1 font-weight-bold text-capitalize">{{ item.name }}</div>
      <div class="pl-2">
        <span v-if="!item.type" class="font-italic">Te:&nbsp;</span>
        {{ item.message }}
      </div>
    </div>
  </router-link>
</template>

<script>
import { ref } from 'vue';
import axios from '../../config/axios';
export default {
  name: 'History',
  setup() {
    const items = ref();
    function get() {
      axios.get('chat/history').then(({ data }) => {
        items.value = data;
      });
    }
    get();

    return { items };
  },
};
</script>

<style lang="scss" scoped>
.borders {
  border-bottom: 0.1rem solid $dark;
}
.router-link-active {
  background: lighten($dark, 60);
}
</style>
