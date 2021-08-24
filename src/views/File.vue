<template>
  <div class="flex-grow-1 d-flex">
    <div class="cont flex-grow-1">
      <form class="bg-success m-5" @submit.prevent="post">
        <input ref="input" type="file" @change="set" />
        <base-button class="m-2" submit>Feltölt!</base-button>
      </form>
      <div class="bg-light">
        <base-table
          v-if="files"
          :data="files"
          :ignore="['id']"
          deletable="id"
          downloadable="id"
          @delete="deleteF"
          @download="download"
        ></base-table>
      </div>
    </div>
  </div>
</template>

<script>
//TODO Filek átnevezése
import { ref } from 'vue';
import axios from '@/config/axios.js';
export default {
  name: 'Test',
  setup() {
    const files = ref();
    const input = ref();

    function post() {
      const formData = new FormData();
      for (const i of Object.keys(input.value.files)) {
        formData.append('file', input.value.files[i]);
      }
      axios
        .post('/files', formData)
        .then(() => {
          input.value.value = '';
          getAll();
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
    function deleteF(id) {
      axios
        .delete(`/files/${id}`)
        .then(() => {
          input.value.value = '';
          getAll();
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
    function download(id) {
      const item = files.value.find(data => data.id === id);
      axios
        .get(`/files/${id}`, { responseType: 'arraybuffer' })
        .then(res => {
          forceDownload(res.data, item.Név);
          files.value = files.value.map(file => {
            if (file.id === id) file['Letöltések száma']++;
            return file;
          });
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
    function forceDownload(data, title) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', title);
      document.body.appendChild(link);
      link.click();
    }

    function getAll() {
      axios.get('/files').then(({ data }) => {
        files.value = data.map(d => {
          return { id: d.id, Név: d.name, 'Letöltések száma': d.downloads };
        });
      });
    }
    getAll();

    return { post, files, input, deleteF, download };
  },
};
</script>

<style lang="scss" scoped>
.cont {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
}
</style>
