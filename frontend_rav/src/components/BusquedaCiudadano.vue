<template>
  <div
    class="absolute left-[245px] top-[52px] flex flex-row items-center gap-3 w-[698px] h-[41px]"
  >
    <!-- Group 1322 - Icono de Búsqueda con círculo morado -->
    <div class="relative w-[30px] h-[29.93px] flex-none">
      <!-- Círculo morado de fondo -->
      <div
        class="absolute inset-0 w-[30px] h-[29.93px] bg-[#71277A] rounded-full"
      ></div>
      <!-- Icono blanco centrado, tamaño 16.5x16.5px -->
      <div class="absolute inset-0 flex items-center justify-center">
        <IconSearch :size="16.5" color="white" class="w-[16.5px] h-[16.5px]" />
      </div>
    </div>

    <!-- Texto "Búsqueda del ciudadano" -->
    <h1
      class="w-[607px] h-[41px] font-work-sans font-bold text-[30px] leading-[35px] text-[#71277A] flex-none"
    >
      Búsqueda del ciudadano
    </h1>
  </div>
  <div class="relative">
    <!-- Frame 620 - Título con icono de Búsqueda -->

    <div class="flex flex-col lg:flex-row-reverse items-center mt-8">
      <div class="-mt-44 lg:w-full lg:mx-14">
        <!-- Titulo-->
        <p
          class="text-center lg:text-left font-medium text-[32px] leading-[38px]"
        >
          Aquí podrás visualizar información acerca de la
        </p>

        <h2
          class="text-center lg:text-left -mt-5 font-bold text-customPurple text-[80px] leading-[75px]"
        >
          Ruta de Orientación a Víctimas.
        </h2>

        <!-- Rectangle 117 - Formulario de búsqueda -->
        <div
          class="absolute left-[723px] top-[460px] w-[785px] h-[197px] bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.1)] rounded-[20px] flex flex-col items-center justify-center gap-4 p-6"
        >
          <!-- Selector de tipo de documento -->
          <div class="relative w-[750px] h-10">
            <RavSelect
              v-model="documentType"
              :options="documentTypes"
              placeholder="Seleccione tipo de documento"
              :showImage="false"
              :withShadow="false"
              bgColor="#F2F3F3"
              inputClass="w-[750px] h-10"
              overlayWidth="750px"
              :overlayPaddingTop="'30px'"
            />
          </div>

          <!-- Group 1350 - Input y botón -->
          <div class="flex flex-col items-end gap-4 w-[750px]">
            <!-- Rectangle 118 - Input de documento -->
            <input
              v-model="searchCedula"
              @keydown.enter="searchUser"
              type="text"
              placeholder="Digite el documento de identificación"
              class="w-full h-10 bg-[#F2F3F3] rounded-[20px] border-none font-work-sans font-normal text-[18px] leading-[21px] text-black px-4 placeholder:text-black"
            />

            <!-- Frame 1398 - Botón Buscar -->
            <Button
              type="button"
              :loading="loading"
              @click="searchUser"
              class="w-[220px] h-10 !bg-[#00AA00] !border-none !rounded-full flex flex-row justify-center items-center gap-2.5 p-2.5 !text-white !font-work-sans !font-normal !text-[20px] !leading-[23px]"
            >
              <svg
                v-if="!loading"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="flex-none"
              >
                <path
                  d="M8 2C4.686 2 2 4.686 2 8C2 11.314 4.686 14 8 14C9.336 14 10.576 13.566 11.584 12.832L16.376 17.624C16.566 17.814 16.784 17.91 17.032 17.91C17.532 17.91 17.91 17.532 17.91 17.032C17.11 16.784 17.814 16.566 17.624 16.376L12.832 11.584C13.566 10.576 14 9.336 14 8C14 4.686 11.314 2 8 2ZM8 3.5C10.486 3.5 12.5 5.514 12.5 8C12.5 10.486 10.486 12.5 8 12.5C5.514 12.5 3.5 10.486 3.5 8C3.5 5.514 5.514 3.5 8 3.5Z"
                  fill="white"
                />
              </svg>
              <span v-if="!loading">Buscar</span>
            </Button>
          </div>
        </div>
      </div>
      <!-- Imagen Ciudadano-->
      <div class="relative mt-10 flex justify-center">
        <!-- Imagen -->
        <img
          :src="Ciudadano"
          alt="Ciudadano"
          class="object-cover w-5/6 lg:w-auto"
        />

        <!-- Contenedor con el botón encima -->
        <div class="absolute top-52 lg:hidden flex items-center justify-center">
          <div class="w-80 bg-white p-4 rounded-2xl shadow-custom">
            <RavSelect
              v-model="documentType"
              :options="documentTypes"
              placeholder="Seleccione tipo de documento"
              :showImage="false"
              :withShadow="false"
              bgColor="#F2F3F3"
              inputClass="w-72 h-10 text-xs"
              overlayWidth="288px"
            />
            <div class="flex flex-col items-center">
              <input
                v-model="searchCedula"
                @keydown.enter="searchUser"
                type="text"
                placeholder="Digite el Documento de Identificación"
                class="w-72 h-10 border text-center text-black text-xs border-none bg-grisInput rounded-md"
              />
              <Button
                type="button"
                label="Buscar"
                :loading="loading"
                class="mt-3 w-72 h-10 text-base !hover:bg-purple-600 !border-none !bg-customPurple !text-amarillo"
                @click="searchUser"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      v-model:visible="noResultsModal"
      modal
      header="Búsqueda Fallida"
      :style="{ width: '30rem' }"
    >
      <p class="m-0 text-customPurple">
        {{ modalMessage }}
        <strong>{{ searchCedula }}</strong>
      </p>
      <template #footer>
        <Button
          label="Cerrar"
          @click="noResultsModal = false"
          class="p-button-text"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import Ciudadano from "@/assets/images/BusquedaCiudadano/personaBusquedaCiudadano.png";
