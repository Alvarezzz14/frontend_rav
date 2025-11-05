<template>
  <div class="flex flex-col gap-5 p-4 w-full max-w-[1453px] overflow-hidden">
    <!-- Texto de bienvenida con icono -->
    <div class="flex items-center gap-2">
      <!-- Icono Dashboard con círculo (gradiente azul) -->
      <div class="relative w-[30px] h-[29.93px] flex-none">
        <!-- Círculo de fondo (gradiente azul de marca) -->
        <div
          class="absolute inset-0 w-[30px] h-[29.93px] bg-azul-gradian rounded-full"
        ></div>
        <!-- Icono blanco centrado, tamaño 16.61x15.91px -->
        <div class="absolute inset-0 flex items-center justify-center">
          <IconDashboard :size="17" color="white" class="w-[17px] h-[17px]" />
        </div>
      </div>
      <h1
        class="text-azul2Ape"
        style="
          font-family: 'Work Sans';
          font-weight: 700;
          font-size: 30px;
          line-height: 100%;
          letter-spacing: 0%;
        "
      >
        Bienvenido, {{ empresaNombre }}
      </h1>
    </div>

    <!-- Primera Sección: Contenedores con contenido e imagen -->
    <div class="flex gap-7 justify-start flex-wrap">
      <div
        v-for="(image, index) in imagePaths"
        :key="index"
        class="relative rounded-[20px] flex-shrink-0 image-card overflow-hidden"
        style="width: 330px; height: 330px"
      >
        <!-- Imagen de fondo -->
        <img
          :src="image.path"
          :alt="image.title"
          class="absolute object-cover"
          style="width: 330px; height: 330px"
        />
        <!-- Contenedor para el título y el número -->
        <div
          class="absolute inset-0 flex flex-col items-center justify-end pb-8"
        >
          <!-- Título -->
          <h4
            class="text-white text-center mb-1"
            style="
              font-family: 'Work Sans';
              font-weight: 700;
              font-size: 23.9122px;
              line-height: 28px;
              text-shadow: 0px 4.78243px 4.78243px rgba(0, 0, 0, 0.25);
            "
          >
            {{ image.title }}
          </h4>
          <!-- Número -->
          <p
            class="text-white text-center m-0"
            style="
              font-family: 'Work Sans';
              font-weight: 700;
              font-size: 38.2595px;
              line-height: 45px;
              text-shadow: 0px 4.78243px 4.78243px rgba(0, 0, 0, 0.25);
            "
          >
            {{ image.count }}
          </p>
        </div>
      </div>
    </div>

    <!-- Segunda Sección: Gráficos -->
    <div class="grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <div
        class="border-0 my-card rounded-[20px] shadow-[0px_4px_10px_rgba(0,0,0,0.25)]"
        style="
          background: linear-gradient(180deg, #005dca 0%, #003b8a 100%);
          width: 688px;
          height: 342px;
        "
      >
        <PieChart />
      </div>
      <div
        class="border-0 my-card rounded-[20px] shadow-[0px_4px_10px_rgba(0,0,0,0.25)]"
        style="background: white; width: 688px; height: 342px"
      >
        <BarChart />
      </div>
    </div>
  </div>
</template>

<script setup>
// Importar componentes
import { ref, onMounted } from "vue";
import BarChart from "@/components/BarChart.vue";
import EnFormacion from "@/assets/images/EnFormacion.webp";
import Certificados from "@/assets/images/Certificados.webp";
import EnProceso from "@/assets/images/PorCertificar.webp";
import Cancelados from "@/assets/images/Cancelados.webp";
import PieChart from "./PieChart.vue";
import IconDashboard from "@/components/Icons/IconDashboard.vue";

// Nombre de la empresa - Se actualizará desde el backend
const empresaNombre = ref("RAV");

// Datos de las imágenes estáticas y sus títulos
const imagePaths = ref([
  {
    title: "En formación",
    count: "12883124",
    path: EnFormacion,
  },
  {
    title: "Certificados",
    count: "9888112",
    path: Certificados,
  },
  {
    title: "Por certificar",
    count: "85883161",
    path: EnProceso,
  },
  {
    title: "Cancelados",
    count: "99883151",
    path: Cancelados,
  },
]);
</script>

<style scoped>
/* Animación para las cards de imágenes superiores */
.image-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.image-card:hover {
  transform: scale(1.05);
}

/* Ocultar barras de scroll pero mantener funcionalidad */
:deep(.hide-scrollbar) {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

:deep(.hide-scrollbar::-webkit-scrollbar) {
  display: none; /* Chrome, Safari y Opera */
}
</style>
