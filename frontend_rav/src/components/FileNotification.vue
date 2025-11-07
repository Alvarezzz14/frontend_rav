<template>
	<div
		class="fixed z-50 transition-all duration-700 ease-in-out"
		:style="fileNotificationStyle"
	>
		<div
			:class="[
				'relative w-full h-full rounded-[5px] flex flex-col justify-center items-center',
				expanded
					? 'border border-[#9747FF] shadow-[0_4px_6.8px_rgba(0,0,0,0.25)] bg-[#005DCA]'
					: 'bg-transparent border-none shadow-none'
			]"
		>
			<!-- Botón expandir/contraer en modo expandido se gestiona desde el grupo de acciones -->

			<!-- Vista contraída: pill completo 70x50 con icono centrado -->
			<div v-if="!expanded" class="w-full h-full relative">
				<div class="absolute inset-0 bg-[#005DCA] shadow-[0_4px_12px_rgba(0,0,0,0.25)] rounded-[5px]"></div>
				<div class="absolute inset-0 flex items-center justify-between px-2">
					<!-- Icono TXT a la izquierda -->
					<div class="flex items-center justify-center">
						<TxtIcon :width="18" :height="20" color="#FFFFFF" />
					</div>
					<!-- Botón expandir/contraer a la derecha, sin borde -->
					<button
						@click="toggleExpand"
						class="z-10 w-[20.55px] h-[21.34px] p-0 rounded-full bg-white border-none flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.25)] cursor-pointer"
						aria-label="Expandir"
					>
						<CollapseIcon :width="20.55" :height="21.34" :rotated="false" />
					</button>
				</div>
			</div>

			<!-- Vista expandida: layout absoluto estilo Figma -->
			<div v-else class="absolute inset-0">
				<!-- Fondo ya proviene del contenedor; aquí posicionamos elementos internos -->
				<!-- Icono TXT a la izquierda (sin fondo, mismo tamaño que contraído) -->
				<div class="absolute" :style="{ left: '4.29%', top: '26%', width: '18px', height: '20px' }">
					<TxtIcon :width="18" :height="20" color="#FFFFFF" />
				</div>

				<!-- Nombre del archivo (truncar para que no se monte con el porcentaje) -->
				<p
					class="font-work-sans font-bold text-[14px] m-0 leading-[16px] text-white absolute truncate"
					:style="{ left: '16.07%', right: '45%', top: '22%' }"
					:title="fileName || 'Sin archivo'"
				>
					{{ fileName || 'Sin archivo' }}
				</p>

				<!-- Porcentaje (alineado a la derecha) -->
				<span class="font-work-sans font-bold text-[14px] leading-[16px] text-white absolute text-right" :style="{ left: '51.43%', right: '33.57%', top: '22%' }">{{ intUploadProgress }}%</span>

				<!-- Barra de progreso (track + fill) -->
				<div class="absolute bg-white rounded-[10px] overflow-hidden" :style="{ left: '16.43%', right: '33.57%', top: '62%', height: '6px' }">
					<div class="h-full bg-[#002C4D] rounded-[10px]" :style="{ width: uploadProgress + '%' }"></div>
				</div>

				<!-- Botón Refresh -->
				<button type="button" @click="handleRefresh" class="absolute rounded-full p-0 bg-white border-none flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.25)]" :style="{ left: '68.57%', top: '28%', width: '21px', height: '21px' }" aria-label="Refrescar">
					<RefreshIcon :width="17" :height="14" />
				</button>
				<!-- Botón Delete -->
				<button type="button" @click="onDeleteSelectedFile" class="absolute rounded-full p-0 bg-white border-none flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.25)]" :style="{ left: '78.93%', top: '28.08%', width: '21px', height: '21px' }" aria-label="Eliminar">
					<DeleteIcon :width="15" :height="16" color="#005DCA" />
				</button>
				<!-- Botón Contraer -->
				<button type="button" @click="toggleExpand" class="absolute rounded-full bg-white p-0 border-none flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.25)]" :style="{ left: '89.29%', top: '28%', width: '20.55px', height: '21.34px' }" aria-label="Contraer">
					<CollapseIcon :width="20.55" :height="21.34" :rotated="true" />
				</button>

				<!-- Mensaje éxito -->
				<!-- <div v-if="isUploadComplete" class="absolute" :style="{ left: '16%', top: '68%' }">
					<span class="text-white font-bold text-[12px]">Archivo Subido Exitosamente</span>
				</div> -->
			</div>
		</div>
	</div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import { useUiStore } from '@/stores/ui';
