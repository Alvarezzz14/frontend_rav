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
        <span class="ml-4 font-semibold text-customPurple">{{ intUploadProgress }}%</span>
      </div>

      <!-- Botón de carga -->
      <Button label="Subir" class="purple-button mt-4 w-full" @click="uploadFile" />
    </div>
  </div>
</template>

<script setup>
import Ciudadano from '@/assets/images/cuidadanoflauta.svg';
import { useFileNotificationStore } from '../stores/fileNotification';
import { ref } from 'vue';
import Button from 'primevue/button';
import * as XLSX from "xlsx";

// Variables y lógica para la carga de archivos
const uploadedFile = ref(null);
const fileNotificationStore = useFileNotificationStore();
const fileName = ref("");
const fileToUpload = ref(null);
const uploadProgress = ref(0);
const intUploadProgress = ref(0);
let partsFile = 0;
const loading = ref(false);
const uploadSuccess = ref(false);
const uploadError = ref(false);
const acceptedFileTypes = ["text/plain", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]; // Tipos permitidos

const createFormData = (archivoBlob, fileName) => {
  const formData = new FormData();
  formData.append("file", archivoBlob, fileName);
  return formData;
};

const createBlob = (newWorkBook, typeFile) => {
  let blob;

  switch (typeFile) {
    case "xlsx":
      // Cambia el tipo del archivo a xlsx y devuelve un ArrayBuffer
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
}

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

const updateEventFileUpload = (bodyFetchOptions)=>{
  const sizeMainFile = bodyFetchOptions.get("sizeMainFile");
  const sizePartFile = bodyFetchOptions.get("file").size;
  partsFile = window.Math.round(sizeMainFile / sizePartFile)
  console.log(partsFile);
  console.log(uploadProgress.value);
  

  if (uploadProgress.value < sizeMainFile) {
    uploadProgress.value = parseFloat((uploadProgress.value + (100 / partsFile)).toFixed(2))
    intUploadProgress.value = window.Math.round(uploadProgress.value);

    console.log(uploadProgress.value)
  }
  
  fileNotificationStore.setUploadProgress(uploadProgress.value)

}



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

      
      updateEventFileUpload(fetchOptions.options.body)

    console.log(json);
    uploadSuccess.value = true;
  } catch (err) {
    uploadError.value = true;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Función para dividir archivos de texto en partes
const createPartsTxt =  (file, chunkSize = 250 * 1024 * 1024) => {
  let offset = 0;
  let partNumber = 1;
  let blob;
  const reader = new FileReader();

  console.log(file.size);
  

  reader.onload = (e) => {
    const chunkData = e.target.result;
    const fileBlob = new Blob([blob], { type: "text/plain" });
    const fileName = `${file.name}_parte${partNumber}.txt`;
    const formData = new FormData();
    console.log("archivo grande",(file.size / (1024 * 1024)).toFixed(2), "MB")
    console.log("Tamaño del fragmento:", (fileBlob.size / (1024 * 1024)).toFixed(2), "MB");
    // return
    formData.append("file", fileBlob, fileName);
    formData.append("sizeMainFile",file.size)

    let fetchOptions = {

      url: "http://localhost:8081/api/upload",

      options: {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      },
    };

    sendFile(fetchOptions);

    offset += chunkSize;
    partNumber += 1;

    if (offset < file.size) {
      readNextChunk();
    }
  };

  function readNextChunk() {
    //Aqui se separa el archivo
    blob = file.slice(offset, offset + chunkSize);
    // reader.readAsText(blob);
    reader.readAsText(blob, "ISO-8859-1");
  }

  readNextChunk();
};

// Función para dividir archivos Excel en partes
const createPartsExcel = async (file, chunkSize = 100 * 1024 * 1024) => {
  console.log("Se esta ejecutando");
  const data = await file.arrayBuffer();
  const workBook = XLSX.read(data);


  for (const sheetName of workBook.SheetNames) {
    const workSheet = workBook.Sheets[sheetName];

   
      const txtData = XLSX.utils.sheet_to_csv(workSheet,{FS:"»",blankrows:false});
      const isoEncodeData = unescape(encodeURIComponent)
      console.log(txtData);
      const blob = new Blob([txtData],{type:"text/plain"})
      createPartsTxt(blob)
    

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

const uploadFile = async () => {
  if (!fileToUpload.value) return;
  

  // // Emitimos el evento con el progreso inicial
  // window.dispatchEvent(new CustomEvent("file-upload-progress", {
  //   detail: {
  //     title: "Subiendo archivo...",
  //     message: `Subiendo ${fileName.value}`,
  //     progress: uploadProgress.value,
  //     redirectUrl: "http://localhost:5173/subirfichero"
  //   }
  // }));

  await uploadFileFinal();
  
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
