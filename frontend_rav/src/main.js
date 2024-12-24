import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import Drawer from 'primevue/drawer';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'primeicons/primeicons.css';
import 'flowbite';
import '@/styles/style.css';
import TimeLine from 'primevue/timeline';
import { useAuthStore } from './stores/auth';


const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
const authStore = useAuthStore();
authStore.initializeAuth(); // Inicializa la autenticación desde localStorage


app.use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.no-dark-mode' // Clase inexistente para evitar el modo oscuro
            }
        },
    })
    .use(Toast, {
        position: "top-right",
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
    })
    .component('Dialog', Dialog)
    .component('TimeLine', TimeLine)
    .component('Button', Button)
    .component('Avatar', Avatar)
    .directive('styleclass', StyleClass)
    .directive('ripple', Ripple)
    .component('Drawer', Drawer)

    .mount('#app');
