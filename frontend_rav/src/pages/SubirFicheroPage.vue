<template>
  <div class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
    <!-- Sección de búsqueda -->
    <div class="lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0">
      <img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />
    </div>

    <!-- Sección de carga de archivos -->
    <div class="upload-section mt-8 w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-4 text-customPurple">Cargar Archivo</h2>
      <p class="text-center mb-2 text-customPurple">Adjunta el archivo que deseas compartir</p>
      <br>
      <div
        class="upload-container p-8 border-dashed border-2 border-customPurple text-center rounded-lg"
        @drop.prevent="handleFileDrop"
        @dragover.prevent
      >
        <img src="@/assets/images/download.svg" alt="Upload Icon" class="upload-icon mb-2" />
        <p class="text-customPurple">Arrastra y suelta el archivo <br /> o</p>
        <!-- Botón de color amarillo -->
        <Button label="Buscar" class="yellow-button mt-4" @click="selectFile" />
        <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
      </div>

    <!-- Archivos cargados -->
    <div v-if="uploadedFile" class="uploaded-file mt-4 flex items-center p-2 bg-purple-100 rounded-lg">
      <img src="@/assets/images/excel-Logo.svg" alt="Excel Icon" class="file-icon mr-2" />
      <div class="flex-1 text-customPurple">
        <p>{{ uploadedFile.name }}</p>
        <div class="progress-bar mt-1 rounded-full h-2" :style="{ width: uploadProgress + '%' }"></div>
      </div>
      <span class="ml-4 font-semibold text-customPurple">{{ uploadProgress }}%</span>
    </div>
      

      <!-- Botón de color morado -->
      <Button label="Subir" class="purple-button mt-4 w-full" @click="uploadFile" />
    </div>
  </div>
</template>

<script setup>
import Ciudadano from '@/assets/images/cuidadanoflauta.svg';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useEventStore } from '@/stores/storedataOff.js';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

// Variables y lógica para la carga de archivos
const uploadedFile = ref(null);
const uploadProgress = ref(0);

const handleFileUpload = (event) => {
  uploadedFile.value = event.target.files[0];
  uploadProgress.value = 0;
};

const handleFileDrop = (event) => {
  uploadedFile.value = event.dataTransfer.files[0];
  uploadProgress.value = 0;
};

const selectFile = () => {
  document.querySelector('input[type="file"]').click();
};

const uploadFile = () => {
  if (!uploadedFile.value) return;

  // Simulación de progreso de carga
  uploadProgress.value = 0;
  const interval = setInterval(() => {
    if (uploadProgress.value < 100) {
      uploadProgress.value += 10;
    } else {
      clearInterval(interval);
    }
  }, 200);
};
</script>

<style scoped>
.text-customPurple {
  color: #7A1F7E;
}
.yellow-button {
  background-color: #FDC300 !important;
  color: #7A1F7E !important;
  font-weight: bold;
  border-radius: 12px;
  padding: 12px 24px;
  border: none;
  font-size: 1.25rem; /* Tamaño de letra similar al de la imagen */
}
.purple-button {
  background-color: #7A1F7E !important;
  color: #FDC300 !important;
  font-weight: bold;
  border-radius: 12px;
  padding: 12px 24px;
  border: none;
  font-size: 1.25rem;
}
.main-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.upload-container {
  background-color: #f8e6fb;
}
.upload-icon {
  width: 50px;
  height: auto;
  margin-bottom: 10px;
}

.uploaded-file {
  background-color: #E0C8E0; /* Tono morado claro */
}
.progress-bar {
  background-color: #7A1F7E; /* Tono morado oscuro para la barra de progreso */
}
</style>


