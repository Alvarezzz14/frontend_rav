<template>
  <div class="bg-gray-100 min-h-screen flex flex-col items-center py-8">
    <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
    <div class="bg-gray-100 flex flex-col lg:flex-row items-center justify-between p-4 rounded-lg shadow-md w-full max-w-7xl mb-8">
      <!-- Icono y Título -->
      <div class="flex items-center mb-4 lg:mb-0">
        <div class="p-3 bg-azulBarraApe rounded-full">
          <img :src="Reportes" alt="Reportes" class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-16 lg:h-16" />
        </div>
        <div class="ml-4 text-center lg:text-left">
          <p class="text-black mb-0 text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl">Formato de</p>
          <h2 class="text-azulBarraApe text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-0 font-bold">Reportes</h2>
        </div>
      </div>

      <!-- Información del Ciudadano -->
      <div class="bg-white p-3 rounded-lg shadow flex items-center space-x-2 max-w-xs md:max-w-md lg:max-w-lg mb-4 lg:mb-0">
        <div class="flex-shrink-0">
          <svg width="30" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG del icono de ciudadano -->
          </svg>
        </div>
        <div class="flex flex-col text-center lg:text-left text-xs sm:text-sm md:text-base lg:text-lg">
          <p class="text-gray-800 font-semibold"><span class="font-bold">Ciudadano:</span> John Doe</p>
          <p class="text-gray-800 font-semibold"><span class="font-bold">Cédula:</span> 123456789</p>
        </div>
      </div>

      <!-- Botón Línea de Tiempo -->
      <button class="bg-azulBarraApe text-white px-4 py-2 rounded-lg shadow flex items-center max-w-xs md:max-w-none">
        <img :src="VerLine" alt="Ver Línea de Tiempo" class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
        <span class="ml-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Ver Línea de Tiempo</span>
      </button>
    </div>

    <!-- Sección de Línea de Tiempo -->
    <div v-if="timelineData && timelineData.length" class="relative w-full max-w-5xl mt-8">
      <!-- Línea vertical morada central con íconos -->
      <div class="absolute bg-azulBarraApe w-16 left-1/2 transform -translate-x-1/2 h-full flex flex-col items-center justify-center">
        <div v-for="(item, index) in timelineData" :key="index" class="flex flex-col items-center my-4">
          <!-- Ícono de punto en la línea de tiempo con fecha -->
          <div class="bg-white rounded-full w-8 h-8 flex items-center justify-center border-4 border-white">
            <img :src="LogoSena" alt="Ícono" class="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </div>
          <!-- Línea vertical entre íconos -->
          <div v-if="index < timelineData.length - 1" class="bg-azulBarraApe w-1 h-10"></div>
        </div>
      </div>

      <!-- Tarjetas de contenido (ajustadas para estar separadas y alternarse) -->
      <div v-for="(item, index) in timelineData" :key="index" class="relative flex flex-col items-center mb-5 lg:my-8">
        <div :class="`w-full sm:w-4/5 md:w-3/5 lg:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:ml-auto lg:mr-8' : 'md:pl-8 md:mr-auto lg:ml-8'} flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`">
          <div class="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-md max-w-xs sm:max-w-md">
            <img :src="item.image" alt="Imagen del evento" class="w-full h-16 sm:h-20 md:h-24 object-cover rounded-md mb-2 sm:mb-3" />
            <p class="text-gray-500 text-xs sm:text-sm font-semibold">{{ item.date }}</p>
            <h3 class="text-xs sm:text-sm md:text-base font-bold mt-1">{{ item.title }}</h3>
            <p class="text-gray-700 text-xs sm:text-sm mt-1">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';

import Reportes from "@/assets/images/Reportes.svg";
import VerLine from "@/assets/images/VerLine.svg";
import LogoSena from "@/assets/images/logosenaverde.svg";
import event1 from "@/assets/images/TargetsTime.png";
import event2 from "@/assets/images/TargetsTime.png";

// Datos de la línea de tiempo
const timelineData = ref([
  {
    date: "31/10/2024",
    title: "Dato 1",
    description: "Loremodio imperdiet, malesuada libero a, ultrices.",
    image: event1
  },
  {
    date: "31/10/2024",
    title: "Dato 2",
    description: "Lorem odio imperdiet, malesuada libero a, ultrices.",
    image: event2
  }
]);
</script>

<style scoped>


@media (max-width: 768px) {
  .bg-gray-100 {
    padding: 1rem;
  }
}
</style>
