<template>
	<div class="min-h-screen p-4 flex flex-col">
		<!-- Sección Superior -->
		<div
			class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-4">
			<div class="flex items-center mb-4 md:mb-0">
				<div class="p-6 bg-customPurple rounded-full">
					<img
						:src="Indicador"
						alt="Icono de Indicadores"
						width="50"
						height="50" />
				</div>
				<div class="ml-4 text-center md:text-left">
					<p class="text-black mb-0 text-2xl md:text-3xl">Indicadores de</p>
					<h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">
						Actividad
					</h2>
				</div>
			</div>
		</div>

		<!-- Contenedor Principal -->
		<div class="dashboard-container">
			<div class="integrated-panel">
				<!-- Configuración de Metas -->
				<div class="left-content flex flex-col p-9 max-w-lg rounded-lg">
					<h3 class="text-lg font-semibold text-black mb-4">Configurar Meta</h3>
					<p
						class="text-xl font-bold text-customPurple mb-3 relative flex justify-between items-center">
						<!-- Texto de la descripción -->
						Descripción
						<span class="icon-tooltip-wrapper ml-auto">
							<!-- Icono con tooltip -->
							<img
								:src="Signointe"
								alt="Indicador"
								class="inline-block mr-2 icon-with-tooltip" />
							<span class="tooltip-text">Este es el mensaje flotante</span>
						</span>
					</p>
					<form @submit.prevent="saveGoal">
						<div class="mb-4">
							<label
								for="name"
								class="block text-sm font-medium text-gray-700 mb-1">
								Nombre
							</label>
							<select
								v-model="goal.name"
								id="name"
								class="w-full block bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customPurple">
								<option value="" disabled>Seleccione un tipo de meta</option>
								<option value="Mensual">Mensual</option>
								<option value="Trimestral">Trimestral</option>
								<option value="Semestral">Semestral</option>
								<option value="Anual">Anual</option>
							</select>
						</div>
						<div class="mb-4">
							<label
								for="limit"
								class="block text-sm font-medium text-gray-700 mb-1">
								Límite
							</label>
							<input
								type="number"
								id="limit"
								v-model.number="goal.limit"
								min="1"
								class="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customPurple"
								placeholder="Ingresa el límite de la meta" />
						</div>
						<div class="grid grid-cols-2 gap-4 mb-4">
							<div>
								<label for="startDate" class="text-sm text-gray-700 mb-1 block">
									Fecha Inicio
								</label>
								<input
									type="date"
									id="startDate"
									v-model="goal.startDate"
									class="w-full p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple" />
							</div>
							<div>
								<label
									for="endDate"
									class="block text-sm font-medium text-gray-700 mb-1">
									Fecha Fin
								</label>
								<input
									type="date"
									id="endDate"
									v-model="goal.endDate"
									class="w-full p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-customPurple" />
							</div>
						</div>
						<button
							type="submit"
							class="w-full bg-customPurple text-lg cursor-pointer border-none text-amarillo font-bold py-2 rounded-lg shadow-md mt-4">
							Guardar Meta
						</button>
					</form>
				</div>

				<!-- Velocímetro -->
				<div class="py-20 custom-bordered-div">
					<vue-speedometer
						:value="generateRandomProgress()"
						:minValue="0"
						:maxValue="100"
						:segments="5"
						:needleColor="'#474747'"
						:segmentColors="customSegmentColors"
						:width="400"
						:height="300"
						:ringWidth="25"
						:currentValueText="'Progreso Random'"
						:animate="true"
						:animationDuration="1.5" />
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
const toast = useToast();

const goalStore = useGoalStore();

const goal = ref({
	name: "",
	limit: null,
	startDate: "",
	endDate: "",
});

const customSegmentColors = [
	"#71277A",
	"#A032A4",
	"#A032A4",
	"#D041D5",
	"#E64CEB",
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
.custom-bordered-div {
	border-left: 1px solid #cccccc; /* Línea gris clara a la izquierda */
	border-right: 1px solid #cccccc; /* Línea gris clara a la derecha */
	padding-left: 0.5rem; /* Un pequeño margen para separar la línea del contenido */
	padding-right: 0.5rem; /* Un pequeño margen para separar la línea del contenido */
}
.dashboard-container {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1%;
}

.integrated-panel {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	gap: 10px;
	background: white;
	border-radius: 10px;
	padding: 1%;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 1200px;
}

.left-content,
.right-content {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.left-content {
	max-width: 30%;
}

.right-content {
	max-width: 23%;
	display: flex;
	flex-direction: column;
	gap: 40px;
	justify-content: center;
}

.text-customPurple {
	color: #71277a;
}

/* Estilo para el contenedor */
.relative {
	position: relative;
}

/* Contenedor del icono con tooltip */
.icon-tooltip-wrapper {
	position: relative;
	z-index: 10;
}

/* Estilo para el tooltip (mensaje flotante) */
.tooltip-text {
	visibility: hidden;
	opacity: 0;
	position: absolute;
	bottom: 100%; /* Aparece por encima */
	left: 50%;
	transform: translateX(-50%);
	background-color: rgba(0, 0, 0, 0.7);
	color: #fff;
	border-radius: 5px;
	padding: 5px 10px;
	font-size: 14px;
	transition: opacity 0.3s ease, visibility 0.3s ease;
	z-index: 20; /* Asegura que el tooltip esté por encima */
}

/* Mostrar el tooltip solo cuando se pase el cursor sobre la imagen */
.icon-with-tooltip:hover + .tooltip-text {
	visibility: visible;
	opacity: 1;
}

/* Estilos para los campos de input */
input {
	position: relative;
	z-index: 10; /* Asegura que los inputs estén por encima */
}
</style>
