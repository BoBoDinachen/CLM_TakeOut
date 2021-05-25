import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'

const app = createApp(App);
app.use(router);

const vm = app.mount("#app");