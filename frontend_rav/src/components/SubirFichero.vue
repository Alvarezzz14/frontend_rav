<template>
    <div
      class="bg-gray-100 flex items-center justify-between p-4 rounded-lg shadow-md"
    >
      <div class="flex items-center">
        <div class="p-4">
          <svg
            width="148"
            height="153"
            viewBox="0 0 148 153"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M73.7941 141.112C110.968 141.112 141.104 110.893 141.104 73.6161C141.104 36.3391 110.968 6.12012 73.7941 6.12012C36.6201 6.12012 6.48462 36.3391 6.48462 73.6161C6.48462 110.893 36.6201 141.112 73.7941 141.112Z"
              fill="#741E78"
            />
            <path
              d="M119.569 96.0302V98.5412C118.784 102.969 115.671 106.434 111.205 107.28L49.3873 107.313C48.3773 110.887 45.6728 113.984 42.0836 115.081C41.4409 115.281 40.7481 115.298 40.1555 115.566C39.2957 115.499 38.3191 115.658 37.4761 115.566C29.5297 114.704 25.3645 105.187 29.8886 98.5496C35.1723 90.7988 46.8581 93.1592 49.3956 101.948H110.179C115.804 100.826 115.437 93.0671 109.619 92.4561L58.6608 92.4394C50.3221 91.5103 46.6995 81.056 52.9431 75.2136C54.1701 74.0669 57.175 72.5268 58.8528 72.5268H81.1226L68.4602 55.0081C60.2217 40.5947 71.1897 22.6742 87.8253 23.7623C103.184 24.7668 111.957 42.0762 104.085 55.301C99.7615 62.5747 93.2508 69.4047 88.7017 76.6365C88.2092 77.2476 87.5832 77.8251 86.7569 77.9088C77.9925 78.3608 68.6104 77.2978 59.9128 77.9004C54.0282 78.3106 53.4356 85.76 59.0281 87.049C76.4733 87.1913 93.9687 86.756 111.389 87.275C115.479 88.0032 119.102 91.8534 119.569 96.0134V96.0302ZM84.837 29.2029C73.7856 30.1822 67.4752 42.8295 73.1011 52.3296L86.1225 70.1078L86.5649 70.384L99.5612 52.3966C105.805 41.4903 97.441 28.0813 84.8287 29.2029H84.837ZM37.9685 99.3029C31.1657 100.224 32.2592 110.971 39.5127 110.176C46.4324 109.414 45.5059 98.2901 37.9685 99.3029Z"
              fill="white"
            />
            <path
              d="M86.2475 36.2171C96.8482 36.0497 97.0068 52.3547 86.3978 52.3631C75.7637 52.3715 75.7637 36.3845 86.2475 36.2171ZM86.2392 41.5907C82.6917 41.7414 82.7501 47.6005 87.0989 46.8974C87.8919 46.7718 88.8518 45.6168 88.977 44.8383C89.2358 43.1894 87.9837 41.5238 86.2392 41.5991V41.5907Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-black mb-0 text-2xl">Cargar</p>
          <h2 class="text-customPurple text-5xl mt-0 font-bold">Archivo</h2>
        </div>
      </div>
    </div>
  
    <p class="text-black mb-0 text-2xl">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
      doloribus culpa, asperiores animi quisquam numquam quis? Est voluptatum
      eaque quidem maiores cum voluptatibus esse quae, vitae ab iure pariatur
      facere!
    </p>
    <p></p>
  
    <div
      class="drop-area"
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
      @dragleave="handleDragLeave"
    >
      <p>Arrastra y suelta tu archivo aquí</p>
    </div>
  
    <transition name="fade">
      <div v-if="fileName" class="file-info">
        <p>Archivo seleccionado: {{ fileName }}</p>
        <button @click="async () => await uploadFile()" class="upload-button">
          Enviar Archivo
        </button>
      </div>
    </transition>
  
    <div v-if="loading" class="loading-animation">
      <i class="pi pi-spinner pi-spin"></i>
      <p>Cargando archivo...</p>
    </div>
  
    <div v-if="uploadSuccess" class="upload-status success">
      <p>Archivo cargado con éxito!</p>
    </div>
  
    <div v-if="uploadError" class="upload-status error">
      <p>Error al cargar el archivo. Intenta de nuevo.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loading: false,
        fileName: "",
        uploadSuccess: false,
        uploadError: false,
        fileToUpload: null,
        typeFiles: {
          xlsx: "application/octet-stream",
          txt: "text/plain",
        },
      };
    },
    methods: {
      handleDragOver(event) {
        event.dataTransfer.dropEffect = "copy";
      },
      handleDrop(event) {
        const files = event.dataTransfer.files;
        if (files.length > 0) {
          this.fileName = files[0].name;
          this.fileToUpload = files[0];
        }
      },
      async sendFile(fetchOptions) {
        let { url, options, success, error } = fetchOptions;
  
        this.loading = true;
        this.uploadSuccess = false;
        this.uploadError = false;
  
        // Enviar al servidor
        try {
          const response = await fetch(url, options);
          const json = await response.json();
          console.log(response);
  
          if (!response.ok)
            throw {
              error: true,
              msgErr: response.statusText ?? "Ocurrio un error",
            };
  
          console.log(json);
        } catch (err) {
          this.uploadError = true;
          if (!err.error) err.error = true;
          console.log(err);
        } finally {
          this.loading = false;
        }
      },
  
      createFormData(archivoBlob, fileName) {
        const formularioDatos = new FormData();
        formularioDatos.append("file", archivoBlob, fileName);
        return formularioDatos;
      },
  
      createBlob(newWorkBook, typeFile) {
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
  
        console.log(this.typeFiles[typeFile]);
  
        const archivoBlob = new Blob([blob], { type: this.typeFiles[typeFile] });
        return archivoBlob;
      },
      async createPartsTxt(file, chunkSize = 250 * 1024 * 1024) {
        let offset = 0;
        let partNumber = 1;
        let blob;
        const reader = new FileReader();
        const fileSizeInMb = file.size / (1024 * 1024);
  
        reader.onload = async (e) => {
          const chunkData = e.target.result;
          const fileBlob = new Blob([blob], { type:  "text/plain"});
          console.log(fileBlob);
  
          const fileName = `${file.name}_parte${partNumber}.txt`;
          const fileBlobSize = fileBlob.size / (1024 * 1024);
          const formData = new FormData();
          formData.append("file", fileBlob, fileName);
          // formData.append("fileSize", fileBlobSize);
          // formData.append("fileName", fileName);
          // formData.append("principalFile", fileSizeInMb);
          // const infoFIle = {
          //   file: fileBlob,
          //   fileSize: fileBlobSize,
          //   fileName,
          //   principalFile: fileSizeInMb,
          // };
  
          // downloadFile(fileBlob,fileName)
  
          // const formData = createFormData(fileBlob, fileName);
          // return
  
          let fetchOptions = {
            url: "http://localhost:8081/upload",
            options: {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
              body: formData,
              // body: JSON.stringify(infoFIle)
            },
          };
  
          await this.sendFile(fetchOptions);
          // if (partNumber == 2) return;
  
          offset += chunkSize;
          partNumber += 1;
  
          if (offset < file.size) {
            readNextChunk(); // Lee la siguiente parte si queda más contenido
          }
        };
  
        function readNextChunk() {
          blob = file.slice(offset, offset + chunkSize);
          reader.readAsText(blob, "ISO-8859-1");
        }
        //Iniciar la lectura
        readNextChunk();
      },
  
      async createPartsExcel(file, rowLimit = 100) {
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
            //Crear el archivo excel
            const newWorkBook = XLSX.utils.book_new();
            //Seleccionar los datos para el nuevo archivo excel
            const newData = jsonData.slice(i, i + rowLimit);
            //Crear la hoja de trabajo con los datos para el nuevo archivo excel
            const newWorksheet = XLSX.utils.aoa_to_sheet(newData);
  
            //Agregar la nueva hoja de trabajo a el nuevo archivo excel
            XLSX.utils.book_append_sheet(newWorkBook, newWorksheet, sheetName);
            partCount++;
  
            const archivoBlob = this.createBlob(newWorkBook, "xlsx");
            const fileName = `${sheetName}_parte${partCount}.xlsx`;
            // downloadFile(archivoBlob, fileName);
  
            const formularioDatos = this.createFormData(archivoBlob, fileName);
  
            let fetchOptions = {
              url: "http://localhost:8080/upload",
              options: {
                method: "POST",
                headers: {
                  Accept: "application/json",
                },
                body: formularioDatos,
              },
            };
            console.log("Aca llega");
  
            await this.sendFile(fetchOptions);
          }
          alert("División y envío completados.");
        }
      },
  
      async createParts(file) {
        console.log(file.type);
        switch (file.type) {
          case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            "application/vnd.ms-excel":
            await this.createPartsExcel(file);
            break;
          case "text/plain":
            await this.createPartsTxt(file);
            break;
        }
      },
  
      async uploadFile() {
        if (!this.fileToUpload) {
          return; // No hay archivo para subir
        }
        await this.createParts(this.fileToUpload);
        return;
  
        const formData = new FormData();
        formData.append("file", this.fileToUpload);
  
        fetch("http://localhost:8080/upload", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        })
          .then((response) => {
            this.loading = false;
            if (response.ok) {
              response = response.json();
              console.log(response);
              this.uploadSuccess = true;
            } else {
              this.uploadError = true;
            }
          })
          .catch((error) => {
            this.loading = false;
            this.uploadError = true;
            console.error("Error al subir el archivo:", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .drop-area {
    border: 2px dashed #7a1f7e;
    padding: 20px;
    background-color: #f9f9f9;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .drop-area:hover {
    background-color: #7a1f7e;
  }
  
  .file-info {
    margin-top: 10px;
  }
  
  .upload-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #7a1f7e;
    color: #f9f9f9;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .upload-button:hover {
    background-color: #7a1f7e;
  }
  
  .loading-animation {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    color: #7a1f7e;
  }
  
  .upload-status {
    margin-top: 10px;
  }
  
  .success {
    color: green;
  }
  
  .error {
    color: red;
  }
  
  /* Transiciones */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 150s ease;
    color: #7a1f7e;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  