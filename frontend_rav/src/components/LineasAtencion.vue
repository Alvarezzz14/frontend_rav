<template>
  <div>
    <router-view />
    <div>
      <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
      <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl">
        <!-- Icono y Título -->
        <div class="flex items-center -mb-8">
          <div class="p-5 bg-azulBarraApe rounded-full mb-5">
            <!-- Icono SVG -->
            <img :src="lineaAten" alt=" Icono de Lineas de atencion" width="60" height="60" />
          </div>
          <div class="ml-3 text-center md:text-left">
            <p class="text-black mb-0 text-6xl md:text-2xl">lineas de</p>
            <h2 class="text-azulBarraApe text-5xl md:text-5xl mt-0 font-bold">Atencion</h2>
          </div>
        </div>
      </div>
  
      <!-- Contenedores de imagen -->
      <div class="flex flex-col gap-7 p-4">
        <div class="flex items-center space-x-1 flex-auto -mb-5">
          <img :src="select1" alt="Icono de selección 1" width="25" height="25" />
          <p class="font-sans text-xl">Seleccione la</p>
          <h3 class="font-sans text-xl">Entidad</h3>
        </div>
        <div class="flex justify-between">
          <div
            @click="selectImage(LogoSenaverde); selectSede(sedes[0])"
            class="w-72 h-36 flex flex-col items-center rounded-lg cursor-pointer p-2 shadow-md"
            :class="['', selectedImage === LogoSenaverde ? 'bg-gray-200' : 'bg-white']"><h2></h2>
            <img :src="LogoSenaverde" alt="imagen logo verde sena" class="w-20 h-40" />
            <h4 class="font-bold -mb-10 text-center text-xl">SENA</h4>
          </div>
          <div
            @click="selectImage(LogoApe); selectSede(sedes[1])"
            class="w-72 h-36 flex flex-col items-center rounded-lg cursor-pointer p-2 shadow-md"
            :class="[selectedImage === LogoApe ? 'bg-gray-200' : 'bg-white']">
            <img :src="LogoApe" alt="Imagen ape" class="object-scale-down h-48 w-64 object-center" />
            <h4 class="font-bold -mb-10 text-center text-xl">APE</h4>
          </div>
          <div
            @click="selectImage(LogCertLab); selectSede(sedes[2])"
            class="w-72 h-36 flex flex-col items-center rounded-lg cursor-pointer p-2 shadow-md"
            :class="[selectedImage === LogCertLab ? 'bg-gray-200' : 'bg-white']">
            <img :src="LogCertLab" alt="Imagen certificados laborales" class="h-48 w-64 object-center" />
            <h4 class="font-bold -mb-10 text-center text-xl">CERTIFICACIONES</h4>
          </div>
          <div
            @click="selectImage(FondoEmprender); selectSede(sedes[3])"
            class="w-72 h-36 flex flex-col items-center rounded-lg cursor-pointer p-2 shadow-md"
            :class="[selectedImage === FondoEmprender ? 'bg-gray-200' : 'bg-white']">
            <img :src="FondoEmprender" alt="Imagen fondo emprender" class="object-scale-down h-48 w-64 object-center" />
            <h4 class="font-bold -mb-10 text-center text-xl">FONDO EMPRENDER</h4>
          </div>
        </div>
  
        <!-- Selección de Regional -->
        <div class="flex items-center space-x-1 flex-auto -mb-3">
          <img :src="select2" alt="Icono de selección 2" width="25" height="25" />
          <p class="font-sans text-xl">Seleccione la</p>
          <h3 class="font-sans text-xl">Regional</h3>
        </div>
        <div class="flex items-center space-x-2 h-1hadow-md">
          <!-- Selección de Departamento -->
          <Select v-model="selectedCountry" :options="departamentos" placeholder="Seleccione departamento"
            class="w-full rounded-lg shadow-md text-black" @change="updateSelectedInfo">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex gap-2 items-center font-semibold text-black">
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else class="text-azulBarraApe">{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center font-medium text-azulBarraApe">
                <p>{{ slotProps.option.name }}</p>
              </div>
            </template>
          </Select>
        </div>
        <div class="flex items-center justify-center">
          <!-- Botón de Búsqueda -->
          <Button
            class="w-72 !bg-azulBarraApe text-lg cursor-pointer border-none !text-amarillo font-bold py-2 rounded-lg shadow-md mt-4"
            type="button" label="Buscar" icon="pi pi-search" :loading="loading" @click="openModal" />
        </div>
      </div>
  
      <!-- Componente de PopUp -->
      <PopUp :isOpen="isModalOpen" :image="selectedImage" :sede="selectedSede"  :departamento="selectedCountry?.name"  @close="isModalOpen = false" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import select1 from "@/assets/imgLineasAtencion/select1.svg";
import select2 from "@/assets/imgLineasAtencion/select2.svg";
import lineaAten from "@/assets/imgLineasAtencion/lineaAten.svg";
import LogoSenaverde from "@/assets/images/logosenaverde.svg";
import LogCertLab from "@/assets/imgLineasAtencion/LogCertLab.svg";
import LogoApe from "@/assets/images/logoape.png";
import FondoEmprender from "@/assets/images/fondoemprender.png";
import Select from "primevue/select";
import PopUp from './PopUp.vue';

const selectedCountry = ref();
const selectedInfo = ref(null);
const isModalOpen = ref(false);
const loading = ref(false);
const selectedImage = ref(null);
const selectedSede = ref(null);
const selectedDepart = ref (null);

const sedes = ["SERVICIO NACIONAL DE APRENDISAJE SENA", "AGENCIA PUBLICA DE EMPLEO", "CERTIFICACION COMPETENCIAS LABORALES", "FONDO EMPRENDER"];


const departamentos = ref([
  { name: "Amazonas", code: "91" },
  { name: "Antioquia", code: "05" },
  { name: "Arauca", code: "81" },
]);



const updateSelectedInfo = () => {
  const selected = departamentos.value.find((dep) => dep.code === selectedCountry.value?.code);
  selectedInfo.value = selected ? selected : null;
  console.log(selectedInfo.value);
};

const selectImage = (image) => {
  selectedImage.value = image;
};

const selectSede = (sede) => {
  selectedSede.value = sede;
};
const selectDepart = (departamentos) => {
  selectedDepart.value = sede;
};


const openModal = () => {
  isModalOpen.value = true;
};
</script>

<style scoped>
/* No additional CSS needed as everything is styled with Tailwind CSS */
</style>
