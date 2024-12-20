import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // Importar el store de autenticación
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import DepartamentosPage from '@/pages/DepartamentosPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import Rutaaccionpage from '@/pages/Rutaaccionpage.vue';
import BusquedaCiudadanoPage from '@/pages/BusquedaCiudadanoPage.vue';
import RegistroActividadPage from '@/pages/RegistroActividadPage.vue';
import RegistroUsuarioPage from '@/pages/RegistroUsuarioPage.vue';
import FormatodeReportesPage from '@/pages/FormatodeReportesPage.vue';
import SubirFicheroPage from '@/pages/SubirFicheroPage.vue';
import PerfilCiudadanoPage from '@/pages/PerfilCiudadanoPage.vue';
import DashBoardPage from '@/pages/DashBoardPage.vue';
import LineaTiempoNuevaPage from '@/pages/LineaTiempoNuevaPage.vue';
import ErrorPage from '@/pages/ErrorPage.vue';
import ListaUsuariosPage from '@/pages/ListaUsuariosPage.vue';
import LineasAtencionPage from '@/pages/LineasAtencionPage.vue';
import IndicadoresActividadPage from '@/pages/IndicadoresActividadPage.vue';
import RolesPermisosPage from '@/pages/RolesPermisos.vue';
import formbienvenidaPage from '@/pages/formbienvenidaPage.vue';


const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiresAuth: false }, // Ruta pública
  },
  {
    path: '/registrousuario',
    name: 'RegistroUsuarioPage',
    component: RegistroUsuarioPage,
    meta: { requiresAuth: true }, // Ruta privada

  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    component: ErrorPage,
    meta: { requiresAuth: false }, // Ruta pública
  },
  {
    path: "/",
    component: DefaultLayout, // Usa el layout como contenedor
    meta: { requiresAuth: true }, // Todas las rutas hijas requieren autenticación
    children: [
      {
        path: '',
        name: 'HomePage',
        component: DashBoardPage,
      },
      {
        path: '/departamentos',
        name: 'DepartamentosPage',
        component: DepartamentosPage,
      },
      {
        path: '/rutadeaccion',
        name: 'RutaAtencionPage',
        component: Rutaaccionpage,
        props: true,
      },
      {
        path: '/busquedaciudadano',
        name: 'BusquedaCiudadanoPage',
        component: BusquedaCiudadanoPage,
      },
      {
        path: '/registroactividad',
        name: 'RegistroActividadPage',
        component: RegistroActividadPage,
      },
      {
        path: '/formatodereportes',
        name: 'FormatodeReportesPage',
        component: FormatodeReportesPage,
      },
      {
        path: '/subirfichero',
        name: 'SubirFicheroPage',
        component: SubirFicheroPage,
      },
      {
        path: '/PerfilCiudadano',
        name: 'PerfilCiudadanoPage',
        component: PerfilCiudadanoPage,
      },
      {
        path: '/LineaTiempoNueva',
        name: 'LineaTiempoNuevaPage',
        component: LineaTiempoNuevaPage,
      },
      {
        path: '/ListaUsuarios',
        name: 'ListaUsuariosPage',
        component: ListaUsuariosPage,
      },
      {
        path: '/lineasatencion',
        name: 'LineasAtencionPage',
        component: LineasAtencionPage,
      },
      {
        path: '/indicadoresactividad',
        name: 'IndicadoresActividadPage',
        component: IndicadoresActividadPage,
      },
      {
        path: '/rolespermisos',
        name: 'RolesPermisosPage',
        component: RolesPermisosPage,
      },
      {
        path: 'formbienvenida',
        name: 'formbienvenidaPage',
        component: formbienvenidaPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Configura el historial web
  routes,
});

// Guard global para proteger rutas privadas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Si la ruta requiere autenticación y no está autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login'); // Redirige al login
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/'); // Si ya está autenticado y va al login, redirige al home
  } else {
    next(); // Permite el acceso a la ruta
  }
});

export default router;





