<template>
	<div class="main-container">
		<!-- Título con icono (ARRIBA) -->
		<div class="header-section">
			<div class="icon-wrapper bg-azul-gradian">
				<img :src="download" alt="Icono download" class="header-icon" />
			</div>
			<h1 class="main-title text-azul2Ape">Carga de archivos</h1>
		</div>

		<!-- Contenedor principal con imagen y formulario -->
		<div class="content-wrapper">
			<!-- Sección de carga de archivo (IZQUIERDA) -->
			<div class="upload-card">
				<!-- Subtítulo -->
				<h2 class="title text-azul2Ape">Cargar archivo</h2>

				<h3 class="subtitle">Adjunta el archivo que deseas compartír</h3>

				<!-- Área de arrastrar y soltar -->
				<div
					v-if="isDesktop"
					class="upload-area"
					@drop="handleDrop"
					@dragover="handleDragOver">
					<!-- Estados de carga -->
					<div v-if="uploading" class="upload-state">
						<img
							:src="loadingGif"
							alt="Cargando..."
							class="state-image" />
						<p class="state-text">El archivo se esta cargando</p>
					</div>
					<div v-else-if="uploadSuccess" class="upload-state">
						<img :src="successImage" alt="Éxito" class="state-image" />
					</div>
					<div v-else class="upload-placeholder">
						<img
							src="@/assets/images/txt.svg"
							alt="TXT"
							class="file-icon" />
						<p class="drag-text">
							Arrastra y suelta el archivo .txt ó
						</p>
						<!-- Botón amarillo -->
						<button class="btn-search" @click="selectFile">Buscar</button>
						<!-- Input oculto -->
						<input
							type="file"
							ref="fileInput"
							class="file-input-hidden"
							@change="handleFileUpload"
							accept=".txt,.csv,.xlsx" />
					</div>
				</div>

				<!-- Mensaje para dispositivos no compatibles -->
				<div v-else class="mobile-warning">
					<p>
						Esta función solo está disponible desde un PC. Por favor, intenta
						desde un ordenador.
					</p>
				</div>

				<!-- Archivos cargados -->
				<div
					v-if="fileToUpload"
					class="file-info">
					<!-- Icono de archivo -->
					<img
						src="@/assets/images/txt.svg"
						alt="Archivo"
						class="file-info-icon" />
					<div class="file-info-details">
						<p class="file-name">{{ fileName }}</p>
					</div>
					<span class="file-progress">
						{{ intUploadProgress }}%
					</span>
				</div>

				<div v-if="fileToUpload" class="progress-container">
					<div
						class="progress-bar"
						:style="{ width: `${uploadProgress}%` }"></div>
				</div>
				
				<!-- Mensajes de error y éxito -->
				<p v-if="uploadError" class="message-error">
					Error al subir el archivo. Intenta nuevamente.
				</p>
				<p v-if="uploadSuccess" class="message-success">
					Archivo subido exitosamente.
				</p>

				<!-- Botón de subir archivo -->
				<button
					class="btn-upload"
					:disabled="!fileToUpload || uploading"
					@click="uploadFile">
					Subir archivo
				</button>
			</div>

			<!-- Imagen del ciudadano (DERECHA) -->
			<div class="citizen-image-container">
				<img :src="Ciudadano" alt="Ciudadano" class="citizen-image" />
			</div>
		</div>
	</div>
