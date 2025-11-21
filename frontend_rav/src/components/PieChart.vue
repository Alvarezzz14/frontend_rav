<template>

  <div class="relative flex w-full h-full p-4 overflow-hidden bg-azul-gradian rounded-[20px]">
    <!-- Imagen decorativa de fondo -->
    <div class="absolute" :style="{
      left: '-0.20%',
      right: '-0.20%',
      top: '-0.20%',
      bottom: '-0.20%',
      opacity: 0.3,
      borderRadius: '20px',
      backgroundImage: `url(${RectangleBg})`,
      backgroundBlendMode: 'multiply',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      pointerEvents: 'none',
    }"></div>

    <!-- Botón de descarga en la esquina superior derecha -->
    <button v-if="hasData" @click="downloadChart"
      class="absolute top-2 right-2 md:top-4 md:right-4 w-[26.25px] h-[26.25px] md:w-[48px] md:h-[47px] bg-white rounded-full flex items-center justify-center shadow-[0px_1.31232px_2.62464px_rgba(0,0,0,0.25)] md:shadow-[0px_2px_4px_rgba(0,0,0,0.25)] z-10 border-0 outline-none cursor-pointer hover:bg-gray-50 transition-colors"
      title="Descargar gráfico">
      <DownloadIcon :size="16" :height="13" class-name="text-customPurple md:!w-[25px] md:!h-[20px]" />
    </button>

    <transition name="fade">
      <!-- Mostrar spinner mientras carga -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-full w-full">
        <p class="text-white font-['Work_Sans'] font-bold text-[16px] mb-4">Cargando datos...</p>
        <div class="spinner"></div>
      </div>

      <!-- Mostrar gráfico después de cargar los datos -->
      <div v-else-if="hasData" class="w-full h-full flex flex-col md:flex-row gap-2 md:gap-4">
        <!-- Columna izquierda: Título y Leyenda (38% en desktop, full width en mobile) -->
        <div class="flex flex-col justify-start w-full md:w-2/5 pl-2 flex-shrink-0">
          <div class="mb-2 md:mb-[25px]">
            <h3
              class="text-white font-['Work_Sans'] font-bold text-[13.12px] md:text-[20px] leading-[15px] md:leading-[23px] text-left m-0 mb-1 md:mb-[8px]">
              Tipos de poblaciones
            </h3>
            <!-- Línea amarilla debajo del título -->
            <div class="w-[158px] md:w-[289px] h-[3.28px] md:h-[6px] bg-amarillo rounded-[1px]"></div>
          </div>

          <!-- Leyenda personalizada -->
          <div class="flex flex-col gap-[6.56px] md:gap-[10px] pl-4 md:pl-6 lg:pl-[50px]">
            <div v-for="(item, index) in legendItems" :key="index" class="flex items-start gap-2 md:gap-3 lg:gap-[14px]">
              <!-- Círculo de color con sombra -->
              <div class="w-[19.68px] h-[19.68px] md:w-[36px] md:h-[36px] rounded-full flex-shrink-0" :style="{
                backgroundColor: item.color,
                boxShadow: '0px 2.62464px 2.62464px rgba(0, 0, 0, 0.25)'
              }"></div>

              <!-- Texto con sombras -->
              <div class="flex flex-col">
                <span class="text-white font-['Work_Sans'] font-bold text-[13.12px] md:text-[20px] leading-[15px] md:leading-[23px]"
                  style="text-shadow: 0px 2.62464px 2.62464px rgba(0, 0, 0, 0.25);">
                  {{ item.percentage }}
                </span>
                <span
                  class="text-white font-['Work_Sans'] font-normal text-[9.18px] md:text-[14px] leading-[11px] md:leading-[16px]"
                  style="text-shadow: 0px 2.62464px 2.62464px rgba(0, 0, 0, 0.25);">
                  {{ item.label }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna derecha: Gráfico Donut -->
        <div class="flex-1 relative flex items-center justify-center pl-4 md:pl-[40px] md:pr-[20px] min-h-[145px] md:min-h-[200px] -mt-[12rem] ml-[7rem] md:mt-0 md:ml-0">
          <div class="w-full h-full relative flex items-center justify-center">
            <Doughnut ref="doughnutChart" :data="clonedChartData" :options="chartOptions"
              class="max-w-full max-h-full" style="position: relative; z-index: 1;"/>
            <!-- Logo RAV en el centro del donut -->
            <div class="absolute pointer-events-none flex items-center justify-center w-24 md:w-full"
              style="top: 48%; left: 49%; transform: translate(-50%, -50%); z-index: 0;">
              <RavLogo/>
            </div>
          </div>
        </div>
      </div>

      <!-- Mostrar mensaje si no hay datos -->
      <div v-else class="flex flex-col items-center justify-center text-white h-full w-full">
        <svg class="w-16 h-16 mb-4 text-amarillo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-lg font-bold">No hay información para mostrar</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import RectangleBg from '@/assets/images/Rectangle.svg';
import { Doughnut } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive, onMounted, ref, computed } from "vue";
import DownloadIcon from "@/components/Icons/DownloadIcon.vue";
import { RavLogo } from "@/components/Icons";

const shadowPlugin = {
  id: 'shadowPlugin',
  beforeDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    
    // Configurar sombra
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
  },
  afterDatasetsDraw: (chart) => {
    chart.ctx.restore();
  }
};

