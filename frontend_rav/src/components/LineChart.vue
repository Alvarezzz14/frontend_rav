<template>
    <Line :data="chartData" :options="chartOptions" />
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    components: { Line },
    data() {
      return {
        chartData: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
          datasets: [
            {
              label: 'Procesos',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(122, 31, 126)',
              data: [40, 20, 60, 80, 100]
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
  