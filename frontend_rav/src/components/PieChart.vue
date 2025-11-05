<template>
  <div class="relative flex w-full h-full p-4 overflow-hidden bg-azul-gradian rounded-[20px]">

    <!-- Botón de descarga en la esquina superior derecha -->
    <button
      v-if="hasData"
      @click="downloadChart"
      class="absolute top-4 right-4 w-[48px] h-[47px] bg-white rounded-full flex items-center justify-center shadow-[0px_2px_4px_rgba(0,0,0,0.25)] z-10 border-0 outline-none cursor-pointer hover:bg-gray-50 transition-colors"
      title="Descargar gráfico"
    >
      <DownloadIcon :size="25" :height="20" class-name="text-customPurple" />
    </button>
    
    <transition name="fade">
      <!-- Mostrar spinner mientras carga -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center h-full w-full"
      >
        <p class="text-white font-['Work_Sans'] font-bold text-[16px] mb-4">Cargando datos...</p>
        <div class="spinner"></div>
      </div>
      
      <!-- Mostrar gráfico después de cargar los datos -->
      <div v-else-if="hasData" class="w-full h-full flex gap-4">
        <!-- Columna izquierda: Título y Leyenda (38%) -->
        <div class="flex flex-col justify-start w-[38%] pl-2">
          <div class="mb-[25px]">
            <h3 class="text-white font-['Work_Sans'] font-bold text-[20px] leading-[23px] text-left m-0 mb-[8px]">
              Tipos de poblaciones
            </h3>
            <!-- Línea amarilla debajo del título -->
            <div class="w-[289px] h-[6px] bg-amarillo rounded-[1px]"></div>
          </div>
          
          <!-- Leyenda personalizada -->
          <div class="flex flex-col gap-[10px] pl-[50px]">
            <div 
              v-for="(item, index) in legendItems" 
              :key="index"
              class="flex items-start gap-[14px]"
            >
              <!-- Círculo de color con sombra -->
              <div 
                class="w-[36px] h-[36px] rounded-full flex-shrink-0"
                :style="{ 
                  backgroundColor: item.color,
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                }"
              ></div>
              
              <!-- Texto con sombras -->
              <div class="flex flex-col">
                <span 
                  class="text-white font-['Work_Sans'] font-bold text-[20px] leading-[23px]"
                  style="text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"
                >
                  {{ item.percentage }}
                </span>
                <span 
                  class="text-white font-['Work_Sans'] font-normal text-[14px] leading-[16px]"
                  style="text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"
                >
                  {{ item.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Columna derecha: Gráfico Donut (62%) -->
        <div class="flex-1 relative flex items-center justify-center pl-[40px] pr-[20px]">
          <div class="w-full h-full max-w-[303px] max-h-[280px] relative flex items-center justify-center">
            <Doughnut
              ref="doughnutChart"
              :data="clonedChartData"
              :options="chartOptions"
              class="w-full h-full"
            />
            
            <!-- Logo RAV en el centro del donut -->
            <div class="absolute pointer-events-none flex items-center justify-center" style="top: 48%; left: 49%; transform: translate(-50%, -50%);">
              <RavLogo :size="139" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mostrar mensaje si no hay datos -->
      <div
        v-else
        class="flex flex-col items-center justify-center text-white h-full w-full"
      >
        <svg
          class="w-16 h-16 mb-4 text-amarillo"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="text-lg font-bold">No hay información para mostrar</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { reactive, onMounted, ref, computed } from "vue";
import DownloadIcon from "@/components/Icons/DownloadIcon.vue";
import { RavLogo } from "@/components/Icons";

Chart.register(...registerables);

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
  "#FDC300", // Amarillo (Ellipse 70)
  "#FF6600", // Naranja (Ellipse 71)
  "#FF3300", // Rojo-naranja (Ellipse 72)
  "#0066FF", // Azul (Ellipse 73)
  "#F868FD", // Rosa (Ellipse 74)
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
  maintainAspectRatio: true,
  cutout: "68%", // Ajustado para hacer la donut más angosta según Figma
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false, // Ocultar leyenda por defecto, usaremos custom
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(0, 93, 202, 0.95)",
      titleColor: "#FDC300",
      bodyColor: "white",
      borderColor: "#FDC300",
      borderWidth: 1,
      padding: 12,
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

// Llamar a la API al montar el componente
onMounted(() => {
  fetchPertEtnicaData();
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

/* Asegurar que el gradiente se aplique correctamente */
.bg-customPurple {
  background: linear-gradient(180deg, #005DCA 0%, #003B8A 100%);
}
</style>
