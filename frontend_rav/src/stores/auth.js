import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
    // Estado reactivo para el usuario autenticado
    const authenticatedUser = ref(null);

    // Computado para determinar si el usuario está autenticado
    const isAuthenticated = computed(() => authenticatedUser.value !== null);

    // Configurar el usuario autenticado y guardarlo en localStorage
    const setAuthenticatedUser = (newAuthenticatedUser) => {
        authenticatedUser.value = newAuthenticatedUser;
        window.localStorage.setItem('auth', JSON.stringify(newAuthenticatedUser));
    };

    // Recuperar el usuario autenticado desde localStorage al cargar
    const initializeAuth = () => {
        const userFromStorage = window.localStorage.getItem('auth');
        if (userFromStorage) {
            authenticatedUser.value = JSON.parse(userFromStorage);
        }
    };

    // Cerrar sesión
    const logout = () => {
        authenticatedUser.value = null;
        window.localStorage.removeItem('auth');
    };

    return {
        authenticatedUser,
        isAuthenticated,
        setAuthenticatedUser,
        initializeAuth,
        logout,
    };
});