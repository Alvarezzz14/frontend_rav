import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Asegúrate de importar el router
import "./styles/style.css";
import * as d3 from 'd3'; // Importar D3.js
import 'datamaps'; // Esta línea es opcional, según cómo estés usando Datamaps

const app = createApp(App);
app.use(router); // Usa el router
app.mount("#app");
