<template>
    <div class="bg-gray-100 flex items-center justify-between p-4 rounded-lg shadow-md">
      <!-- Sección Izquierda (Icono y Título) -->
      <div class="flex items-center">
        <div class="bg-customPurple p-4 rounded-full">
          <svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m0 0a8 8 0 018 8v2h-3l3 4v1h-3v-1m-6-1v1H9v1H5v1H4v-1l3-4H4v-2a8 8 0 018-8z" />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-gray-500">Ruta de Atención al</p>
          <h2 class="text-customPurple text-xl font-bold">Ciudadano</h2>
        </div>
      </div>
  
      <!-- Sección Central (Información del ciudadano) -->
      <div class="bg-white p-4 rounded-lg shadow flex items-center">
        <svg class="w-6 h-6 text-customPurple mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 11.879a3 3 0 114.242 0A3 3 0 115.12 11.88zm4.95 4.95a3 3 0 00-4.24 0L3 21h6.342a3 3 0 004.24 0L15 16.829l-4.95-4.95z" />
        </svg>
        <div>
          <p class="text-gray-800 font-semibold">Ciudadano: John Doe</p>
          <p class="text-gray-600">Cédula: 123456789</p>
        </div>
      </div>
  
      <!-- Sección Derecha (Botón) -->
      <button class="bg-customPurple text-white p-4 rounded-lg shadow flex items-center">
        <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span>Ver Línea de Tiempo</span>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RutaAtencionCiudadano'
  }
  </script>
  
  <style scoped>
  .bg-customPurple {
    background-color: #6A1B9A; /* Color personalizado */
  }
  </style>
  