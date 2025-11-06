<template>
  <div
    class="h-full overflow-hidden flex flex-col transition-all duration-700 ease-in-out"
    :class="[
      isExpanded
        ? 'w-[266px] bg-azul-gradian sidebar-activity-container'
        : 'w-[50px]',
    ]"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <!-- Botón de Actividad (siempre visible) -->
    <div
      class="flex flex-row items-center gap-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex-shrink-0 mx-auto transition-all duration-700"
      :class="[
        isExpanded
          ? 'activity-btn-expanded mt-5 mb-4 bg-amarillo'
          : 'activity-btn-collapsed mt-5 animate-bounce bg-azul-gradian',
      ]"
    >
      <!-- Icono de Actividad (sin router-link) -->
      <svg
        width="25"
        height="25"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-shrink-0"
      >
        <path
          d="M13.45 1.78C13.41 2.03 13.39 2.28 13.39 2.53C13.39 4.78 15.21 6.5991 17.45 6.5991C17.7 6.5991 17.94 6.5701 18.19 6.5301V14.5991C18.19 17.9901 16.19 20.0001 12.79 20.0001H5.401C2 20.0001 0 17.9901 0 14.5991V7.2001C0 3.8001 2 1.78 5.401 1.78H13.45ZM13.651 7.86C13.38 7.83 13.111 7.95 12.95 8.17L10.531 11.3L7.76 9.12C7.59 8.99 7.39 8.9391 7.19 8.9601C6.991 8.9901 6.811 9.0991 6.69 9.2591L3.731 13.1101L3.67 13.2001C3.5 13.5191 3.58 13.9291 3.88 14.1501C4.02 14.2401 4.17 14.3001 4.34 14.3001C4.571 14.3101 4.79 14.1891 4.93 14.0001L7.44 10.7691L10.29 12.9101L10.38 12.9691C10.7 13.1391 11.1 13.0601 11.33 12.7591L14.22 9.0301L14.18 9.0501C14.34 8.8301 14.37 8.5501 14.26 8.3001C14.151 8.0501 13.91 7.8801 13.651 7.86ZM17.5901 0C18.9201 0 20.0001 1.0798 20.0001 2.4098C20.0001 3.7398 18.9201 4.8198 17.5901 4.8198C16.2601 4.8198 15.1801 3.7398 15.1801 2.4098C15.1801 1.0798 16.2601 0 17.5901 0Z"
          :fill="isExpanded ? '#002C4D' : '#FDC300'"
        />
      </svg>

      <!-- Texto "Actividad" (solo cuando está expandido) -->
      <span
        v-if="isExpanded"
        class="font-['Work_Sans'] font-bold text-[21px] leading-[25px] text-azul2Ape whitespace-nowrap"
      >
        Actividad
      </span>
    </div>

    <!-- Lista de Actividades con scroll (solo cuando está expandido) -->
    <div
      v-if="isExpanded"
      class="flex-1 overflow-y-auto overflow-x-hidden px-[13px] transition-all duration-700"
      style="margin-bottom: 80px;"
    >
      <div v-for="(goal, index) in goals" :key="index" class="mb-5">
        <CircularChart :goal="goal" />
      </div>
    </div>

    <!-- Contenedor fijo para el botón inferior -->
    <div v-if="isExpanded" class="w-full flex justify-center items-end absolute left-0 bottom-0 pb-4 bg-transparent z-10">
      <router-link
        to="/IndicadoresActividad"
        class="flex flex-row items-center gap-3 w-[240px] h-[49px] bg-amarillo rounded-[41.25px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-6 cursor-pointer transition-all duration-300 hover:scale-[1.03]"
        style="text-decoration: none;"
      >
        <IconConfigurarMeta class="w-[19px] h-[19px] flex-shrink-0" />
        <span
          class="font-['Work_Sans'] font-bold text-[21px] leading-[25px] text-[#002C4D] whitespace-nowrap"
        >Configurar meta</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useGoalStore } from "@/stores/goalStore";
import CircularChart from "@/components/metas/CircularChart.vue";

import IconConfigurarMeta from "@/components/Icons/IconConfigurarMeta.vue";

// Estado de expansión del sidebar
const isExpanded = ref(false);

// Acceso al store de metas
const goalStore = useGoalStore();

const goals = computed(() => goalStore.processedGoals);

onMounted(() => {
  goalStore.fetchGoals(); // Cargar metas del localStorage
});
</script>

<style scoped>
.sidebar-activity-container {
  border-radius: 29.3592px;
  filter: drop-shadow(4px 0px 9.7px rgba(0, 93, 202, 0.45));
}

.activity-btn-collapsed {
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  padding: 0 !important;
  justify-content: center;
}
.activity-btn-expanded {
  width: 240px !important;
  height: 50px !important;
  border-radius: 50px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  justify-content: center;
}

/* Personalizar scrollbar */
.sidebar-activity-container ::-webkit-scrollbar {
  width: 6px;
}

.sidebar-activity-container ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.sidebar-activity-container ::-webkit-scrollbar-thumb {
  background: rgba(253, 195, 0, 0.5);
  border-radius: 10px;
}

.sidebar-activity-container ::-webkit-scrollbar-thumb:hover {
  background: rgba(253, 195, 0, 0.8);
}
</style>

/* Quitar subrayado al router-link del botón Configurar meta */
.sidebar-activity-container a { text-decoration: none !important; }
