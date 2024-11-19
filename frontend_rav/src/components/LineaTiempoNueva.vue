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
						Formato de
					</p>
					<h2
						class="text-customPurple text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-0 font-bold">
						Reportes
					</h2>
				</div>
			</div>

			<!-- Información del Ciudadano -->

			<div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
				<div class="flex-shrink-0">
					<svg
						width="50"
						height="60"
						viewBox="0 0 50 60"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M24.0939 0.027541C11.1836 0.766707 4.40665 15.6399 12.4454 25.7735C19.4536 34.6085 33.3544 33.4898 38.9046 23.7258C45.1034 12.8181 36.6423 -0.691648 24.0939 0.027541ZM0.329441 59.9949H49.623C49.8945 59.7252 49.6682 59.2757 49.6582 58.9461C49.5777 56.334 49.7436 54.1815 49.2308 51.5594C47.6171 43.2838 41.554 36.2267 33.5856 33.3699C28.1661 35.967 21.8064 35.962 16.3819 33.3799C8.53917 36.1668 2.51133 43.059 0.802015 51.1699C0.36966 53.2126 0.304304 54.9206 0.294249 56.9883C0.294249 57.9372 0.238948 58.8962 0.243975 59.8401C0.243975 59.93 0.249003 59.94 0.329441 59.9999V59.9949Z"
							fill="#7A1F7E" />
						<path
							d="M0.329118 59.9945C0.24868 59.9345 0.243652 59.9246 0.243652 59.8347C0.243652 58.8907 0.288899 57.9318 0.293926 56.9829C0.303981 54.9152 0.369337 53.2071 0.801692 51.1644C2.511 43.0536 8.53884 36.1663 16.3816 33.3745C21.8061 35.9566 28.1658 35.9616 33.5853 33.3645C41.5537 36.2263 47.6167 43.2783 49.2305 51.554C49.7433 54.176 49.5774 56.3286 49.6579 58.9407C49.6679 59.2753 49.8941 59.7198 49.6227 59.9895H0.329118V59.9945Z"
							fill="#7A1F7E" />
						<path
							d="M24.094 0.027541C36.6423 -0.691648 45.0984 12.8181 38.9046 23.7258C33.3544 33.4898 19.4537 34.6086 12.4454 25.7735C4.40665 15.6399 11.1836 0.766707 24.0939 0.027541Z"
							fill="#7A1F7E" />
					</svg>
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
					:src="ruta"
					alt="Ruta de Atención"
					class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mb-2" />
				<!-- Texto -->
				<span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
					>Ruta de Atención</span
				>
			</button>
		</div>
		<!-- Sección de Línea de Tiempo -->
		<div
			v-if="timelineData && timelineData.length"
			class="relative bg-white w-full max-w-7xl mx-auto py-px">
			<!-- Línea vertical morada -->
			<div
				class="absolute bg-customPurple w-12 left-1/2 transform -translate-x-1/2 h-full"></div>

			<!-- Contenido de la línea de tiempo -->
			<div
				v-for="(item, index) in timelineData"
				:key="index"
				class="relative flex items-center my-8">
				<!-- Marcador del ícono -->
				<div
					class="relative left-2/4 transform -translate-x-1/2 rounded-full w-12 h-12 flex items-center justify-center border-4 border-white">
					<div
						class="bg-white rounded-full w-8 h-8 flex items-center justify-center">
						<img :src="LogoSena" alt="Ícono" class="w-6 h-6" />
					</div>
				</div>

				<!-- Tarjeta de contenido -->
				<div
					:class="`w-full md:w-2/5 ${
						index % 2 === 0
							? 'ml-auto pr-6 text-right'
							: 'mr-auto pl-6 text-left'
					}`">
					<div class="bg-white rounded-lg shadow-md">
						<img
							:src="item.image"
							alt="Imagen del evento"
							class="w-full h-32 object-cover rounded-md mb-3" />
						<p class="text-gray-500 text-sm font-semibold">{{ item.date }}</p>
						<h3 class="text-lg font-bold mt-1">{{ item.title }}</h3>
						<p class="text-gray-700 text-sm mt-1">{{ item.description }}</p>
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
import event1 from "@/assets/images/TargetsTime.png";
import event2 from "@/assets/images/TargetsTime.png";

// Datos de la línea de tiempo
const timelineData = ref([
	{
		date: "31/10/2024",
		title: "Dato 1",
		description: "Loremodio imperdiet, malesuada libero a, ultrices.",
		image: event1,
	},
	{
		date: "31/10/2024",
		title: "Dato 2",
		description: "Lorem odio imperdiet, malesuada libero a, ultrices.",
		image: event2,
	},
	{
		date: "31/10/2024",
		title: "Dato 2",
		description: "Lorem odio imperdiet, malesuada libero a, ultrices.",
		image: event2,
	},
	{
		date: "31/10/2024",
		title: "Dato 2",
		description: "Lorem odio imperdiet, malesuada libero a, ultrices.",
		image: event2,
	},
]);
</script>

<style scoped>
@media (max-width: 768px) {
	.bg-gray-100 {
		padding: 1rem;
	}
}
</style>
