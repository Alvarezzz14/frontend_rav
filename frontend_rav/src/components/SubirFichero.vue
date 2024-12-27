<template>
	<div>
		<div
			class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-1">
			<!-- Icono y Título -->
			<div class="flex items-center mb-4 md:mb-0">
				<div class="p-6 bg-customPurple rounded-full">
					<!-- Icono SVG -->
					<img :src="download" alt="Icono download" width="50" height="50" />
				</div>
				<div class="ml-4 text-center md:text-left">
					<p class="text-black mb-0 text-2xl md:text-3xl">Cargar</p>
					<h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">
						Archivo
					</h2>
				</div>
			</div>
		</div>
		<div
			class="flex flex-col xl:flex-row xl:items-start justify-center w-full max-w-7xl space-y-8 xl:space-y-0 xl:space-x-8">
			<!-- Imagen del ciudadano -->
			<img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />

			<!-- Sección de carga de archivo -->
			<div
				class="upload-section mt-8 w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-lg">
				<h2 class="text-2xl font-bold text-center mb-4 text-customPurple">
					Cargar Archivo
				</h2>
				<p class="text-center mb-2 text-customPurple">
					Adjunta el archivo que deseas compartir
				</p>

				<!-- Área de arrastrar y soltar -->
				<div
					v-if="isDesktop"
					class="upload-container p-8 border-dashed border-2 border-customPurple text-center rounded-lg"
					@drop="handleDrop"
					@dragover="handleDragOver">
					<!-- Estados de carga -->
					<div v-if="uploading">
						<img
							:src="loadingGif"
							alt="Cargando..."
							class="mx-auto w-20 h-20" />
						<p class="text-customPurple mt-4">Subiendo archivo...</p>
					</div>
					<div v-else-if="uploadSuccess">
						<img :src="successImage" alt="Éxito" class="mx-auto w-20 h-20" />
					</div>
					<div v-else>
						<img
							src="@/assets/images/txt.svg"
							alt="TXT"
							class="upload-icon mb-2 w-16 h-16 mx-auto" />
						<p class="text-customPurple mb-4">
							Arrastra y suelta el archivo aquí <br />
							o
						</p>
						<!-- Botón amarillo personalizado -->
						<Button
							label="Buscar"
							class="yellow-button mt-4"
							@click="selectFile" />
						<!-- Input oculto para selección de archivo -->
						<input
							type="file"
							ref="fileInput"
							class="hidden"
							@change="handleFileUpload"
							accept=".txt,.csv,.xlsx" />
					</div>
				</div>

				<!-- Mensaje para dispositivos no compatibles -->
				<div v-else class="text-center text-red-500">
					<p>
						Esta función solo está disponible desde un PC. Por favor, intenta
						desde un ordenador.
					</p>
				</div>

				<!-- Archivos cargados -->
				<div
					v-if="fileToUpload"
					class="uploaded-file mt-4 flex items-center p-2 bg-purple-100 rounded-lg shadow-md">
					<!-- Icono de archivo (cambiar según tipo de archivo si es necesario) -->
					<img
						src="@/assets/images/txt.svg"
						alt="Archivo"
						class="file-icon w-10 h-10 mr-4" />
					<div class="flex-1 text-customPurple">
						<p class="truncate font-medium">{{ fileName }}</p>
					</div>
					<span class="ml-4 font-semibold text-customPurple">
						{{ intUploadProgress }}%
					</span>
				</div>

				<div v-if="fileToUpload" class="progress-container mt-4">
					<div
						class="progress-bar"
						:style="{ width: `${uploadProgress}%` }"></div>
				</div>
				<!-- Mensajes de error y éxito -->
				<p v-if="uploadError" class="text-red-500 text-center mt-4">
					Error al subir el archivo. Intenta nuevamente.
				</p>
				<p v-if="uploadSuccess" class="text-green-500 text-center mt-4">
					Archivo subido exitosamente.
				</p>

				<!-- Botón de carga -->
				<Button
					label="Subir"
					class="purple-button mt-4 w-full"
					:disabled="!fileToUpload || uploading"
					@click="uploadFile" />
			</div>
		</div>
	</div>
</template>
<script setup>
import Ciudadano from "@/assets/images/cuidadanoflauta.svg";
import TXT from "@/assets/images/txt.svg";
import download from "@/assets/images/download.svg";
import { useFileNotificationStore } from "../stores/fileNotification";
import { ref, onMounted, onUnmounted } from "vue";
import Button from "primevue/button";
import * as XLSX from "xlsx";
import FetchService from "@/services/fetchService";
import loadingGif from "@/assets/images/subirFichero/EstadosCarga/gifjeep1.gif";
import successImage from "@/assets/images/subirFichero/EstadosCarga/SuccesedImg.svg";

