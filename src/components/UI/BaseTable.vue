<template>
  <div v-if="data" class="table-responsive">
    <base-dialog
      :show="!!delId"
      title="Biztosan törölni akarod?"
      type="danger"
      close-text="Mégse"
      btn="outline-warning"
      btn2-text="Törlés"
      btn2-type="outline-danger"
      reverse
      @close="delId = 0"
      @send="del"
    ></base-dialog>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th v-for="head in headers" :key="head" scope="col">{{ head }}</th>
          <th v-if="editable">SZERK</th>
          <th v-if="deletable">TÖR</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" :key="i">
          <td scope="row">{{ i + 1 }}</td>
          <td v-for="head in headers" :key="head + i">
            {{ row[head] ? row[head] : row[head] === 0 ? 0 : '-' }}
          </td>
          <td v-if="editable" class="text-center">
            <base-button type="outline-warning btn-sm" @click="edit(row[editable])">
              <fa-icon icon="edit"></fa-icon>
            </base-button>
          </td>
          <td v-if="deletable" class="text-center">
            <base-button type="outline-danger btn-sm" @click="delId = row[editable]">
              <fa-icon :icon="['far', 'trash-alt']"></fa-icon>
            </base-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// TODO szűrő, és akár rendezés nyilakkal
import { ref } from 'vue';
export default {
  name: 'BaseTable',
  props: {
    data: { type: Object, required: true },
    ignore: { type: Object, default: new Array(0) },
    editable: { type: String, default: '' },
    deletable: { type: String, default: '' },
  },
  emits: ['edit', 'delete'],
  setup(props, context) {
    const delId = ref(0);
    const headers = ref([]);
    function getHeaders() {
      for (const x of props.data) {
        for (const y in x) {
          if (!headers.value.includes(y) && !props.ignore.includes(y)) headers.value.push(y);
        }
      }
    }
    getHeaders();

    function edit(id) {
      context.emit('edit', id);
    }
    function del() {
      context.emit('delete', delId.value);
      delId.value = 0;
    }

    return { headers, getHeaders, edit, del, delId };
  },
  watch: {
    data() {
      this.getHeaders();
    },
  },
};
</script>

<style lang="scss" scoped>
td {
  vertical-align: middle;
}
th {
  text-align: center;
}
</style>
