<template>
  <div>
    <base-loader v-if="isLoading">Töltés...</base-loader>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="!results || results.length === 0" class="text-center display-3">
      Nincs adat
    </p>
    <ul v-else-if="results && results.length > 0" class="p-0">
      <landing-item
        v-for="result in results"
        :key="result.id"
        :cim="result.cim"
        :alcim="result.alcim"
        :orientation="orient(result.id)"
        :photo="result.picture"
      />
    </ul>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import LandingItem from '../components/landing/LandingItem.vue';
import axios from '@/config/axios.js';
export default {
  name: 'Landing',
  title: 'asd',
  components: { LandingItem },
  setup() {
    const results = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    function loadExp() {
      isLoading.value = true;
      error.value = null;

      axios
        .get('/homepage')
        .then(res => {
          const datas = [];
          for (const i in res.data) {
            datas.push({
              id: res.data[i].id,
              cim: res.data[i].cim,
              alcim: res.data[i].alcim,
              picture: res.data[i].picture,
            });
          }
          results.value = datas;
          isLoading.value = false;
        })
        .catch(err => {
          error.value = err;
          console.log('ERROR', err);
        });
    }

    function orient(id) {
      return id % 2 ? 'left' : 'right';
    }

    onBeforeMount(() => {
      loadExp();
    });
    return { isLoading, results, error, orient };
  },
};
</script>
