<template>
  <form class="d-flex justify-content-around mx-3" @submit.prevent="send">
    <label for="message" class="form-label my-auto mr-1">Üzenet: </label>
    <input id="message" v-model="message" type="text" class="form-control" />
    <base-button submit>Küld</base-button>
  </form>
</template>

<script>
import { ref } from 'vue';
import axios from '../../config/axios';
export default {
  name: 'ChatScreen',
  props: { to: { type: String, required: true } },
  setup(props) {
    const message = ref('');
    function send() {
      if (message.value.trim().length > 0) {
        axios.put(`chat/${props.to}`, { message: message.value });
        message.value = '';
      }
    }

    return { message, send };
  },
};
</script>
