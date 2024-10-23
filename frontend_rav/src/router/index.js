import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue'; // Importa App.vue en lugar de Home.vue

const routes = [
  {
    path: '/',
    component: App, // Establece App.vue como el componente para la raíz
  },
  // Aquí puedes agregar más rutas según sea necesario
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
