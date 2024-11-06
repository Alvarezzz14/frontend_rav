<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow-md">
    <div class="flex flex-col lg:flex-row items-center justify-between mb-6">
      <div class="flex items-center">
        <div class="p-4">
          <svg width="148" height="153" viewBox="0 0 148 153" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M73.7941 141.112C110.968 141.112 141.104 110.893 141.104 73.6161C141.104 36.3391 110.968 6.12012 73.7941 6.12012C36.6201 6.12012 6.48462 36.3391 6.48462 73.6161C6.48462 110.893 36.6201 141.112 73.7941 141.112Z" fill="#741E78" />
            <path d="M119.569 96.0302V98.5412C118.784 102.969 115.671 106.434 111.205 107.28L49.3873 107.313C48.3773 110.887 45.6728 113.984 42.0836 115.081C41.4409 115.281 40.7481 115.298 40.1555 115.566C39.2957 115.499 38.3191 115.658 37.4761 115.566C29.5297 114.704 25.3645 105.187 29.8886 98.5496C35.1723 90.7988 46.8581 93.1592 49.3956 101.948H110.179C115.804 100.826 115.437 93.0671 109.619 92.4561L58.6608 92.4394C50.3221 91.5103 46.6995 81.056 52.9431 75.2136C54.1701 74.0669 57.175 72.5268 58.8528 72.5268H81.1226L68.4602 55.0081C60.2217 40.5947 71.1897 22.6742 87.8253 23.7623C103.184 24.7668 111.957 42.0762 104.085 55.301C99.7615 62.5747 93.2508 69.4047 88.7017 76.6365C88.2092 77.2476 87.5832 77.8251 86.7569 77.9088C77.9925 78.3608 68.6104 77.2978 59.9128 77.9004C54.0282 78.3106 53.4356 85.76 59.0281 87.049C76.4733 87.1913 93.9687 86.756 111.389 87.275C115.479 88.0032 119.102 91.8534 119.569 96.0134V96.0302ZM84.837 29.2029C73.7856 30.1822 67.4752 42.8295 73.1011 52.3296L86.1225 70.1078L86.5649 70.384L99.5612 52.3966C105.805 41.4903 97.441 28.0813 84.8287 29.2029H84.837ZM37.9685 99.3029C31.1657 100.224 32.2592 110.971 39.5127 110.176C46.4324 109.414 45.5059 98.2901 37.9685 99.3029Z" fill="white" />
            <path d="M86.2475 36.2171C96.8482 36.0497 97.0068 52.3547 86.3978 52.3631C75.7637 52.3715 75.7637 36.3845 86.2475 36.2171ZM86.2392 41.5907C82.6917 41.7414 82.7501 47.6005 87.0989 46.8974C87.8919 46.7718 88.8518 45.6168 88.977 44.8383C89.2358 43.1894 87.9837 41.5238 86.2392 41.5991V41.5907Z" fill="white" />
          </svg>
        </div>
        <div class="ml-4 text-center lg:text-left">
          <p class="text-black mb-0 text-2xl">Perfil de</p>
          <h2 class="text-customPurple text-5xl mt-0 font-bold">Ciudadano</h2>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="flex-1">
        <label class="block text-customPurple mb-2">TIPO DE DOCUMENTO:</label>
        <p class="text-black mb-4">{{ userInfo.tipo_documento || "NO REGISTRA" }}</p>

        <label class="block text-customPurple mb-2">NOMBRE COMPLETO:</label>
        <p class="text-black mb-4">{{ userInfo.nombrecompleto || "NO REGISTRA" }}</p>

        <label class="block text-customPurple mb-2">CIUDAD:</label>
        <p class="text-black mb-4">{{ userInfo.ciudad || "NO REGISTRA" }}</p>

        <label class="block text-customPurple mb-2">GENERO:</label>
        <p class="text-black mb-4">{{ userInfo.genero || "NO REGISTRA" }}</p>

        <label class="block text-customPurple mb-2">ID HOGAR:</label>
        <p class="text-black">{{ userInfo.id_hogar || "NO REGISTRA" }}</p>
      </div>
      <div class="flex-1">
        <label class="block text-customPurple mb-2">NÚMERO DE DOCUMENTO:</label>
        <p class="text-black mb-4">{{ userInfo.documento || "NO REGISTRA" }}</p>

        <label class="block text-customPurple mb-2">PROCEDENCIA ÉTNICA:</label>
        <p class="text-black mb-4">{{ userInfo.pertenenciaetnica || "NO REGISTRA" }}</p>

        <label class="block text-customPurple mb-2">ESTADO VICTIMA:</label>
        <p class="text-black mb-4">{{ userInfo.estadovictima || "NO REGISTRA" }}</p>

        <label class="block text-customPurple mb-2">HECHO:</label>
        <p class="text-black mb-4">{{ userInfo.hecho || "NO REGISTRA" }}</p>

        <label class="block text-customPurple mb-2">NÚMERO DE CONTACTO:</label>
        <p class="text-black">{{ userInfo.numtelefonocelular || "NO REGISTRA" }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useEventStore } from "@/stores/storedataOff.js";

const route = useRoute();

const eventStore = useEventStore();
const userInfo = ref({})
onMounted( () => {
  const info = route.params.userInfo;
//  const results = await eventStore.searchByCedula(cedula);
  
  userInfo.value = eventStore.userInfo
  console.log(userInfo.value)
  console.log(userInfo.value.nombrecompleto)
  /*if (results.length > 0) {
    userData.value = results[0];
  } else {
    console.error(`No se encontró usuario con el número de documento: ${cedula}`);
  }*/
});

</script>
