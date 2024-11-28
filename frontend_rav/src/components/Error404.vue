<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <!-- Contenedor principal -->
    <div class="text-center  rounded-md">
      <!-- Mensaje de error -->
      <h1 class="text-negro font-bold text-6xl">Oops...</h1>
      <!-- Imágenes de los personajes -->
      <div class="my-4 ">
        <img :src="characterImage" alt="404 con personajes" class="w-full" />
      </div>
      <!-- Mensaje de texto -->
      <h2 class="text-3xl sm:text-7xl font-bold text-negro mt-1 mb-6">Página no encontrada</h2>
      <!-- Botón -->
     <button 
  @click="goHome" 
  class="bg-customPurple text-amarillo text-bold px-8 py-2 text-lg shadow hover:bg-moradoSecundario -mt-10 border-none rounded-md cursor-pointer">
  Regresar a la página de inicio
</button>

    </div>
  </div>
</template>

<script setup> 
import { useRouter } from 'vue-router'; 
import characterImage from '@/assets/images/error.png'; 

const router = useRouter(); 
const goHome = () => { router.push('/'); }; </script>

<style scoped>
/* No additional CSS needed as everything is styled with Tailwind CSS */
</style>
  