import TxtIcon from "@/components/Icons/TxtIcon.vue";
import RefreshIcon from "@/components/Icons/RefreshIcon.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";
import CollapseIcon from "@/components/Icons/CollapseIcon.vue";
// Si usas vue-toastification, descomenta estas dos líneas y asegúrate de tenerlo instalado/configurado
// import { useToast } from "vue-toastification";
// const toast = useToast();
import { useFileNotificationStore } from "@/stores/fileNotification";
const fileNotificationStore = useFileNotificationStore();
const uploadProgress = computed(() => fileNotificationStore.uploadProgress);
const fetchController = computed(() => fileNotificationStore.fetchController);
const fileName = computed(() => fileNotificationStore.fileName);
const host = import.meta.env.VITE_HOST;

// Estado adicional para manejar el mensaje de éxito
const isUploadComplete = ref(false);

// Store UI para saber si Activity está expandido
const uiStore = useUiStore();

// Estado de expandir/contraer
const expanded = ref(false);
const toggleExpand = () => {
	expanded.value = !expanded.value;
};

// Estilo reactivo para mover el FileNotification si Activity está expandido
const fileNotificationStyle = computed(() => ({
	width: expanded.value ? '280px' : '70px',
	height: '50px',
	right: uiStore.isActivityExpanded ? '320px' : '6rem', // 6rem ≈ right-24
}));

// Estado de colapso de la barra de progreso (como en SubirFichero)
const collapsed = ref(false);
const toggleCollapse = () => {
	collapsed.value = !collapsed.value;
};

// Progreso entero (redondeado) para mostrar en UI
const intUploadProgress = computed(() => Math.round(uploadProgress.value || 0));

// Observador para actualizar `isUploadComplete` cuando el progreso sea 100%
watch(uploadProgress, (newProgress) => {
	if (newProgress === 100) {
		isUploadComplete.value = true;
		if (typeof toast !== "undefined") {
			toast.success("El archivo fue subido exitosamente.", {
				timeout: 3000,
			});
		}
	}
});

// Función para cancelar la subida del archivo
const cancelUploadFile = async () => {
	try {
		// Abortar la subida si hay un controlador activo
		if (fetchController.value) {
			fetchController.value.abort();
			if (typeof toast !== "undefined") {
				toast.warning("La subida del archivo fue cancelada.", {
					timeout: 3000,
				});
			}
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
		if (typeof toast !== "undefined") {
			toast.error("No se pudo cancelar la subida.", {
				timeout: 3000,
			});
		}
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
		if (typeof toast !== "undefined") {
			toast.success("El archivo fue eliminado del servidor.", { timeout: 3000 });
		}
	} catch (error) {
		if (typeof toast !== "undefined") {
			toast.error("No se pudo eliminar el archivo del servidor.", { timeout: 3000 });
		}
		console.error(error);
	}
};

// Handlers estilo SubirFichero
const handleRefresh = () => {
	// Reinicia solo el progreso, conserva el nombre de archivo
	fileNotificationStore.setUploadProgress(0);
	isUploadComplete.value = false;
};

const onDeleteSelectedFile = async () => {
	// Si hay una subida en curso, aborta
	if (fetchController.value) {
		try { fetchController.value.abort(); } catch (_) {}
	}
	// Si hay archivo en servidor, intenta eliminarlo
	if (fileName.value) {
		try { await deleteFileFromServer(); } catch (_) {}
	}
	// Limpia estado global y local
	fileNotificationStore.setUploadProgress(0);
	fileNotificationStore.setFileName(null);
	fileNotificationStore.setFetchController(null);
	isUploadComplete.value = false;
	collapsed.value = false;
};
</script>


<style scoped>
.progress-bar {
	background-color: #005DCA;
}
</style>
