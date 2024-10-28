<template>
  <div class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
    <!-- Imagen del ciudadano a la izquierda -->
    <div class="lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0">
      <img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />
    </div>

    <!-- Texto y campo de búsqueda a la derecha -->
    <div class="flex flex-col items-center lg:items-start lg:w-2/3 lg:pl-10">
      <!-- Texto de información -->
      <div class="mb-6">
        <p class="text-xl lg:text-3xl font-medium text-inherit">
          Aquí podrás visualizar información acerca de la
        </p>
        <h2 class="lg:text-5xl font-bold text-customPurple">
          Ruta de Atención al Ciudadano.
        </h2>
      </div>

      <!-- Sección de búsqueda -->
      <div class="w-full lg:w-2/3 bg-white p-5 rounded-2xl shadow-lg">
        <div class="flex flex-col items-center">
          <input
            type="text"
            placeholder="Digite el documento de identificación del ciudadano"
            class="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          />
          <button
            class="w-full bg-customPurple font-bold text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>





<script >
import Ciudadano from '../assets/images/Ciudadano.svg'

export default {
  name: "RutaCiudadana",
  data(){
    return{
      Ciudadano: Ciudadano
    }
  }
};
</script>