<template>
  <div class="relative flex flex-col w-full h-full p-6 bg-white rounded-[20px] shadow-[0px_4px_10px_rgba(0,0,0,0.25)]">
    <!-- Botón de descarga en la esquina superior derecha -->
    <button
      v-if="hasData"
      @click="downloadChart"
      class="absolute top-4 right-4 w-[50px] h-[50px] bg-[#7A1F7E] rounded-full flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] z-10 border-0 outline-none cursor-pointer hover:bg-[#8F2A93] transition-colors"
      title="Descargar gráfico"
    >
      <DownloadIcon :size="25" :height="20" class-name="text-amarillo" />
    </button>

    <!-- Transición suave para manejar tanto el spinner como el gráfico -->
    <transition name="fade">
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center h-full"
      >
        <!-- Spinner visible mientras se cargan los datos -->
        <p class="text-customPurple font-['Work_Sans'] font-bold text-[16px] mb-4">
          Generando Gráfico...
        </p>
        <div class="spinner"></div>
      </div>
      <div v-else-if="hasData" class="w-full h-full flex flex-col">
        <h3
          class="text-black font-['Work_Sans'] font-bold text-[20px] leading-[23px] text-left m-0 mb-[30px]"
        >
          {{ chartTitle }}
        </h3>
        <div class="flex-1 min-h-0">
          <!-- Gráfico mostrado después de cargar los datos -->
          <Bar ref="barChart" :data="clonedChartData" :options="chartOptions" />
        </div>
      </div>
      <!-- Mostrar mensaje si no hay datos -->
      <div
        v-else
        class="flex flex-col items-center justify-center text-customPurple h-full"
      >
        <svg
          class="w-16 h-16 mb-4 text-customPurple"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <p class="text-lg font-bold">No hay información para mostrar</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive, onMounted, ref, computed } from "vue";
import DownloadIcon from "@/components/Icons/DownloadIcon.vue";

// Registrar los módulos necesarios de Chart.js
Chart.register(...registerables);

const isLoading = ref(true); // Estado para mostrar el spinner
const barChart = ref(null);
const host = import.meta.env.VITE_HOST;
const hasData = ref(false);
const chartTitle = ref("Caracterización"); // Título del gráfico

// Data dummy para desarrollo (comentar cuando se integre con backend)
const dummyData = [
  { mes: "Ene", valor: 22 },
  { mes: "Feb", valor: 18 },
  { mes: "Mar", valor: 20 },
  { mes: "Abr", valor: 12 },
  { mes: "May", valor: 7 },
  { mes: "Jun", valor: 17 },
  { mes: "Jul", valor: 15 },
  { mes: "Ago", valor: 19 },
];

// Datos y opciones del gráfico
const chartData = reactive({
  labels: [],
  datasets: [
    // Dataset 0: valor (parte inferior, colores morados)
    {
      label: "Valor",
      backgroundColor: [],
      borderColor: "transparent",
      borderWidth: 0,
      data: [],
      borderSkipped: false,
      borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 10, bottomRight: 10 },
      barThickness: 19,
      stack: "total",
      order: 1,
    },
    // Dataset 1: restante (parte superior, gris hasta completar 100%)
    {
      label: "Restante",
      backgroundColor: "#D9D9D9",
      borderColor: "transparent",
      borderWidth: 0,
      data: [],
      borderSkipped: false,
      borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
      barThickness: 19,
      stack: "total",
      order: 2,
    },
  ],
});

// Clonar datos para evitar problemas de solo lectura
const clonedChartData = computed(() => JSON.parse(JSON.stringify(chartData)));

