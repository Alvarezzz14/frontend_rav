<template>
	<div
		class="flex flex-col items-center justify-center w-full bg-customPurple rounded-lg">
		<transition name="fade">
			<!-- Mostrar spinner mientras carga -->
			<div v-if="isLoading" class="flex flex-col items-center justify-center">
				<p class="text-white  font-bold mb-4">Generando Gráfico...</p>
				<div class=" spinner"></div>
			</div>
			<!-- Mostrar gráfico después de cargar los datos -->
			<div v-else class="h-full ">
				<Doughnut
					ref="doughnutChart"
					:data="clonedChartData"
					:options="chartOptions" />
			</div>
		</transition>
	</div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive, onMounted, ref, computed } from "vue";

Chart.register(...registerables);

const isLoading = ref(true); // Estado para el spinner
const doughnutChart = ref(null);
const host = import.meta.env.VITE_HOST;

// Función para truncar textos largos
const truncateText = (text, maxLength) =>
	text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

// Generar colores personalizados en tonalidades de amarillo
const generateYellowShades = (baseColor, count) => {
	const shades = [];
	for (let i = 0; i < count; i++) {
		const opacity = 0.7 + (i * 0.4) / (count - 1); // Gradiente de opacidad
		shades.push(
			`rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity})`
		);
	}
	return shades;
};

// Colores base para amarillo
const baseColor = { r: 253, g: 195, b: 0 }; // FDC300

// Datos del gráfico
const chartData = reactive({
	labels: [], // Etiquetas del eje X
	datasets: [
		{
			label: "Cantidad de Víctimas por Pertenencia Étnica",
			backgroundColor: generateYellowShades(baseColor, 5), // Tonalidades de amarillo
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
	maintainAspectRatio: true,
	plugins: {
		title: {
			display: true,
			text: "Víctimas por Pertenencia Étnica",
			font: {
				size: 16,
				weight: "bold",
			},
			color: "white", // Título en blanco
		},
		legend: {
			position: "left", // Leyenda a la derecha
			labels: {
				color: "white", // Color del texto de la leyenda
				font: {
					size: 10,
				},
				usePointStyle: true,
				autoSkip: true,
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
			`${host}:8082/api/v1/victimas/counter/pert-etnica`
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

/* Fondo morado personalizado */
.bg-customPurple {
	background-color: linear-gradient(180deg, #d160de 0%, #71277a 100%);
}
</style>
