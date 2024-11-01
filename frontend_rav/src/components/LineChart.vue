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
			label: "Procesos",
			backgroundColor: "rgba(75, 192, 192, 0.2)",
			borderColor: "rgba(122, 31, 126)",
			data: [40, 20, 60, 80, 100],
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
