import { createApp } from 'vue';
import './styles/style.css';
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
import * as d3 from 'd3'; // Importar D3.js
import 'datamaps'; // Esta línea es opcional, según cómo estés usando Datamaps



createApp(App)
    .use(router)
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

