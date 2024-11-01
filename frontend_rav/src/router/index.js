
import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomePage from '@/pages/HomePage.vue'; // Importa las páginas
import DepartamentosPage from '@/pages/DepartamentosPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import LineaTiempoOriginal from '@/components/LineaTiempoOriginal.vue';
import Rutaaccionpage from '@/pages/Rutaaccionpage.vue';
import BusquedaCiudadanoPage from '@/pages/BusquedaCiudadanoPage.vue';
import RegistroActividadPage from '@/pages/RegistroActividadPage.vue';
import FormatodeReportesPage from '@/pages/FormatodeReportesPage.vue';
import SubirFicheroPage from '@pages/SubirFicheroPage.vue';
import PerfilUsuarioPage from '@pages/PerfilUsuarioPage.vue'

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },

  {
    path: "/",
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
        name: 'RutaAccionPage',
        component: Rutaaccionpage,
        props: true,
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
      {
        path: '/subirfichero',
        name: 'SubirFicheroPage',
        component: SubirFicheroPage
      },

      { path: '/perfilusuario',
        name: 'PerfilUsuarioPage',
        component: PerfilUsuarioPage
      }
    ]
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Configura el historial web
  routes,
});

export default router;




