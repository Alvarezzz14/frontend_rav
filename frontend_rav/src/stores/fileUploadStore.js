// stores/fileUploadStore.js
import { defineStore } from 'pinia';

export const useFileUploadStore = defineStore('fileUpload', {
    state: () => ({
        uploadProgress: 0, // Progreso de la carga
        isUploading: false, // Estado de si está subiendo
        fileName: '', // Nombre del archivo
        uploadSuccess: false, // Estado de éxito de carga
        uploadError: false, // Estado de error de carga
    }),
    actions: {
        setProgress(progress) {
            this.uploadProgress = progress;
        },
        setIsUploading(isUploading) {
            this.isUploading = isUploading;
        },
        setFileName(name) {
            this.fileName = name;
        },
        setUploadSuccess(status) {
            this.uploadSuccess = status;
        },
        setUploadError(status) {
            this.uploadError = status;
        },
    },
});
