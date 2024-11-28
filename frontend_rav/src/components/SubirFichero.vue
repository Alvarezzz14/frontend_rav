<template>
	<div>
		<!-- Sección Principal -->
		<div
			class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-1">
			<div class="flex items-center mb-4 md:mb-0">
				<div class="p-6 bg-customPurple rounded-full">
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

		<!-- Sección de Carga de Archivos -->
		<div
			class="flex flex-col xl:flex-row xl:items-start justify-center w-full max-w-7xl space-y-8 xl:space-y-0 xl:space-x-8">
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
					class="upload-container p-8 border-dashed border-2 border-customPurple text-center rounded-lg"
					@drop="handleDrop"
					@dragover="handleDragOver">
					<img
						src="@/assets/images/txt.svg"
						alt="TXT"
						class="upload-icon mb-2 w-16 h-16 mx-auto" />
					<p class="text-customPurple mb-4">
						Arrastra y suelta el archivo aquí <br />
						o
					</p>
					<Button
						label="Buscar"
						class="yellow-button mt-4"
						@click="selectFile" />
					<!-- Input de tipo file oculto -->
					<input
						type="file"
						ref="fileInput"
						class="hidden"
						@change="handleFileUpload"
						accept=".txt,.csv,.xlsx" />
				</div>

				<!-- Archivos cargados -->
				<div
					v-if="fileName"
					class="uploaded-file mt-4 flex items-center p-2 bg-purple-100 rounded-lg shadow-md">
					<img
						src="@/assets/images/txt.svg"
						alt="Archivo"
						class="file-icon w-10 h-10 mr-4" />
					<div class="flex-1 text-customPurple">
						<p class="truncate font-medium">{{ fileName }}</p>
					</div>
					<span class="ml-4 font-semibold text-customPurple">
						{{ uploadProgress }}%
					</span>
				</div>

				<!-- Mensajes de error y éxito -->
				<p v-if="uploadError" class="text-red-500 text-center mt-4">
					Error al subir el archivo. Intenta nuevamente.
				</p>
				<p v-if="uploadSuccess" class="text-green-500 text-center mt-4">
					Subida completada con éxito.
				</p>

				<!-- Botón de carga -->
				<Button
					label="Subir"
					class="purple-button mt-4 w-full"
					:disabled="!fileToUpload || uploading"
					@click="uploadFile" />
			</div>
			<img :src="Ciudadano" alt="Ciudadano" class="h-96 w-96 object-contain" />
		</div>
	</div>
</template>

<script setup>
import { useFileUploadStore } from "../stores/fileUploadStore"; // Importa el store
import Ciudadano from "@/assets/images/cuidadanoflauta.svg";
import download from "@/assets/images/download.svg";
import Button from "primevue/button";
import { ref } from "vue";

const fileUploadStore = useFileUploadStore(); // Usar Pinia store

const fileName = ref("");
const fileToUpload = ref(null);
const uploadProgress = ref(0); // Se usa para mostrar el progreso de carga
const uploadError = ref(false);
const uploadSuccess = ref(false);
const uploading = ref(false);

const acceptedFileTypes = [
	"text/plain",
	"text/csv",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]; // Tipos permitidos

const fileInput = ref(null);
// Función para activar el input de tipo file al hacer clic en el botón
const selectFile = () => {
	fileInput.value.click();
};

const handleFileUpload = (event) => {
	const file = event.target.files[0];
	if (acceptedFileTypes.includes(file.type)) {
		fileToUpload.value = file;
		fileName.value = file.name;
	} else {
		alert("Por favor, selecciona un archivo válido.");
	}
};

const handleDrop = (event) => {
	const files = event.dataTransfer.files;
	if (files.length > 0) {
		const file = files[0];
		if (acceptedFileTypes.includes(file.type)) {
			fileToUpload.value = file;
			fileName.value = file.name;
		} else {
			alert("Por favor, selecciona un archivo válido.");
		}
	}
};

const handleDragOver = (event) => {
	event.preventDefault();
};

const uploadFile = async () => {
	if (fileToUpload.value) {
		const chunkSize = 250 * 1024 * 1024; // Tamaño del chunk (250MB por ejemplo)
		let offset = 0;
		const file = fileToUpload.value;
		const totalChunks = Math.ceil(file.size / chunkSize); // Total de chunks

		uploadProgress.value = 0; // Resetear el progreso antes de empezar

		// Iterar sobre los chunks y enviarlos
		while (offset < file.size) {
			const chunk = file.slice(offset, offset + chunkSize);
			const formData = new FormData();
			formData.append("file", chunk, file.name);
			formData.append("totalChunks", totalChunks);
			formData.append("currentChunk", Math.floor(offset / chunkSize) + 1);

			// Subir el chunk y esperar
			await uploadChunk(formData, totalChunks);
			offset += chunkSize;
		}
	}
};

const uploadChunk = async (formData, totalChunks) => {
	try {
		const response = await fetch("http://localhost:8081/api/upload", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			// Actualizar el progreso de la carga
			const uploadedChunks = parseInt(formData.get("currentChunk"), 10);
			uploadProgress.value = Math.floor((uploadedChunks / totalChunks) * 100); // Calcular el porcentaje
		} else {
			uploadError.value = true;
		}
	} catch (error) {
		uploadError.value = true;
	}
};
</script>
