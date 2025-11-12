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

// Seed de autenticación en desarrollo: crea un usuario en localStorage si no existe
if (import.meta.env.DEV && !window.localStorage.getItem('auth')) {
    const payload = {
        email: 'demo@rav.gov.co',
        user_id: 1,
    };
    const token = `dummy.${btoa(JSON.stringify(payload))}.dummy`;
    const user = {
        nombre: 'Usuario',
        apellidos: 'Demo',
        documento: '00000000',
        rol: 'ADMIN',
    };
    window.localStorage.setItem('auth', JSON.stringify({ user, token }));
}
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
