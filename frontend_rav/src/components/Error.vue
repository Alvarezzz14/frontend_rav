<template>
  <div class="bg-gray-100 py-0 flex items-center overflow-hidden min-h-screen justify-center h-screen">
    <!-- Contenedor principal -->
    <div class="text-center  max-h-full overflow-hidden">
      <!-- Mensaje de error -->
      <div class="relative inline-grid">
        <!-- Título "Oops..." -->
        <h1 class="text-negro font-bold mb-4 lg:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Oops...
        </h1>

        <!-- Imagen de los personajes -->
        <div class="relative flex w-full items-center justify-center">
          <img :src="characterImage" alt="404 con personajes" class="w-3/4 sm:w-full object-contain  md:max-h-72 lg:max-h-full" />
        </div>
      </div>

      <!-- Mensaje de "Página no encontrada" -->
      <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-negro">
        Página no encontrada
      </h2>

      <!-- Botón de regreso -->
      <button @click="goHome" class="bg-customPurple text-amarillo px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg shadow hover:bg-customPurple cursor-pointer">
        Regresar a la página de inicio
      </button>
    </div>
  </div>
</template>

  
  <script setup>
 
  import  characterImage from   '@/assets/images/error.png'
  // Ruta de la imagen
  
  </script>
  
  <style scoped>
 
  </style>
  