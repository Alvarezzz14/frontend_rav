<template>
	<div class="relative flex flex-col items-center justify-center w-full h-full rounded-lg p-6">
		<!-- Botón de descarga en la esquina superior derecha -->
		<button
			v-if="hasData"
			@click="downloadChart"
			class="absolute top-4 right-4 w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-md z-10"
			title="Descargar gráfico">
			<DownloadIcon :size="20" class-name="text-customPurple" />
		</button>

		<transition name="fade">
			<!-- Mostrar spinner mientras carga -->
			<div v-if="isLoading" class="flex flex-col items-center justify-center h-full">
				<p class="text-white font-['Work_Sans'] font-bold text-[16px] mb-4">Generando Gráfico...</p>
				<div class="spinner"></div>
			</div>
			<!-- Mostrar gráfico después de cargar los datos -->
			<div v-else-if="hasData" class="w-full h-full flex flex-col">
				<h3 class="text-white font-['Work_Sans'] font-bold text-[24px] leading-[28px] mb-4">
					{{ chartTitle }}
				</h3>
				<div class="flex-1 min-h-0">
					<Line ref="lineChart" :data="clonedChartData" :options="chartOptions" />
				</div>
			</div>
			<!-- Mostrar mensaje si no hay datos -->
			<div v-else class="flex flex-col items-center justify-center text-white h-full">
				<svg class="w-16 h-16 mb-4 text-amarillo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<p class="text-lg font-bold">No hay información para mostrar</p>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive, onMounted, ref, computed } from "vue";
import DownloadIcon from "@/components/Icons/DownloadIcon.vue";

Chart.register(...registerables);

const isLoading = ref(true); // Estado para el spinner
const lineChart = ref(null);
const host = import.meta.env.VITE_HOST;
const hasData = ref(false); // Estado para verificar si hay datos
const chartTitle = ref("TIPOS DE POBLACIONES"); // Título del gráfico

// Data dummy mensual para desarrollo (comentar cuando se integre con backend)
const dummyMonthlyData = [
	{ mes: "Enero", valor: 12 },
	{ mes: "Febrero", valor: 15 },
	{ mes: "Marzo", valor: 18 },
	{ mes: "Abril", valor: 16 },
	{ mes: "Mayo", valor: 14 },
	{ mes: "Junio", valor: 17 },
	{ mes: "Julio", valor: 20 },
	{ mes: "Agosto", valor: 19 },
	{ mes: "Septiembre", valor: 22 },
	{ mes: "Octubre", valor: 25 },
	{ mes: "Noviembre", valor: 21 },
	{ mes: "Diciembre", valor: 18 },
];

// Generar datos simulados con variación realista
const generateMonthlySimulation = () => {
	const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"];
	const baseValue = 10;
	const data = months.map((month, index) => ({
		mes: month,
		// Variación realista entre 5 y 25
		valor: Math.floor(baseValue + Math.random() * 15 + (index % 2 === 0 ? 5 : -2))
	}));
	return data;
};

// Datos del gráfico
const chartData = reactive({
	labels: [], // Meses del año
	datasets: [
		{
			label: "Cantidad",
			borderColor: "#FDC300", // Línea amarilla
			borderWidth: 3,
			backgroundColor: "rgba(253, 195, 0, 0.1)", // Fondo semitransparente
			data: [], // Valores mensuales
			fill: false,
			tension: 0.4, // Suavidad de la línea (curva)
			pointBackgroundColor: "#FDC300", // Puntos amarillos
			pointBorderColor: "#FDC300",
			pointBorderWidth: 2,
			pointRadius: 6, // Tamaño de los puntos
			pointHoverRadius: 8,
			pointHoverBackgroundColor: "#FDC300",
			pointHoverBorderColor: "white",
			pointHoverBorderWidth: 2,
		},
	],
});

// Clonar los datos para evitar problemas de solo lectura
const clonedChartData = computed(() => JSON.parse(JSON.stringify(chartData)));

// Opciones del gráfico
const chartOptions = reactive({
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		x: {
			ticks: {
				color: "white",
				font: {
					size: 18,
					family: "'Work Sans', sans-serif",
					weight: "600",
				},
			},
			grid: {
				display: false, // Sin líneas verticales
			},
		},
		y: {
			beginAtZero: true,
			ticks: {
				color: "white",
				font: {
					size: 20,
					family: "'Work Sans', sans-serif",
					weight: "600",
				},
				stepSize: 10,
			},
			grid: {
				display: false, // Sin líneas horizontales
			},
		},
	},
	plugins: {
		legend: {
			display: false, // Ocultamos la leyenda
		},
		title: {
			display: false, // Título externo
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
	layout: {
		padding: {
			top: 20,
			bottom: 10,
			left: 10,
			right: 30,
		},
	},
});

// Obtener los datos desde la API
const fetchMonthlyData = async () => {
	try {
		// Simulación de carga (comentar cuando se integre con backend)
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		// Usar data dummy generada (descomentar la llamada real cuando esté lista)
		const data = generateMonthlySimulation();
		
		/* DESCOMENTAR CUANDO SE INTEGRE CON EL BACKEND:
		const response = await fetch(
			`${host}:8082/api/v1/victimas/counter/mensual`
		);
		if (!response.ok)
			throw new Error("Error al obtener datos mensuales");

		const jsonResponse = await response.json();
		const data = jsonResponse.data;
		*/

		// Mapear datos recibidos
		chartData.labels = data.map((item) => item.mes);
		chartData.datasets[0].data = data.map((item) => Number(item.valor));

		// Verifica si hay Datos
		hasData.value = chartData.datasets[0].data.length > 0;

		console.log("Datos mensuales cargados:", chartData);
		isLoading.value = false; // Ocultar el spinner
	} catch (error) {
		console.error("Error al cargar los datos mensuales:", error);
		isLoading.value = false;
		hasData.value = false;
	}
};

// Función para descargar el gráfico como imagen
const downloadChart = () => {
	if (lineChart.value && lineChart.value.chart) {
		const link = document.createElement('a');
		link.download = 'tipos-de-poblaciones.png';
		link.href = lineChart.value.chart.toBase64Image();
		link.click();
	}
};

// Llamar a la API al montar el componente
onMounted(() => {
	fetchMonthlyData();
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

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

/* Gradiente morado como en el diseño de Figma */
.bg-gradient-purple {
	background: linear-gradient(180deg, #d160de 0%, #71277a 100%);
}
</style>
