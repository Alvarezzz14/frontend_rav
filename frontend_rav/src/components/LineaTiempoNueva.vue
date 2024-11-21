<template>
	<div class="min-h-screen flex flex-col items-center py-8">

	  <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
	  <div
		class="flex flex-col lg:flex-row items-center justify-between p-4 rounded-lg shadow-md w-full max-w-7xl mb-8">
		<!-- Icono y Título -->
		<div class="flex items-center mb-4 lg:mb-0">
		  <div class="p-3.5 bg-customPurple rounded-full">
			<img
			  :src="VerLine"
			  alt="VerLine"
			  class="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-16 lg:h-16" />
		  </div>
		  <div class="ml-4 text-center lg:text-left">
			<p
			  class="text-black mb-0 text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl">
			  Línea de
			</p>
			<h2
			  class="text-customPurple text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-0 font-bold">
			  Tiempo
			</h2>
		  </div>
		</div>
  
		<!-- Información del Ciudadano -->
		<div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
			<div class="flex-shrink-0">
				<img
					:src="person"
					alt="PersonaBlanco"
					class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mb-2" />
				</div>
		  <div
			class="flex flex-col text-center lg:text-left text-xs sm:text-sm md:text-base lg:text-lg">
			<p class="text-gray-800 font-semibold">
			  <span class="font-bold">Ciudadano:</span> John Doe
			</p>
			<p class="text-gray-800 font-semibold">
			  <span class="font-bold">Cédula:</span> 123456789
			</p>
		  </div>
		</div>
  
		<!-- Botón Línea de Tiempo -->
		<button
		  class="bg-customPurple text-white px-4 py-2 rounded-lg shadow flex flex-col items-center max-w-xs md:max-w-none">
		  <!-- Ícono -->
		  <img
			:src="personwhite"
			alt="Persona"
			class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mb-2" />
		  <!-- Texto -->
		  <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
			Regresar a Perfil del Ciudadano
		  </span>
		</button>
	  </div>

	  <!-- Sección de Línea de Tiempo -->
	  <div
		v-if="timelineData && timelineData.length"
		class="relative bg-white w-full max-w-7xl mx-auto py-10">
		<!-- Línea vertical morada -->		
		<div class="absolute bg-customPurple left-[calc(36%+26px)] h-full" style="width: 340px;"></div>

		<!-- Línea vertical blanca -->
		<div class="absolute bg-customWWhite left-[calc(50%+26px)] h-full" style="width: 10px;"></div>
	
		<!-- Contenido de la línea de tiempo -->
		<div
		  v-for="(item, index) in timelineData"
		  :key="index"
		  class="relative flex items-center my-16">
		  <!-- Marcador del ícono -->
		  <div
			class="absolute left-1/2 transform -translate-x-1/2 rounded-full w-16 h-16 flex items-center justify-center border-4 border-white bg-customWWhite z-10">
			<img :src="LogoSena" alt="Ícono" class="w-10 h-10" />
		  </div>
  
		  <!-- Tarjeta de contenido -->
		  <div
			:class="`relative w-full md:w-2/5 ${
			  index % 2 === 0
				? 'ml-auto pr-10 text-right'
				: 'mr-auto pl-10 text-left'
			}`">
			<div class="bg-white rounded-lg shadow-lg p-5">
			  <img
				:src="item.image"
				alt="Imagen del evento"
				class="w-full h-60 object-cover rounded-md mb-4" />			
				<div class="bg-customYellow text-[#7A1F7E] text-xl font-semibold mb-2 p-4 w-[150px] rounded-lg">
					{{ item.date }}
				</div>
			  <h3 class="text-lg font-bold mb-2">{{ item.title }}</h3>
			  <p class="text-gray-700 text-sm">{{ item.description }}</p>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { Timeline } from "primevue"; // Importación corregida
  import VerLine from "@/assets/images/VerLine.svg";
  import Reportes from "@/assets/images/Reportes.svg";
  import LogoSena from "@/assets/images/logosenaverde.svg";
  import ruta from "@/assets/images/ruta.svg";
  import personwhite from "@/assets/images/UserWhite.svg";
  import person from "@/assets/images/User.svg";
  import event1 from "@/assets/images/TargetsTime.png";
  import event2 from "@/assets/images/TargetsTime.png";
  
  // Datos de la línea de tiempo
  const timelineData = ref([
	  {
		  date: "18/04/2023",
		  title: "Fecha de Ingreso",
		  description: "Fecha en la cual se registra el ingreso para incorporación en sistema.",
		  image: event1,
	  },
	  {
		  date: "20/05/2023",
		  title: "Fecha inicio etapa Lectiva",
		  description: "El aprendiz, en este período, recibe su formación a través de cursos, estudios y programas académicos.",
		  image: event2,
	  },
	  {
		  date: "18/12/2024",
		  title: "Fecha fin etapa Lectiva",
		  description: "El aprendiz, en este período, concluye su formación a través de cursos, estudios y programas académicos.",
		  image: event2,
	  },
	  {
		  date: "19/12/2024",
		  title: "Fecha inicio etapa Productiva",
		  description: "La etapa productiva hace parte del proceso de formación, para inciar la etapa de practicas.",
		  image: event2,
	  },

	  {
		  date: "18/06/2024",
		  title: "Fecha fin etapa Productiva",
		  description: "Fin de La etapa productiva.",
		  image: event2,
	  },
  ]);
  </script>
  
  <style scoped>
  .bg-customPurple {
	background-color: #7A1F7E; /* Color púrpura */
  }

  .bg-customYellow{
	background: #ffc107; /* Color amarillo */
  }
  .text-yellow-500 {
	color: #ffc107; /* Color amarillo */
  }
  
  .bg-customWWhite {
	background-color: white;
  }
  </style>
  
