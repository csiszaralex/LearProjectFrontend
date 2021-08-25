<template>
  <div :class="orient" class="m-2 msg bg-primary p-1">
    <span class="p-3 py-2" :title="sentDate">{{ message }}</span>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'ChatItem',
  props: {
    message: { type: String, required: true },
    types: { type: Number, required: true },
    sent: { type: String, required: true },
  },
  setup() {},
  computed: {
    orient() {
      return this.types == 0 ? 'align-self-end' : 'align-self-start';
    },
    sentDate() {
      return moment(this.sent).format('YYYY-MM-DD HH:mm');
    },
  },
};
</script>

<style lang="scss" scoped>
.msg {
  max-width: 70vw;
  border-radius: 1rem;
}
</style>
