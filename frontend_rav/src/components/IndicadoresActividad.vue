<template>
  <div class="min-h-screen p-4 flex flex-col justify-center">
    <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
    <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-4">
      <!-- Icono y Título -->
      <div class="flex items-center mb-4 md:mb-0">
        <div class="p-6 bg-customPurple rounded-full">
          <!-- Icono SVG -->
          <img :src="Indicador" alt="Icono de Reportes" width="50" height="50" />
        </div>
        <div class="ml-4 text-center md:text-left">
          <p class="text-black mb-0 text-2xl md:text-3xl">Indicadores de</p>
          <h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">Actividad</h2>
        </div>
      </div>
    </div>

    <!-- Contenedor Principal -->
    <div class="dashboard-container">
      <!-- Contenido Integrado -->
      <div class="integrated-panel">
        <!-- Contenido Izquierdo -->
        <div class="left-content flex flex-col p-9 max-w-lg rounded-lg">
          <h3 class="text-lg font-semibold text-black mb-1">Título:</h3>
          <p class="text-xl font-bold text-customPurple mb-3">Meta Anual</p>

       

          <!-- Campo de Meta -->
          <h4 class="text-lg font-semibold text-black mb-1">Meta:</h4>         
          <input
            type="number"
            class="w-full p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple"
            placeholder="Digita la Meta"
          />

          <!-- Rango de Fecha -->
          <h4 class="text-lg font-semibold text-black mt-6 mb-2">Rango de Fecha</h4>
          <div class="flex justify-between gap-4">
            <!-- Fecha Desde -->
            <div class="w-1/2">
              <label for="startDate" class="text-sm text-gray-700 mb-1 block">Desde</label>
              <input
                id="startDate"
                type="date"
                class="w-full p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple"
              />
            </div>
            <!-- Fecha Hasta -->
            <div class="w-1/2">
              <label for="endDate" class="text-sm text-gray-700 mb-1 block">Hasta</label>
              <input
                id="endDate"
                type="date"
                class="w-full p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple"
              />
            </div>
          </div>

          <!-- Botón Guardar -->
          <button
            class="w-full bg-customPurple text-lg cursor-pointer border-none text-amarillo font-bold py-2 rounded-lg shadow-md mt-4"
          >
            Guardar
          </button>
        </div>

        <!-- Contenido Central (Aquí va el velocímetro) -->
        <div class="center-content flex justify-center items-center"  
            style="position: absolute; top: 45%; width: 90%; justify-content: center;">
            <vue-speedometer
              :value="value"
              :minValue="0"
              :maxValue="100"
              :segments="5"
              :needleColor="'#474747'"
              :segmentColors="customSegmentColors"
              :width="400"
              :height="300"
              :ringWidth="25  "
              :currentValueText="'del ${value} del ${value}'"
              :currentValuePlaceholderStyle="valueTextStyle"
              :animate="true"
              :animationDuration="1.5"
            />
          </div>

        <!-- Contenido Derecho (Indicadores Circulares) -->
        <div class="right-content flex flex-col justify-center gap-1 w-full md:w-1/3">
          <div v-for="(goal, index) in goals" :key="index" class="indicator-wrapper flex items-center space-x-4 rounded-lg overflow-hidden"
               :style="getGradientStyle(index)">
            <!-- Indicador Circular -->
            <div class="relative w-24 h-24 md:w-28 md:h-28">
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="lightgray"
                  stroke-width="6"
                  fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="circumference - (circumference * goal.value) / 100"
                  stroke-width="6"
                  fill="none"
                  class="text-customPurple transition-all duration-1000 ease-out" />
              </svg>
              <span class="absolute inset-0 flex items-center justify-center text-lg font-bold w-full h-full text-center">
                {{ goal.value }}%
              </span>
            </div>

            <!-- Texto a la derecha del indicador -->
            <div class="flex flex-col justify-center items-start">
              <div :class="index === 2 ? 'text-white' : 'text-black'" class="text-sm font-semibold">
                {{ goal.label }}
              </div>
              <div :class="index === 2 ? 'text-white text-2xl font-bold' : 'text-black text-xl font-bold'">
                {{ goal.meta || 0 }}
              </div>
              <div :class="index === 2 ? 'text-white' : 'text-black'" class="mt-1 text-sm font-semibold">
                Estado Actual
              </div>
              <div :class="index === 2 ? 'text-white text-2xl font-bold' : 'text-black text-xl font-bold'">
                {{ goal.current || 0 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Indicador from '@/assets/images/indicador.svg';
import VueSpeedometer from 'vue-speedometer';

const value = ref(99); // Valor inicial del velocímetro

// Colores personalizados para los segmentos
const customSegmentColors = [
  "#71277A", // Primer path
  "#A032A4", // Segundo path
  "#A032A4", // Tercer path
  "#D041D5", // Cuarto path
  "#E64CEB", // Quinto path
];

// Estilo para el texto del valor actual
const valueTextStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  fill: "#333",
};

// Función para cambiar el valor
const changeValue = () => {
  value.value = Math.floor(Math.random() * 150); // Genera un valor aleatorio entre 0 y 150
};

// Estado de las metas con valores dinámicos
const goals = ref([
  { label: "Meta Anual", value: 0, meta: 1776, current: 1200 },
  { label: "Meta Trimestral", value: 0, meta: 100, current: 50 },
  { label: "Meta Diaria", value: 0, meta: 800, current: 600 }     
]);

// Recalcular la circunferencia de cada círculo en función de su radio
const calculateCircumference = (radius) => 2 * Math.PI * radius;

const radius = 40; // Radio del círculo
const circumference = computed(() => calculateCircumference(radius)); // Circunferencia recalculada

// Simulación de valores de las metas
onMounted(() => {
  setTimeout(() => {
    goals.value[0].value = 80; 
    goals.value[1].value = 50; 
    goals.value[2].value = 60; 
  }, 500);
});

// Función para obtener el fondo de gradiente correspondiente según el índice
const getGradientStyle = (index) => {
  switch (index) {
    case 0:
      return { background: 'linear-gradient(to right, rgba(242, 243, 243, 1), rgba(217, 217, 217, 1))' };
    case 1:
      return { background: 'linear-gradient(to right, rgba(253, 195, 0, 0.4), rgba(253, 195, 0, 1))' };
    case 2:
      return { background: 'linear-gradient(to right, rgba(207, 95, 221, 1), rgba(113, 39, 122, 1))' };
    default:
      return {};
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
}

.integrated-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 1%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
}

.left-content,
.center-content,
.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.left-content {
  max-width: 30%;
}

.center-content {
  justify-content: center;
  align-items: center;
}

.right-content {
  max-width: 23%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
}

.text-customPurple {
  color: #71277A;
}
</style>
