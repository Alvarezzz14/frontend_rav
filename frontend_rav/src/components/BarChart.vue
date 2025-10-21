<template>
	<div class="relative flex flex-col w-full h-full p-6">
		<!-- Botón de descarga en la esquina superior derecha -->
		<button
			v-if="hasData"
			@click="downloadChart"
			class="absolute top-2 right-2 w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-md z-10 border-0 outline-none"
			title="Descargar gráfico">
			<DownloadIcon :size="25" :height="20" class-name="text-customPurple" />
		</button>

		<!-- Transición suave para manejar tanto el spinner como el gráfico -->
		<transition name="fade">
			<div v-if="isLoading" class="flex flex-col items-center justify-center h-full">
				<!-- Spinner visible mientras se cargan los datos -->
				<p class="text-white font-['Work_Sans'] font-bold text-[16px] mb-4">Generando Gráfico...</p>
				<div class="spinner"></div>
			</div>
			<div v-else-if="hasData" class="w-full h-full flex flex-col">
				<h3 class="text-white font-['Work_Sans'] font-bold text-[20px] leading-[23px] text-left m-0 mb-[30px]">
					{{ chartTitle }}
				</h3>
				<div class="flex-1 min-h-0">
					<!-- Gráfico mostrado después de cargar los datos -->
					<Bar ref="barChart" :data="clonedChartData" :options="chartOptions" />
				</div>
			</div>
			<!-- Mostrar mensaje si no hay datos -->
			<div v-else class="flex flex-col items-center justify-center text-white h-full">
				<svg class="w-16 h-16 mb-4 text-amarillo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
				<p class="text-lg font-bold">No hay información para mostrar</p>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive, onMounted, ref, computed } from "vue";
import DownloadIcon from "@/components/Icons/DownloadIcon.vue";

// Registrar los módulos necesarios de Chart.js
Chart.register(...registerables);

const isLoading = ref(true); // Estado para mostrar el spinner
const barChart = ref(null);
const host = import.meta.env.VITE_HOST;
const hasData = ref(false);
const chartTitle = ref("CARACTERIZACIÓN"); // Título del gráfico

// Data dummy para desarrollo (comentar cuando se integre con backend)
const dummyData = [
	{ mes: "Enero", valor: 22 },
	{ mes: "Febrero", valor: 18 },
	{ mes: "Marzo", valor: 20 },
	{ mes: "Abril", valor: 12 },
	{ mes: "Mayo", valor: 7 },
];

// Datos y opciones del gráfico
const chartData = reactive({
	labels: [],
	datasets: [
		{
			label: "Cantidad",
			backgroundColor: [],
			borderColor: "rgba(255, 255, 255, 0.2)",
			borderWidth: 0,
			data: [],
			borderRadius: 4,
			barThickness: 27, // Ancho fijo de 27px como en Figma
		},
	],
});

// Clonar datos para evitar problemas de solo lectura
const clonedChartData = computed(() => JSON.parse(JSON.stringify(chartData)));

const chartOptions = reactive({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		title: {
			display: false, // Título externo
		},
		legend: {
			display: false,
		},
		tooltip: {
			backgroundColor: 'rgba(113, 39, 122, 0.95)',
			titleColor: '#FDC300',
			bodyColor: 'white',
			borderColor: '#FDC300',
			borderWidth: 1,
			padding: 12,
			displayColors: false,
			titleFont: {
				size: 14,
				family: "'Work Sans', sans-serif",
				weight: "bold",
			},
			bodyFont: {
				size: 13,
				family: "'Work Sans', sans-serif",
			},
			callbacks: {
				label: (context) => {
					return `Cantidad: ${context.raw}`;
				},
			},
		},
	},
	scales: {
		x: {
			ticks: {
				font: {
					size: 18,
					family: "'Work Sans', sans-serif",
					weight: "600",
				},
				color: "white",
			},
			grid: {
				display: false,
			},
		},
		y: {
			beginAtZero: true,
			ticks: {
				font: {
					size: 20,
					family: "'Work Sans', sans-serif",
					weight: "600",
				},
				color: "white",
				stepSize: 10,
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
		// Simulación de carga (comentar cuando se integre con backend)
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		// Usar data dummy (descomentar la llamada real cuando esté lista)
		const data = dummyData;
		
		/* DESCOMENTAR CUANDO SE INTEGRE CON EL BACKEND:
		const response = await fetch(`${host}:8082/api/v1/victimas/counter/cities`);
		if (!response.ok) throw new Error("Error al obtener datos de ciudades");

		const jsonResponse = await response.json();
		const data = jsonResponse.data.slice(0, 5);
		*/

		chartData.labels = data.map((item) => item.mes || item.ciudad || "Desconocido");
		chartData.datasets[0].data = data.map((item) =>
			Number(item.valor || item.cantidad_repeticiones)
		);

		// Colores alternados: Amarillo y Rosado
		chartData.datasets[0].backgroundColor = data.map((_, index) =>
			index % 2 === 0 ? "#FDC300" : "#E391EC" // Amarillo y rosado
		);

		// Verifica si hay Datos
		hasData.value = chartData.datasets[0].data.length > 0;

		console.log("Datos cargados:", chartData);
		isLoading.value = false; // Ocultar el spinner
	} catch (error) {
		console.error("Error al cargar los datos:", error);
		isLoading.value = false;
		hasData.value = false;
	}
};

// Función para descargar el gráfico como imagen
const downloadChart = () => {
	if (barChart.value && barChart.value.chart) {
		const link = document.createElement('a');
		link.download = 'caracterizacion.png';
		link.href = barChart.value.chart.toBase64Image();
		link.click();
	}
};

// Llamar a fetchCitiesData al montar el componente
onMounted(() => {
	fetchCitiesData();
});
</script>

<style scoped>
.spinner {
	border: 4px solid rgba(253, 195, 0, 0.3);
	border-top: 4px solid #FDC300;
	border-radius: 50%;
	width: 50px;
	height: 50px;
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

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
