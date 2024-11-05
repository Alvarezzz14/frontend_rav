<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center justify-center">
    <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
    <div class="bg-gray-100 flex flex-col md:flex-row items-center justify-between p-4 rounded-lg shadow-md w-full max-w-7xl mb-8">
      <!-- Icono y Título -->
      <div class="flex items-center mb-4 md:mb-0">
        <div class="p-6 bg-customPurple rounded-full">
          <!-- Icono SVG -->
          <svg width="65" height="57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG del ícono -->
          </svg>
        </div>
        <div class="ml-4 text-center md:text-left">
          <p class="text-black mb-0 text-2xl md:text-3xl">Formato de</p>
          <h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">Reportes</h2>
        </div>
      </div>

      <!-- Información del Ciudadano -->
      <div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4 mb-4 md:mb-0 max-w-xs md:max-w-none">
        <div class="flex-shrink-0">
          <!-- Icono SVG del ciudadano -->
          <svg width="50" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG del icono de ciudadano -->
          </svg>
        </div>
        <div class="flex flex-col space-y-1 text-center md:text-left">
          <p class="text-gray-800 font-semibold"><span class="font-bold">Ciudadano:</span> John Doe</p>
          <p class="text-gray-800 font-semibold"><span class="font-bold">Cédula:</span> 123456789</p>
        </div>
      </div>

      <!-- Botón Línea de Tiempo -->
      <button class="bg-customPurple text-white p-4 rounded-lg shadow flex items-center max-w-xs md:max-w-none">
        <svg width="85" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- SVG del icono del botón -->
        </svg>
        <span class="ml-2">Ver Línea de Tiempo</span>
      </button>
    </div>

    <!-- Sección Central (Imagen y Formulario) -->
    <div class="flex flex-col xl:flex-row items-center justify-center w-full max-w-7xl space-y-8 xl:space-y-0 xl:space-x-8">
      <!-- Imagen de la Persona -->
      <div class="flex-1 max-w-md lg:max-w-lg p-4">
        <img src="@/assets/images/PersonaReportes.jpg" alt="Persona sonriendo" class="rounded-lg object-cover w-full h-full max-h-96 xl:max-h-full" />
      </div>

      <!-- Formulario completo sin pasos -->
      <div class="flex-1 max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-md w-full">
        <!-- Selección de Formato -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-semibold mb-2">Seleccione el formato en el cual desea descargar el archivo.</label>
          <div class="flex items-center space-x-4">
            <label class="flex items-center">
              <input type="radio" name="format" value="pdf" class="form-radio text-customPurple" />
              <span class="ml-2 text-gray-700">PDF</span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="format" value="excel" class="form-radio text-customPurple" />
              <span class="ml-2 text-gray-700">EXCEL</span>
            </label>
          </div>
        </div>

        <!-- Selección de Ubicación -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-semibold mb-2">Seleccione los filtros.</label>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox text-customPurple" />
              <span class="ml-2 text-gray-700">Filtre por Departamento</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox text-customPurple" />
              <span class="ml-2 text-gray-700">Filtre por Ciudad</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox text-customPurple" />
              <span class="ml-2 text-gray-700">Filtre por CC</span>
            </label>
          </div>
        </div>

        <!-- Selección de Fecha -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-semibold mb-2">Seleccione el rango de fechas.</label>
          <div class="flex items-center space-x-4">
            <input type="date" class="w-1/2 p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple" />
            <input type="date" class="w-1/2 p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple" />
          </div>
        </div>

        <!-- Botón de Búsqueda -->
        <button class="w-full bg-customPurple text-white py-2 rounded-lg shadow-md mt-4" @click="buscar">Buscar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
function buscar() {
  // Acción de búsqueda
}
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
