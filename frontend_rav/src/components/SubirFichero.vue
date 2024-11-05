<template>
  <div class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
    <!-- Sección de búsqueda -->
    <div class="upload-section mt-8 w-full lg:w-1/2 p-6 bg-white rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-4 text-customPurple">Cargar Archivo</h2>
      <p class="text-center mb-2 text-customPurple">Adjunta el archivo que deseas compartir</p>
      <br>
      <div
        class="upload-container p-8 border-dashed border-2 border-customPurple text-center rounded-lg"
        @drop.prevent="handleDrop"
        @dragover.prevent="handleDragOver"
      >
        <img src="@/assets/images/download.svg" alt="Upload Icon" class="upload-icon mb-2" />
        <p class="text-customPurple">Arrastra y suelta el archivo <br /> o</p>
        <!-- Botón de color amarillo -->
        <Button label="Buscar" class="yellow-button mt-4" @click="selectFile" />
        <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
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

      <!-- Botón de color morado -->
      <Button label="Subir" class="purple-button mt-4 w-full" @click="uploadFile" />
    </div>
    <div class="lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0">
      <img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />
    </div>
  </div>
</template>

<script setup>
import Ciudadano from '@/assets/images/cuidadanoflauta.svg';
import Button from 'primevue/button';
import { ref } from 'vue';


// Variables y lógica para la carga de archivos
const loading = ref(false);
const fileName = ref('');
const uploadProgress = ref(0);
const uploadSuccess = ref(false);
const uploadError = ref(false);
const fileToUpload = ref(null);

const typeFiles = {
  xlsx: "application/octet-stream",
  txt: "text/plain",
};

const handleFileUpload = (event) => {
  fileToUpload.value = event.target.files[0];
  fileName.value = fileToUpload.value.name;
  uploadProgress.value = 0;
};

const handleDragOver = (event) => {
  event.dataTransfer.dropEffect = "copy";
};

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    fileName.value = files[0].name;
    fileToUpload.value = files[0];
  }
};

const selectFile = () => {
  document.querySelector('input[type="file"]').click();
};

const uploadFile = async () => {
  if (!fileToUpload.value) return;
  await createParts(fileToUpload.value);
};

const createParts = async (file) => {
  switch (file.type) {
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
      await createPartsExcel(file);
      break;
    case "text/plain":
      await createPartsTxt(file);
      break;
  }
};

const sendFile = async (fetchOptions) => {
  const { url, options } = fetchOptions;
  loading.value = true;
  uploadSuccess.value = false;
  uploadError.value = false;

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) throw new Error(response.statusText ?? "Ocurrio un error");

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
  const formularioDatos = new FormData();
  formularioDatos.append("file", archivoBlob, fileName);
  return formularioDatos;
};

const createBlob = (newWorkBook, typeFile) => {
  let blob;
  switch (typeFile) {
    case "xlsx":
      blob = XLSX.write(newWorkBook, { bookType: typeFile, type: "array" });
      break;
    case "txt":
      blob = newWorkBook;
      break;
  }

  const archivoBlob = new Blob([blob], { type: typeFiles[typeFile] });
  return archivoBlob;
};

const createPartsTxt = async (file, chunkSize = 250 * 1024 * 1024) => {
  let offset = 0;
  let partNumber = 1;
  let blob;
  const reader = new FileReader();

  reader.onload = async (e) => {
    const chunkData = e.target.result;
    const fileBlob = new Blob([chunkData], { type: "text/plain" });
    const fileName = `${file.name}_parte${partNumber}.txt`;

    const formData = createFormData(fileBlob, fileName);

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

const createPartsExcel = async (file, rowLimit = 100) => {
  const data = await file.arrayBuffer();
  const workBook = XLSX.read(data);
  let partCount = 0;

  for (const sheetName of workBook.SheetNames) {
    const workSheet = workBook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(workSheet, {
      header: 1,
      defval: "Vacio",
      dateNF: "MM/DD/YYYY",
    });

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
    alert("División y envío completados.");
  }
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