</template>
<script setup>
import Ciudadano from "@/assets/images/subirFichero/personaSubirFicheroMD.avif";
import TXT from "@/assets/images/txt.svg";
import download from "@/assets/images/download.svg";
import { useFileNotificationStore } from "../stores/fileNotification";
import { ref, onMounted, onUnmounted } from "vue";
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
/* Contenedor principal */
.main-container {
	min-height: 91vh;
	padding: 2rem 1rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

/* Header con icono y título */
.header-section {
	display: flex;
	align-items: center;
	gap: 12px;
	max-width: 1400px;
	width: 100%;
}

.icon-wrapper {
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	padding: 6px;
}

.header-icon {
	width: 18px;
	height: 18px;
	filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
		hue-rotate(0deg) brightness(100%) contrast(100%);
}

.main-title {
	font-family: 'Work Sans', sans-serif;
	font-weight: 700;
	font-size: 30px;
	line-height: 35px;
	margin: 0;
}

/* Wrapper del contenido */
.content-wrapper {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	gap: 7rem;
	max-width: 1400px;
	width: 100%;
}

/* Tarjeta de carga (IZQUIERDA) */
.upload-card {
	background: #ffffff;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	border-radius: 20px;
	padding: 0rem 2rem 1rem;
	width: 640px;
	max-width: 780px;
	position: relative;
	text-align: center;
}

/* título */
.title {
	font-family: 'Work Sans', sans-serif;
	font-weight: 700;
	font-size: 20px;
	line-height: 23px;
	text-align: center;
	margin-bottom: 1.5rem;
}


/* Subtítulo */
.subtitle {
	font-family: 'Work Sans', sans-serif;
	font-weight: 400;
	font-size: 16px;
	line-height: 23px;
	text-align: center;
	color: #5C5C5C;
	margin-bottom: 1.5rem;
}

/* Área de arrastrar y soltar */
.upload-area {
	background: rgba(0, 93, 202, 0.1);
	border: 2px dashed rgba(0, 93, 202, 1);
	border-radius: 20px;
	padding: 3rem 2rem;
	text-align: center;
	min-height: 241px;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* Estado de carga activo - Gradiente morado */
.upload-area:has(.upload-state) {
	background: linear-gradient(180deg, #005DCA 0%, #003B8A 100%);
	border: 2px dashed #005DCA;
	border-radius: 10px;
}

.upload-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
}

.state-image {
	width: 80px;
	height: 80px;
}

.state-text {
	font-family: 'Work Sans', sans-serif;
	font-weight: 700;
	font-size: 20px;
	line-height: 100%;
	text-align: center;
	color: #ffffff;
}

.upload-placeholder {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	width: 100%;
}

.file-icon {
	width: 64px;
	height: 64px;
}

.drag-text {
	font-family: 'Work Sans', sans-serif;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	color: #000000;
	margin: 0;
}

/* Botón Buscar (amarillo) */
.btn-search {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px;
	gap: 5px;
	min-width: 194.71px;
	height: 42px;
	background: #fdc300;
	border-radius: 30px;
	border: none;
	cursor: pointer;
	font-family: 'Work Sans', sans-serif;
	font-weight: 700;
	font-size: 20px;
	line-height: 23px;
	text-align: center;
	color: #002C4D;
	transition: all 0.3s ease;
}

.btn-search:hover {
	transform: scale(1.05);
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.file-input-hidden {
	display: none;
}

/* Mensaje para móviles */
.mobile-warning {
	text-align: center;
	color: #dc2626;
	padding: 2rem;
}

/* Información del archivo cargado */
.file-info {
	display: flex;
	align-items: center;
	padding: 0.75rem 1rem;
	background: rgba(0, 93, 202, 0.2);
	border-radius: 10px;
	margin-top: 1.5rem;
	box-shadow: 0px 4px 6.8px rgba(0, 0, 0, 0.25);
}

.file-info-icon {
	width: 40px;
	height: 40px;
	margin-right: 1rem;
}

.file-info-details {
	flex: 1;
}

.file-name {
	font-family: 'Work Sans', sans-serif;
	font-weight: 700;
	font-size: 14px;
	line-height: 16px;
	color: #000000;
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.file-progress {
	font-family: 'Work Sans', sans-serif;
	font-weight: 700;
	font-size: 14px;
	line-height: 16px;
	text-align: right;
	color: #000000;
	margin-left: 1rem;
}

/* Barra de progreso */
.progress-container {
	width: 100%;
	height: 12px;
	background: #ffffff;
	border-radius: 10px;
	overflow: hidden;
	margin-top: 0.5rem;
}

.progress-bar {
	height: 100%;
	background: #005DCA;
	border-radius: 10px;
	transition: width 0.3s ease;
}

/* Mensajes */
.message-error {
	text-align: center;
	color: #dc2626;
	margin-top: 1rem;
	font-family: 'Work Sans', sans-serif;
}

.message-success {
	text-align: center;
	color: #00aa00;
	margin-top: 1rem;
	font-family: 'Work Sans', sans-serif;
}

/* Botón Subir archivo (verde) */
.btn-upload {
	width: 200px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px;
	gap: 10px;
	background: #00aa00;
	border-radius: 30px;
	border: none;
	cursor: pointer;
	font-family: 'Work Sans', sans-serif;
	font-weight: 400;
	font-size: 20px;
	line-height: 23px;
	color: #ffffff;
	margin-top: 1.5rem;
	transition: all 0.3s ease;
}

.btn-upload:hover:not(:disabled) {
	background: #008800;
	transform: scale(1.02);
}

.btn-upload:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

/* Contenedor de imagen del ciudadano (DERECHA) */
.citizen-image-container {
	height: 700px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.citizen-image {
	height: 780px;
	object-fit: contain;
}

/* Responsive */
@media (max-width: 1200px) {
	.content-wrapper {
		flex-direction: column-reverse;
		gap: 2rem;
	}

	.citizen-image {
		max-width: 500px;
	}
}

@media (max-width: 768px) {
	.main-container {
		padding: 1rem 0.5rem;
	}

	.upload-card {
		padding: 1.5rem;
	}

	.main-title {
		font-size: 24px;
	}

	.subtitle {
		font-size: 18px;
	}

	.citizen-image {
		max-width: 350px;
	}
}
</style>
