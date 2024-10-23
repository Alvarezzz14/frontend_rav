import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Asegúrate de importar el router
import "./styles/style.css";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';  // Asegúrate de tener un tema
import 'primevue/resources/primevue.min.css';             // Estilos de PrimeVue
import 'primeicons/primeicons.css';   
import * as d3 from 'd3'; // Importar D3.js
import 'datamaps'; // Esta línea es opcional, según cómo estés usando Datamaps

const app = createApp(App);
app.use(router); // Usa el router
app.use(PrimeVue);
app.mount("#app");
