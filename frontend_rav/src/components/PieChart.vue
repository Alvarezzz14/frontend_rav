<template>
	<div class="flex flex-col items-center justify-center w-full">
		<transition name="fade">
			<!-- Mostrar spinner mientras carga -->
			<div v-if="isLoading" class="flex flex-col items-center justiy-center">
				<p class="text-customPurple font-bold mb-4">Generando Gráfico...</p>
				<div class="spinner"></div>
			</div>
			<!-- Mostrar gráfico después de cargar los datos -->
			<div v-else class="w-full">
				<Pie ref="pieChart" :data="clonedChartData" :options="chartOptions" />
			</div>
		</transition>
	</div>
</template>

<script setup>
import { Pie } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive, onMounted, ref, computed } from "vue";

Chart.register(...registerables);

const isLoading = ref(true); // Estado para el spinner
const pieChart = ref(null);

// Función para truncar textos largos
const truncateText = (text, maxLength) =>
	text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

// Datos del gráfico
const chartData = reactive({
	labels: [], // Etiquetas del eje X
	datasets: [
		{
			label: "Cantidad de Víctimas por Pertenencia Étnica",
			backgroundColor: [
				"rgba(128,0,128,0.6)",
				"rgba(138,43,226,0.6)",
				"rgba(148,0,211,0.6)",
				"rgba(128,0,128,0.6)",
				"rgba(138,43,226,0.6)",
			],
			borderColor: "rgba(255,255,255,1)", // Color de borde
			borderWidth: 1,
			data: [], // Datos
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
			display: true,
			text: "Víctimas por Pertenencia Etnica",
			font: {
				size: 16,
				weight: "bold",
			},
		},
		legend: {
			position: "right", // Leyenda a la derecha
			labels: {
				color: "black", // Color del texto de la leyenda
				font: {
					size: 12,
					weight: "bold",
				},
			},
		},
		tooltip: {
			callbacks: {
				label: (context) => {
					const label = context.label || "";
					const value = context.raw || 0;
					return `${label}: ${value.toLocaleString("es-ES")}`;
				},
			},
		},
	},
});

// Obtener los datos desde la API
const fetchPertEtnicaData = async () => {
	try {
		const response = await fetch(
			"http://localhost:8082/api/v1/victimas/counter/pert-etnica"
		);
		if (!response.ok)
			throw new Error("Error al obtener datos de Pertenencia Étnica");

		const jsonResponse = await response.json();

		// Mapear datos recibidos
		const limitedData = jsonResponse.data.slice(0, 5);
		chartData.labels = limitedData.map((item) =>
			truncateText(item.pertenencia_etnica || "Desconocido", 20)
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
