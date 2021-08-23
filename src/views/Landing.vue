<template>
  <div>
    <base-loader v-if="isLoading">Töltés...</base-loader>
    <p v-else-if="error" class="text-center display-3">{{ error }}</p>
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
import { ref, onBeforeMount, onUnmounted } from 'vue';
import LandingItem from '../components/landing/LandingItem.vue';
import axios from '@/config/axios.js';
export default {
  name: 'Landing',
  components: { LandingItem },
  setup() {
    const results = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const limit = 5;
    let page = 1;

    function loadExp() {
      error.value = null;
      if (!results.value) isLoading.value = true;
      axios
        .get(`/homepage?limit=${limit}&page=${page}`)
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
          page++;
          results.value.push(...datas);
          isLoading.value = false;
        })
        .catch(err => {
          error.value = err.message;
          console.log('ERROR', err);
        });
    }

    function orient(id) {
      return id % 2 ? 'left' : 'right';
    }

    function handleScroll() {
      const posFromBottom = Math.max(
        document.body.offsetHeight - (window.pageYOffset + window.innerHeight),
        0,
      );
      if (posFromBottom < 100) loadExp();
    }

    onBeforeMount(() => {
      window.addEventListener('scroll', handleScroll);
      loadExp();
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    return { isLoading, results, error, orient };
  },
};
</script>
