import { createApp } from 'vue'
import router from './router'
import App from './app.vue'

createApp(App)
    .use(router)
    .mount('#app')