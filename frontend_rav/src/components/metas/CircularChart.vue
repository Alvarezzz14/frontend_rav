<template>
	<div class="flex flex-col items-center gap-[10px] w-full">
		<div
			v-for="(goal, index) in goals"
			:key="index"
			class="relative w-[279px] h-[150px] rounded-[10px] flex items-center px-[15px]"
			:style="getGradientStyle(index)">
			<!-- Contenedor del círculo de progreso -->
			<div class="relative w-[115px] h-[115px] flex-shrink-0">
				<svg
					class="w-full h-full"
					viewBox="0 0 115 115"
					xmlns="http://www.w3.org/2000/svg">
					<!-- Gradiente de fondo del círculo -->
					<defs>
						<linearGradient :id="`bgGradient${index}`" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" :stop-color="getCircleGradient(index).start" />
							<stop offset="100%" :stop-color="getCircleGradient(index).end" />
						</linearGradient>
					</defs>
					
					<!-- Círculo de fondo con gradiente -->
					<circle
						cx="57.5"
						cy="57.5"
						r="52"
						:fill="`url(#bgGradient${index})`"
						stroke="none" />

					<!-- Borde del círculo -->
					<circle
						cx="57.5"
						cy="57.5"
						r="52"
						fill="none"
						:stroke="getStrokeColors(index).backgroundStroke"
						stroke-width="10" />

					<!-- Progreso dinámico -->
					<circle
						cx="57.5"
						cy="57.5"
						r="52"
						fill="none"
						:stroke="getStrokeColors(index).progressStroke"
						stroke-width="11"
						stroke-linecap="round"
						:stroke-dasharray="calculateStrokeDasharray(goal.progress)"
						stroke-dashoffset="0"
						transform="rotate(-90 57.5 57.5)" />

					<!-- Círculo pequeño inicial -->
					<circle
						cx="57.5"
						cy="5.5"
						r="8"
						:fill="getStrokeColors(index).dotColor" />

					<!-- Círculo grande final dinámico -->
					<circle
						:cx="getProgressPositionX(goal.progress, 57.5, 52)"
						:cy="getProgressPositionY(goal.progress, 57.5, 52)"
						r="10.8"
						:fill="getStrokeColors(index).dotColor" />
				</svg>

				<!-- Porcentaje en el centro -->
				<div class="absolute inset-0 flex items-center justify-center">
					<span
						class="font-['Work_Sans'] font-bold text-[24px] leading-[28px] text-center"
						:style="{ color: getTextColor(index) }">
						{{ goal.progress }}%
					</span>
				</div>
			</div>

			<!-- Información de la meta a la derecha -->
			<div class="flex flex-col ml-[16px] gap-0">
				<!-- Meta Anual/Trimestral/Diaria -->
				<p 
					class="font-['Work_Sans'] font-normal text-[14px] leading-[16px] m-0"
					:class="index === 2 ? 'text-white' : 'text-black'">
					Meta {{ goal.name }}
				</p>
				<!-- Número de la meta -->
				<p 
					class="font-['Work_Sans'] font-normal text-[14px] leading-[16px] m-0"
					:class="index === 2 ? 'text-white' : 'text-black'">
					{{ goal.limit || 0 }}
				</p>
				
				<!-- Estado Actual label -->
				<p 
					class="font-['Work_Sans'] font-normal text-[14px] leading-[16px] m-0 mt-[4px]"
					:class="index === 2 ? 'text-white' : 'text-black'">
					Estado Actual
				</p>
				<!-- Número estado actual -->
				<p 
					class="font-['Work_Sans'] font-normal text-[14px] leading-[16px] m-0"
					:class="index === 2 ? 'text-white' : 'text-black'">
					{{ goal.current || 0 }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, nextTick, watch } from "vue";
import { useGoalStore } from "@/stores/goalStore";

// Prop para recibir una meta individual
defineProps(["goal", "index"]);
const goalStore = useGoalStore();

// Procesar metas del store con animación inicializada
const goals = computed(() =>
	goalStore.processedGoals.map((goal) => ({
		...goal,
		animatedValue: 0,
	}))
);

// Ejemplo de datos Quemados de 3 Metas  Configuradas
/* const goals = ref([
	{ value: 75, animatedValue: 0, label: "Meta Anual", fecha: "31/12/2025" },
	{
		value: 50,
		animatedValue: 0,
		label: "Meta Trimestral",
		fecha: "30/03/2025",
	},
	{ value: 90, animatedValue: 0, label: "Meta Mensual", fecha: "31/01/2025" },
]); */

