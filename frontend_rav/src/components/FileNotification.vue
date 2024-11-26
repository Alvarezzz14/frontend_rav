<template>
  <div v-if="uploadProgress > 0"  class="uploaded-file mb-4 flex items-center p-2 bg-purple-100 rounded-lg w-2/4 ml-auto">
    <img src="@/assets/images/txt.svg" alt="TXT Icon" class="file-icon mr-2" />
    <div class="flex-1 text-customPurple">
      <p>{{ fileName }}</p>
      <div class="progress-bar mt-1 rounded-full h-2" :style="{ width: uploadProgress + '%' }"></div>
    </div>
    <span class="ml-4 font-semibold text-customPurple">{{ intUploadProgress }}%</span>
    <img src="@/assets/images/CancelFile.svg" alt="X Icon" @click="cancelUploadFile">
  </div>
</template>

<script setup>
import {computed} from 'vue'
import { useFileNotificationStore } from '../stores/fileNotification';
const fileNotificationStore = useFileNotificationStore();
const uploadProgress = computed(() => fileNotificationStore.uploadProgress)
const intUploadProgress = computed(() => fileNotificationStore.intUploadProgress)
const fetchController = computed(() => fileNotificationStore.fetchController)
const fileName = computed(() => fileNotificationStore.fileName)

const cancelUploadFile = async () => {
  fetchController.value.abort();

  setTimeout(async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/delete/${fileName.value}`, {
        method: "POST"
      })
      const json = await response.json();

      if (!response.ok) throw { error: true, errStatus: response.status, errMsg: response.statusText }

      console.log(json);

    } catch (error) {
      if (!error.error) error.error = true
      console.log(error);
    }
  }, 7000)
}
</script>

<style scoped>
.progress-bar {
  background-color: #7A1F7E;
}
</style>