// Guardamos los valores para tooltips y cálculo
let rawValues = [];
let percValues = [];

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(122, 31, 126, 0.95)",
      titleColor: "#FFFFFF",
      bodyColor: "white",
      borderColor: "#E391EC",
      borderWidth: 2,
      padding: 12,
      displayColors: false,
      titleFont: {
        size: 14,
        family: "'Work Sans', sans-serif",
        weight: "bold",
      },
      bodyFont: {
        size: 13,
        family: "'Work Sans', sans-serif",
      },
      callbacks: {
        label: (context) => {
          // Mostrar porcentaje utilizado (0-100%)
          const i = context.dataIndex;
          const val = percValues[i] ?? context.raw;
          return `Porcentaje: ${val}%`;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        font: {
          size: 20,
          family: "'Work Sans', sans-serif",
          weight: "700",
        },
        color: "#000000",
      },
      grid: {
        display: false, // sin líneas verticales
        drawBorder: false,
      },
      border: { display: false }, // sin línea del eje X
    },
    y: {
      stacked: true,
      beginAtZero: true,
      max: 100, // trabajamos en porcentaje
      display: false, // ocultar completamente el eje Y
      grid: {
        display: false, // sin línea horizontal/baseline
        drawBorder: false,
      },
      border: { display: false },
    },
  },
});

// Obtener datos de la API
const fetchCitiesData = async () => {
  try {
    // Simulación de carga (comentar cuando se integre con backend)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Usar data dummy (descomentar la llamada real cuando esté lista)
    const data = dummyData;

    /* DESCOMENTAR CUANDO SE INTEGRE CON EL BACKEND:
		const response = await fetch(`${host}:8082/api/v1/victimas/counter/cities`);
		if (!response.ok) throw new Error("Error al obtener datos de ciudades");

		const jsonResponse = await response.json();
		const data = jsonResponse.data.slice(0, 8); // Tomar máximo 8 elementos
		*/

    // Función para convertir nombre de mes a 3 letras
    const getShortMonth = (monthName) => {
      if (!monthName) return "Desc";
      // Si ya tiene 3 letras, retornar tal cual
      if (monthName.length === 3) return monthName;
      // Capitalizar primera letra y tomar primeras 3
      return monthName.charAt(0).toUpperCase() + monthName.slice(1, 3).toLowerCase();
    };

    chartData.labels = data.map((item) => 
      getShortMonth(item.mes || item.ciudad || "Desconocido")
    );
    
  rawValues = data.map((item) => Number(item.valor || item.cantidad_repeticiones));

  // Tratar el valor como porcentaje directo 0-100
  percValues = rawValues.map((v) => Math.max(0, Math.min(100, Math.round(v))));
  const rest = percValues.map((p) => 100 - p);

  chartData.datasets[0].data = percValues; // parte inferior (morado)
  chartData.datasets[1].data = rest; // parte superior (gris)

    // Colores en tonos morado/rosa según Figma (8 colores cíclicos)
    const purpleShades = [
      "#7A1F7E", // Rectangle 174 - Morado oscuro
      "#A032A4", // Rectangle 178 - Morado medio oscuro
      "#D041D5", // Rectangle 175 - Morado medio
      "#E64CEB", // Rectangle 179 - Rosa morado
      "#F868FD", // Rectangle 176 - Rosa brillante
      "#FB8EFF", // Rectangle 180 - Rosa claro
      "#FCADFF", // Rectangle 177 - Rosa muy claro
      "#FDC7FF", // Rectangle 181 - Rosa pastel
    ];

    chartData.datasets[0].backgroundColor = data.map(
      (_, index) => purpleShades[index % purpleShades.length]
    );

    // Verifica si hay Datos
  hasData.value = percValues.length > 0;

    console.log("Datos cargados:", chartData);
    isLoading.value = false; // Ocultar el spinner
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    isLoading.value = false;
    hasData.value = false;
  }
};

// Función para descargar el gráfico como imagen
const downloadChart = () => {
  if (barChart.value && barChart.value.chart) {
    const link = document.createElement("a");
    link.download = "caracterizacion.png";
    link.href = barChart.value.chart.toBase64Image();
    link.click();
  }
};

// Llamar a fetchCitiesData al montar el componente
onMounted(() => {
  fetchCitiesData();
});
</script>

<style scoped>
.spinner {
  border: 4px solid rgba(122, 31, 126, 0.3);
  border-top: 4px solid #7A1F7E;
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

/* Transiciones suaves */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
