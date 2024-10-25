import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import HomePage from '../pages/HomePage.vue'; // Importa las páginas
import DepartamentosPage from '../pages/DepartamentosPage.vue';
import TimeLine from '../pages/TimeLine.vue';
import LoginPage from '../pages/LoginPage.vue';
import LineaTiempoComponente from '../components/LineaTiempoComponente.vue';
import LineaTiempoOriginal from '../components/LineaTiempoOriginal.vue';

const routes = [
  {
    path: '/login',
    component: LoginPage,
  },

  {
    path: '/',
    component: DefaultLayout, // Usa el layout como contenedor
    children: [
      {
        path: '',
        component: HomePage // pagina que se renderiza dentro del layout
      },
      {
        path: '/DepartamentosPage',
        component: DepartamentosPage // pagina que se renderiza dentro del layout
      },
      {
        path: '/TimeLine',
        component: TimeLine // pagina que se renderiza dentro del layout
      },
      {
        path: '/lineatiempo',
        component: LineaTiempoOriginal
      }

    ]
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Configura el historial web
  routes,
});

export default router;
