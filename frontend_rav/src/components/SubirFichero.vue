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
        <h2 class="title text-azul2Ape mt-4">Cargar archivo</h2>

        <h3 class="subtitle">Adjunta el archivo que deseas compartír</h3>

        <!-- Área de arrastrar y soltar -->
        <div
          v-if="isDesktop"
          class="upload-area"
          @drop="handleDrop"
          @dragover="handleDragOver"
        >
          <!-- Estados de carga -->
          <div v-if="uploading" class="upload-state">
            <img :src="loadingGif" alt="Cargando..." class="state-image" />
            <p class="state-text m-2">El archivo se esta cargando</p>
          </div>
          <div v-else-if="uploadSuccess" class="upload-state">
            <img :src="successImage" alt="Éxito" class="state-image-success" />
          </div>
          <div v-else class="upload-placeholder">
            <img src="@/assets/images/txt.svg" alt="TXT" class="file-icon" />
            <p class="drag-text">Arrastra y suelta el archivo .txt <br> ó</p>
            <!-- Botón amarillo -->
            <button class="btn-search" @click="selectFile">Buscar</button>
            <!-- Input oculto -->
            <input
              type="file"
              ref="fileInput"
              class="file-input-hidden"
              @change="handleFileUpload"
              accept=".txt,.csv,.xlsx"
            />
          </div>
        </div>

        <!-- Encabezado Archivos cargados -->
        <h3
          v-if="fileToUpload"
          class="font-work-sans mt-4 mb-2 text-[16px] leading-[23px] font-[400] text-[#5C5C5C] text-left"
        >
          Archivos cargados
        </h3>

        <!-- Archivos cargados (Card Figma 576x80) -->
        <div
          v-if="fileToUpload"
          class="w-[576px] h-[80px] rounded-[20px] shadow-[0_4px_16.95px_rgba(0,0,0,0.1)] flex items-center px-5 gap-4 bg-[rgba(0,93,202,0.2)]"
        >
          <!-- Icono de archivo (29.5px aprox) -->
          <div class="flex items-center justify-center w-[40px] h-[40px] rounded-full">
            <TxtIcon :width="31" :height="33" :color="azulApe" alt="Archivo" />
          </div>

          <!-- Nombre y barra de progreso -->
          <div class="flex-1 overflow-hidden">
            <p
              class="font-work-sans font-bold text-[21px] leading-[25px] text-black truncate text-left m-1"
            >
              {{ fileName }}
            </p>
            <div
              v-show="!collapsed"
              class="relative mt-2 w-[400px] h-[15px] bg-white rounded-[24.9286px] overflow-visible flex flex-col justify-end"
            >
              <span
                class="absolute -top-7 right-0 font-work-sans font-bold text-[21px] leading-[25px] text-black w-[44px] text-right"
                >{{ intUploadProgress }}%</span
              >
              <div
                class="h-[15px] bg-[#005DCA] rounded-[24.9286px] transition-all"
                :style="{ width: `${uploadProgress}%` }"
              ></div>
            </div>
          </div>

          <!-- Porcentaje y acciones -->
          <div class="flex items-center gap-2 ml-auto">
            <!-- Botón Refresh -->
            <button
              type="button"
              @click="handleRefresh"
              class="w-[21px] h-[21px] p-0 ml-1 rounded-full bg-white border-none flex items-center justify-center"
              aria-label="Refrescar"
            >
              <RefreshIcon :width="17" :height="14" />
            </button>
            <!-- Botón Delete -->
            <button
              type="button"
              @click="onDeleteSelectedFile"
              class="w-[20px] h-[21px] p-0 rounded-full bg-white border-none flex items-center justify-center"
              aria-label="Eliminar"
            >
              <DeleteIcon :width="15" :height="16" color="#005DCA" />
            </button>
            <!-- Botón Collapse/Expand -->
            <!-- <button
              type="button"
              @click="toggleCollapse"
              class="w-[20px] h-[21px] p-0 rounded-full bg-white border-none flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
              :aria-label="collapsed ? 'Expandir' : 'Contraer'"
            >
              <CollapseIcon :width="20" :height="21" :rotated="collapsed" />
            </button> -->
          </div>
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
          @click="uploadFile"
        >
          Subir archivo
        </button>
      </div>

      <!-- Imagen del ciudadano (DERECHA) -->
      <div class="citizen-image-container">
        <img :src="Ciudadano" alt="Ciudadano" class="citizen-image -mt-[50px]" />
      </div>
    </div>
    <!-- Cuadro azul solo para mobile, debajo de la imagen -->
    <div class="mobile-warning-outer">
        <div class="mobile-warning relative">
          <!-- Imagen decorativa como en SidebarLeft.vue -->
          <div
            class="absolute mix-blend-multiply opacity-30"
          >
            <img
              src="@/assets/images/blue-warning-bg.svg"
              alt="decorative blue warning background"
							class="mt-[4px]"
            />
          </div>
          <div class="mobile-warning-border relative z-10">
            <LogoRav :width="90" :height= "60" />
            <span>Este módulo solo está disponible en versión de escritorio.</span>
          </div>
        </div>
    </div>
  </div>
</template>
<script setup>
import Ciudadano from "@/assets/images/subirFichero/personaSubirFicheroMD.avif";
const azulApe = '#005DCA';
import TXT from "@/assets/images/txt.svg";
import download from "@/assets/images/download.svg";
import { useFileNotificationStore } from "../stores/fileNotification";
import { ref, onMounted, onUnmounted } from "vue";
import * as XLSX from "xlsx";
import FetchService from "@/services/fetchService";
import loadingGif from "@/assets/images/subirFichero/EstadosCarga/gifjeep1.gif";
import successImage from "@/assets/images/subirFichero/EstadosCarga/SuccesedImg.avif";
import RefreshIcon from "@/components/Icons/RefreshIcon.vue";
import CollapseIcon from "@/components/Icons/CollapseIcon.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";
import TxtIcon from "@/components/Icons/TxtIcon.vue";
import LogoRav from "@/components/Icons/LogoRav.vue";

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
const collapsed = ref(false);
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

