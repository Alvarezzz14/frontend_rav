import { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Sidebar from 'primevue/sidebar';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import Drawer from 'primevue/drawer';
import 'primeicons/primeicons.css'
import 'primeicons/primeicons.css';
import 'flowbite';
import './styles/style.css';
const pinia = createPinia();


createApp(App)
    .use(router)
    .use(pinia)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
        },
    })
    .component('Dialog', Dialog)
    .component('Button', Button)
    .component('Avatar', Avatar)
    .directive('styleclass', StyleClass)
    .directive('ripple', Ripple)
    .component('Drawer', Drawer)
    
    .mount('#app');
