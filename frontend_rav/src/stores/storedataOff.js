// storedataOff.js
import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useEventStore = defineStore('eventStore', () => {
  //const events = ref([]);
  const userInfo = ref({});

  const setUserInfo = (newUserInfo) => {userInfo.value = newUserInfo}
  /*async function searchByCedula(cedula) {
    try {
      const response = await axios.get(`http://localhost:8081/api/v1/victimas/${cedula}`);
      return response.data ? [response.data] : [];
    } catch (error) {
      console.error('Error al buscar eventos por cédula:', error);
      return [];
    }
  }*/
  
  return { userInfo, setUserInfo };
});
