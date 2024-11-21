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
		label: "Fomación",
		borderColor: 'rgba(253, 195, 0, 1)', // Color amarillo
		data: [3, 19, 8, 15, 20],
		fill: false, // Opcional, dependiendo si deseas que la línea esté rellena o no
		tension: 0.1
	  },
	],
  });
  
  const chartOptions = reactive({
	responsive: true,
	maintainAspectRatio: false,
	scales: {
	  x: {
		ticks: {
		  color: 'white', // Color de los números en el eje X
		  font: {
			size: 14, // Tamaño de la fuente
			weight: '600', // Grosor de la fuente
		  }
		},
		title: {
		  display: true,
		  color: 'white', // Color del texto del título en el eje X
		  font: {
			size: 16,
			weight: '600'
		  }
		},
		grid: {
		  display: false, // Eliminar las líneas de la cuadrícula
		},
	  },
	  y: {
		ticks: {
		  color: 'white', // Color de los números en el eje Y
		  font: {
			size: 14, // Tamaño de la fuente
			weight: '600',
		  },
		  stepSize: 5, // Incremento de los números en el eje Y
		},
		title: {
		  display: true,
		  color: 'white', // Color del texto del título en el eje Y
		  font: {
			size: 16,
			weight: 'bold'
		  }
		},
		grid: {
		  display: false, // Eliminar las líneas de la cuadrícula
		},
		min: 0, // Valor mínimo del eje Y
		max: 25, // Valor máximo del eje Y
	  }
	},
	plugins: {
	  legend: {
		labels: {
		  color: 'white', // Color de las etiquetas de la leyenda
		  font: {
			size: 14, // Tamaño de la fuente en la leyenda
			weight: 'bold',
		  }
		}
	  }
	}
  });
  </script>
  
  <style scoped>
  /* Añade estilos personalizados aquí si los necesitas */
  </style>
  