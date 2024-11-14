import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFileNotificationStore = defineStore('fileNotification', () => {
  const uploadProgress = ref(0)
  const intUploadProgress = ref(0)
  
  const setIntUploadProgress = (newUploadProgress) => {
    intUploadProgress.value = window.Math.round(newUploadProgress)
};
  const setUploadProgress = (newUploadProgress) => {
    uploadProgress.value = newUploadProgress
    setIntUploadProgress(newUploadProgress);
}

return {uploadProgress,intUploadProgress,setUploadProgress};
})


