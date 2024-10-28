import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import HomePage from '../pages/HomePage.vue'; // Importa las páginas
import DepartamentosPage from '../pages/DepartamentosPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import LineaTiempoOriginal from '../components/LineaTiempoOriginal.vue';
import Rutaaccionpage from '../pages/Rutaaccionpage.vue'
import BusquedaCiudadanoPage from '../pages/BusquedaCiudadanoPage.vue'
import RegistroActividadPage from '../pages/RegistroActividadPage.vue';

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
        path: '/departamentos',
        component: DepartamentosPage // pagina que muestra el mapa con los departamentos
      },
      {
        path: '/rutaaccion',
        component: Rutaaccionpage     // // pagina que se renderiza dentro del layout
      },
      {
        path: '/lineatiempo',
        component: LineaTiempoOriginal
      },
      {
        path: '/busquedaciudadano',
        component: BusquedaCiudadanoPage
      },
      {
        path: '/registroactividad',
        component: RegistroActividadPage
      },


    ]
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Configura el historial web
  routes,
});

export default router;
