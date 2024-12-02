<template>
	<div class="flex flex-row items-center justify-center w-full">
		<!-- Contenedor con más espacio -->
		<div class="w-full">
			<Bar :data="chartData" :options="chartOptions" />
		</div>
	</div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive } from "vue";

// Registrar los módulos necesarios de Chart.js
Chart.register(...registerables);

// Datos y opciones de la gráfica de barras
const chartData = reactive({
	labels: [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
	],
	datasets: [
		{
			label: "Usuarios",
			backgroundColor: [
				"rgba(128,0,128,0.6)", // Morado
				"rgba(138,43,226,0.6)", // Azul violeta
				"rgba(148,0,211,0.6)", // Violeta
				"rgba(128,0,128,0.6)", // Morado
				"rgba(138,43,226,0.6)", // Azul violeta
				"rgba(148,0,211,0.6)", // Violeta
				"rgba(128,0,128,0.6)", // Morado
				"rgba(138,43,226,0.6)", // Azul violeta
			],
			borderColor: "rgba(0,0,0,0.1)",
			borderWidth: 1,
			data: [30, 70, 50, 90, 60, 75, 45, 85], // Datos para los nuevos meses
		},
	],
});

const chartOptions = reactive({
	responsive: true,
	maintainAspectRatio: false,
	layout: {
		padding: {
			left: 10, // Ajusta el padding a los lados
			right: 10,
			top: 0,
			bottom: 0,
		},
	},
	plugins: {
		legend: {
			display: false, // Ocultar la leyenda
		},
		title: {
			display: true,
			text: "Certificados",
			color: "black", // Color del título del eje
			font: {
				size: 14,
				weight: "bold",
			},
		},
	},
	scales: {
		x: {
			ticks: {
				font: {
					size: 14,
					weight: "bold",
				},
				color: "black", // Color de los números del eje X
			},
			title: {
				display: false,
				text: "Certificados", // Título del eje X
				color: "black", // Color del título del eje
				font: {
					size: 16,
					weight: "bold",
				},
			},
			grid: {
				display: false, // Eliminar las líneas de la cuadrícula
			},
			// Ajustar el espacio entre las barras para que quepan más
			barPercentage: 0.3, // Reducir el grosor de las barras
			categoryPercentage: 0.5, // Ajustar la categoría para abarcar más espacio
			// Eliminar la línea del eje X
			ticks: {
				display: true, // Eliminar los números del eje X
			},
			borderWidth: 0, // Eliminar la línea del borde del eje X
		},
		y: {
			ticks: {
				font: {
					size: 14,
					weight: "bold",
				},
				color: "black", // Color de los números del eje Y
				stepSize: 25, // Establecer el intervalo de las marcas en el eje Y (cada 25 unidades)
			},
			title: {
				display: false, //cambiar a true si se requiere mostrar un titulo en el eje Y
				text: "Usuarios",
				color: "black", // Color del título del eje Y
				font: {
					size: 16,
					weight: "bold",
				},
			},
			// Desactivar las líneas de la cuadrícula
			grid: {
				display: false, // Eliminar las líneas de la cuadrícula
			},
			ticks: {
				display: false, // Eliminar los números del eje X
			},
			// Eliminar la línea del eje Y
			borderWidth: 0, // Eliminar la línea del borde del eje Y
		},
	},
});
</script>

<style scoped>
.chart-container {
	display: flex;
	justify-content: stretch;
	align-items: center;
	height: 100%;
	width: 100%;
}
</style>
