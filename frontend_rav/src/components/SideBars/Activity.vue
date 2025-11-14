<template>
  <div
    class="h-full flex flex-col transition-all duration-700 ease-in-out"
    :class="rootClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Botón de Actividad (siempre visible) -->
    <div
      class="flex flex-row items-center gap-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex-shrink-0 mx-auto transition-all duration-700"
      :class="buttonClasses"
    >
      <!-- Icono de Actividad (componente reutilizable) -->
      <IconActividad :size="25" :active="isExpanded" class="flex-shrink-0" />

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
      v-if="showContent"
      class="flex-1 overflow-y-auto overflow-x-hidden px-[13px] transition-all duration-700 flex flex-col items-center"
      style="margin-bottom: 80px;"
    >
      <div
        v-for="(goal, index) in goals"
        :key="index"
        :class="cardWrapperClasses"
        class="activity-card-base"
      >
        <CircularChart :goal="goal" />
      </div>
    </div>

    <!-- Contenedor fijo para el botón inferior -->
  <div v-if="showContent" class="w-full flex justify-center items-end absolute left-0 bottom-0 pb-4 bg-transparent z-10">
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
import IconActividad from "@/components/Icons/IconActividad.vue";

// Estado de expansión del sidebar (compartido con el store UI)
import { useUiStore } from '@/stores/ui';
const uiStore = useUiStore();
const isExpanded = computed({
  get: () => uiStore.isActivityExpanded,
  set: (val) => uiStore.setActivityExpanded(val)
});

// Detectar mobile (simple window.innerWidth < 1024); podría extraerse a composable
const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1024;
  });
}

const rootClasses = computed(() => {
  if (isMobile.value) {
    return 'w-full min-h-dvh bg-[#002C4D]/95 backdrop-blur-sm rounded-none';
  }
  return isExpanded.value
    ? 'w-[266px] bg-azul-gradian sidebar-activity-container'
    : 'w-[50px] overflow-hidden';
});

const buttonClasses = computed(() => {
  if (isMobile.value) {
    return 'activity-btn-expanded mt-5 mb-4 bg-amarillo';
  }
  return isExpanded.value
    ? 'activity-btn-expanded mt-5 mb-4 bg-amarillo'
    : 'activity-btn-collapsed mt-5 animate-bounce bg-azul-gradian';
});

const showContent = computed(() => isMobile.value || isExpanded.value);

// Wrapper de tarjeta en mobile: sólo centrado y spacing (borde ahora lo pinta CircularChart)
const cardWrapperClasses = computed(() => isMobile.value ? 'activity-card-mobile' : 'mb-5');

const handleMouseEnter = () => {
  if (!isMobile.value) isExpanded.value = true;
};
const handleMouseLeave = () => {
  if (!isMobile.value) isExpanded.value = false;
};

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

.activity-card-base {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile: tamaño y margen de las tarjetas de actividad */
@media (max-width: 1023px) {
  .activity-card-mobile {
    width: 360px;
    height: 249px;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 0;
    display:flex;
    align-items:center;
    justify-content:center;
  }
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
