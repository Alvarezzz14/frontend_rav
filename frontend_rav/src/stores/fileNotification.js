import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFileNotificationStore = defineStore('fileNotification', () => {
  const uploadProgress = ref(0)
  const intUploadProgress = ref(0)
  const fetchController = ref(null);
  const fileName = ref("");
  
  const setIntUploadProgress = (newUploadProgress) => {
    intUploadProgress.value = window.Math.round(newUploadProgress)
};
  const setUploadProgress = (newUploadProgress) => {
    uploadProgress.value = newUploadProgress
    setIntUploadProgress(newUploadProgress);
}

const setFetchController = (newFetchController) => fetchController.value = newFetchController;

const setFileName  = (newFileName) => fileName.value = newFileName


return {uploadProgress,intUploadProgress,fetchController,fileName,setUploadProgress,setFetchController,setFileName};
})


