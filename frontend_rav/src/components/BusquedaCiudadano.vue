<template>
    <div class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
      <!-- Sección de texto -->
      <div class="mb-6 lg:mb-0 lg:w-1/2">
        <p class="text-xl lg:text-3xl font-semibold text-inherit">
          Aquí podrás visualizar información acerca de la Ruta de Atención al Ciudadano.
        </p>
      </div>
  
      <!-- Sección de búsqueda -->
      <div class="w-full lg:w-1/3 bg-white p-5 rounded-2xl shadow-lg">
        <div class="flex flex-col items-center">
          <input
            type="text"
            placeholder="Digite el documento de identificación del ciudadano"
            class="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          />
          <button class="w-full bg-customPurple font-bold text-white py-2 rounded-lg hover:bg-purple-700 transition">
            Buscar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RutaCiudadano",
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí si es necesario */
  </style>
  