// Animar el progreso dinámico
const animateProgress = () => {
	goals.value.forEach((goal) => {
		const targetValue = goal.progress || 0;
		let currentValue = 0;

		const step = () => {
			if (currentValue < targetValue) {
				currentValue += 1;
				goal.animatedValue = currentValue;
				requestAnimationFrame(step);
			} else {
				goal.animatedValue = targetValue;
				goalStore.saveGoalsToLocal(); // Guarda el estado actualizado
				console.log(`Animación completada para: ${goal.name}`);
			}
		};
		requestAnimationFrame(step);
	});
};

// Watch para observar cambios en las metas procesadas
watch(
	() => goalStore.goals, // Observa cambios en las metas del store
	(newGoals) => {
		console.log("Metas actualizadas:", newGoals);
		nextTick(() => {
			animateProgress(); // Reactiva la animación tras los cambios
		});
	},
	{ deep: true } // Observar cambios profundos en el array de metas
);

// Color del progreso dinámico
const getProgressStrokeColor = (value) => {
	return value < 100 ? "#FDC300" : "#00C851";
};

// Cálculo de stroke-dasharray dinámico
const calculateStrokeDasharray = (value) => {
	const circumference = 2 * Math.PI * 52;
	return `${(circumference * value) / 100} ${circumference}`;
};

// Función para calcular la posición X del círculo final
const getProgressPositionX = (value, centerX, radius) => {
	const angle = (value / 100) * 360 - 90;
	return centerX + radius * Math.cos((angle * Math.PI) / 180);
};

// Función para calcular la posición Y del círculo final
const getProgressPositionY = (value, centerY, radius) => {
	const angle = (value / 100) * 360 - 90;
	return centerY + radius * Math.sin((angle * Math.PI) / 180);
};

// Función para obtener el gradiente de fondo según el índice
const getGradientStyle = (index) => {
	const normalizedIndex = index % 3;
	switch (normalizedIndex) {
		case 0:
			return {
				background: "linear-gradient(180deg, #F2F3F3 0%, #D9D9D9 100%)",
			};
		case 1:
			return {
				background: "linear-gradient(180deg, rgba(253, 195, 0, 0.4) 0%, #FDC300 100%)",
			};
		case 2:
			return {
				background: "linear-gradient(180deg, #CF5FDD 0%, #71277A 74.5%)",
			};
		default:
			return {};
	}
};

// Función para obtener el gradiente del círculo interior
const getCircleGradient = (index) => {
	const normalizedIndex = index % 3;
	switch (normalizedIndex) {
		case 0:
			return { start: "#F2F3F3", end: "#D9D9D9" };
		case 1:
			return { start: "rgba(253, 195, 0, 0.4)", end: "#FDC300" };
		case 2:
			return { start: "#CF48E0", end: "#71277A" };
		default:
			return { start: "#FFFFFF", end: "#CCCCCC" };
	}
};

// Función para obtener los colores dinámicos según el gradiente
const getStrokeColors = (index) => {
	const normalizedIndex = index % 3;
	switch (normalizedIndex) {
		case 0: // Gradiente gris
			return {
				backgroundStroke: "#7A1F7E", // Borde morado
				progressStroke: "#FDC300", // Progreso amarillo
				dotColor: "#FDC300", // Puntos amarillos
			};
		case 1: // Gradiente amarillo
			return {
				backgroundStroke: "#F2F3F3", // Borde blanco
				progressStroke: "#7A1F7E", // Progreso morado
				dotColor: "#7A1F7E", // Puntos morados
			};
		case 2: // Gradiente morado
			return {
				backgroundStroke: "#F2F3F3", // Borde blanco
				progressStroke: "#FDC300", // Progreso amarillo
				dotColor: "#FDC300", // Puntos amarillos
			};
		default:
			return {
				backgroundStroke: "#CCCCCC",
				progressStroke: "#000000",
				dotColor: "#000000",
			};
	}
};

// Función para obtener el color del texto según el gradiente
const getTextColor = (index) => {
	const normalizedIndex = index % 3; // Ciclo de 3 estilos
	switch (normalizedIndex) {
		case 0: // Gradiente gris
		case 1: // Gradiente amarillo
			return "#000000"; // Negro
		case 2: // Gradiente morado
			return "#FFFFFF"; // Blanco
		default:
			return "#000000"; // Color predeterminado
	}
};

onMounted(() => {
	goalStore.fetchGoals(); // Cargar metas del localStorage
	nextTick(() => {
		animateProgress(); // Asegúrate de que las metas estén procesadas antes de animar
	});
});
</script>

<style scoped></style>
