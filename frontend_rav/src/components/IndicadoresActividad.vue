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
  import VueSpeedometer from "vue-speedometer";

  const value = ref(10); // Valor inicial del velocímetro

 
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
  