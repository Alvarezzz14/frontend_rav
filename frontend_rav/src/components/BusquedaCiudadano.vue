<template>
	<div class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
	  <div class="lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0">
		<img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />
	  </div>
  
	  <div class="flex flex-col items-center lg:items-start lg:w-2/3 lg:pl-10">
		<div class="mb-6">
		  <p class="text-xl lg:text-3xl font-medium text-inherit">
			Aquí podrás visualizar información acerca de la
		  </p>
		  <h2 class="lg:text-5xl font-bold text-customPurple">
			Ruta de Atención al Ciudadano.
		  </h2>
		</div>
  
		<div class="w-full lg:w-2/3 bg-white p-5 rounded-2xl shadow-lg">
		  <div class="flex flex-col items-center">
			<input
			  v-model="searchCedula"
			  @keydown.enter="searchUser"
			  type="text"
			  placeholder="Ingrese número de documento"
			  class="w-full p-4 border text-customPurple border-customPurple rounded-lg"
			/>
			<Button
			  type="button"
			  label="Buscar"
			  icon="pi pi-search"
			  :loading="loading"
			  class="mt-4 w-full lg:w-auto !hover:bg-purple-600 !border-none !bg-customPurple text-white"
			  @click="searchUser"
			/>
		  </div>
		</div>
  
		<Dialog
		  v-model:visible="noResultsModal"
		  modal
		  header="Búsqueda Fallida"
		  :style="{ width: '30rem' }"
		>
		  <p class="m-0 text-customPurple">
			{{ modalMessage }}
			<strong>{{ searchCedula }}</strong>
		  </p>
		  <template #footer>
			<Button
			  label="Cerrar"
			  @click="noResultsModal = false"
			  class="p-button-text"
			/>
		  </template>
		</Dialog>
	  </div>
	</div>
  </template>
  
  <script setup>
  import Ciudadano from "@/assets/images/Ciudadano.svg";
  import { ref } from "vue";
  import Dialog from "primevue/dialog";
  import Button from "primevue/button";
  import { useRouter } from "vue-router";
  import data from "@/assets/data.json"; 

  const searchCedula = ref("");
  const noResultsModal = ref(false);
  const modalMessage = ref("");
  const loading = ref(false);
  
  // Instancia Router
  const router = useRouter();
  
  // Método de búsqueda
  const searchUser = () => {
	if (!searchCedula.value.trim()) {
	  noResultsModal.value = true;
	  modalMessage.value = "Por favor, ingrese un número de documento.";
	  return;
	}
  
	loading.value = true;
  
	// Simulación de búsqueda
	const results = data.filter(user => user["NÚMERO DE DOCUMENTO"] === searchCedula.value);
  
	setTimeout(() => {
	  if (results.length > 0) {
		// Si se encuentran resultados, redirigir a la página de detalles
		const userData = results[0]; // Solo tomamos el primer resultado
		router.push({
		  name: "PerfilUsuarioPage",
		  params: { userData }, // Pasamos los datos del usuario
		});
	  } else {
		noResultsModal.value = true;
		modalMessage.value = `No se encontraron resultados con el número de documento:`;
	  }
  
	  loading.value = false;
	}, 700);
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  