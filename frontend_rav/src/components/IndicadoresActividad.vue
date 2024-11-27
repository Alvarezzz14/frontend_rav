<template>
  <div class="min-h-screen p-4 flex flex-col justify-center">
    <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
    <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-1">
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
        <div class="left-content">
          <h3>Título:</h3>
          <p>Meta Global</p>
          <h4>Descripción:</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed odio imperdiet, molestie libero ultricies.</p>
          <h4>Meta: {1000}</h4>
          <h4>Rango de Fecha</h4>
          <div class="date-range">
            <div>
              <label>Desde</label><br><br>
              <input type="date" class="w-1/2 p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple" placeholder="Desde" />
            </div>
            <div><br><label>Hasta</label><br><br>
              <input type="date" class="w-1/2 p-2 border rounded text-negro bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple" placeholder="Hasta" />
            </div>
          </div>
        </div>

        <!-- Contenido Central (Aquí va el velocímetro) -->
        <div class="center-content">
          <vue-speedometer
            :value="value"
            :minValue="0"
            :maxValue="100"
            :segments="10"
            :needleColor="'red'"
            :startColor="'green'"
            :endColor="'red'"
          />
        </div>

        <!-- Contenido Derecho (Aquí se inserta el indicador circular) -->
        <div class="right-content flex flex-wrap justify-center gap-6">
          <div v-for="(goal, index) in goals" :key="index" class="indicator-wrapper flex items-center space-x-4 rounded-lg overflow-hidden"
               :style="getGradientStyle(index)">
            <!-- Contenedor redondeado para el indicador circular -->
            <div class="relative w-24 h-24 md:w-28 md:h-28">
              <!-- Fondo del medidor vacío -->
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="lightgray"
                  stroke-width="6"
                  fill="none" />
                <!-- Círculo animado que muestra el progreso -->
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
              <!-- Contenedor fijo para el valor -->
              <span class="absolute inset-0 flex items-center justify-center text-lg font-bold w-full h-full text-center">
                {{ goal.value }}%
              </span>
            </div>

            <!-- Contenido de texto a la derecha del indicador -->
            <div class="flex flex-col justify-center items-start">
              <!-- Meta Trimestral -->
              <div class="text-sm font-semibold text-gray-700"> {{ goal.label }}</div>
              <div class="text-lg font-bold text-customPurple">{{ goal.meta || 0 }}</div> <!-- Valor de la meta -->

              <!-- Estado Actual -->
              <div class="mt-1 text-sm font-semibold text-gray-700">ESTADO ACTUAL</div>
              <div class="text-lg font-bold text-customPurple">{{ goal.current || 0 }}</div> <!-- Valor actual -->
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

const value = ref(10); // Valor inicial del velocímetro

// Estado de las metas con valores dinámicos
const goals = ref([
  { label: "META TRIMESTRAL", value: 0, meta: 1776, current: 1200 }, // Meta trimestral y estado actual
  { label: "META DIARIA", value: 0, meta: 100, current: 50 },
  { label: "META SEMANAL", value: 0, meta: 800, current: 600 }     
]);

// Recalcular la circunferencia de cada círculo en función de su radio
const calculateCircumference = (radius) => 2 * Math.PI * radius;

const radius = 40; // Radio del círculo (puedes ajustarlo)
const circumference = computed(() => calculateCircumference(radius)); // Circunferencia recalculada

// Simulación de valores de las metas
onMounted(() => {
  setTimeout(() => {
    goals.value[0].value = 80; // Progreso al 80% para la meta trimestral
    goals.value[1].value = 50; // Progreso al 50% para la meta diaria
    goals.value[2].value = 60;  // Progreso al 60% para la meta semanal
  }, 500);
});

// Función para obtener el fondo de gradiente correspondiente según el índice
const getGradientStyle = (index) => {
  switch (index) {
    case 0:
      return { background: 'linear-gradient(180deg, #F2F3F3 0%, #D9D9D9 70%)' };
    case 1:
      return { background: 'linear-gradient(180deg, rgba(234, 181, 4, 0.4) 0%, #FDC300 100%)' };
    case 2:
      return { background: 'linear-gradient(180deg, #CF5FDD 0%, #71277A 74.5%)' };
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
  gap: 20px;
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
  gap: 10px;
}

.left-content {
  max-width: 30%;
}

.center-content {
  justify-content: center;
  align-items: center;
  margin-top: 190px;
}


.right-content {
  max-width: 30%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
}

.progress-circle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.progress-circle {
  width: 80px;
  height: 80px;
  border: 7px solid purple;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.meta-text {
  font-size: 14px;
  color: black;
  text-align: center;
  margin: 0;
}

.bg-customPurple {
  background-color: #71277A;
}

.text-customPurple {
  color: #71277A;
}

/* Velocímetro */
.speedometer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.speedometer-info {
  text-align: center;
  margin-top: 10px;
}

.percentage {
  font-size: 1rem;
  font-weight: bold;
}

.label {
  font-size: 1.2rem;
  color: #71277a;
}
</style>
