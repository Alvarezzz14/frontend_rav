<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center justify-center">
    <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
    <div class="bg-gray-100 flex flex-col md:flex-row items-center justify-between p-4 rounded-lg shadow-md w-full max-w-7xl mb-8">
      <!-- Icono y Título -->
      <div class="flex items-center mb-4 md:mb-0">
        <div class="p-6 bg-customPurple rounded-full">
          <svg width="148" height="153" viewBox="0 0 148 153" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M73.7941 141.112C110.968 141.112 141.104 110.893 141.104 73.6161C141.104 36.3391 110.968 6.12012 73.7941 6.12012C36.6201 6.12012 6.48462 36.3391 6.48462 73.6161C6.48462 110.893 36.6201 141.112 73.7941 141.112Z"
                  fill="#741E78" />
              <path
                  d="M119.569 96.0302V98.5412C118.784 102.969 115.671 106.434 111.205 107.28L49.3873 107.313C48.3773 110.887 45.6728 113.984 42.0836 115.081C41.4409 115.281 40.7481 115.298 40.1555 115.566C39.2957 115.499 38.3191 115.658 37.4761 115.566C29.5297 114.704 25.3645 105.187 29.8886 98.5496C35.1723 90.7988 46.8581 93.1592 49.3956 101.948H110.179C115.804 100.826 115.437 93.0671 109.619 92.4561L58.6608 92.4394C50.3221 91.5103 46.6995 81.056 52.9431 75.2136C54.1701 74.0669 57.175 72.5268 58.8528 72.5268H81.1226L68.4602 55.0081C60.2217 40.5947 71.1897 22.6742 87.8253 23.7623C103.184 24.7668 111.957 42.0762 104.085 55.301C99.7615 62.5747 93.2508 69.4047 88.7017 76.6365C88.2092 77.2476 87.5832 77.8251 86.7569 77.9088C77.9925 78.3608 68.6104 77.2978 59.9128 77.9004C54.0282 78.3106 53.4356 85.76 59.0281 87.049C76.4733 87.1913 93.9687 86.756 111.389 87.275C115.479 88.0032 119.102 91.8534 119.569 96.0134V96.0302ZM84.837 29.2029C73.7856 30.1822 67.4752 42.8295 73.1011 52.3296L86.1225 70.1078L86.5649 70.384L99.5612 52.3966C105.805 41.4903 97.441 28.0813 84.8287 29.2029H84.837ZM37.9685 99.3029C31.1657 100.224 32.2592 110.971 39.5127 110.176C46.4324 109.414 45.5059 98.2901 37.9685 99.3029Z"
                  fill="white" />
              <path
                  d="M86.2475 36.2171C96.8482 36.0497 97.0068 52.3547 86.3978 52.3631C75.7637 52.3715 75.7637 36.3845 86.2475 36.2171ZM86.2392 41.5907C82.6917 41.7414 82.7501 47.6005 87.0989 46.8974C87.8919 46.7718 88.8518 45.6168 88.977 44.8383C89.2358 43.1894 87.9837 41.5238 86.2392 41.5991V41.5907Z"
                  fill="white" />
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
        <img src="@/assets/images/PersonaReportes.svg" alt="Persona sonriendo" class="rounded-lg object-cover w-full h-full max-h-96 xl:max-h-full" />
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
      <button class="w-full bg-customPurple text-white py-2 rounded-lg shadow-md mt-4" @click="downloadExcel">Buscar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
function downloadExcel() {
  const link = document.createElement('a');
  link.href = '/files/reporte.xlsx'; // Asegúrate de que esta ruta es accesible
  link.download = 'reporte.xlsx'; // Nombre del archivo descargado
  link.click();
}
</script>


