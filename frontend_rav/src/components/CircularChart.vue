<template>
	<div class="flex flex-col bg-white items-center gap-4">
		<div
			v-for="(goal, index) in goals"
			:key="index"
			class="relative flex items-center justify-center w-72 p-8 h-40 max-w-md mx-auto"
			:style="getGradientStyle(index)">
			<!-- SVG personalizado para la barra de carga -->
			<svg
				class="w-full progress-circle-svg p-12"
				viewBox="0 0 120 120"
				xmlns="http://www.w3.org/2000/svg">
				<!-- Fondo del gradiente -->
				<defs>
					<linearGradient
						:id="`gradient-${index}`"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%">
						<stop offset="0%" stop-color="#F2F3F3" />
						<stop offset="100%" stop-color="#D9D9D9" />
					</linearGradient>
				</defs>
				<circle cx="60" cy="60" r="57" fill="url(#paint0_linear)" />

				<!-- Círculo de fondo con borde -->
				<circle
					cx="60"
					cy="60"
					r="52"
					stroke="#7A1F7E"
					stroke-width="10"
					fill="none" />

				<!-- Progreso dinámico -->
				<circle
					cx="60"
					cy="60"
					r="52"
					fill="none"
					:stroke="getProgressStrokeColor(goal.value)"
					stroke-width="10"
					stroke-linecap="round"
					:stroke-dasharray="calculateStrokeDasharray(goal.value)"
					stroke-dashoffset="0"
					transform="rotate(-90 60 60)" />

				<!-- Círculo inicial -->
				<circle cx="60" cy="8" r="8" fill="#FDC300" />

				<!-- Círculo final dinámico -->
				<circle
					:cx="getProgressPositionX(goal.value)"
					:cy="getProgressPositionY(goal.value)"
					r="10"
					fill="#FDC300" />
			</svg>

			<!-- Texto de porcentaje en el centro -->
			<div class="absolute inset-0 flex flex-col items-center justify-center">
				<span class="text-2xl font-bold text-gray-800">
					{{ goal.value }}%
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

// Ejemplo de datos
const goals = ref([
	{ value: 75, label: "Meta 1" },
	{ value: 50, label: "Meta 2" },
	{ value: 90, label: "Meta 3" },
]);

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

const getGradientStyle = (index) => {
	switch (index) {
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
</script>

<style scoped>
.progress-circle-svg {
	aspect-ratio: 1 / 1; /* Mantiene la proporción cuadrada del SVG */
}
</style>