// Variables y lógica para la carga de archivos
const uploadedFile = ref(null);
const backupPartsFile = [];
const fileNotificationStore = useFileNotificationStore();
const fetchController = new AbortController();
const fileName = ref("");
const fileToUpload = ref(null);
const uploadProgress = ref(0);
const intUploadProgress = ref(0);
let wifiErrorFetch = false;
let partsFile = 0;
const loading = ref(false);
const uploading = ref(false); // Controla el estado de carga
const uploadSuccess = ref(false);
const uploadError = ref(false);
const host = import.meta.env.VITE_HOST;
const fetchService = new FetchService();
let listener;
let canDeleteFile = false;
const isDesktop = ref(false); // Detecta si el dispositivo es un escrito

const acceptedFileTypes = [
	"text/plain",
	"text/csv",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]; // Tipos permitidos

// Detectar si el dispositivo es un PC
const detectDevice = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	isDesktop.value =
		!/(android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini)/i.test(
			userAgent
		);
};

const fetchOptions = {
	url: `${host}:8081/api/upload`,
	options: {
		method: "POST",
		headers: { Accept: "application/json" },
		signal: fetchController.signal,
	},
};
// Crear FormData
const createFormData = (archivoBlob, fileName) => {
	const formData = new FormData();
	formData.append("file", archivoBlob, fileName);
	return formData;
};
// Crear Blob
const createBlob = (newWorkBook, typeFile) => {
	let blob;
	switch (typeFile) {
		case "xlsx":
			blob = XLSX.write(newWorkBook, {
				bookType: typeFile,
				type: "array",
			});
			break;
		case "txt":
			blob = newWorkBook;
			break;
	}
	const archivoBlob = new Blob([blob], { type: "application/octet-stream" });
	return archivoBlob;
};
// Métodos para manejar la carga de archivos
const handleFileUpload = (event) => {
	const file = event.target.files[0];
	if (acceptedFileTypes.includes(file.type)) {
		fileToUpload.value = file;
		fileName.value = file.name;
		fileNotificationStore.setFileName(file.name);
		uploadProgress.value = 0;
	} else {
		alert("Por favor, selecciona un archivo válido (.txt).");
	}
};
const handleDrop = (event) => {
	const files = event.dataTransfer.files;
	if (files.length > 0) {
		const file = files[0];
		if (acceptedFileTypes.includes(file.type)) {
			fileToUpload.value = file;
			fileName.value = file.name;
			uploadProgress.value = 0;
		} else {
			alert("Por favor, selecciona un archivo válido (.txt).");
		}
	}
};
const handleDragOver = (event) => {
	event.preventDefault();
};
const selectFile = () => {
	document.querySelector('input[type="file"]').click();
};
const updateEventFileUpload = (bodyFetchOptions) => {
	const sizeMainFile = bodyFetchOptions.get("sizeMainFile");
	const sizePartFile = bodyFetchOptions.get("file").size;
	partsFile = window.Math.round(sizeMainFile / sizePartFile);
	if (uploadProgress.value < sizeMainFile) {
		uploadProgress.value = parseFloat(
			(uploadProgress.value + 100 / partsFile).toFixed(2)
		);
		intUploadProgress.value = window.Math.round(uploadProgress.value);
	}
	fileNotificationStore.setUploadProgress(uploadProgress.value);
};
const ReuploadFile = async () => {
	for (const formData of backupPartsFile) {
		const copyFetchOptions = {
			url: fetchOptions.url,
			options: {
				...fetchOptions.options,
				body: formData,
			},
		};
		await sendFile(copyFetchOptions);
	}
};

const deleteFile = async (options) => {
	const { url, fetchOptions } = options;

	await fetchService.post(url, {
		fetchOptions,
		success: (response) => console.log(response),
		error: (response) => console.log(response),
	});

	window.removeEventListener("online", listener);
};

