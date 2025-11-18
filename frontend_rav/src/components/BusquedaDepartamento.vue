
<template>
  <div ref="rootEl" class="relative w-full min-h-screen">
    <!-- Frame 620 - Título con icono de Mapa -->
    <div
      class="flex flex-row mt-10 items-center gap-3 w-[141px] h-[41px]"
    >
      <!-- Group 1322 - Icono de Mapa con círculo (azul de marca) -->
      <div class="relative w-[30px] h-[29.93px] flex-none">
        <!-- Círculo azul de fondo -->
        <div
          class="absolute inset-0 w-[30px] h-[29.93px] bg-azul-gradian rounded-full"
        ></div>
        <!-- Icono blanco centrado, tamaño 16.61x15.91px -->
        <div class="absolute inset-0 flex items-center justify-center">
          <IconMap
            :size="16.61"
            color="white"
            class="w-[16.61px] h-[15.91px]"
          />
        </div>
      </div>

      <!-- Texto "Mapa" -->
      <h1
        class="font-work-sans font-bold text-[30px] leading-[35px] text-azul2Ape flex-none"
      >
        Mapa
      </h1>
    </div>

    <!-- Selector del Departamento -->
    <section class="flex flex-col xl:flex-row max-w-full items-start">
      <div class="mr-7">
        <div class="mt-5 h-10">
          <RavSelect
            v-model="selectedCountry"
            :options="departamentos"
            placeholder="Seleccione departamento"
            :showImage="true"
            optionLabel="name"
            optionImage="flagUrl"
            inputClass="xl:w-[520px]  h-10"
            :overlayPaddingTop="'30px'"
            :overlayZIndex="1"
            @open="onDropdownOpen"
            @close="onDropdownClose"
            @change="handleChange"
          />
        </div>
        <!-- Tarjeta de Información del Departamento -->
        <!-- Group 574 -->
        <div
          v-if="selectedInfo"
          class="h-[371px] z-10 mt-12"
          :style="{ top: infoCardTop, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }"
        >
          <!-- Frame 515 - Imagen principal -->
          <div
            class="w-auto h-[141px] flex flex-col items-start p-0 gap-[10px]"
          >
            <img
              :src="selectedInfo.imageUrl"
              :alt="selectedInfo.name"
              class="h-[141px] object-cover rounded-t-[20px] flex-none order-0 self-stretch flex-grow-0"
            />
          </div>
          <!-- Frame 514 - Encabezado con nombre y fondo color -->
          <div
            class="h-[68px] flex flex-row justify-center items-start pt-3 px-0 pb-0 gap-[212px]"
            style="background: linear-gradient(180deg, #005DCA 0%, #003B8A 100%)"
          >
            <!-- Nombre del departamento -->
            <h2
              class="w-[202px] h-[47px] font-work-sans font-bold text-[40px] leading-[47px] text-white flex-none order-0 flex-grow-0 m-0"
            >
              {{ selectedInfo.name }}
            </h2>
            <!-- Group 363 - Imagen del mapa del departamento -->
            <div class="w-[44px] h-[44px] flex-none order-1 flex-grow-0 relative">
              <!-- Ellipse 7 - Fondo blanco circular y bandera centrada con flex -->
              <div class="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center">
                <img
                  :src="selectedInfo.flagUrl"
                  :alt="'Bandera de ' + selectedInfo.name"
                  class="w-[26px] h-[26px] object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          <!-- Frame 516 - Descripción del departamento -->
          <div
            class="min-h-[80px] bg-white rounded-b-[20px] flex flex-row justify-center items-center px-[10px] pb-[10px] pt-0 gap-[10px]"
          >
            <p
              class="w-[447px] min-h-[40px] font-work-sans font-normal text-[16px] leading-[19px] text-black flex-none order-0 flex-grow-0 whitespace-pre-line break-words"
            >
              La cantidad de victimas en el departamento es de:
              <strong class="font-bold">{{
                formatNumber(department.total_victimas)
              }}</strong>
              personas
            </p>
          </div>
        </div>
      </div>
      <!-- Mapa de Colombia -->
      <div
        class="w-full max-w-[850px] -mt-14 flex-shrink flex-grow min-h-full"
      >
        <svg
          class="min-w-[550px] h-auto"
          viewBox="0 0 780 780"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="390" cy="390" r="390" fill="white" />
          <g>
            <!-- Aquí puedes agregar los paths de los departamentos -->
            <path
              v-for="dep in departamentos"
              :key="dep.code"
              :d="departmentPaths[dep.code]"
              :fill="
                  selectedCountry && selectedCountry.code === dep.code
                    ? '#FFD600'
                    : '#C3DAFF'
              "
              :stroke="
                  selectedCountry && selectedCountry.code === dep.code
                    ? '#FFD600'
                    : 'none'
              "
            />
          </g>
        </svg>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, nextTick, onUnmounted } from "vue";
