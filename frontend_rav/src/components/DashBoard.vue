<template>
  <div class="flex flex-col gap-5 xl:p-4 w-full max-w-[1453px] overflow-hidden">
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
        class="text-azul2Ape font-work-sans text-3xl font-bold leading-none tracking-normal"
      >
        Bienvenido, {{ empresaNombre }}
      </h1>
    </div>

    <!-- Primera Sección: Contenedores con contenido e imagen -->
    <div class="grid grid-cols-2 xl:flex xl:flex-row gap-2 xl:gap-7 lg:justify-center">
      <div
        v-for="(image, index) in imagePaths"
        :key="index"
        class="relative rounded-[20px] image-card overflow-hidden w-h-48 h-48  lg:w-[300px] lg:h-[300px] xl:w-[330px] xl:h-[330px]"
      >
        <!-- Imagen de fondo -->
        <img
          :src="image.path"
          :alt="image.title"
            class="absolute object-cover w-full h-full"
        />

         <!-- Gradiente oscuro con mayor intensidad -->
        <div class="absolute inset-0 bg-blue-gradient" />

        <!-- Contenedor para el título y el número -->
        <div
          class="absolute left-0 right-0 bottom-10 flex flex-col"
        >
          <!-- Título -->
          <h4
            class="text-white text-center mb-1 font-work-sans font-bold text-lg xl:text-2xl leading-5 xl:leading-7 [text-shadow:0px_4.78243px_4.78243px_rgba(0,0,0,0.25)]"
          >
            {{ image.title }}
          </h4>
          <!-- Número -->
          <p
            class="text-white text-center m-0 font-work-sans font-bold text-2xl xl:text-[38px] leading-5 xl:leading-10 [text-shadow:0px_4.78243px_4.78243px_rgba(0,0,0,0.25)]"
          >
            {{ image.count }}
          </p>
        </div>
      </div>
    </div>

    <!-- Segunda Sección: Gráficos -->
    <div class="grid xl:grid-cols-2 gap-7">
      <div
        class="border-0 my-card rounded-[20px] shadow-[0px_2px_4px_rgba(0,0,0,0.15)] w-full xl:h-[342px]"
      >
        <PieChart />
      </div>
      <div
        class="border-0 my-card rounded-[20px] shadow-[0px_2px_4px_rgba(0,0,0,0.15)] w-full h-[342px] bg-white"
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
import EnFormacion from "@/assets/images/Dashboard/en-formacion.avif";
import Certificados from "@/assets/images/Dashboard/certificados.avif";
import EnProceso from "@/assets/images/Dashboard/por-certificar.avif";
import Cancelados from "@/assets/images/Dashboard/cancelados.avif";
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
