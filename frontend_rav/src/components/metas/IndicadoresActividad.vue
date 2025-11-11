<template>
	<div class="min-h-screen p-4 flex flex-col">
		<!-- Sección Superior -->
		<div class="flex flex-row items-center gap-2 rounded-lg w-full max-w-7xl mb-4">
			<div class="p-2 bg-customPurple rounded-full flex items-center justify-center">
				<img
					:src="Indicador"
					alt="Icono de Indicadores"
					width="15"
					height="15" />
			</div>
			<h2 class="text-[#002c4d] text-3xl font-bold">
				Indicadores de actividad
			</h2>
		</div>

		<!-- Contenedor Principal -->
		<div class="">
			<div class="bg-white w-full p-7 rounded-[20px] mb-5">
				<p class="my-0 text-lg text-[#B5B5B5]">Espacio para etiqueta o texto descriptivo</p>
			</div>
			<div class="bg-white flex flex-row rounded-[20px] w-full h-fit p-9">
				<!-- Configuración de Metas -->
				<div class="left-content flex flex-col w-full relative h-fit">
					<span class="absolute top-9 right-7 ">
						<!-- Icono con tooltip -->
						<img
							:src="Signointe"
							alt="Indicador"
							class="inline-block mr-2 icon-with-tooltip" />
					</span>
					<h3 class="text-2xl font-semibold my-0 text-[#002c4d]">Título</h3>
					<p class="text-2xl my-1 font-bold text-[#002c4d] mb-3 relative flex justify-between items-center">
						<!-- Texto de la descripción -->
						Descripción
					</p>
					<form @submit.prevent="saveGoal">
						<div class="mb-4 mt-5">
							<label
								for="limit"
								class="block text-sm font-bold text-[#002c4d] mb-1 text-xl [&_span]:text-2xl">
								Meta: <span>5329</span>
							</label>
							<input
								type="number"
								id="limit"
								v-model.number="goal.limit"
								min="1"
								class="w-full bg-[#eef5ff] p-3 border rounded-full text-base border-none font-medium placeholder:text-gray-800m focus:outline-none"
								placeholder="Digite la meta" />
						</div>
						<h2 class="font-bold text-2xl text-[#002c4d]">Rango de Fecha</h2>
						<div class="grid grid-cols-2 gap-4 mb-4">
							<div class="relative">
								<label for="startDate" class="text-xs absolute -top-2 left-3 text-gray-700 mb-1 block">
									Desde
								</label>
								<input
									type="date"
									id="startDate"
									v-model="goal.startDate"
									class="w-full bg-[#eef5ff] p-3 border text-base rounded-full border-none placeholder:text-gray-800 focus:outline-none" />
							</div>
							<div class="relative">
								<label
									for="endDate"
									class="block text-xs absolute -top-2 left-3 font-medium text-gray-700 mb-1">
									Hasta
								</label>
								<input
									type="date"
									id="endDate"
									v-model="goal.endDate"
									class="w-full bg-[#eef5ff] p-3 border rounded-full text-base border-none placeholder:text-gray-800 focus:outline-none" />
							</div>
						</div>
						<div class="flex flex-row gap-3.5">
							<button
								type="button"
								class="w-full bg-customPurple text-lg cursor-pointer border-none text-amarillo font-bold py-3 rounded-full shadow-md mt-4 hover:bg-[#004894] hover:text-white transition-colors duration-300">
								Restaurar
							</button>
							<button
								type="submit"
								class="w-full bg-[#fdc300] text-lg cursor-pointer border-none text-[#002c4d] font-bold py-3 rounded-full shadow-md mt-4 hover:bg-[#fd2] transition-colors duration-300">
								Guardar
							</button>
						</div>
					</form>
				</div>
				<hr class="ml-8 mr-12 rounded-full bg-[#F2F3F3]" />
				<!-- Velocímetro -->
				 <div>
					<h2 class="font-bold text-2xl text-center text-[#002c4d]">Del 21 NOV - al 30 DIC</h2>
					<div class="relative">
						<svg class="absolute top-16 left-3" width="75" height="144" viewBox="0 0 75 144" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.5174 143.889C5.60402 143.889 0 138.284 0 131.371C0 83.0981 18.7687 37.7445 52.8497 3.66489C57.7379 -1.22228 65.6634 -1.22099 70.5519 3.66489C75.4403 8.55309 75.4395 16.4794 70.5513 21.3676C41.1995 50.719 25.035 89.7857 25.035 131.371C25.035 138.284 19.4307 143.889 12.5174 143.889Z" fill="#002C4D"/>
						</svg>
						<svg class="absolute top-5 left-20" width="120" height="55" viewBox="0 0 120 55" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M107.393 0C68.1753 0 30.8842 12.3881 0 35.3105C3.22713 36.7104 6.25805 38.705 8.89656 41.3429C12.6443 45.0912 15.1139 49.6218 16.363 54.4049C42.6754 35.348 74.2245 25.0348 107.393 25.0348C114.307 25.0348 119.911 19.43 119.911 12.5171C119.911 5.60428 114.307 0 107.393 0Z" fill="#0050AD"/>
						</svg>
						<svg class="absolute top-5 left-52" width="107" height="73" viewBox="0 0 107 73" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M102.867 50.8964C75.171 23.1991 40.0277 5.61535 1.92345 0C3.21682 3.27399 3.95093 6.83045 3.95093 10.5641C3.95093 15.8612 2.4956 20.8073 0 25.0708C32.1335 30.1874 61.7457 45.1796 85.1645 68.5993C87.6091 71.0429 90.812 72.2655 94.0159 72.2655C97.2194 72.2655 100.423 71.0429 102.867 68.5993C107.755 63.7109 107.756 55.7846 102.867 50.8964Z" fill="#005DCA"/>
						</svg>
						<svg class="absolute top-[90px] left-[310px]" width="55" height="120" viewBox="0 0 55 120" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19.0945 0C17.6945 3.22661 15.6995 6.25778 13.0615 8.89602C9.31371 12.6435 4.78314 15.1129 0 16.3622C19.0566 42.6747 29.3696 74.2239 29.3696 107.393C29.3696 114.305 34.9737 119.91 41.8873 119.91C48.8006 119.91 54.4047 114.305 54.4047 107.393C54.4047 68.1757 42.0165 30.885 19.0945 0Z" fill="#3592FF"/>
						</svg>

						<vue-speedometer
							:value="generateRandomProgress()"
							:minValue="0"
							:maxValue="100"
							:segments="4"
							:needleColor="'#474747'"
							:segmentColors="customSegmentColors"
							:width="400"
							:height="300"
							:ringWidth="25"
							:currentValueText="'Progreso Random'"
							:animate="true"
							:animationDuration="1.5" 
						/>
						<div class="flex flex-row justify-between items-center [&_p]:text-4xl [&_p]:font-bold pr-8 pl-2 absolute bottom-5 w-full">
							<p>0</p>
							<svg width="199" height="44" viewBox="0 0 199 44" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M197.236 24.0697C198.401 22.9051 198.401 21.0168 197.236 19.8521L178.257 0.872995C177.092 -0.29166 175.204 -0.29166 174.039 0.872995C172.875 2.03765 172.875 3.92593 174.039 5.09058L190.91 21.9609L174.039 38.8313C172.875 39.9959 172.875 41.8842 174.039 43.0489C175.204 44.2135 177.092 44.2135 178.257 43.0489L197.236 24.0697ZM0 21.9609V24.9432H195.127V21.9609V18.9787H0V21.9609Z" fill="#005DCA"/>
							</svg>
							<p class="text-[#005dca]">0</p>
						</div>
						<h3 class="text-center text-2xl my-0">Meta por rango</h3>
					</div>
				 </div>

				<hr class="ml-8 mr-12 rounded-full bg-[#F2F3F3]" />

				 <div class="flex flex-col gap-4">
					<GoalCard 
						:dailyGoal="5329" 
						:current="1200" 
						size="100" 
						stroke="12" 
						trackColor="#005dca" 
						progressColor="#fdc300" 
						text-color="#002c4d"
						background-color="#eef5ff"
						goal-label="Meta Anual"
  						current-label="Estado Actual"
					/>
					<GoalCard 
						:dailyGoal="1776" 
						:current="1200" 
						size="100" 
						stroke="12" 
						trackColor="#ffffff" 
						progressColor="#005dca" 
						text-color="#002c4d"
						goal-label="Meta Trimestral"
						background-color="linear-gradient(135deg, #fec905 0%, #D1A500 100%)"
					/>
					<GoalCard goal-label="Meta Diaria" :dailyGoal="15" :current="12" size="100" stroke="12" trackColor="#ffffff" progressColor="#fdc300" />
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
import Signointe from "@/assets/images/signointe.svg";
import { useToast } from "vue-toastification";
import GoalCard from "../GoalCard.vue";
const toast = useToast();

const goalStore = useGoalStore();

const goal = ref({
	name: "",
	limit: null,
	startDate: "",
	endDate: "",
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

	goalStore.addGoal({ ...goal.value });
	toast.success("Meta guardada exitosamente.");

	goal.value = {
		name: "",
		limit: null,
		startDate: "",
		endDate: "",
	};
};
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