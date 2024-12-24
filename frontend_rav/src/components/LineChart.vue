<template>
	<div class="flex flex-col items-center justify-center w-full">
		<transition name="fade">
			<!-- Mostrar spinner mientras carga -->
			<div v-if="isLoading" class="flex flex-col items-center justiy-center">
				<p class="text-white font-bold mb-4">Generando Gráfico...</p>
				<div class="spinner"></div>
			</div>
			<!-- Mostrar gráfico después de cargar los datos -->
			<div v-else class="w-full">
				<Line ref="lineChart" :data="clonedChartData" :options="chartOptions" />
			</div>
		</transition>
	</div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive, onMounted, ref, computed } from "vue";

Chart.register(...registerables);

const isLoading = ref(true); // Estado para el spinner
const lineChart = ref(null);
const host = import.meta.env.VITE_HOST;

// Datos del gráfico
const chartData = reactive({
	labels: [], // Etiquetas del eje X
	datasets: [
		{
			label: "",
			borderColor: "rgba(253, 195, 0, 1)", // Color de la línea
			borderWidth: 1,
			backgroundColor: "rgba(253, 195, 0, 0.3)", // Color de relleno (opcional)
			data: [], // Datos del eje Y
			fill: false,
			tension: 0.4, // Suavidad de la línea
		},
	],
});

// Clonar los datos para evitar problemas de solo lectura
const clonedChartData = computed(() => JSON.parse(JSON.stringify(chartData)));

// Opciones del gráfico
const chartOptions = reactive({
	responsive: true,
	maintainAspectRatio: true,
	scales: {
		x: {
			ticks: {
				color: "white", // Color de las etiquetas del eje X
				font: {
					size: 8, // Tamaño de fuente
				},
			},
			title: {
				display: false,
				text: "Pertenencia Étnica",
				color: "black",
				font: {
					size: 16,
				},
			},
			grid: {
				display: false,
			},
		},
		y: {
			beginAtZero: true,
			ticks: {
				color: "white", // Color de las etiquetas del eje Y

				font: {
					size: 14,
				},
			},
			title: {
				display: false,
				text: "Cantidad de Víctimas",
				color: "white",
				font: {
					size: 8,
					weight: "bold",
				},
			},
			grid: {
				display: true,
				color: "rgba(0, 0, 0, 0.1)",
			},
		},
	},
	plugins: {
		legend: {
			labels: {
				color: "black",
				font: {
					size: 12,
					weight: "bold",
				},
			},
		},
		title: {
			display: true,
			text: "Cantidad de Víctimas por Pertenencia Étnica",
			color: "white",
			font: {
				size: 16, // Tamaño de la fuente
				weight: "bold", // Grosor del texto
			},
			padding: {
				top: 20, // Incrementa este valor para mover el título más arriba
				bottom: 0,
			},
		},
	},
});

// Obtener los datos desde la API
const fetchPertEtnicaData = async () => {
	try {
		const response = await fetch(
			`${host}:8082/api/v1/victimas/counter/pert-etnica`
		);
		if (!response.ok)
			throw new Error("Error al obtener datos de Pertenencia Étnica");

		const jsonResponse = await response.json();

		// Mapear datos recibidos
		const limitedData = jsonResponse.data.slice(0, 5);
		chartData.labels = limitedData.map(
			(item) => item.pertenencia_etnica || "Desconocido"
		);
		chartData.datasets[0].data = limitedData.map((item) =>
			Number(item.cantidad_repeticiones)
		);

		console.log("Datos cargados para el gráfico:", chartData);
		isLoading.value = false; // Ocultar el spinner
	} catch (error) {
		console.error("Error al cargar los datos:", error);
	}
};

// Llamar a la API al montar el componente
onMounted(() => {
	fetchPertEtnicaData();
});
</script>

<style scoped>
.spinner {
	border: 4px solid #7a1f7e;
	border-top: 4px solid #f3f3f3;
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

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
