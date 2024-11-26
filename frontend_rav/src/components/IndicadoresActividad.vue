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
            <div class="speedometer-container">
              <svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                <!-- Fondo del velocímetro (semicírculo) -->
                <path fill="none" stroke="#e0e0e0" stroke-width="15" d="M 10 100 A 90 90 0 0 1 190 100" />
  
                <!-- Arco de progreso (semi-circular) -->
                <path :d="arcPath" fill="none" stroke="url(#gradient)" stroke-width="15" />
  
                <!-- Indicador (flecha) -->
                <line :x1="100" :y1="100" :x2="indicatorX" :y2="indicatorY" stroke="#333" stroke-width="3" transform="rotate(180 100 100)" />
  
                <!-- Centro del velocímetro -->
                <circle cx="100" cy="100" r="10" fill="#333" />
              </svg>
  
              <div class="speedometer-info">
                <p class="percentage">{{ percentage }}%</p>
               
              </div>
            </div>
          </div>
  
          <!-- Contenido Derecho -->
          <div class="right-content">
            <div class="progress-circle-container">
              <div class="progress-circle">
                <p class="percentage">36%</p>
              </div>
              <p class="meta-text">Meta Anual </p>
            </div>
            <div class="progress-circle-container">
              <div class="progress-circle">
                <p class="percentage">50%</p>
              </div>
              <p class="meta-text">Meta Trimestral</p>
            </div>
            <div class="progress-circle-container">
              <div class="progress-circle">
                <p class="percentage">75%</p>
              </div>
              <p class="meta-text">Meta Diaria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import Indicador from '@/assets/images/indicador.svg';
  
  // Porcentaje de avance
  const percentage = ref(36);
  
  // Calcula el ángulo en base al porcentaje (180 grados como máximo)
  const angle = computed(() => (percentage.value / 100) * 180);
  
  // Calcula la posición del indicador (flecha)
  const indicatorX = computed(() => 100 + 90 * Math.cos(Math.PI - (angle.value * Math.PI) / 180));
  const indicatorY = computed(() => 100 + 90 * Math.sin(Math.PI - (angle.value * Math.PI) / 180));
  
  // Path para el arco del velocímetro (semi-circular)
  const arcPath = computed(() => {
    const startX = 10;
    const startY = 100;
    const endX = 100 + 90 * Math.cos(Math.PI - (angle.value * Math.PI) / 180);
    const endY = 100 + 90 * Math.sin(Math.PI - (angle.value * Math.PI) / 180);
  
    return `M ${startX} ${startY} A 90 90 0 ${angle.value > 90 ? 1 : 0} 1 ${endX} ${endY}`;
  });
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
    gap: 1px;
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
    gap: 90px;
    align-items: center;
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
  