<template>
	<div class="relative flex flex-col items-center justify-center w-full h-full p-6">
	<!-- Botón de descarga en la esquina superior derecha -->
	<button
		v-if="hasData"
		@click="downloadChart"
		class="absolute top-2 right-2 w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-md z-10 border-0 outline-none"
		title="Descargar gráfico">
		<DownloadIcon :size="25" :height="20" class-name="text-customPurple" />
	</button>		<transition name="fade">
			<!-- Mostrar spinner mientras carga -->
			<div v-if="isLoading" class="flex flex-col items-center justify-center h-full">
				<p class="text-white font-bold mb-4">Cargando datos...</p>
				<div class="spinner"></div>
			</div>
			<!-- Mostrar gráfico después de cargar los datos -->
			<div v-else-if="hasData" class="w-full h-full flex flex-col">
				<h3 class="text-white font-['Work_Sans'] font-bold text-[20px] leading-[23px] text-left m-0 mb-[30px]">
					{{ chartTitle }}
				</h3>
				<div class="flex-1 min-h-0">
					<Doughnut
						ref="doughnutChart"
						:data="clonedChartData"
						:options="chartOptions" />
				</div>
			</div>
			<!-- Mostrar mensaje si no hay datos -->
			<div v-else class="flex flex-col items-center justify-center text-white h-full">
				<svg class="w-16 h-16 mb-4 text-amarillo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
				<p class="text-lg font-bold">No hay información para mostrar</p>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive, onMounted, ref, computed } from "vue";
import DownloadIcon from "@/components/Icons/DownloadIcon.vue";

Chart.register(...registerables);

const isLoading = ref(true); // Estado para el spinner
const doughnutChart = ref(null);
const host = import.meta.env.VITE_HOST;
const hasData = ref(false); // Estado para verificar si hay datos
const chartTitle = ref("TIPOS DE POBLACIÓN"); // Título del gráfico

// Función para truncar textos largos
const truncateText = (text, maxLength) =>
	text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

// Generar colores personalizados en tonalidades de amarillo
const generateYellowShades = (count) => {
	const colors = [
		'rgba(253, 195, 0, 1)',    // #FDC300 - Amarillo principal
		'rgba(253, 195, 0, 0.85)',  // Amarillo con 85% opacidad
		'rgba(253, 195, 0, 0.7)',   // Amarillo con 70% opacidad
		'rgba(253, 195, 0, 0.55)',  // Amarillo con 55% opacidad
		'rgba(253, 195, 0, 0.4)',   // Amarillo con 40% opacidad
	];
	return colors.slice(0, count);
};

// Data dummy para desarrollo (comentar cuando se integre con backend)
const dummyData = [
	{ pertenencia_etnica: "Afrodescendiente", cantidad_repeticiones: 1200 },
	{ pertenencia_etnica: "Indígena", cantidad_repeticiones: 800 },
	{ pertenencia_etnica: "Mestizo", cantidad_repeticiones: 2500 },
	{ pertenencia_etnica: "ROM", cantidad_repeticiones: 300 },
	{ pertenencia_etnica: "Raizal", cantidad_repeticiones: 150 },
];

// Datos del gráfico
const chartData = reactive({
	labels: [],
	datasets: [
		{
			label: "Cantidad de Víctimas",
			backgroundColor: [],
			borderColor: "rgba(255, 255, 255, 0.8)",
			borderWidth: 2,
			data: [],
			hoverOffset: 15,
		},
	],
});

// Clonar los datos para evitar problemas de solo lectura
const clonedChartData = computed(() => JSON.parse(JSON.stringify(chartData)));

// Opciones del gráfico
const chartOptions = reactive({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		title: {
			display: false,
		},
		legend: {
			position: "bottom",
			labels: {
				color: "white",
				font: {
					size: 12,
					family: "'Work Sans', sans-serif",
				},
				padding: 15,
				usePointStyle: true,
				pointStyle: 'circle',
			},
		},
		tooltip: {
			backgroundColor: 'rgba(113, 39, 122, 0.95)',
			titleColor: '#FDC300',
			bodyColor: 'white',
			borderColor: '#FDC300',
			borderWidth: 1,
			padding: 12,
			displayColors: true,
			callbacks: {
				label: (context) => {
					const label = context.label || "";
					const value = context.raw || 0;
					const total = context.dataset.data.reduce((a, b) => a + b, 0);
					const percentage = ((value / total) * 100).toFixed(1);
					return `${label}: ${value.toLocaleString("es-ES")} (${percentage}%)`;
				},
			},
		},
	},
	layout: {
		padding: {
			top: 10,
			bottom: 10,
		},
	},
});

// Obtener los datos desde la API
const fetchPertEtnicaData = async () => {
	try {
		// Simulación de carga (comentar cuando se integre con backend)
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		// Usar data dummy (descomentar la llamada real cuando esté lista)
		const data = dummyData;
		
		/* DESCOMENTAR CUANDO SE INTEGRE CON EL BACKEND:
		const response = await fetch(
			`${host}:8082/api/v1/victimas/counter/pert-etnica`
		);
		if (!response.ok)
			throw new Error("Error al obtener datos de Pertenencia Étnica");

		const jsonResponse = await response.json();
		const data = jsonResponse.data.slice(0, 5);
		*/

		// Mapear datos recibidos
		chartData.labels = data.map((item) =>
			truncateText(item.pertenencia_etnica || "Desconocido", 25)
		);
		chartData.datasets[0].data = data.map((item) =>
			Number(item.cantidad_repeticiones)
		);
		chartData.datasets[0].backgroundColor = generateYellowShades(data.length);

		// Verifica si hay Datos
		hasData.value = chartData.datasets[0].data.length > 0;

		console.log("Datos cargados para el gráfico:", chartData);
		isLoading.value = false; // Ocultar el spinner
	} catch (error) {
		console.error("Error al cargar los datos:", error);
		isLoading.value = false;
		hasData.value = false;
	}
};

// Función para descargar el gráfico como imagen
const downloadChart = () => {
	if (doughnutChart.value && doughnutChart.value.chart) {
		const link = document.createElement('a');
		link.download = 'tipos-de-poblaciones.png';
		link.href = doughnutChart.value.chart.toBase64Image();
		link.click();
	}
};

// Llamar a la API al montar el componente
onMounted(() => {
	fetchPertEtnicaData();
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

/* Asegurar que el gradiente se aplique correctamente */
.bg-customPurple {
	background: linear-gradient(180deg, #d160de 0%, #71277a 100%);
}
</style>
