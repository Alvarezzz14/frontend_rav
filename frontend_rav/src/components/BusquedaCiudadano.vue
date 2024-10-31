<template>
	<div
		class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
		<!-- Imagen del ciudadano a la izquierda -->
		<div class="lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0">
			<img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />
		</div>

		<!-- Texto y campo de búsqueda a la derecha -->
		<div class="flex flex-col items-center lg:items-start lg:w-2/3 lg:pl-10">
			<!-- Texto de información -->
			<div class="mb-6">
				<p class="text-xl lg:text-3xl font-medium text-inherit">
					Aquí podrás visualizar información acerca de la
				</p>
				<h2 class="lg:text-5xl font-bold text-customPurple">
					Ruta de Atención al Ciudadano.
				</h2>
			</div>

			<!-- Sección de búsqueda -->
			<div class="w-full lg:w-2/3 bg-white p-5 rounded-2xl shadow-lg">
				<div class="flex flex-col items-center">
					<input
						v-model="searchCedula"
						@keydown.enter="searchUser"
						type="text"
						placeholder="Ingrese número de cédula"
						class="w-full p-4 border text-customPurple border-customPurple rounded-lg" />
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
			:style="{ width: '30rem' }">
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
	</div>
</template>

<script setup>
import Ciudadano from "@/assets/images/Ciudadano.svg";
import { ref, computed } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useEventStore } from "@/stores/storedataOff.js";

const searchCedula = ref("");
const searchResults = ref(null); // Data para la línea de tiempo
const searching = ref(false); // Flag para mostrar mensaje de no encontrado
const noResultsModal = ref(false); // Estado del diálogo para no encontrado
const modalMessage = ref(""); // Guardar mensaje dinámico del modal

//INstancia Router y Store
const router = useRouter();
const eventStore = useEventStore();

const loading = ref(false);

// Simulación de búsqueda por número de cédula
const searchUser = () => {
	if (!searchCedula.value.trim()) {
		noResultsModal.value = true; // Mostrar modal si el campo está vacío
		modalMessage.value = "Por favor, ingrese un número de cédula.";
		return; // Detener el flujo si no se ha ingresado una cédula
	}

	loading.value = true; // Iniciar carga
	searching.value = true;

	setTimeout(() => {
		// Buscar eventos en el store usando la cédula ingresada
		const results = eventStore.searchByCedula(searchCedula.value);

		if (results.length > 0) {
			// Si se encuentran eventos, redirigir a la página de detalles
			router.push({
				name: "RutaAccionPage",
				params: { cedula: searchCedula.value },
			});
		} else {
			searchResults.value = null; // No encontrado
			noResultsModal.value = true; // Mostrar modal de no encontrado
			modalMessage.value = `No se encontraron resultados con la cédula:`;
		}

		loading.value = false; // Finalizar carga
		searching.value = false;
	}, 700); // Simula el tiempo de búsqueda
};
</script>
