import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import 'bootstrap';
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from '@fortawesome/vue-fontawesome';
import '@/config/fontawesome.config';
import BaseButton from './components/UI/BaseButton.vue';
import BaseInput from './components/UI/BaseInput.vue';
import BaseSelect from './components/UI/BaseSelect.vue';
import BaseBadge from './components/UI/BaseBadge.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import BaseTable from './components/UI/BaseTable.vue';

if (localStorage.getItem('token')){
  store.dispatch('changeAuth', { token: localStorage.getItem('token') });
  store.dispatch('renew');
}

const app = createApp(App);
app.use(store);
app.use(router);

app.component('BaseButton', BaseButton);
app.component('BaseInput', BaseInput);
app.component('BaseSelect', BaseSelect);
app.component('BaseBadge', BaseBadge);
app.component('BaseDialog', BaseDialog);
app.component('BaseTable', BaseTable);
app.component('FaIcon', FontAwesomeIcon);
app.component('FaLayers', FontAwesomeLayers);
app.component('FaLayersText', FontAwesomeLayersText);
app.mount('#app');