// Refrescar (reinicia progreso visual a 0 y limpia barra, mantiene archivo)
const handleRefresh = () => {
  uploadProgress.value = 0;
  intUploadProgress.value = 0;
  fileNotificationStore.setUploadProgress(0);
};

// Eliminar archivo seleccionado y limpiar estado
const onDeleteSelectedFile = () => {
  fileToUpload.value = null;
  fileName.value = "";
  uploadProgress.value = 0;
  intUploadProgress.value = 0;
  uploadSuccess.value = false;
  uploadError.value = false;
  collapsed.value = false;
  fileNotificationStore.setFileName(null);
  fileNotificationStore.setUploadProgress(0);
};

// Alternar colapsado
const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
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
  console.log("Simulación de carga iniciada (4s)");
  uploading.value = true;
  uploadError.value = false;
  uploadSuccess.value = false;
  uploadProgress.value = 0;
  intUploadProgress.value = 0;

  // IMPORTANTE: Simulación temporal de progreso. Cambia a flujo REAL cuando haya backend.
  // Flujo REAL (restaurar y eliminar bloque de simulación):
  // try {
  //   uploading.value = true;
  //   uploadError.value = false;
  //   uploadSuccess.value = false;
  //   await createParts(fileToUpload.value); // Para .txt usa createPartsTxt internamente; para .xlsx convierte y divide
  //   if (uploadProgress.value === 100) uploadSuccess.value = true;
  // } catch (e) {
  //   uploadError.value = true;
  //   console.error('Error durante la carga real:', e);
  // } finally {
  //   uploading.value = false;
  // }

  const duration = 15000; // 4 segundos exactos (SIMULACIÓN). Eliminar cuando conecte backend
  const start = performance.now();

  return new Promise((resolve) => {
    const step = (now) => {
      const elapsed = now - start;
      const progressRatio = Math.min(elapsed / duration, 1);
      uploadProgress.value = parseFloat((progressRatio * 100).toFixed(2));
      intUploadProgress.value = Math.round(uploadProgress.value);
      fileNotificationStore.setUploadProgress(uploadProgress.value);
      if (progressRatio < 1) {
        requestAnimationFrame(step);
      } else {
        uploading.value = false;
        uploadSuccess.value = true;
        console.log("Simulación completada");
        resolve();
      }
    };
    requestAnimationFrame(step);
  }).catch((e) => {
    console.error(e);
    uploading.value = false;
    uploadError.value = true;
  });
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
  font-family: "Work Sans", sans-serif;
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
  gap: 3rem;
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
  font-family: "Work Sans", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
}

/* Subtítulo */
.subtitle {
  font-family: "Work Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #5c5c5c;
  margin-bottom: 1.5rem;
}

/* Área de arrastrar y soltar */
.upload-area {
  background: rgba(0, 93, 202, 0.1);
  border: 2px dashed rgba(0, 93, 202, 1);
  border-radius: 20px;
  text-align: center;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Estado de carga activo - Gradiente morado */
.upload-area:has(.upload-state) {
  background: linear-gradient(90deg, #005dca 0%, #003b8a 100%);
  border: 2px dashed #005dca;
  border-radius: 10px;
}

.upload-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.state-image {
  height: 80px;
}

.state-image-success {
	height: 130px;
}

.state-text {
  font-family: "Work Sans", sans-serif;
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
  font-family: "Work Sans", sans-serif;
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
  height: 41px;
  background: #fdc300;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-family: "Work Sans", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #002c4d;
  transition: all 0.3s ease;
}

.btn-search:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.file-input-hidden {
  display: none;
}

/* Cuadro azul mobile fuera de la tarjeta */
.mobile-warning-outer {
  display: none;
}
.mobile-warning {
  background: linear-gradient(90deg, #005DCA 0%, #003B8A 88.46%, #003B8A 98.08%);
  color: #fff;
  border-radius: 20px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  width: 380px;
  height: 260px;
  margin: 1.5rem auto 0 auto;
  padding: 0;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: unset;
  max-width: 95vw;
}

.mobile-warning-border {
  box-sizing: border-box;
  border: 2px solid #FDC300;
  border-radius: 10px;
  width: 340px;
  height: 220px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  background: transparent;
  max-width: 90vw;
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
  font-family: "Work Sans", sans-serif;
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
  font-family: "Work Sans", sans-serif;
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
  background: #005dca;
  border-radius: 10px;
  transition: width 0.3s ease;
}

/* Mensajes */
.message-error {
  text-align: center;
  color: #dc2626;
  margin-top: 1rem;
  font-family: "Work Sans", sans-serif;
}

.message-success {
  text-align: center;
  color: #00aa00;
  margin-top: 1rem;
  font-family: "Work Sans", sans-serif;
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
  font-family: "Work Sans", sans-serif;
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.citizen-image {
  height: 700px;
  object-fit: contain;
  max-width: 100%;
}

/* Responsive */
@media (max-width: 1200px) {
  .content-wrapper {
    flex-direction: column-reverse;
    gap: 2rem;
  }

  .citizen-image {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 0px;
		gap: 0;
  }

  .upload-card {
    padding: 1.5rem;
    display: none;
  }

  .main-title {
    font-size: 24px;
  }

  .subtitle {
    font-size: 18px;
  }

  .citizen-image {
    margin: 0 auto;
    display: block;
  }
  .mobile-warning-outer {
    display: block;
  }
}
</style>
