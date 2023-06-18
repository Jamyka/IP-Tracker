import { createApp } from 'vue'
import App from './App.vue'
import LoaderPlugin from './plugins/loader';

createApp(App).use(LoaderPlugin).mount('#app')
