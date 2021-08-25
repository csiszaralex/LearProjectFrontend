<template>
  <div class="flex-grow-1 d-flex">
    <div class="flex-grow-1 grid">
      <div id="search" class="bg-warning">KERESÉS</div>
      <div id="data" class="bg-danger">Adatok</div>
      <div id="history" class="border border-2"><history /></div>
      <div id="chat"><chat-screen :user="userId" /></div>
      <div id="send"><chat-send :to="userId" /></div>
    </div>
  </div>
</template>

<script>
import ChatScreen from '../components/chat/ChatScreen.vue';
import ChatSend from '../components/chat/ChatSend.vue';
import History from '../components/chat/History.vue';
export default {
  name: 'Chat',
  components: { ChatScreen, ChatSend, History },
  props: { userId: { type: String, default: '' } },
  setup() {},
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 16fr 2fr;
}

#search {
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
}
#data {
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
}
#history {
  grid-row: 2 / span 2;
  grid-column: 1 / span 1;
}
#chat {
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
}
#send {
  grid-row: 3 / span 1;
  grid-column: 2 / span 1;
}
</style>
