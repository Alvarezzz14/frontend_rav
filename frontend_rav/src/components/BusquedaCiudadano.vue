<template>
	<div class="">
		<div class="flex flex-col items-center lg:pl-10">
			<div class="-mt-5">
				<!-- Titulo-->
				<p class="text-2xl text-center lg:text-4xl font-medium">
					Aquí podrás visualizar información acerca de la
				</p>
				<h2 class="text-3xl text-center -mt-5 font-bold text-customPurple">
					Ruta de Atención al Ciudadano.
				</h2>
			</div>
			<!-- Imagen Ciudadano-->
			<div class="relative mt-4 flex justify-center">
				<!-- Imagen -->
				<img
					:src="Ciudadano"
					alt="Ciudadano"
					class="object-cover h-96 lg:h-auto w-auto" />

				<!-- Contenedor con el botón encima -->
				<div class="absolute top-52 flex items-center justify-center">
					<div class="w-80 bg-white p-4 rounded-2xl shadow-custom">
						<div class="flex flex-col items-center">
							<input
								v-model="searchCedula"
								@keydown.enter="searchUser"
								type="text"
								placeholder="Digite el Documento de Identificación"
								class="w-72 h-10 border text-center text-black text-xs border-none bg-grisInput rounded-md" />
							<Button
								type="button"
								label="Buscar"
								:loading="loading"
								class="mt-3 w-72 h-10 text-base lg:w-auto !hover:bg-purple-600 !border-none !bg-customPurple text-white"
								@click="searchUser" />
						</div>
					</div>
				</div>
			</div>
		</div>
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
import Ciudadano from "@/assets/images/BusquedaCiudadano/personaBusquedaCiudadano.png";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useEventStore } from "@/stores/storedataOff.js";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import axios from "axios";

const searchCedula = ref("");
const noResultsModal = ref(false);
const modalMessage = ref("");
const loading = ref(false);
const router = useRouter();
const eventStore = useEventStore();

async function searchByCedula(cedula) {
	try {
		const response = await axios.get(
			`http://localhost:8082/api/v1/victimas/${cedula}`
		);
		return response.data; // Aquí accedemos directamente a los datos JSON
	} catch (error) {
		console.error("Error al buscar eventos por cédula:", error);
		return [];
	}
}

const searchUser = async () => {
	if (!searchCedula.value.trim()) {
		noResultsModal.value = true;
		modalMessage.value = "Por favor, ingrese un número de documento.";
		return;
	}

	loading.value = true;
	const results = await searchByCedula(searchCedula.value);

	console.log(results);
	if (Object.keys(results).length > 0) {
		eventStore.setUserInfo(results);
		router.push({
			name: "PerfilCiudadanoPage",
			params: { userInfo: results },
		});
	} else {
		noResultsModal.value = true;
		modalMessage.value = `No se encontraron resultados con la cédula: ${searchCedula.value}`;
	}

	loading.value = false;
};
</script>