import RavSelect from "@/components/Inputs/RavSelect.vue";
import IconMap from "@/components/Icons/IconMap.vue";
import { departamentos } from "@/data/departamentosMapa/departamentos";
import { getDepartmentDescription } from "@/data/departamentosMapa/descripciones";
import { departmentPaths } from "@/data/departamentosMapa/paths";
import FetchService from "@/services/fetchService";

// Reactive data
const selectedInfo = ref(null);
const selectedCountry = ref("");
let department = ref([]);
const fetchService = new FetchService();
const host = import.meta.env.VITE_HOST;
const rootEl = ref(null);
const infoCardTop = ref('176px');
let listenersActive = false;

const computeCardTopBelowOverlay = () => {
  const overlay = document.querySelector('.p-select-overlay');
  const root = rootEl.value;
  if (!overlay || !root) return;
  const oRect = overlay.getBoundingClientRect();
  const rRect = root.getBoundingClientRect();
  const gap = 10; // separación inferior entre overlay y tarjeta
  const relativeTop = Math.max(0, (oRect.bottom - rRect.top) + gap);
  infoCardTop.value = `${relativeTop}px`;
};

const addOverlayPositionListeners = () => {
  if (listenersActive) return;
  window.addEventListener('scroll', computeCardTopBelowOverlay, { passive: true });
  window.addEventListener('resize', computeCardTopBelowOverlay);
  listenersActive = true;
};

const removeOverlayPositionListeners = () => {
  if (!listenersActive) return;
  window.removeEventListener('scroll', computeCardTopBelowOverlay);
  window.removeEventListener('resize', computeCardTopBelowOverlay);
  listenersActive = false;
};

const onDropdownOpen = () => {
  nextTick(() => {
    computeCardTopBelowOverlay();
    addOverlayPositionListeners();
  });
};

const onDropdownClose = () => {
  infoCardTop.value = '170px';
  removeOverlayPositionListeners();
};

//Formatear numeros
const formatNumber = (num) => {
  return new Intl.NumberFormat("es-ES").format(num); // Formato español con separadores de miles
};

const handleChange = () => {
  getDepartment();
  updateSelectedInfo();
  // Si el dropdown sigue abierto, reajustar por si el alto del overlay cambió
  nextTick(() => computeCardTopBelowOverlay());
};

const getDepartment = async () => {
  if (!selectedCountry.value || !selectedCountry.value.name) return;

  const nameDeparment = selectedCountry.value.name.toUpperCase();
  console.log(nameDeparment);
  const url = `${host}:8082/api/v1/victimas/department/${nameDeparment}`;
  await fetchService.get(url, {
    fetchOptions: {
      method: "GET",
      headers: {
        Accept: "aplicattion/json",
      },
    },
    success: (response) => (department.value = response),
    error: (response) => console.log(response),
  });

  console.log(department.value);
};

// Methods
const updateSelectedInfo = () => {
  if (selectedCountry.value) {
    const selected = departamentos.find(
      (dep) => dep.code === selectedCountry.value.code
    );
    if (selected) {
      selectedInfo.value = {
        ...selected,
        description: getDepartmentDescription(selected.name),
        path: departmentPaths[selected.code],
      };
    } else {
      selectedInfo.value = null;
    }
  } else {
    selectedInfo.value = null;
  }
};
</script>

<style scoped>
</style>
