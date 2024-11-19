<template> 
<div class="block lg:flex items-center justify-center p-6 bg-grisFondo h-full">
	 <div class="flex flex-col items-center lg:items-center lg:w-2/3 lg:pl-10"> 
		<div class="mb-4 w-2/3">
			 <p class="text-xl lg:text-3xl font-medium text-inherit"> Aquí podrás visualizar información acerca de la </p> 
			<h2 class="lg:text-6xl font-bold text- text-azulBarraApe"> Ruta de Atención al Ciudadano. </h2>
		 </div> 
		 <div class="w-full lg:w-2/3 bg-white p-5 rounded-2xl shadow-lg">
			 <div class="flex flex-col items-center">
                    <input
                        v-model="searchCedula"
                        @keydown.enter="searchUser"
                        type="text"
                        placeholder="Ingrese número de documento"
                        class="w-full p-4 border text-black border-none rounded-lg bg-grisFondo" />
                    <Button
                        type="button"
                        label="Buscar"
                        icon="pi pi-search"
                        :loading="loading"
                        class="mt-4 w-full p-4  !hover:bg-purple-600 !border-none !bg-azulBarraApe !text-yellow-500 "
                        @click="searchUser" />
                </div>
            </div>
        </div>
    <div class="flex items-center justify-center lg:w-2/3">
            <img src="@/assets/images/CiudadanoRutaAtencion.svg" alt="Persona sonriendo" class="rounded-lg object-cover w-2/3 max-h-96 xl:max-h-full" />
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
import CiudadanoRutaAtencion from '@/assets/images/CiudadanoRutaAtencion.svg';
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
            name: "PerfilUsuarioPage",
            params: { userInfo: results },
        });
    } else {
        noResultsModal.value = true;
        modalMessage.value = `No se encontraron resultados con la cédula: ${searchCedula.value}`;
    }

    loading.value = false;
};
</script>
