<template>
  <div class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
    <img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />
    <!-- Sección de carga de archivo -->
    <div class="upload-section mt-8 w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-4 text-customPurple">Cargar Archivo</h2>
      <p class="text-center mb-2 text-customPurple">Adjunta el archivo que deseas compartir</p>
      <br>

      <!-- Área de arrastrar y soltar -->
      <div
        class="upload-container p-8 border-dashed border-2 border-customPurple text-center rounded-lg"
        @drop.prevent="handleDrop"
        @dragover.prevent="handleDragOver"
      >
        <img src="@/assets/images/download.svg" alt="Upload Icon" class="upload-icon mb-2" />
        <p class="text-customPurple">Arrastra y suelta el archivo <br /> o</p>
        <!-- Botón de color amarillo -->
        <Button label="Buscar" class="yellow-button mt-4" @click="selectFile" />
        <!-- Input oculto para selección de archivo -->
        <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" accept=".txt,.csv,.xlsx" />
      </div>

      <!-- Archivos cargados -->
      <div v-if="fileToUpload" class="uploaded-file mt-4 flex items-center p-2 bg-purple-100 rounded-lg">
        <img src="@/assets/images/excel-Logo.svg" alt="Excel Icon" class="file-icon mr-2" />
        <div class="flex-1 text-customPurple">
          <p>{{ fileName }}</p>
          <div class="progress-bar mt-1 rounded-full h-2" :style="{ width: uploadProgress + '%' }"></div>
        </div>
        <span class="ml-4 font-semibold text-customPurple">{{ uploadProgress }}%</span>
      </div>

      <!-- Botón de carga -->
      <Button label="Subir" class="purple-button mt-4 w-full" @click="uploadFile" />
    </div>

    
  </div>
</template>

<script setup>
import Ciudadano from '@/assets/images/cuidadanoflauta.svg';
import { ref } from 'vue';
import Button from 'primevue/button';

// Variables y lógica para la carga de archivos
const uploadedFile = ref(null);
const fileName = ref("");
const fileToUpload = ref(null);
const uploadProgress = ref(0);
const loading = ref(false);
const uploadSuccess = ref(false);
const uploadError = ref(false);
const acceptedFileTypes = ["text/plain", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]; // Tipos permitidos

// Métodos para manejar la carga de archivos
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  
  // Validar el tipo de archivo
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
    // Validar el tipo de archivo
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
  event.preventDefault(); // Evitar que el navegador realice una acción predeterminada
};

const selectFile = () => {
  document.querySelector('input[type="file"]').click();
};

const uploadFile = () => {
  if (!fileToUpload.value) return;

  // Simulación de progreso de carga
  uploadProgress.value = 0;
  const interval = setInterval(() => {
    if (uploadProgress.value < 100) {
      uploadProgress.value += 10;
    } else {
      clearInterval(interval);
    }
  }, 200);
};

// Función para enviar el archivo al servidor
const sendFile = async (fetchOptions) => {
  let { url, options } = fetchOptions;

  loading.value = true;
  uploadSuccess.value = false;
  uploadError.value = false;

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok)
      throw { error: true, msgErr: response.statusText ?? "Ocurrió un error" };

    console.log(json);
    uploadSuccess.value = true;
  } catch (err) {
    uploadError.value = true;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const createFormData = (archivoBlob, fileName) => {
  const formData = new FormData();
  formData.append("file", archivoBlob, fileName);
  return formData;
};

// Función para dividir archivos de texto en partes
const createPartsTxt = async (file, chunkSize = 250 * 1024 * 1024) => {
  let offset = 0;
  let partNumber = 1;
  let blob;
  const reader = new FileReader();

  reader.onload = async (e) => {
    const chunkData = e.target.result;
    const fileBlob = new Blob([blob], { type: "text/plain" });
    const fileName = `${file.name}_parte${partNumber}.txt`;
    const formData = new FormData();
    formData.append("file", fileBlob, fileName);

    let fetchOptions = {
      url: "http://localhost:8081/upload",
      options: {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      },
    };

    await sendFile(fetchOptions);

    offset += chunkSize;
    partNumber += 1;

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

// Función para dividir archivos Excel en partes
const createPartsExcel = async (file, rowLimit = 100) => {
  const data = await file.arrayBuffer();
  const workBook = XLSX.read(data);
  let partCount = 0;

  for (const sheetName of workBook.SheetNames) {
    const workSheet = workBook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(workSheet, { header: 1, defval: "Vacio" });

    for (let i = 0; i < jsonData.length; i += rowLimit) {
      const newWorkBook = XLSX.utils.book_new();
      const newData = jsonData.slice(i, i + rowLimit);
      const newWorksheet = XLSX.utils.aoa_to_sheet(newData);
      XLSX.utils.book_append_sheet(newWorkBook, newWorksheet, sheetName);
      partCount++;

      const archivoBlob = createBlob(newWorkBook, "xlsx");
      const fileName = `${sheetName}_parte${partCount}.xlsx`;
      const formData = createFormData(archivoBlob, fileName);

      let fetchOptions = {
        url: "http://localhost:8080/upload",
        options: {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      };

      await sendFile(fetchOptions);
    }
  }
  alert("División y envío completados.");
};

// Función que llama a las funciones de división dependiendo del tipo de archivo
const createParts = async (file) => {
  switch (file.type) {
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
      await createPartsExcel(file);
      break;
    case "text/plain":
      await createPartsTxt(file);
      break;
    default:
      alert("Tipo de archivo no soportado.");
      break;
  }
};

// Función final de carga de archivo
const uploadFileFinal = async () => {
  if (!fileToUpload.value) return;

  await createParts(fileToUpload.value);
};
</script>

<style scoped>
.text-customPurple {
  color: #7A1F7E;
}
.yellow-button {
  background-color: #FDC300 !important;
  color: #7A1F7E !important;
  font-weight: bold;
  border-radius: 12px;
  padding: 12px 24px;
  border: none;
  font-size: 1.25rem;
}
.purple-button {
  background-color: #7A1F7E !important;
  color: #FDC300 !important;
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
  background-color: #E0C8E0;
}
.progress-bar {
  background-color: #7A1F7E;
}
</style>
