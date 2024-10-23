<template>
    <div class="h-screen flex flex-col">
      <!-- Contenedor que coloca el contenido principal y el sidebar -->
      <div class="flex flex-1 flex-row-reverse">
        <!-- Contenido principal -->
        <main class="flex-1 p-6">
          <!-- Aquí va el contenido principal -->
        </main>
  
        <!-- SideRight -->
        <aside class="w-64 p-8 z-20">
          <!-- Logo centrado -->
          <div class="flex justify-center items-center mb-10">
            <h2 class="text-customPurple font-bold text-center">Notificaciones</h2>
            <span class=" text-center text-gray-400">Actividad Reciente</span>
          </div>
  

          <div class="space-y-4 bg-gray-400 rounded-md ">
           <button class="bg-white text-black rounded-md text-sm md:text-base text-center p-2" >Usuario </button>
           <button class="bg-white text-black rounded-md text-sm md:text-base text-center p-2" >Caso Abierto </button>
           <button class="bg-white text-black rounded-md text-sm md:text-base text-center p-2" >Fecha </button>
           <button class="bg-white text-black rounded-md text-sm md:text-base text-center p-2" >Caso Cerrado </button>
          </div>
  
         
          <button class="bg-customPurple text-sm md:text-base text-center text-white px-4 py-2 rounded-md hover:bg-purple-600 transition">Cerrar Sesion</button>
        </aside>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* Puedes añadir estilos adicionales aquí si es necesario */
  </style>
