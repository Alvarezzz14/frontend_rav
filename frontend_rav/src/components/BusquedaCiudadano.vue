<template>
<<<<<<< HEAD
	<div class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
	  <div class="lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0">
		<img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />
	  </div>
	  <div class="flex flex-col items-center lg:items-start lg:w-2/3 lg:pl-10">
		<div class="mb-6">
		  <p class="text-xl lg:text-3xl font-medium text-inherit">
			Aquí podrás visualizar información acerca de la
		  </p>
		  <h2 class="lg:text-5xl font-bold text-customPurple">Ruta de Atención al Ciudadano.</h2>
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
		  <Button label="Cerrar" @click="noResultsModal = false" class="p-button-text" />
		</template>
	  </Dialog>
=======
	<div
		class="flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-100 h-full">
		<!-- Imagen del ciudadano a la izquierda -->
		<div
			class="sm:w-2/3 md:w-1/2 lg:w-1/3 flex justify-center mb-4 sm:mb-6 lg:justify-start lg:mb-0">
			<img
				:src="Ciudadano"
				alt="Ciudadano"
				class="w-48 sm:w-60 md:w-72 lg:w-80 h-fit object-contain" />
		</div>

		<!-- Texto y campo de búsqueda a la derecha -->
		<div
			class="flex flex-col items-center sm:w-3/4 md:w-2/3 lg:items-start lg:w-2/3 lg:pl-8 xl:pl-10">
			<!-- Texto de información -->
			<div class="mb-4 sm:mb-6 text-center lg:text-left">
				<p
					class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium text-inherit">
					Aquí podrás visualizar información acerca de la
				</p>
				<h2
					class="text-2xl sm:text-4xl lg:text-5xl font-bold text-customPurple">
					Ruta de Atención al Ciudadano.
				</h2>
			</div>

			<!-- Sección de búsqueda -->
			<div
				class="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white p-4 sm:p-5 rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg">
				<div class="flex flex-col items-center">
					<input
						v-model="searchCedula"
						@keydown.enter="searchUser"
						type="text"
						placeholder="Ingrese número de cédula"
						class="w-full p-3 sm:p-4 border text-customPurple border-customPurple rounded-lg" />
					<!-- Botón de búsqueda con PrimeVue -->
					<Button
						type="button"
						label="Buscar"
						icon="pi pi-search"
						:loading="loading"
						class="mt-4 w-full lg:w-auto !hover:bg-purple-600 !border-none !bg-customPurple text-white"
						@click="searchUser" />
				</div>
			</div>
		</div>

		<!-- Modal de no encontrado usando PrimeVue Dialog -->
		<Dialog
			v-model:visible="noResultsModal"
			modal
			header="Búsqueda Fallida"
			:style="{ width: '90%', maxWidth: '30rem' }">
			<p class="m-0 text-customPurple">
				{{ modalMessage }}
				<strong>{{ searchCedula }}</strong>
			</p>
			<template #footer>
				<Button
					label="Cerrar"
					@click="noResultsModal = false"
					class="p-button-text" />
			</template>
		</Dialog>
>>>>>>> d006e448b9d6399642f8f4c213d0ce9d096fc4dd
	</div>
  </template>
  
  <script setup>
  import Ciudadano from '@/assets/images/Ciudadano.svg';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useEventStore } from '@/stores/storedataOff.js';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  
  const searchCedula = ref('');
  const noResultsModal = ref(false);
  const modalMessage = ref('');
  const loading = ref(false);
  const router = useRouter();
  const eventStore = useEventStore();
  
  const searchUser = async () => {
  if (!searchCedula.value.trim()) {
    noResultsModal.value = true;
    modalMessage.value = "Por favor, ingrese un número de documento.";
    return;
  }

<<<<<<< HEAD
  loading.value = true;
  try {
    const results = await eventStore.searchByCedula(searchCedula.value);
    if (results.length > 0) {
      router.push({
        name: "RutaAccionPage",
        params: {
          cedula: searchCedula.value,
        },
      });
    } else {
      noResultsModal.value = true;
      modalMessage.value = `No se encontraron resultados con el documento: ${searchCedula.value}`;
    }
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    noResultsModal.value = true;
    modalMessage.value = "Ocurrió un error al realizar la búsqueda.";
  } finally {
    loading.value = false;
  }
=======
<script setup>
import Ciudadano from "@/assets/images/Ciudadano.svg";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useEventStore } from "@/stores/storedataOff.js";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const searchCedula = ref("");
const noResultsModal = ref(false);
const modalMessage = ref("");
const loading = ref(false);
const router = useRouter();
const eventStore = useEventStore();

// Modifica para usar la API
const searchUser = async () => {
	if (!searchCedula.value.trim()) {
		noResultsModal.value = true;
		modalMessage.value = "Por favor, ingrese un número de cédula.";
		return;
	}

	loading.value = true;
	const results = await eventStore.searchByCedula(searchCedula.value);

	if (results.length > 0) {
		router.push({
			name: "RutaAccionPage",
			params: { cedula: searchCedula.value },
		});
	} else {
		noResultsModal.value = true;
		modalMessage.value = `No se encontraron resultados con la cédula: ${searchCedula.value}`;
	}

	loading.value = false;
>>>>>>> d006e448b9d6399642f8f4c213d0ce9d096fc4dd
};

  </script>
  