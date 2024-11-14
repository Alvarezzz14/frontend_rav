<template>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <!-- Contenedor principal -->
      <div class="text-center space-y-8">
        <!-- Mensaje de error -->
        <div class="static inline-grid">
          <!-- Número 404 -->
          <h1 class="text-negro font-bold mb-80 text-7xl ">Oops...</h1>
          <!-- Imágenes de los personajes -->
          <div class="absolute inset-0 flex w-full my-9  items-center justify-center">
            <img :src="characterImage" alt="404 con personajes" class="w-full object-contain" />
          </div>
        </div>
  
        <!-- Mensaje de texto -->
        <h2 class="md:text-6xl sm:text-3xl  font-bold text-negro">Página no encontrada</h2>
  
        <!-- Botón -->
        <button @click="goHome" class="bg-customPurple text-amarillo px-8 py-3   text-lg shadow hover:bg-purple-700">
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
  