Chart.register(...registerables);

// Registrar plugin personalizado para sombras
Chart.register(shadowPlugin);

const isLoading = ref(true);
const doughnutChart = ref(null);
const host = import.meta.env.VITE_HOST;
const hasData = ref(false);
const chartTitle = ref("Tipos de poblaciones");

// Función para truncar textos largos
const truncateText = (text, maxLength) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

// Colores según Figma (5 colores para las leyendas)
const pieColors = [
  "#F13001", // Rojo
  "#FF6600", // Naranja
  "#FDC301", // Amarillo
  "#5EA8ED", // Azul
  "#410A48", // Morado
];

// Data dummy para desarrollo (comentar cuando se integre con backend)
const dummyData = [
  { pertenencia_etnica: "Afrodescendiente", cantidad_repeticiones: 25 },
  { pertenencia_etnica: "Indígena", cantidad_repeticiones: 15 },
  { pertenencia_etnica: "Mestizo", cantidad_repeticiones: 30 },
  { pertenencia_etnica: "ROM", cantidad_repeticiones: 10 },
  { pertenencia_etnica: "Raizal", cantidad_repeticiones: 20 },
];

// Datos del gráfico
const chartData = reactive({
  labels: [],
  datasets: [
    {
      label: "Porcentaje",
      backgroundColor: pieColors,
      borderColor: "transparent",
      borderWidth: 0,
      data: [],
      hoverOffset: 15,
      // Ajustes para efecto 3D
      borderAlign: 'inner',
      spacing: 0,
      offset: 0,
    },
  ],
});

// Clonar los datos para evitar problemas de solo lectura
const clonedChartData = computed(() => JSON.parse(JSON.stringify(chartData)));

// Computed para los items de la leyenda personalizada con porcentajes
const legendItems = computed(() => {
  if (!chartData.datasets[0].data.length) return [];

  const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  return chartData.labels.map((label, index) => {
    const value = chartData.datasets[0].data[index];
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

    return {
      label,
      color: pieColors[index % pieColors.length],
      percentage: `${percentage}%`,
    };
  });
});

// Opciones del gráfico
const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  cutout: "68%", // Ajustado para hacer la donut más angosta según Figma
  plugins: {
    shadowPlugin: true,
    title: {
      display: false,
    },
    legend: {
      display: false, // Ocultar leyenda por defecto, usaremos custom
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#002C4D", // azul2Ape de Tailwind
      titleColor: "#FDC300",
      bodyColor: "white",
      borderColor: "#FDC300",
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      z: 9,
      callbacks: {
        label: (context) => {
          const value = context.raw || 0;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${context.label}: ${value.toLocaleString("es-ES")} (${percentage}%)`;
        },
      },
    },
  },
  layout: {
    padding: 15,
  },
  elements: {
    arc: {
      // Efecto de sombra/profundidad en cada segmento
      borderWidth: 0,
      borderColor: 'rgba(0, 0, 0, 0.9)',
      shadowOffsetX: 0,
      shadowOffsetY: 4,
      shadowBlur: 8,
      shadowColor: 'rgba(0, 0, 0, 0.8)',
    }
  }
});

// Obtener los datos desde la API
const fetchPertEtnicaData = async () => {
  try {
    // Simulación de carga (comentar cuando se integre con backend)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Usar data dummy (descomentar la llamada real cuando esté lista)
    const data = dummyData;

    /* DESCOMENTAR CUANDO SE INTEGRE CON EL BACKEND:
    const response = await fetch(
      `${host}:8082/api/v1/victimas/counter/pert-etnica`
    );
    if (!response.ok)
      throw new Error("Error al obtener datos de Pertenencia Étnica");

    const jsonResponse = await response.json();
    const data = jsonResponse.data.slice(0, 5);
    */

    // Mapear datos recibidos
    chartData.labels = data.map((item) =>
      truncateText(item.pertenencia_etnica || "Desconocido", 25)
    );
    chartData.datasets[0].data = data.map((item) =>
      Number(item.cantidad_repeticiones)
    );
    // Los colores ya están definidos en el array pieColors
    chartData.datasets[0].backgroundColor = pieColors.slice(0, data.length);

    // Verifica si hay Datos
    hasData.value = chartData.datasets[0].data.length > 0;

    console.log("Datos cargados para el gráfico:", chartData);
    console.log("Leyenda generada:", legendItems.value);
    isLoading.value = false; // Ocultar el spinner
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    isLoading.value = false;
    hasData.value = false;
  }
};

// Función para descargar el gráfico como imagen
const downloadChart = () => {
  if (doughnutChart.value && doughnutChart.value.chart) {
    const link = document.createElement("a");
    link.download = "tipos-de-poblaciones.png";
    link.href = doughnutChart.value.chart.toBase64Image();
    link.click();
  }
};

function forceResize() {

  doughnutChart.value.chart.resize();

}


// Llamar a la API al montar el componente
onMounted(() => {
  fetchPertEtnicaData();
  window.addEventListener("resize", forceResize);
});

</script>

<style scoped>
.spinner {
  border: 4px solid rgba(253, 195, 0, 0.3);
  border-top: 4px solid #fdc300;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bg-customPurple {
  background: linear-gradient(180deg, #005DCA 0%, #003B8A 100%);
}
</style>
