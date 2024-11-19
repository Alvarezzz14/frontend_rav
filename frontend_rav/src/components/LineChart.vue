<template>
	<Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive } from "vue";

// Registrar los módulos necesarios de Chart.js
Chart.register(...registerables);

// Datos y opciones de la gráfica
const chartData = reactive({
	labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
	datasets: [
		{
			label: "Mi Línea",
			borderColor: 'rgba(253, 195, 0, 1)', // Color amarillo
			data: [3, 19, 8, 15, 20, 25],
			textColor: 'rgba(255, 255, 255, 1)',
			fill: false, // Opcional, dependiendo si deseas que la línea esté rellena o no
			tension: 0.1
		},
	],
});

const chartOptions = reactive({
	responsive: true,
	maintainAspectRatio: false,
});
</script>

<style scoped>
/* Añade estilos personalizados aquí si los necesitas */
</style>
