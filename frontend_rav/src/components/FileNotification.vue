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
			@click="cancelUploadFile" />
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
		fetchController.value.abort();
		toast.warning("La subida del archivo fue cancelada.", {
			timeout: 3000,
		});

		fileNotificationStore.setUploadProgress(0);
		fileNotificationStore.setFileName(null);
		fileNotificationStore.setFetchController(null);

		setTimeout(async () => {
			try {
				const response = await fetch(
					`http://localhost:8081/api/delete/${fileName.value}`,
					{
						method: "POST",
					}
				);
				const json = await response.json();

				if (!response.ok) throw new Error(`Error: ${response.statusText}`);

				toast.success("El archivo fue subido Exitosamente.", {
					timeout: 3000,
				});
			} catch (error) {
				toast.error("Hubo un problema al subir el archivo del servidor.", {
					timeout: 3000,
				});
				console.error(error);
			}
		}, 7000);
	} catch (error) {
		toast.error("No se pudo cancelar la subida.", {
			timeout: 3000,
		});
		console.error(error);
	}
};
</script>

<style scoped>
.progress-bar {
	background-color: #7a1f7e;
}
</style>
