<template>
	<div
		v-if="uploadProgress > 0"
		class="uploaded-file mb-4 flex items-center p-2 bg-purple-100 rounded-lg w-2/4 ml-auto">
		<img src="@/assets/images/txt.svg" alt="TXT Icon" class="file-icon mr-2" />
		<div class="flex-1 text-customPurple">
			<p>{{ fileName }}</p>
			<div
				class="progress-bar mt-1 rounded-full h-2"
				:style="{ width: uploadProgress + '%' }"></div>
			<div v-if="isUploadComplete">
				<span class="text-customPurple font-bold">
					Archivo Subido Exitosamente
				</span>
			</div>
		</div>
		<span class="ml-4 font-semibold text-customPurple"
			>{{ intUploadProgress }}%</span
		>
		<img
			src="@/assets/images/CancelFile.svg"
			alt="X Icon"
			@click="cancelUploadFile"
			class="cursor-pointer w-6 h-6 ml-2" />
	</div>
</template>


<script setup>
import { computed, ref, watch } from "vue";
import { useFileNotificationStore } from "@/stores/fileNotification";
import { useToast } from "vue-toastification";

const toast = useToast();
const fileNotificationStore = useFileNotificationStore();
const uploadProgress = computed(() => fileNotificationStore.uploadProgress);
const intUploadProgress = computed(
	() => fileNotificationStore.intUploadProgress
);
const fetchController = computed(() => fileNotificationStore.fetchController);
const fileName = computed(() => fileNotificationStore.fileName);
const host = import.meta.env.VITE_HOST;

// Estado adicional para manejar el mensaje de éxito
const isUploadComplete = ref(false);

// Observador para actualizar `isUploadComplete` cuando el progreso sea 100%
watch(uploadProgress, (newProgress) => {
	if (newProgress === 100) {
		isUploadComplete.value = true;
		toast.success("El archivo fue subido exitosamente.", {
			timeout: 3000,
		});
	}
});

// Función para cancelar la subida del archivo
const cancelUploadFile = async () => {
	try {
		// Abortar la subida si hay un controlador activo
		if (fetchController.value) {
			fetchController.value.abort();
			toast.warning("La subida del archivo fue cancelada.", {
				timeout: 3000,
			});
		}

		// Reiniciar los valores en el store
		fileNotificationStore.setUploadProgress(0);
		fileNotificationStore.setFileName(null);
		fileNotificationStore.setFetchController(null);

		// Eliminar visualmente la barra de progreso
		isUploadComplete.value = false;

		// Intentar eliminar el archivo del servidor
		if (fileName.value) {
			await deleteFileFromServer();
		}
	} catch (error) {
		toast.error("No se pudo cancelar la subida.", {
			timeout: 3000,
		});
		console.error(error);
	}
};

// Función para eliminar el archivo del servidor
const deleteFileFromServer = async () => {
	try {
		const response = await fetch(`${host}:8081/api/delete/${fileName.value}`, {
			method: "POST",
		});
		if (!response.ok) {
			throw new Error(`Error al eliminar el archivo: ${response.statusText}`);
		}
		toast.success("El archivo fue eliminado del servidor.", { timeout: 3000 });
	} catch (error) {
		toast.error("No se pudo eliminar el archivo del servidor.", { timeout: 3000 });
		console.error(error);
	}
};
</script>


<style scoped>
.progress-bar {
	background-color: #005DCA;
}
</style>
