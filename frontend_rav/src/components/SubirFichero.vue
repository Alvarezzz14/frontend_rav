<template>
  <div class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
    <img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />
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
        <Button label="Buscar" class="yellow-button mt-4" @click="selectFile" />
        <!-- Input oculto para selección de archivo -->
        <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" accept=".txt" />
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
      <Button 
        label="Subir" 
        class="purple-button mt-4 w-full" 
        :disabled="!fileToUpload || uploading" 
        @click="uploadAndStoreFile" />
    </div>
  </div>
</template>

<script setup>
import Ciudadano from '@/assets/images/cuidadanoflauta.svg';
import { ref } from 'vue';
import Button from 'primevue/button';

const fileToUpload = ref(null);
const uploadProgress = ref(0);
const fileName = ref("");
const fileInput = ref(null);
const uploading = ref(false); // Control del estado de carga

// Variable para verificar el progreso
const intUploadProgress = ref(0);

// Manejador de clic para seleccionar archivo
const selectFile = () => {
  fileInput.value.click();
};

// Manejador de archivo cargado
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.size > 0) {
    fileToUpload.value = file;
    fileName.value = file.name;
    console.log("Archivo seleccionado:", fileToUpload.value);
  } else {
    console.error("El archivo está vacío.");
  }
};

// Manejador de dragover
const handleDragOver = (event) => {
  event.preventDefault();
};

// Manejador de drop para arrastrar y soltar
const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (file && file.size > 0) {
    fileToUpload.value = file;
    fileName.value = file.name;
    console.log("Archivo arrastrado:", fileToUpload.value);
  } else {
    console.error("El archivo arrastrado está vacío.");
  }
};

// Función para abrir IndexedDB
const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("FileStorageDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("fileChunks", { keyPath: "id" });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject("Error al abrir la base de datos:", event.target.errorCode);
    };
  });
};

// Almacenar un chunk en IndexedDB
const storeChunk = (db, id, chunkData) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["fileChunks"], "readwrite");
    const store = transaction.objectStore("fileChunks");

    const request = store.put({ id, data: chunkData });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject("Error al almacenar el chunk:", event.target.errorCode);
    };
  });
};

// Obtener un chunk de IndexedDB
const getChunk = (store, id) => {
  return new Promise((resolve, reject) => {
    const request = store.get(id);

    request.onsuccess = (event) => {
      resolve(event.target.result.data);
    };

    request.onerror = (event) => {
      reject("Error al obtener el chunk:", event.target.errorCode);
    };
  });
};

// Reconstruir el archivo a partir de los chunks almacenados
const reconstructFile = async (db, totalChunks) => {
  const transaction = db.transaction(["fileChunks"], "readonly");
  const store = transaction.objectStore("fileChunks");

  let reconstructedFile = new Uint8Array(totalChunks * 250 * 1024 * 1024);
  let offset = 0;

  for (let i = 0; i < totalChunks; i++) {
    const chunk = await getChunk(store, i);
    reconstructedFile.set(new Uint8Array(chunk), offset);
    offset += chunk.byteLength;
  }

  await storeChunk(db, "reconstructedFile", reconstructedFile.buffer);
  console.log("Archivo reconstruido.");

  // Llamar a la función para enviar el archivo a la API
  await sendFileToAPI(db);
};

// Enviar el archivo reconstruido a la API
const sendFileToAPI = async (db) => {
  try {
    const transaction = db.transaction(["fileChunks"], "readonly");
    const store = transaction.objectStore("fileChunks");
    const request = store.get("reconstructedFile");

    request.onsuccess = async (event) => {
      const reconstructedData = event.target.result?.data;
      if (reconstructedData) {
        const blob = new Blob([reconstructedData], { type: "application/octet-stream" });

        // Crear FormData y adjuntar el archivo reconstruido
        const formData = new FormData();
        formData.append("file", blob, fileName.value);

        const response = await fetch("http://localhost:8081/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Archivo enviado con éxito.");
          alert("Archivo enviado con éxito.");
        } else {
          console.error("Error al enviar el archivo:", response.statusText);
          alert("Error al enviar el archivo.");
        }
      } else {
        console.error("No se encontró el archivo reconstruido en IndexedDB.");
      }
    };

    request.onerror = (event) => {
      console.error("Error al acceder a reconstructedFile:", event.target.errorCode);
    };
  } catch (error) {
    console.error("Error al enviar el archivo:", error);
  }
};

// Función para subir y almacenar el archivo en IndexedDB
const uploadAndStoreFile = async () => {
  if (uploading.value) return;

  uploading.value = true;
  try {
    if (!fileToUpload.value || fileToUpload.value.size === 0) {
      alert("Por favor selecciona un archivo antes de subirlo.");
      return;
    }

    const chunkSize = 250 * 1024 * 1024;
    const totalChunks = Math.ceil(fileToUpload.value.size / chunkSize);

    const db = await openIndexedDB();

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      const chunk = fileToUpload.value.slice(start, end);
      const chunkData = await chunk.arrayBuffer();
      await storeChunk(db, i, chunkData);
      uploadProgress.value = Math.floor(((i + 1) / totalChunks) * 100);
      intUploadProgress.value = uploadProgress.value;
    }

    await reconstructFile(db, totalChunks);
    alert("Archivo cargado y reconstruido en IndexedDB con éxito.");
  } catch (error) {
    console.error("Error durante la carga:", error);
  } finally {
    uploading.value = false;
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
  height: 50px;
  margin-bottom: 10px;
}
.file-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.progress-bar {
  height: 6px;
  background-color: #8f5f9e;
}
</style>
