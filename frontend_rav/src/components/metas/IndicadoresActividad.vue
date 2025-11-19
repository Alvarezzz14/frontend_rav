<template>
	<div class="min-h-screen p-4 flex flex-col">
		<!-- Sección Superior -->
		<div class="flex flex-row items-center gap-2 rounded-lg w-full max-w-7xl mb-4">
			<div class="p-2 bg-customPurple rounded-full flex items-center justify-center">
				<img :src="Indicador" alt="Icono de Indicadores" width="15" height="15" />
			</div>
			<h2 class="text-[#002c4d] text-3xl font-bold">
				Indicadores de actividad
			</h2>
		</div>

		<!-- Contenedor Principal -->
		<div>
			<div class="bg-white w-full p-7 mb-5 rounded-[20px]">
				<p class="my-0 text-lg text-[#B5B5B5]">Espacio para etiqueta o texto descriptivo</p>
			</div>
			<div class="bg-white flex flex-col items-center xl:flex-row rounded-[20px] shadow-md w-full h-fit px-9 py-4">
				<!-- Configuración de Metas -->
				<div class="left-content flex flex-col w-full relative h-fit">
					<h3 class="text-2xl font-semibold my-0 text-[#002c4d]">Título</h3>
					<div class="flex items-center justify-between">

						<input v-model="goal.name" type="text" placeholder="Descripción"
							class="border-none focus:outline-none w-full text-2xl text-azul2Ape font-bold my-1 placeholder:text-azul2Ape">
						<!-- <p
							class="text-2xl my-1 font-bold text-[#002c4d] mb-3 relative flex justify-between items-center"> -->
							<!-- Texto de la descripción -->
						<!-- </p> -->

						<span>
							<!-- Icono con tooltip -->
							<Signointe />
						</span>
					</div>
					<form @submit.prevent="saveGoal">
						<div class="mb-4 mt-5">
							<label for="limit" class="block font-bold text-[#002c4d] mb-1 text-xl [&_span]:text-2xl">
								Meta: <span>5329</span>
							</label>
							<input type="number" id="limit" v-model.number="goal.limit" min="1"
								class="w-full bg-[#eef5ff] p-3 border rounded-full text-base border-none font-medium placeholder:text-gray-800m focus:outline-none"
								placeholder="Digite la meta" />
						</div>
						<h2 class="font-bold text-2xl text-[#002c4d]">Rango de Fecha</h2>
						<div class="grid grid-cols-2 gap-4 mb-4">
							<div class="relative">
								<label for="startDate" class="text-xs absolute -top-2 left-3 text-gray-700 mb-1 block">
									Desde
								</label>
								<input type="date" id="startDate" v-model="goal.startDate"
									class="w-full bg-[#eef5ff] p-3 border text-base rounded-full border-none placeholder:text-gray-800 focus:outline-none" />
							</div>
							<div class="relative">
								<label for="endDate"
									class="block text-xs absolute -top-2 left-3 font-medium text-gray-700 mb-1">
									Hasta
								</label>
								<input type="date" id="endDate" v-model="goal.endDate"
									class="w-full bg-[#eef5ff] p-3 border rounded-full text-base border-none placeholder:text-gray-800 focus:outline-none" />
							</div>
						</div>
						<div class="flex flex-row gap-3.5">
							<button type="button"
								class="w-full bg-customPurple text-lg cursor-pointer border-none text-amarillo font-bold py-3 rounded-full shadow-md mt-4 hover:bg-[#004894] hover:text-white transition-colors duration-300">
								Restaurar
							</button>
							<button type="submit"
								class="w-full bg-[#fdc300] text-lg cursor-pointer border-none text-[#002c4d] font-bold py-3 rounded-full shadow-md mt-4 hover:bg-[#fd2] transition-colors duration-300">
								Guardar
							</button>
						</div>
					</form>
				</div>
				<hr class="ml-8 mr-12 rounded-full self-stretch" />
				<!-- Velocímetro -->
				<div>
					<h2 class="font-bold text-2xl text-center text-[#002c4d]">Del 21 NOV - al 30 DIC</h2>
					<div class="relative">
						<svg class="absolute w-[360px] h-[200px] top-4 left-4" width="362" height="194"
							viewBox="0 0 362 194" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M325.798 73.164a28.7 28.7 0 0 1-6.033 8.896c-3.748 3.748-8.279 6.217-13.062 7.466 19.057 26.313 29.37 57.862 29.37 91.031 0 6.912 5.604 12.517 12.517 12.517 6.914 0 12.518-5.605 12.518-12.517 0-39.217-12.388-76.508-35.31-107.393"
								fill="#3592ff" />
							<path
								d="M308.258 52.848C280.562 25.15 245.418 7.566 207.314 1.95a28.7 28.7 0 0 1 2.028 10.564c0 5.297-1.456 10.244-3.951 14.507 32.133 5.117 61.745 20.109 85.164 43.529a12.48 12.48 0 0 0 8.852 3.666 12.48 12.48 0 0 0 8.851-3.666c4.888-4.889 4.889-12.815 0-17.704"
								fill="#005dca" />
							<path
								d="M180.554 0c-39.219 0-76.51 12.388-107.394 35.31a28.7 28.7 0 0 1 8.897 6.033c3.748 3.748 6.217 8.279 7.466 13.062 26.313-19.057 57.862-29.37 91.031-29.37 6.913 0 12.517-5.605 12.517-12.518S187.467 0 180.554 0"
								fill="#0050ad" />
							<path
								d="M12.517 193.072C5.604 193.072 0 187.467 0 180.555c0-48.273 18.769-93.627 52.85-127.706 4.888-4.888 12.813-4.886 17.702 0 4.888 4.888 4.887 12.814 0 17.702-29.353 29.352-45.517 68.418-45.517 110.004 0 6.912-5.604 12.517-12.518 12.517"
								fill="#002c4d" />
						</svg>

						<vue-speedometer :value="generateRandomProgress()" :minValue="0" :maxValue="100" :segments="4"
							:needleColor="'#002C4D'" :segmentColors="customSegmentColors" :width="400" :height="300"
							:ringWidth="25" :currentValueText="'Progreso Random'" :animate="true"
							:animationDuration="1.5" />
						<div
							class="flex flex-row justify-between items-center [&_p]:text-4xl [&_p]:font-bold px-6 xl:pr-8 xl:pl-3 absolute bottom-5 w-full">
							<p>0</p>
							<svg class="w-52" viewBox="0 0 199 44" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M197.236 24.0697C198.401 22.9051 198.401 21.0168 197.236 19.8521L178.257 0.872995C177.092 -0.29166 175.204 -0.29166 174.039 0.872995C172.875 2.03765 172.875 3.92593 174.039 5.09058L190.91 21.9609L174.039 38.8313C172.875 39.9959 172.875 41.8842 174.039 43.0489C175.204 44.2135 177.092 44.2135 178.257 43.0489L197.236 24.0697ZM0 21.9609V24.9432H195.127V21.9609V18.9787H0V21.9609Z"
									fill="#005DCA" />
							</svg>
							<p class="text-[#005dca]">0</p>
						</div>
						<h3 class="text-center text-azul2Ape text-2xl mr-4">Meta por rango</h3>
					</div>
				</div>

				<hr class="ml-8 mr-12 rounded-full bg-[#F2F3F3] self-stretch" />

				<div class="flex flex-col gap-4">
					<GoalCard :dailyGoal="5329" :current="1200" size="100" stroke="12" trackColor="#005dca"
						progressColor="#fdc300" text-color="#002c4d" background-color="#eef5ff" goal-label="Meta Anual"
						current-label="Estado Actual" />
					<GoalCard :dailyGoal="1776" :current="1200" size="100" stroke="12" trackColor="#ffffff"
						progressColor="#005dca" text-color="#002c4d" goal-label="Meta Trimestral"
						background-color="linear-gradient(135deg, #fec905 0%, #D1A500 100%)" />
					<GoalCard goal-label="Meta Diaria" :dailyGoal="15" :current="12" size="100" stroke="12"
						trackColor="#ffffff" progressColor="#fdc300" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useGoalStore } from "@/stores/goalStore";
