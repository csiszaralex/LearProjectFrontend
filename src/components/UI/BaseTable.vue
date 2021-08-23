<template>
  <div v-if="sortedData" class="table-responsive">
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
          <th v-for="head in headers" :key="head" scope="col" @click="setSort(head)">
            <span class="mr-2">{{ head }}</span>
            <fa-icon v-if="sort === head && type === 1" icon="caret-up"></fa-icon>
            <fa-icon v-else-if="sort === head" icon="caret-down"></fa-icon>
          </th>
          <th v-if="downloadable"></th>
          <th v-if="editable"></th>
          <th v-if="deletable"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in sortedData" :key="i">
          <td
            v-for="head in headers"
            :key="head + i"
            :class="typeof row[head] === 'number' ? 'text-center' : ''"
          >
            {{ row[head] ? row[head] : row[head] === 0 ? 0 : '-' }}
          </td>
          <td v-if="downloadable" class="text-center p-1 py-2">
            <base-button type="outline-success btn-sm" @click="download(row[downloadable])">
              <fa-icon icon="download"></fa-icon>
            </base-button>
          </td>
          <td v-if="editable" class="text-center p-1 py-2">
            <base-button type="outline-warning btn-sm" @click="edit(row[editable])">
              <fa-icon icon="edit"></fa-icon>
            </base-button>
          </td>
          <td v-if="deletable" class="text-center p-1 py-2">
            <base-button type="outline-danger btn-sm" @click="delId = row[deletable]">
              <fa-icon :icon="['far', 'trash-alt']"></fa-icon>
            </base-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>NINCS ADAT</div>
</template>

<script>
//TODO szűrő
//TODO átnevezés
//TODO előnézet
import { computed, ref } from 'vue';
export default {
  name: 'BaseTable',
  props: {
    data: { type: Object, required: true },
    ignore: { type: Object, default: new Array(0) },
    editable: { type: String, default: '' },
    deletable: { type: String, default: '' },
    downloadable: { type: String, default: '' },
    debug: { type: Boolean, required: false },
  },
  emits: ['edit', 'delete', 'download'],
  setup(props, context) {
    const delId = ref(0);
    const headers = ref(['#']);
    function getHeaders() {
      for (const x of props.data) {
        for (const y in x) {
          if (!headers.value.includes(y) && !props.ignore.includes(y)) headers.value.push(y);
        }
      }
    }
    getHeaders();

    function edit(id) {
      if (props.debug) console.log('Szerkesztés: ', id);
      context.emit('edit', id);
    }
    function del() {
      if (props.debug) console.log('Törlés: ', delId.value);
      context.emit('delete', delId.value);
      delId.value = 0;
    }
    function download(id) {
      if (props.debug) console.log('Letöltés: ', id);
      context.emit('download', id);
    }

    const sortedData = computed(() => {
      let ret = [];
      props.data.forEach((item, index) => {
        ret.push({ ...item, '#': index + 1 });
      });
      if (sort.value) {
        ret = ret.sort((a, b) => {
          return a[sort.value] === b[sort.value]
            ? 0
            : a[sort.value] > b[sort.value]
            ? type.value
            : -1 * type.value;
        });
      }
      return ret;
    });

    const sort = ref();
    const type = ref(1);
    function setSort(head) {
      if (sort.value !== head) {
        sort.value = head;
        type.value = 1;
      } else type.value = type.value === 1 ? -1 : 1;
    }

    return {
      headers,
      getHeaders,
      edit,
      del,
      delId,
      sort,
      setSort,
      type,
      sortedData,
      download,
    };
  },
  watch: {
    data() {
      this.getHeaders();
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  td {
    vertical-align: middle;
  }
  th {
    vertical-align: middle;
    text-align: center;
    span,
    svg {
      cursor: pointer;
    }
  }
}
</style>
