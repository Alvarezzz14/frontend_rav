// store.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios'; // Importa axios

export const useEventStore = defineStore('eventStore', () => {
  const events = ref([]);

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
