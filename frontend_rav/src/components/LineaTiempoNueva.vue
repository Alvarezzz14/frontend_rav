<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center justify-center">
    <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
    <div
      class="bg-gray-100 flex flex-col md:flex-row items-center justify-between p-4 rounded-lg shadow-md w-full max-w-7xl mb-8">
      <!-- Icono y Título -->
      <div class="flex items-center mb-4 md:mb-0">
        <div class="p-6 bg-customPurple rounded-full">
          <img :src="Reportes" alt="Reportes" width="50" height="50" />
        </div>
        <div class="ml-4 text-center md:text-left">
          <p class="text-black mb-0 text-2xl md:text-3xl">Línea de</p>
          <h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">Tiempo</h2>
        </div>
      </div>

      <!-- Información del Ciudadano -->
      <div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4 mb-4 md:mb-0 max-w-xs md:max-w-none">
        <div class="flex-shrink-0">
          <svg width="50" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG del icono de ciudadano -->
          </svg>
        </div>
        <div class="flex flex-col space-y-1 text-center md:text-left">
          <p class="text-gray-800 font-semibold"><span class="font-bold">Ciudadano:</span> John Doe</p>
          <p class="text-gray-800 font-semibold"><span class="font-bold">Cédula:</span> 123456789</p>
        </div>
      </div>

      <!-- Botón Ver Ruta de Atención -->
      <button class="bg-customPurple text-white p-4 rounded-lg shadow flex items-center max-w-xs md:max-w-none">
        <img :src="VerLine" alt="Ver Ruta de Atención" width="50" height="50" />
        <span class="ml-2">Ver Ruta de Atención</span>
      </button>
    </div>

    <!-- Sección de Línea de Tiempo -->
    <div class="relative w-max max-w-5xl">
      <!-- Línea vertical central con los íconos dentro -->
      <div class="absolute bg-customPurple w-5 left-1/2 transform -translate-x-1/2 h-full"></div>

      <div v-for="(item, index) in timelineData" :key="index" class="relative flex flex-col items-center mb-12">
        <!-- Ícono de punto en la línea de tiempo con fecha -->
        <div
          class="absolute bg-white rounded-full w-12 h-12 flex items-center justify-center border-4 border-white left-1/2 transform -translate-x-1/2 -mt-6 z-10">
          <img :src="LogoSena" alt="Ícono" width="50" height="50" />
        </div>

        <!-- Tarjeta de contenido (alternando entre izquierda y derecha) -->
        <div
          :class="`w-full md:w-3/5 lg:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12 md:mr-auto'} flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`">
          <div class="bg-white p-6 rounded-lg shadow-md max-w-md">
            <img :src="item.image" alt="Imagen del evento" class="w-full h-48 object-cover rounded-md mb-4" />
            <p class="text-gray-500 text-sm font-semibold">{{ item.date }}</p>
            <h3 class="text-lg font-bold mt-2">{{ item.title }}</h3>
            <p class="text-gray-700 mt-2">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LogoSena from "@/assets/images/logosenaverde.svg";

// Datos de la línea de tiempo
const timelineData = ref([
  {
    date: "31/10/2024",
    title: "Dato 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed odio imperdiet, malesuada libero a, ultrices.",
    image: "@/assets/images/event1.jpg"
  },
  {
    date: "31/10/2024",
    title: "Dato 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed odio imperdiet, malesuada libero a, ultrices.",
    image: "@/assets/images/event2.jpg"
  }
]);
</script>

<style scoped>
/* Ajustes responsivos */
@media (max-width: 768px) {
  .bg-gray-100 {
    padding: 1rem;
  }
}

/* Ajuste de la línea de tiempo para mayor ancho */
.bg-customPurple {
  width: 2.5rem;
}
</style>