import IconSearch from "@/components/Icons/IconSearch.vue";
import RavSelect from "@/components/Inputs/RavSelect.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useEventStore } from "@/stores/storedataOff.js";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import axios from "axios";

const searchCedula = ref("");
const noResultsModal = ref(false);
const modalMessage = ref("");
const loading = ref(false);
const documentType = ref("");
const documentTypes = [
  "Cédula de Ciudadanía",
  "Tarjeta de Identidad",
  "Cédula de Extranjería",
  "Pasaporte",
  "Permiso de Protección Temporal (PPT)",
  "Registro Civil",
  "NIT",
];
const router = useRouter();
const eventStore = useEventStore();
const host = import.meta.env.VITE_HOST;

async function searchByCedula(cedula) {
  try {
    const response = await axios.get(`${host}:8082/api/v1/victimas/${cedula}`);
    return response.data; // Aquí accedemos directamente a los datos JSON
  } catch (error) {
    console.error("Error al buscar eventos por cédula:", error);
    return [];
  }
}

const searchUser = async () => {
  if (!searchCedula.value.trim()) {
    noResultsModal.value = true;
    modalMessage.value = "Por favor, ingrese un número de documento.";
    return;
  }
  eventStore.deleteUserInfo();

  loading.value = true;
  const results = await searchByCedula(searchCedula.value);

  console.log(results);
  if (Object.keys(results).length > 0) {
    eventStore.setUserInfo(results);
    router.push({
      name: "PerfilCiudadanoPage",
      params: { userInfo: results },
    });
  } else {
    noResultsModal.value = true;
    modalMessage.value = `No se encontraron resultados con la cédula:`;
  }

  loading.value = false;
};
</script>

<style scoped>
/* Estilos específicos de esta vista. El estilo del select proviene de RavSelect */
</style>
