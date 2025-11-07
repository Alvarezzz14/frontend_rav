import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
    // Usuario falso por defecto en desarrollo
    const defaultUser = import.meta.env.DEV ? {
        nombre: 'Usuario Dev',
        apellidos: 'Prueba',
        correo: 'dev@example.com',
        user_id: 999,
        token: 'fake-token'
    } : null;

    // Estado reactivo para el usuario autenticado
    const authenticatedUser = ref(defaultUser);

    function decodeJWT(token) {
        if (!token) return null;
        try {
            const base64Payload = token.split('.')[1];
            const payload = JSON.parse(atob(base64Payload));
            return payload;
        } catch (error) {
            console.error('Error decoding JWT:', error);
            return null;
        }
    }

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
            const parsedUser = JSON.parse(userFromStorage);
            const decodedToken = decodeJWT(parsedUser.token);
            if (decodedToken) {
                authenticatedUser.value = {
                    ...parsedUser.user,
                    token: parsedUser.token,
                    correo: decodedToken.email,
                    user_id: decodedToken.user_id,
                };
            }
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