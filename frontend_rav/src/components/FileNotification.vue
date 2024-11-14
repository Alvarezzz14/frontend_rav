<template>
<div v-if="fileToUpload" class="uploaded-file mt-4 flex items-center p-2 bg-purple-100 rounded-lg">
        <img src="@/assets/images/excel-Logo.svg" alt="Excel Icon" class="file-icon mr-2" />
        <div class="flex-1 text-customPurple">
          <p>{{ fileName }}</p>
          <div class="progress-bar mt-1 rounded-full h-2" :style="{ width: uploadProgress + '%' }"></div>
        </div>
        <span class="ml-4 font-semibold text-customPurple">{{ intUploadProgress }}%</span>
      </div>

</template>

<script setup>
import {ref,computed} from 'vue'
import { useFileNotificationStore, useFileNotificationStore } from '../stores/fileNotification';
const useFileNotificationStore = useFileNotificationStore();
const uploadProgress = ref(useFileNotificationStore.uploadProgress.value);
const intUploadProgress = ref(useFileNotificationStore.intUploadProgress.value);



</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
