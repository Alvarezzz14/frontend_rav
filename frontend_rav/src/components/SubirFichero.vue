<template>
  <div class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
    <!-- Imagen del ciudadano -->
    <img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />

    <!-- Sección de carga de archivo -->
    <div
      class="upload-section mt-8 w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-lg"
    >
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
        @dragover="handleDragOver"
      >
        <img
          src="@/assets/images/download.svg"
          alt="Upload Icon"
          class="upload-icon mb-2 w-16 h-16 mx-auto"
        />
        <p class="text-customPurple mb-4">
          Arrastra y suelta el archivo aquí <br />
          o
        </p>
        <!-- Botón amarillo personalizado -->
        <Button
          label="Buscar"
          class="yellow-button mt-4"
          @click="selectFile"
        />
        <!-- Input oculto para selección de archivo -->
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          @change="handleFileUpload"
          accept=".txt,.csv,.xlsx"
        />
      </div>

      <!-- Archivos cargados -->
      <div
        v-if="fileToUpload"
        class="uploaded-file mt-4 flex items-center p-2 bg-purple-100 rounded-lg shadow-md"
      >
        <!-- Icono de archivo (cambiar según tipo de archivo si es necesario) -->
        <img
          src="@/assets/images/excel-Logo.svg"
          alt="Archivo"
          class="file-icon w-10 h-10 mr-4"
        />
        <div class="flex-1 text-customPurple">
          <p class="truncate font-medium">{{ fileName }}</p>
          <!-- Barra de progreso -->
          <div class="progress-bar bg-customPurple-light h-2 rounded-full mt-1">
            <div
              class="bg-customPurple h-2 rounded-full transition-all duration-300"
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>
        </div>
        <span class="ml-4 font-semibold text-customPurple">
          {{ intUploadProgress }}%
        </span>
      </div>

      <!-- Mensajes de error y éxito -->
      <p
        v-if="uploadError"
        class="text-red-500 text-center mt-4"
      >
        Error al subir el archivo. Intenta nuevamente.
      </p>
      <p
        v-if="uploadSuccess"
        class="text-green-500 text-center mt-4"
      >
        Archivo subido exitosamente.
      </p>

      <!-- Botón de carga -->
      <Button
        label="Subir"
        class="purple-button mt-4 w-full"
        :disabled="!fileToUpload || uploading" 
        @click="uploadFile"
      />
    </div>
  </div>
</template>

<script setup>
import Ciudadano from "@/assets/images/cuidadanoflauta.svg";
import { useFileNotificationStore } from "../stores/fileNotification";
import { ref, onUnmounted } from "vue";
import Button from "primevue/button";
import * as XLSX from "xlsx";

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

const acceptedFileTypes = [
  "text/plain",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]; // Tipos permitidos

const fetchOptions = {
  url: "http://localhost:8081/api/upload",
  options: {
    method: "POST",
    headers: { Accept: "application/json" },
    signal: fetchController.signal,
  },
};

const createFormData = (archivoBlob, fileName) => {
  const formData = new FormData();
  formData.append("file", archivoBlob, fileName);
  return formData;
};

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
    uploadProgress.value = 0;
  } else {
    alert("Por favor, selecciona un archivo válido (.txt, .csv, .xlsx).");
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
      alert("Por favor, selecciona un archivo válido (.txt, .csv, .xlsx).");
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

const ConnectionWifi = (callback) => {
  window.addEventListener("online", async () => await callback());
};

async function sendFile(fetchOptions) {
  let { url, options } = fetchOptions;

  loading.value = true;
  uploadSuccess.value = false;
  uploadError.value = false;

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok)
      throw { error: true, msgErr: response.statusText ?? "Ocurrió un error" };

    updateEventFileUpload(fetchOptions.options.body);

    uploadSuccess.value = true;
  } catch (err) {
    if (!err.error) err.error = true;
    uploadError.value = true;
    if (err.name === "AbortError") {
      console.log("La solicitud fue cancelada con éxito");
    } else if (err instanceof TypeError) {
      const formData = fetchOptions.options.body;
      backupPartsFile.push(formData);
      wifiErrorFetch = true;
      ConnectionWifi(ReuploadFile);
    } else {
      console.error(err);
    }
  } finally {
    loading.value = false;
  }
}

const createPartsTxt = (file, chunkSize = 250 * 1024 * 1024) => {
  let offset = 0;
  let partNumber = 1;
  let blob;
  const reader = new FileReader();

  reader.onload = (e) => {
    const chunkData = e.target.result;
    const fileBlob = new Blob([blob], { type: "text/plain" });
    const fileName = `${file.name}_parte${partNumber}.txt`;
    const formData = new FormData();

    formData.append("file", fileBlob, fileName);
    formData.append("sizeMainFile", file.size);
    fileNotificationStore.setFileName(`${file.name}_parte.txt`);

    const copyFetchOptions = {
      url: fetchOptions.url,
      options: {
        ...fetchOptions.options,
        body: formData,
      },
    };

    fileNotificationStore.setFetchController(fetchController);

    sendFile(copyFetchOptions);

    offset += chunkSize;
    partNumber += 1;

    if (wifiErrorFetch) return;

    if (offset < file.size) {
      readNextChunk();
    }
  };

  function readNextChunk() {
    blob = file.slice(offset, offset + chunkSize);
    reader.readAsText(blob, "ISO-8859-1");
  }

  readNextChunk();
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

const uploadFileFinal = async () => {
  if (!fileToUpload.value) return;

  uploading.value = true; // Deshabilita el botón
  await createParts(fileToUpload.value);
  uploading.value = false; // Vuelve a habilitar el botón
};

const uploadFile = async () => {
  if (!fileToUpload.value) return;
  await uploadFileFinal();
};

onUnmounted(() => {
  removeEventListener("online", async () => await ReuploadFile());
});


console.log(backupPartsFile)

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
