<template>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <!-- Contenedor principal -->
      <div class="text-center space-y-8">
        <!-- Mensaje de error -->
        <div class="static inline-grid">
          <!-- Número 404 -->
          <h1 class="text-negro font-bold mb-44 text-6xl ">Oops...</h1>
          <!-- Imágenes de los personajes -->
          <div class="absolute inset-0 flex items-center justify-center">
            <img :src="characterImage" alt="404 con personajes" class="w-[600px] sm:w-[800px] object-contain" />
          </div>
        </div>
  
        <!-- Mensaje de texto -->
        <h2 class="text-2xl sm:text-3xl mt-3 font-semibold text-negro">Página no encontrada</h2>
  
        <!-- Botón -->
        <button @click="goHome" class="bg-azulBarraApe text-amarillo px-8 py-3  text-lg shadow hover:bg-purple-700">
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
  