import VueSpeedometer from "vue-speedometer";
import Indicador from "@/assets/images/indicador.svg";
import Signointe from "../Icons/Signointe.vue";
import { useToast } from "vue-toastification";
import GoalCard from "../GoalCard.vue";
const toast = useToast();

const goalStore = useGoalStore();
const container = ref(null);
const width = ref(400);
const height = ref(300);

const goal = ref({
	name: "",
	limit: null,
	startDate: "",
	endDate: "",
	deadline: "",
});

const customSegmentColors = [
	"#fff",
	"#fff",
	"#fff",
	"#fff",
];
// Progreso aleatorio
const randomProgress = ref(generateRandomProgress());

// Función para generar un progreso aleatorio
function generateRandomProgress() {
	return Math.floor(Math.random() * 101); // 0 a 100
}

// Actualizar el progreso aleatorio cada 5 segundos
onMounted(() => {
	setInterval(() => {
		randomProgress.value = generateRandomProgress();
	}, 5000);
});

const formatDate = (d) => {
	const [y, m, dd] = d.split("-");
	return `${dd}/${m}/${y}`;
};

const saveGoal = () => {
	if (
		!goal.value.name ||
		!goal.value.limit ||
		!goal.value.startDate ||
		!goal.value.endDate
	) {
		toast.error("Todos los campos son obligatorios.");
		return;
	}

	if (new Date(goal.value.startDate) > new Date(goal.value.endDate)) {
		toast.error("La fecha de inicio no puede ser mayor que la fecha de fin.");
		return;
	}

	goal.value.deadline = formatDate(goal.value.endDate)
	goalStore.addGoal({ ...goal.value });
	toast.success("Meta guardada exitosamente.");

	goal.value = {
		name: "",
		limit: null,
		startDate: "",
		endDate: "",
	};
};

function updateSize() {
	if (container.value) {
		width.value = container.value.offsetWidth;
		height.value = container.value.offsetWidth * 0.75; // Mantener proporción 4:3
	}
}
</script>

<style scoped>
:deep(svg path[fill*="#002c4d"]),
:deep(svg path[fill*="#0050ad"]),
:deep(svg path[fill*="#005dca"]),
:deep(svg path[fill*="#3592ff"]) {
	stroke: white;
	stroke-width: 2px;
	stroke-linecap: round;
	stroke-linejoin: round;
}

:deep(.speedometer text) {
	display: none;
}
</style>