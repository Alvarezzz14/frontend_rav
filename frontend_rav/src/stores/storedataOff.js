// storedataOff.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
<<<<<<< HEAD
import axios from 'axios';
=======
import axios from 'axios'; // Importa axios
>>>>>>> d006e448b9d6399642f8f4c213d0ce9d096fc4dd

export const useEventStore = defineStore('eventStore', () => {
  const events = ref([]);

<<<<<<< HEAD
  async function searchByCedula(cedula) {
    try {
      const response = await axios.get(`http://localhost:8081/api/v1/victimas/${cedula}`);
      return response.data ? [response.data] : [];
    } catch (error) {
      console.error('Error al buscar eventos por cédula:', error);
      return [];
    }
  }

  return { events, searchByCedula };
});
=======
  // Función para obtener todos los eventos desde la API
  async function fetchEvents() {
    try {
      const response = await axios.get('http://localhost:8081/api/v1/events/');
      events.value = response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  }

  // Función para buscar eventos por cédula desde la API
  async function searchByCedula(cedula) {
    try {
      const response = await axios.get(`http://localhost:8081/api/v1/events/${cedula}`);
      return response.data ? [response.data] : []; // Devuelve el evento en un array o vacío
    } catch (error) {
      console.error('Error al buscar eventos por cédula:', error);
      return []; // Devuelve un array vacío si no hay resultados
    }
  }

  return { events, fetchEvents, searchByCedula };
});
>>>>>>> d006e448b9d6399642f8f4c213d0ce9d096fc4dd
