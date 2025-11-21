<template>
  <div class="relative flex flex-col w-full h-full p-4 bg-white rounded-[20px] shadow-[0px_4px_8px_rgba(0,0,0,0.15)] md:shadow-[0px_4px_10px_rgba(0,0,0,0.15)]">
    <!-- Botón de descarga en la esquina superior derecha -->
    <button
      v-if="hasData"
      @click="downloadChart"
      class="absolute top-3 right-3 md:top-4 md:right-4 w-[30px] h-[30px] md:w-[50px] md:h-[50px] bg-azulApe rounded-full flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] z-10 border-0 outline-none cursor-pointer transition-colors"
      title="Descargar gráfico"
    >
      <DownloadIcon :size="15" :height="12" class-name="text-backgroundApp md:!w-[25px] md:!h-[20px]" />
    </button>

    <!-- Transición suave para manejar tanto el spinner como el gráfico -->
    <transition name="fade">
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center h-full"
      >
        <!-- Spinner visible mientras se cargan los datos -->
        <p class="text-azulApe font-['Work_Sans'] font-bold text-[16px] mb-4">
          Generando Gráfico...
        </p>
        <div class="spinner"></div>
      </div>
      <div v-else-if="hasData" class="w-full h-full flex flex-col">
        <div class="mb-4 md:mb-[25px] pl-2">
          <h3
            class="text-azul2Ape font-['Work_Sans'] font-bold text-[14px] md:text-[20px] leading-[13px] md:leading-[23px] text-left m-0 mb-2 md:mb-[8px]"
          >
            {{ chartTitle }}
          </h3>
          <!-- Línea amarilla debajo del título -->
          <div class="w-[200px] md:w-[289px] h-[4px] md:h-[6px] bg-amarillo rounded-[1px]"></div>
        </div>
        <div class="flex-1 min-h-0 px-4 py-2">
          <!-- Gráfico mostrado después de cargar los datos -->
          <Bar ref="barChart" :data="clonedChartData" :options="chartOptions" style="filter: none; box-shadow: none;" />
        </div>
      </div>
      <!-- Mostrar mensaje si no hay datos -->
      <div
        v-else
        class="flex flex-col items-center justify-center text-azulApe h-full"
      >
        <svg
          class="w-16 h-16 mb-4 text-azulApe"
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

// Plugin para desactivar sombras completamente
const noShadowPlugin = {
  id: 'noShadow',
  beforeDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
  },
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.restore();
  }
};

Chart.register(noShadowPlugin);

const isLoading = ref(true); // Estado para mostrar el spinner
const barChart = ref(null);
const host = import.meta.env.VITE_HOST;
const hasData = ref(false);
const chartTitle = ref("Caracterización"); // Título del gráfico

// Detectar si es mobile
const isMobile = ref(window.innerWidth < 768);

// Actualizar isMobile en resize
const updateMobile = () => {
  const newIsMobile = window.innerWidth < 768;
  if (isMobile.value !== newIsMobile) {
    isMobile.value = newIsMobile;
    updateChartConfig();
  }
};

// Función para actualizar la configuración del gráfico
const updateChartConfig = () => {
  const radius = isMobile.value ? 3 : 10;
  const thickness = isMobile.value ? 10 : 19;
  const fontSize = isMobile.value ? 11 : 20;
  
  chartData.datasets[0].borderRadius = { topLeft: 0, topRight: 0, bottomLeft: radius, bottomRight: radius };
  chartData.datasets[0].barThickness = thickness;
  chartData.datasets[1].borderRadius = { topLeft: radius, topRight: radius, bottomLeft: 0, bottomRight: 0 };
  chartData.datasets[1].barThickness = thickness;
  
  chartOptions.scales.x.ticks.font.size = fontSize;
  
  // Forzar actualización del gráfico si ya existe
  if (barChart.value?.chart) {
    barChart.value.chart.update();
  }
};

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
    // Dataset 1: restante (parte superior, backgroundApp hasta completar 100%)
    {
      label: "Restante",
      backgroundColor: "#EEF5FF", // backgroundApp
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
  animation: {
    onComplete: () => {
      // Forzar que no haya sombras después de la animación
      if (barChart.value?.chart?.ctx) {
        barChart.value.chart.ctx.shadowOffsetX = 0;
        barChart.value.chart.ctx.shadowOffsetY = 0;
        barChart.value.chart.ctx.shadowBlur = 0;
        barChart.value.chart.ctx.shadowColor = 'transparent';
      }
    }
  },
  elements: {
    bar: {
      // Desactivar sombras en las barras
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: 'transparent',
    }
  },
  plugins: {
    noShadow: true,
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#002C4D",
      titleColor: "#FFFFFF",
      bodyColor: "white",
      borderColor: "#FDC300",
      borderWidth: 1,
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

  chartData.datasets[0].data = percValues; // parte inferior (azul)
  chartData.datasets[1].data = rest; // parte superior (gris)

    // Colores en escala de AZULES (8 tonos cíclicos) alineados a la marca
    const blueShades = [
      "#003B8A", // Azul profundo (gradiente oscuro)
      "#004EA8", // Azul intenso
      "#005DCA", // Azul marca (azulApe)
      "#2D7DE2", // Azul medio
      "#4D93E8", // Azul claro intermedio
      "#7AB0F0", // Azul claro
      "#A6C8F5", // Azul muy claro
      "#D2E3FA", // Azul pastel
    ];

    chartData.datasets[0].backgroundColor = data.map(
      (_, index) => blueShades[index % blueShades.length]
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
  window.addEventListener("resize", updateMobile);
});

// Limpiar listener al desmontar
import { onBeforeUnmount } from "vue";
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateMobile);
});
</script>

<style scoped>
/* Forzar que el canvas no tenga sombras */
:deep(canvas) {
  filter: none !important;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
}

.spinner {
  border: 4px solid rgba(0, 93, 202, 0.3);
  border-top: 4px solid #005DCA;
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
