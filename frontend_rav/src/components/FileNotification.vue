<template>
    <!-- <Teleport to="body"> -->
        <div v-if="uploadProgress > 0"  class="uploaded-file mb-4 flex items-center p-2 bg-purple-100 rounded-lg w-2/4">
                <img src="@/assets/images/excel-Logo.svg" alt="Excel Icon" class="file-icon mr-2" />
                <div class="flex-1 text-azulBarraApe">
                  <p>{{ fileName }}</p>
                  <div class="progress-bar mt-1 rounded-full h-2" :style="{ width: uploadProgress + '%' }"></div>
                </div>
                <span class="ml-4 font-semibold text-azulBarraApe">{{ intUploadProgress }}%</span>
              </div>
    <!-- </Teleport> -->

</template>

<script setup>
import {computed} from 'vue'
import { useFileNotificationStore } from '../stores/fileNotification';
const fileNotificationStore = useFileNotificationStore();
const uploadProgress = computed(()=> fileNotificationStore.uploadProgress)
const intUploadProgress = computed(()=> fileNotificationStore.intUploadProgress)






</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
