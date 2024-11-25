<template>

	<div class="bg-gray-100 flex flex-col sm:flex-row items-center sm:justify-between p-4 rounded-lg shadow-md">
		<!-- Sección Izquierda (Icono y Título) -->
		<div class="flex items-center mb-4 sm:mb-0">
			<div class="p-4 bg-customPurple rounded-full">
				<img :src="VerLine" alt="Icono de progreso" width="50" height="50" />
	
			</div>
			<div class="ml-4">
				<p class="text-black mb-0 text-lg sm:text-2xl">Línea de</p>
				<h2 class="text-customPurple text-3xl sm:text-5xl mt-0 font-bold"> Tiempo</h2>
			</div>
		</div>
	
		<!-- Contenedor de la información del ciudadano y el botón Crear Ticket en una misma fila -->
		<div class="flex items-center space-x-4">
			<!-- Sección Central (Información del ciudadano) -->
			<div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
				<!-- Ícono -->
				<div class="flex-shrink-0">
					<svg width="40" height="50" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M24.0939 0.027541C11.1836 0.766707 4.40665 15.6399 12.4454 25.7735C19.4536 34.6085 33.3544 33.4898 38.9046 23.7258C45.1034 12.8181 36.6423 -0.691648 24.0939 0.027541ZM0.329441 59.9949H49.623C49.8945 59.7252 49.6682 59.2757 49.6582 58.9461C49.5777 56.334 49.7436 54.1815 49.2308 51.5594C47.6171 43.2838 41.554 36.2267 33.5856 33.3699C28.1661 35.967 21.8064 35.962 16.3819 33.3799C8.53917 36.1668 2.51133 43.059 0.802015 51.1699C0.36966 53.2126 0.304304 54.9206 0.294249 56.9883C0.294249 57.9372 0.238948 58.8962 0.243975 59.8401C0.243975 59.93 0.249003 59.94 0.329441 59.9999V59.9949Z" fill="#7A1F7E" />
						<path d="M0.329118 59.9945C0.24868 59.9345 0.243652 59.9246 0.243652 59.8347C0.243652 58.8907 0.288899 57.9318 0.293926 56.9829C0.303981 54.9152 0.369337 53.2071 0.801692 51.1644C2.511 43.0536 8.53884 36.1663 16.3816 33.3745C21.8061 35.9566 28.1658 35.9616 33.5853 33.3645C41.5537 36.2263 47.6167 43.2783 49.2305 51.554C49.7433 54.176 49.5774 56.3286 49.6579 58.9407C49.6679 59.2753 49.8941 59.7198 49.6227 59.9895H0.329118V59.9945Z" fill="#7A1F7E" />
						<path d="M24.094 0.027541C36.6423 -0.691648 45.0984 12.8181 38.9046 23.7258C33.3544 33.4898 19.4537 34.6086 12.4454 25.7735C4.40665 15.6399 11.1836 0.766707 24.0939 0.027541Z" fill="#7A1F7E" />
					</svg>
				</div>
	
				<!-- Información del ciudadano -->
				<div class="flex flex-col space-y-1">
					<p class="text-gray-800 font-semibold text-sm sm:text-base"><span class="font-bold">Ciudadano:</span> John Doe</p>
					<p class="text-gray-800 font-semibold text-sm sm:text-base"><span class="font-bold">Cédula:</span> 123456789</p>
				</div>
			</div>
	
			<!-- Botón Crear Ticket (al lado de la información del ciudadano) -->
			<button
			class="bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center" style="width: 120px; height: 100px;">
			<img :src="personwhite" alt="Persona" class="w-15 h-15 mb-2" />
			<span class="text-sm">Regresar a Perfil del Ciudadano</span>
		</button>
		</div>
	</div>

	<br>
	<br>
	


	<!-- Sección de Línea de Tiempo -->
	<div
		v-if="timelineData && timelineData.length"
		class="relative bg-white w-full max-w-7xl mx-auto py-10">
		<!-- Línea vertical morada -->		
		<div class="absolute bg-customPurple left-[calc(36%+26px)] h-full" style="width: 340px; height: 105%; top: -1%;"></div>

		<!-- Línea vertical blanca -->
		<div class="absolute bg-customWWhite left-[calc(50%+26px)] h-full" style="width: 10px; height: 77%; top: 12%;" ></div>

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