const ConnectionWifi = (callback, parameter) => {
	listener = async () => await callback(parameter);
	window.addEventListener("online", listener);
};
async function sendFile(fetchOptions, chunkSize, totalSize, currentChunk) {
	let { url, options } = fetchOptions;
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error("Error al subir el archivo");
		}
		updateEventFileUpload(options.body);
		// Actualiza el progreso basado en la parte actual
		uploadProgress.value = Math.min(
			((currentChunk * chunkSize) / totalSize) * 100,
			100
		);
		intUploadProgress.value = Math.round(uploadProgress.value);
		console.log(
			`Parte ${currentChunk} subida exitosamente. Progreso actual: ${intUploadProgress.value}%`
		);
	} catch (err) {
		if (err instanceof TypeError && !navigator.onLine && canDeleteFile) {
			const fileName = fetchOptions.options.body.get("file").name;
			ConnectionWifi(deleteFile, {
				url: `${host}:8081/api/delete/${fileName}`,
				fetchOptions: {
					method: "POST",
					headers: {
						Accept: "application/json",
					},
				},
			});

			canDeleteFile = false;

			console.error(
				"Error: No internet connection no se pudo subir el archivo"
			);
		} else {
			console.error("Error al enviar el archivo:", err);
		}
		uploadError.value = true;
	}
}
const createPartsTxt = async (file, chunkSize = 10 * 1024 * 1024) => {
	canDeleteFile = true;
	let offset = 0;
	let partNumber = 1;
	const totalSize = file.size;
	while (offset < totalSize) {
		const chunk = file.slice(offset, offset + chunkSize);
		// Generar un nombre que incluya 'parte' y el número de la parte
		const chunkFileName = `${
			file.name.split(".")[0]
		}_parte${partNumber}.${file.name.split(".").pop()}`;
		const formData = new FormData();
		formData.append("file", chunk, chunkFileName);
		formData.append("sizeMainFile", totalSize);
		formData.append("chunkNumber", partNumber);
		const fetchOptionsChunk = {
			url: fetchOptions.url,
			options: {
				...fetchOptions.options,
				body: formData,
			},
		};
		// Envía el "chunky" y actualiza el progreso
		await sendFile(fetchOptionsChunk, chunk.size, totalSize, partNumber);
		offset += chunkSize;
		partNumber++;
	}
};
const createPartsExcel = async (file) => {
	const data = await file.arrayBuffer();
	const workBook = XLSX.read(data);
	for (const sheetName of workBook.SheetNames) {
		const workSheet = workBook.Sheets[sheetName];
		const txtData = XLSX.utils.sheet_to_csv(workSheet, {
			FS: "»",
			blankrows: false,
		});
		const blob = new Blob([txtData], { type: "text/plain" });
		createPartsTxt(blob);
	}
	alert("División y envío completados.");
};
const createParts = async (file) => {
	switch (file.type) {
		case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
		case "application/vnd.ms-excel":
			await createPartsExcel(file);
			break;
		case "text/plain":
			createPartsTxt(file);
			break;
		default:
			alert("Tipo de archivo no soportado.");
			break;
	}
};
// Advertencia al intentar abandonar la página
const showUnloadWarning = (event) => {
	const message = "¿Estás seguro de que deseas salir de esta página?";
	event.returnValue = message; // Para navegadores que usan `returnValue`
	return message; // Para compatibilidad con otros navegadores
};
onMounted(() => {
	detectDevice();
	window.addEventListener("beforeunload", showUnloadWarning);
});
onUnmounted(() => {
	window.removeEventListener("beforeunload", showUnloadWarning);
	window.addEventListener("online", async () => await callback());
});
// Funcion para deshabilitar el boton, una vez subido
const uploadFileFinal = async () => {
	if (!fileToUpload.value) return;
	console.log("Iniciando la carga del archivo."); // Log antes de empezar
	// Deshabilitar el botón al comenzar la carga
	uploading.value = true;
	uploadError.value = false; // Resetear el estado de error
	uploadSuccess.value = false; // Resetear el estado de éxito
	await createPartsTxt(fileToUpload.value);
	try {
		// Lógica de división y envío del archivo
		if (uploadProgress.value === 100) {
			console.log("Carga completada al 100%.");
			uploadSuccess.value = true; // Mostrar mensaje de éxito
		}
		// Reiniciar el estado al terminar exitosamente
		fileToUpload.value = null;
		fileName.value = "";
		uploadProgress.value = 0;
		intUploadProgress.value = 0;
	} catch (error) {
		console.error("Error durante la carga del archivo:", error);
		uploadError.value = true; // Mostrar mensaje de error
	} finally {
		// Habilitar el botón al finalizar (con éxito o error)
		uploading.value = false;
	}
};
const uploadFile = async () => {
	if (!fileToUpload.value) return;
	console.log("Iniciando la subida...");
	await uploadFileFinal();
};
</script>

<style scoped>
.text-customPurple {
	color: #7a1f7e;
}
.yellow-button {
	background-color: #fdc300 !important;
	color: #7a1f7e !important;
	font-weight: bold;
	border-radius: 12px;
	padding: 12px 24px;
	border: none;
	font-size: 1.25rem;
}
.purple-button {
	background-color: #7a1f7e !important;
	color: #fdc300 !important;
	font-weight: bold;
	border-radius: 12px;
	padding: 12px 24px;
	border: none;
	font-size: 1.25rem;
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
	background-color: #e0c8e0;
}
.progress-bar {
	background-color: #7a1f7e;
}
</style>
