<template>
  <div class="d-flex flex-column-reverse py-3 scroll">
    <chatItem
      v-for="chat in chats"
      :key="chat.id"
      :message="chat.message"
      :types="chat.type"
      :sent="chat.sent"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../../config/axios';
import ChatItem from './ChatItem.vue';
export default {
  name: 'ChatScreen',
  components: { ChatItem },
  props: { user: { type: String, default: '' } },
  setup(props) {
    const router = useRouter();

    const chats = ref();
    function get() {
      axios.get(`chat/${props.user}`).then(({ data }) => {
        if (!props.user) router.replace(`/chat/${data}`);
        else chats.value = data;
      });
      setTimeout(() => {
        get();
      }, 1000);
    }
    get();

    return { chats };
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  overflow-y: scroll;
  height: 100%;
}
</style>
