import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue'; // Importa las páginas

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage, // Asigna el componente de la ruta principal
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../pages/AboutPage.vue'), // Carga diferida para mejorar el rendimiento
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Configura el historial web
    routes,
});

export default router;
