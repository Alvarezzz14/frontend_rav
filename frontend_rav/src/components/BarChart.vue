<template>
	<Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive } from "vue";

// Registrar los módulos necesarios de Chart.js
Chart.register(...registerables);

// Datos y opciones de la gráfica de barras
const chartData = reactive({
	labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
	datasets: [
		{
			label: "Usuarios",
			backgroundColor: "rgba(153, 102, 255, 0.2)",
			borderColor: "rgba(122, 31, 126)",
			data: [30, 70, 50, 90, 60],
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
