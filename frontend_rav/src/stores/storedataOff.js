import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useEventStore = defineStore("eventStore", () => {
  // Estado reactivo para almacenar el usuario
  const userInfo = ref(JSON.parse(window.localStorage.getItem("user_info")) || null);

  // Setter: Actualiza el estado reactivo y el localStorage
  const setUserInfo = (newUserInfo) => {
    userInfo.value = newUserInfo; // Actualiza el estado reactivo
    window.localStorage.setItem("user_info", JSON.stringify(newUserInfo)); // Actualiza localStorage
  };

  // Getter: Devuelve el estado reactivo
  const getUserInfo = () => userInfo.value;

  // Elimina el usuario del estado y del localStorage
  const deleteUserInfo = () => {
    userInfo.value = null; // Limpia el estado reactivo
    window.localStorage.removeItem("user_info"); // Limpia localStorage
  };

  // Sincroniza cambios en `userInfo` con el localStorage
  watch(
    userInfo,
    (newValue) => {
      if (newValue) {
        window.localStorage.setItem("user_info", JSON.stringify(newValue));
      } else {
        window.localStorage.removeItem("user_info");
      }
    },
    { deep: true }
  );

  return { getUserInfo, setUserInfo, deleteUserInfo };
});
