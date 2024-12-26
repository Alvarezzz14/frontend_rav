<template>
	<div>
		<div
			class="flex flex-col sm:flex-row items-center sm:justify-between p-4 rounded-lg shadow-md">
			<!-- Sección Izquierda (Icono y Título) -->
			<div class="flex items-center mb-4 sm:mb-0">
				<div class="p-4 bg-customPurple rounded-full">
					<img :src="VerLine" alt="Icono de progreso" width="50" height="50" />
				</div>
				<div class="ml-4">
					<p class="text-black mb-0 text-lg sm:text-2xl">Línea de</p>
					<h2 class="text-customPurple text-3xl sm:text-5xl mt-0 font-bold">
						Tiempo
					</h2>
				</div>
			</div>
			<div class="flex gap-3">
				<!-- Recuadro Blanco (Información del ciudadano) -->
				<div class="bg-white p-4 rounded-lg shadow-custom flex items-center">
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
							d="M24.094 0.027541C36.6423 -0.691648 45.0984 12.8181 38.9046 23.7258C33.3544 33.4898 19.4537 34.6086 12.4455 25.7735C4.40671 15.6399 11.1887 0.766707 24.094 0.027541Z"
							fill="#7A1F7E" />
					</svg>

					<div class="w-82 h-20 ml-2 flex flex-col justify-center">
						<div class="">
							<span class="text-gray-800 font-semibold">Nombre: </span>
							<span>{{ userInfo.nombrecompleto }}</span>
						</div>
						<div class="">
							<span class="text-gray-600 font-semibold"> Cédula: </span>
							<span>{{ userInfo.documento }}</span>
						</div>
					</div>
				</div>

				<!-- Sección Derecha (Botón) -->

				<router-link
					:to="{ name: 'PerfilCiudadanoPage' }"
					class="flex flex-col justify-center w-32 h-28 bg-customPurple items-center rounded-md shadow-custom">
					<svg
						width="20"
						height="26"
						viewBox="0 0 20 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.63126 13.8217C14.859 14.1235 18.3818 8.45451 15.8015 3.87741C13.4892 -0.21976 7.6981 -0.689206 4.77847 3.01816C1.42947 7.27041 4.25486 13.5115 9.63126 13.8217Z"
							fill="white" />
						<path
							d="M19.9655 25.4999C19.998 25.4737 20 25.4693 20 25.4299C20 25.0164 19.9817 24.5963 19.9797 24.1805C19.9756 23.2747 19.9492 22.5264 19.7746 21.6315C19.0841 18.0781 16.6492 15.0607 13.4812 13.8376C11.29 14.9688 8.7211 14.971 6.53193 13.8333C3.31315 15.087 0.864044 18.1765 0.212165 21.8021C0.00502697 22.9508 0.0720416 23.8939 0.0395479 25.0382C0.0354871 25.1848 -0.0558978 25.3796 0.0537633 25.4977L19.9655 25.4977L19.9655 25.4999Z"
							fill="white" />
					</svg>
					<span class="text-white font-bold text-sm text-center"
						>Regresar a Perfil del Ciudadano</span
					>
				</router-link>
			</div>
		</div>

		<br />
		<br />

		<!-- Sección de Línea de Tiempo -->
		<div
			v-if="timelineData && timelineData.length"
			class="relative bg-white w-full max-w-7xl mx-auto py-10">
			<!-- Línea vertical morada -->
			<div
				class="absolute bg-customPurple left-[calc(36%+26px)] h-full"
				style="width: 340px; height: 100%; top: -1%"></div>

			<!-- Línea vertical blanca -->
			<div
				class="absolute bg-customWWhite left-[calc(50%+26px)] h-full"
				style="width: 10px; height: 77%; top: 11%"></div>

			<!-- Contenido de la línea de tiempo -->
			<div
				v-for="(item, index) in timelineData"
				:key="index"
				class="relative flex items-center my-16">
				<!-- Marcador del ícono -->
				<div
					class="absolute left-1/2 transform -translate-x-1/2 rounded-full w-16 h-16 flex items-center justify-center border-4 border-white bg-customWWhite z-10"
					style="top: 200px">
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
						<div class="relative w-full h-[200px] sm:h-[250px] md:h-[300px]">
							<img
								:src="item.image"
								alt="Imagen del evento"
								class="absolute inset-0 w-full h-full object-cover rounded-md" />
						</div>
						<!-- Separación entre la imagen y la fecha -->
						<div
							class="bg-customYellow text-[#7A1F7E] text-xl font-semibold mb-2 p-4 w-[150px] rounded-lg mt-4">
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
import VerLine from "@/assets/images/VerLine.svg";
import Reportes from "@/assets/images/Reportes.svg";
import LogoSena from "@/assets/images/logosenaverde.svg";
import ruta from "@/assets/images/ruta.svg";
import personwhite from "@/assets/images/UserWhite.svg";
import person from "@/assets/images/User.svg";
import event1 from "@/assets/images/TargetsTime.png";
import event2 from "@/assets/images/TargetsTime.png";
import { onMounted, ref, computed } from "vue";
import { useEventStore } from "../stores/storedataOff";

const eventStore = useEventStore();
const userInfo = computed(() => eventStore.getUserInfo());

// Datos de la línea de tiempo
const timelineData = ref([
	{
		date: "18/04/2023",
		title: "Fecha de Ingreso",
		description:
			"Fecha en la cual se registra el ingreso para incorporación en sistema.",
		image: event1,
	},
	{
		date: "20/05/2023",
		title: "Fecha inicio etapa Lectiva",
		description:
			"El aprendiz, en este período, recibe su formación a través de cursos, estudios y programas académicos.",
		image: event2,
	},
	{
		date: "18/12/2024",
		title: "Fecha fin etapa Lectiva",
		description:
			"El aprendiz, en este período, concluye su formación a través de cursos, estudios y programas académicos.",
		image: event2,
	},
	{
		date: "19/12/2024",
		title: "Fecha inicio etapa Productiva",
		description:
			"La etapa productiva hace parte del proceso de formación, para inciar la etapa de practicas.",
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
	background-color: #7a1f7e; /* Color púrpura */
}

.bg-customYellow {
	background: #ffc107; /* Color amarillo */
}
.text-yellow-500 {
	color: #ffc107; /* Color amarillo */
}

.bg-customWWhite {
	background-color: white;
}
</style>
