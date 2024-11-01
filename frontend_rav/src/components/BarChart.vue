<template>
    <Bar :data="chartData" :options="chartOptions" />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
          datasets: [
            {
              label: 'Usuarios',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(122, 31, 126)',
              data: [30, 70, 50, 90, 60]
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        }
      };
    }
  };
  </script>
  