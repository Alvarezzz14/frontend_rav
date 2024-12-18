import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(window.localStorage.getItem('auth') || null); // Estado reactivo del token
  const user = ref(null); // Datos del usuario (puedes llenarlos si deseas más detalles)

  // Setter: Almacena el token y usuario autenticado en localStorage
  const setAuthenticatedUser = (newAuthenticatedUser) => {
    const expiresAt = new Date().getTime() + newAuthenticatedUser.expiresIn * 1000; // Tiempo de expiración en ms
    token.value = newAuthenticatedUser.token;
    user.value = newAuthenticatedUser.user;
  
    // Guarda en localStorage
    window.localStorage.setItem('auth', newAuthenticatedUser.token);
    window.localStorage.setItem('user', JSON.stringify(newAuthenticatedUser.user));
    window.localStorage.setItem('expiresAt', expiresAt);
  };

  // Getter: Obtiene el usuario autenticado desde localStorage
  const getAuthenticatedUser = () => {
    return {
      token: window.localStorage.getItem('auth'),
      user: JSON.parse(window.localStorage.getItem('user')),
    };
  };

  // Verifica si el usuario está autenticado
  const isAuthenticated = computed(() => {
    const expiresAt = parseInt(window.localStorage.getItem('expiresAt'), 10);
    return !!token.value && new Date().getTime() < expiresAt;
  });

  // Logout: Elimina el token y usuario de localStorage y el estado
  const logout = () => {
    token.value = null;
    user.value = null;
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('user');
  };

  return {
    token,
    user,
    setAuthenticatedUser,
    getAuthenticatedUser,
    isAuthenticated,
    logout,
  };
});


