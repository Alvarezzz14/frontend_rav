<template>
	<div class="flex flex-col bg-white items-center gap-2">
		<div
			v-for="(goal, index) in goals"
			:key="index"
			class="flex flex-row items-center rounded-md w-[279px] h-[150px] max-w-md"
			:style="getGradientStyle(index)">
			<!-- Contenedor del SVG personalizado para la barra de carga -->
			<div class="relative w-48 h-48 -ml-2">
				<svg
					class="m-10 progress-circle-svg"
					viewBox="0 0 120 120"
					xmlns="http://www.w3.org/2000/svg">
					<!-- Círculo de fondo con borde -->
					<circle
						cx="60"
						cy="60"
						r="52"
						:stroke="getStrokeColors(index).backgroundStroke"
						stroke-width="10"
						fill="none" />

					<!-- Progreso dinámico -->
					<circle
						cx="60"
						cy="60"
						r="52"
						fill="none"
						:stroke="getStrokeColors(index).progressStroke"
						stroke-width="11"
						stroke-linecap="round"
						:stroke-dasharray="calculateStrokeDasharray(goal.progress)"
						stroke-dashoffset="0"
						transform="rotate(-90 60 60)" />

					<!-- Círculo inicial -->
					<circle
						cx="60"
						cy="8"
						r="8"
						:fill="getStrokeColors(index).progressStroke" />

					<!-- Círculo final dinámico -->
					<circle
						:cx="getProgressPositionX(goal.progress)"
						:cy="getProgressPositionY(goal.progress)"
						r="10"
						:fill="getStrokeColors(index).progressStroke" />
				</svg>

				<!-- Texto de porcentaje en el centro -->
				<div class="absolute inset-0 flex flex-col items-center justify-center">
					<span
						class="text-xl font-bold text-gray-800"
						:style="{ color: getTextColor(index) }">
						{{ goal.progress }}%
					</span>
				</div>
			</div>
			<!-- Texto a la derecha del indicador -->
			<div class="flex flex-col justify-center items-start -ml-6">
				<div :class="index === 2 ? 'text-white' : 'text-black'" class="text-xs">
					Meta {{ goal.name }}
				</div>
				<div
					:class="
						index === 2
							? 'text-white text-base font-bold'
							: 'text-black text-base font-bold'
					">
					{{ goal.limit || 0 }} Tickets
				</div>

				<div
					:class="index === 2 ? 'text-white' : 'text-black'"
					class="mt-1 text-xs">
					Progreso Actual
				</div>
				<div
					:class="
						index === 2
							? 'text-white text-base font-bold'
							: 'text-black text-base font-bold'
					">
					{{ goal.current || 0 }} Tickets
				</div>
				<!-- Mostrar la fecha -->
				<div
					:class="index === 2 ? 'text-white' : 'text-black'"
					class="mt-1 text-xs">
					Fecha limite:
				</div>
				<div
					:class="index === 2 ? 'text-white font-bold' : 'text-black font-bold'"
					class="text-xs mt-1">
					{{ goal.endDate }}
				</div>
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
const getProgressPositionX = (value) => {
	const angle = (value / 100) * 360 - 90;
	const radius = 52;
	return 60 + radius * Math.cos((angle * Math.PI) / 180);
};

// Función para calcular la posición Y del círculo final
const getProgressPositionY = (value) => {
	const angle = (value / 100) * 360 - 90;
	const radius = 52;
	return 60 + radius * Math.sin((angle * Math.PI) / 180);
};

// Función para obtener el gradiente de fondo según el índice
const getGradientStyle = (index) => {
	const normalizedIndex = index % 3; //Ciclo de 3 Estilos
	switch (normalizedIndex) {
		case 0:
			return {
				background:
					"linear-gradient(to right, rgba(242, 243, 243, 1), rgba(217, 217, 217, 1))",
			};
		case 1:
			return {
				background:
					"linear-gradient(to right, rgba(253, 195, 0, 0.4), rgba(253, 195, 0, 1))",
			};
		case 2:
			return {
				background:
					"linear-gradient(to right, rgba(207, 95, 221, 1), rgba(113, 39, 122, 1))",
			};
		default:
			return {};
	}
};

// Función para obtener los colores dinámicos según el gradiente
const getStrokeColors = (index) => {
	const normalizedIndex = index % 3; //Ciclo de 3 Estilos
	switch (normalizedIndex) {
		case 0: // Gradiente gris
			return {
				backgroundStroke: "#7A1F7E", // Morado
				progressStroke: "#FDC300", // Amarillo
			};
		case 1: // Gradiente amarillo
			return {
				backgroundStroke: "#F2F3F3", // Blanco
				progressStroke: "#7A1F7E", // Morado
			};
		case 2: // Gradiente morado
			return {
				backgroundStroke: "#F2F3F3", // Blanco
				progressStroke: "#FDC300", // Amarillo
			};
		default:
			return {
				backgroundStroke: "#CCCCCC", // Gris por defecto
				progressStroke: "#000000", // Negro por defecto
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
