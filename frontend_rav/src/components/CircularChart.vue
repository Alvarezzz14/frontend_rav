<template>
	<div class="flex flex-col bg-white items-center gap-4">
		<!-- Agrega un gap para separación -->
		<div
			v-for="(goal, index) in goals"
			:key="index"
			class="indicator-wrapper flex items-center gap-10 rounded-lg overflow-hidden"
			:style="getGradientStyle(index)">
			<div class="relative w-24 h-24 md:w-28 md:h-28">
				<!-- Fondo del medidor vacío -->
				<svg class="w-full h-full" viewBox="0 0 100 100">
					<!-- Fondo del círculo completo -->
					<circle
						cx="50"
						cy="50"
						r="40"
						stroke="lightgray"
						stroke-width="8"
						fill="none"
						style="stroke-linecap: round" />
					<!-- Círculo animado que muestra el progreso -->
					<circle
						cx="50"
						cy="50"
						r="40"
						stroke="currentColor"
						:stroke-dasharray="circumference"
						:stroke-dashoffset="
							circumference - (circumference * goal.value) / 100
						"
						stroke-width="8"
						fill="none"
						class="text-customPurple transition-all duration-1000 ease-out"
						style="stroke-linecap: round" />
				</svg>
				<!-- Porcentaje en el centro -->
				<div class="absolute inset-0 flex flex-col items-center justify-center">
					<span class="text-2xl font-bold">{{ goal.value }}%</span>
					<span class="text-sm font-semibold text-gray-500 mt-1">{{
						goal.label
					}}</span>
				</div>
				<!-- Texto a la derecha del indicador -->
				<div class="flex flex-col justify-center items-start">
					<div
						:class="index === 2 ? 'text-white' : 'text-black'"
						class="text-sm font-semibold">
						{{ goal.label }}
					</div>
					<div
						:class="
							index === 2
								? 'text-white text-2xl font-bold'
								: 'text-black text-xl font-bold'
						">
						{{ goal.meta || 0 }}
					</div>
					<div
						:class="index === 2 ? 'text-white' : 'text-black'"
						class="mt-1 text-sm font-semibold">
						Estado Actual
					</div>
					<div
						:class="
							index === 2
								? 'text-white text-2xl font-bold'
								: 'text-black text-xl font-bold'
						">
						{{ goal.current || 0 }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Ejemplo de datos
const goals = ref([
	{ value: 75, label: "Meta 1" },
	{ value: 50, label: "Meta 2" },
	{ value: 90, label: "Meta 3" },
]);

const circumference = 2 * Math.PI * 40;

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

// Simular valores de las metas (puedes eliminar esta parte si no es necesario)
onMounted(() => {
	setTimeout(() => {
		goals.value[0].value = 80;
		goals.value[1].value = 50;
		goals.value[2].value = 30;
	}, 500);
});
</script>

<style scoped>
/* Personalización adicional */
</style>
