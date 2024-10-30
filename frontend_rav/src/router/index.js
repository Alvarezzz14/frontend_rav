import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomePage from '@/pages/HomePage.vue'; // Importa las páginas
import DepartamentosPage from '@/pages/DepartamentosPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import LineaTiempoOriginal from '@/components/LineaTiempoOriginal.vue';
<<<<<<< HEAD
import Rutaaccionpage from '@/pages/Rutaaccionpage.vue';
=======
import Rutaaccionpage from '@/pages/Rutaaccionpage.vue'; 
>>>>>>> main
import BusquedaCiudadanoPage from '@/pages/BusquedaCiudadanoPage.vue';
import RegistroActividadPage from '@/pages/RegistroActividadPage.vue';
import FormatodeReportesPage from '@/pages/FormatodeReportesPage.vue';

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },

  {
    path: '/',
    component: DefaultLayout, // Usa el layout como contenedor
    children: [
      {
        path: '',
        name: 'HomePage',
        component: HomePage // pagina que se renderiza dentro del layout
      },
      {
        path: '/departamentos',
        name: 'DepartamentosPage',
        component: DepartamentosPage // pagina que muestra el mapa con los departamentos
      },
      {
        path: '/rutadeaccion/:cedula',
        name: 'Rutaaccionpage',
        component: Rutaaccionpage     // // pagina que se renderiza dentro del layout
      },
      {
        path: '/lineatiempo',
        name: 'LineaTiempo',
        component: LineaTiempoOriginal
      },
      {
        path: '/busquedaciudadano',
        name: 'BusquedaCiudadanoPage',
        component: BusquedaCiudadanoPage
      },
      {
        path: '/registroactividad',
        name: 'RegistroActividadPage',
        component: RegistroActividadPage
      },
      {
        path: '/formatodereportes',
        name: 'FormatodeReportesPage',
        component: FormatodeReportesPage
      },


    ]
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Configura el historial web
  routes,
});

export default router;
