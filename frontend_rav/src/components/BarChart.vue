<template>
	<div class="flex flex-col w-full h-full">
		<!-- Transición suave para manejar tanto el spinner como el gráfico -->
		<transition name="fade">
			<div v-if="isLoading" class="flex flex-col items-center justify-center">
				<!-- Spinner visible mientras se cargan los datos -->
				<p class="text-customPurple font-bold mb-4">Generando Gráfico...</p>
				<div class="spinner"></div>
			</div>
			<div v-else class="h-full flex items-center justify-between">
				<!-- Gráfico mostrado después de cargar los datos -->
				<Bar ref="barChart" :data="clonedChartData" :options="chartOptions" />
			</div>
		</transition>
	</div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive, onMounted, ref, computed } from "vue";

// Registrar los módulos necesarios de Chart.js
Chart.register(...registerables);

const isLoading = ref(true); // Estado para mostrar el spinner
const barChart = ref(null);
const host = import.meta.env.VITE_HOST;

// Datos y opciones del gráfico
const chartData = reactive({
	labels: [],
	datasets: [
		{
			label: "Cantidad de Víctimas por Ciudad",
			backgroundColor: [],
			borderColor: "rgba(0,0,0,0.1)",
			borderWidth: 1,
			data: [],
		},
	],
});

// Clonar datos para evitar problemas de solo lectura
const clonedChartData = computed(() => JSON.parse(JSON.stringify(chartData)));

const chartOptions = reactive({
	responsive: true,
	maintainAspectRatio: true,
	plugins: {
		title: {
			display: true,
			text: "Ciudades con Mayor Número de Víctimas Registradas",
			font: {
				size: 16,
				weight: "bold",
			},
		},
		legend: {
			display: false,
		},
	},
	scales: {
		x: {
			ticks: {
				font: {
					size: 8,
				},
				color: "black",
			},
			grid: {
				display: false,
			},
		},
		y: {
			beginAtZero: true,
			ticks: {
				font: {
					size: 14,
				},
				color: "black",
			},
			grid: {
				display: false,
			},
		},
	},
});

// Obtener datos de la API
const fetchCitiesData = async () => {
	try {
		const response = await fetch(`${host}:8082/api/v1/victimas/counter/cities`);
		if (!response.ok) throw new Error("Error al obtener datos de ciudades");

		const jsonResponse = await response.json();

		const limitedData = jsonResponse.data.slice(0, 5);
		chartData.labels = limitedData.map((item) => item.ciudad || "Desconocido");
		chartData.datasets[0].data = limitedData.map((item) =>
			Number(item.cantidad_repeticiones)
		);
		chartData.datasets[0].backgroundColor = limitedData.map((_, index) =>
			index % 2 === 0 ? "rgba(128,0,128,0.6)" : "rgba(138,43,226,0.6)"
		);

		console.log("Datos cargados:", chartData);
		isLoading.value = false; // Ocultar el spinner
	} catch (error) {
		console.error("Error al cargar los datos:", error);
	}
};

// Llamar a fetchCitiesData al montar el componente
onMounted(() => {
	fetchCitiesData();
});
</script>

<style scoped>
.spinner {
	border: 4px solid #f3f3f3;
	border-top: 4px solid #7a1f7e; /* Morado */
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

/* Transiciones suaves */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
