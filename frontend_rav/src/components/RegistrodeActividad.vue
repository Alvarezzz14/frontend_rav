<template>
	<div>
		<div class="flex flex-col sm:flex-row items-center sm:justify-between mt-2">
			<!-- Sección Izquierda (Icono y Título) -->
			<div class="flex items-center sm:mb-0">
				<img
					:src="ticketRegistroActividad"
					alt="Icono de Actividad"
					width="30"
					height="30" />
				<h2 class="text-blue-950 ms-2 xl:text-3xl text-md">Registro de actividad</h2>
			</div>
		</div>

		<div class="lg:flex max-xl:flex-col hidden gap-3 mb-5">
			<!-- Sección Derecha (Botón) -->
			<router-link
				:to="{ name: 'PerfilCiudadanoPage' }"
				class="bg-azulApe h-9 rounded-menu no-underline px-3  flex items-center gap-2 max-xl:w-6/12">
				<img :src="arrowBack" alt="volver">
				<span class="text-white font-bold text-sm text-center items-center justify-center"
					>Regresar a perfil del ciudadano</span
				>
			</router-link>
			

			<!-- Recuadro Blanco (Información del ciudadano) -->
			<div class="flex items-center gap-5 text-xl">

				<div class="ms-3">
					<span class="text-blue-950  font-bold">Ciudadano: </span>
					<span>{{ userInfo.nombrecompleto }}</span>
				</div>
				<div class="ms-2">
					<span class="text-blue-950 font-bold"> Cédula: </span>
					<span>{{ userInfo.documento }}</span>
				</div>
			</div>
		</div>

		<section class="mt-4 bg-azul-gradian rounded-3xl shadow-lg p-4">
			<div class="outline outline-1 outline-yellow-400 rounded-2xl flex xl:flex-row flex-col gap-5 justify-evenly text-white py-6 xl:px-2 px-1">
				<div class="flex items-center gap-3">
					<img :src="imgIndicativa1" class="w-20 flex-shrink-0" alt="imagen indicativa ingresar el titulo en la casilla">
					<p class="text-sm">Ingrese un nombre en la casilla de <strong>Título.</strong></p>
				</div>
				<div class="flex items-center gap-3 flex-2">
					<img :src="imgIndicativa2" class="w-20 flex-shrink-0" alt="imagen indicativa ingresar el titulo en la casilla">
					<p class="text-sm">Registre la actividad o información otorgada al ciudadano en la sección de <strong>Descripción.</strong></p>
				</div>
				<div class="flex items-center gap-3">
					<img :src="imgIndicativa3" class="w-20 flex-shrink-0" alt="imagen indicativa ingresar el titulo en la casilla">
					<p class="text-sm">Una vez completa la información, presiona <strong>Enviar.</strong></p>
				</div>
			</div>
		</section>

		<section class="mt-4 bg-white rounded-lg shadow p-4 mx-auto w-full sm:w-auto text-blue-950">
			<h2 class="text-center xl:text-left font-bold text-lg mb-4 text-blue-950">Crear Ticket</h2>

			<div class="flex flex-row flex-wrap gap-3 items-center xl:justify-start justify-center" v-if="screenSize === 'desktop'">
				<label v-for="(keyword, keywordIndex) in categories[0].keywords" :key="keywordIndex" class="flex bg-[#eef5ff] rounded-menu py-2 px-2 cursor-pointer">
					<input type="checkbox" class="me-3">
					{{ keyword  }}
				</label>
				<button @click="showKeyWordsModal = true" class="!bg-yellow-300 text-blue-950 font-bold px-20 rounded-menu border-0 py-2 cursor-pointer">Ver más +</button>
			</div>
			<div v-else class="flex flex-wrap gap-3 [&_button]:rounded-menu [&_button]:bg-gray-100 [&_button]:border-0  [&_button]:py-3">
				<button v-for="(keyword, keywordIndex) in categories[0].keywords" :key="keywordIndex" class="px-3">{{ keyword }}</button>	
				<button @click="showKeyWordsModal = true" class="!bg-yellow-300 text-blue-950 font-bold px-6">Ver más +</button>
			</div>

			<input
				type="text"
				class="w-full bg-[#eef5ff] h-10 border-none placeholder-blue-950 rounded-menu p-4 mt-4"
				placeholder="Título:"
				name="titulo"
				v-model="title" />

			<textarea
				v-model="content"
				class="w-full bg-[#eef5ff] h-32 border-none placeholder-blue-950 rounded-menu p-4 mt-2"
				id="descripcion"
				placeholder="Descripción:"></textarea>

			<button
				@click="() => sendTicker(fetchOptions)"
				class="bg-verde-gradient border-none lg:w-2/12 w-full h-8 ms-auto text-white cursor-pointer font-bold p-2 rounded-menu shadow flex justify-center items-center mt-4">
				Enviar
			</button>
		</section>

		<!-- Modal de éxito -->
		<div
			v-if="showSuccessModal"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
			<div class="bg-white shadow-lg rounded-lg w-full max-w-lg p-6 relative">
				<button
					@click="closeSuccessModal"
					class="absolute top-4 right-4 cursor-pointer text-customPurple border-none rounded-full p-2 font-bold hover:bg-customPurple hover:text-white">
					✕
				</button>
				<div class="text-center">
					<h2 class="text-xl font-bold mb-4 text-black">
						¡Ticket creado exitosamente!
					</h2>
					<button
						@click="closeSuccessModal"
						class="bg-customPurple text-white py-2 px-4 rounded-lg cursor-pointer">
						Aceptar
					</button>
				</div>
			</div>
		</div>
		<Modal
		:showModal="showKeyWordsModal"
		title="Listado de palabras clave"
		@close="showKeyWordsModal = false"
		>
			<div class="space-y-2 mx-2">
				<label v-for="(keyword, keywordIndex) in dataKeyWords" :key="keywordIndex" class="flex bg-[#eef5ff] rounded-menu py-2 px-2 cursor-pointer">
					<input type="checkbox" class="me-3">
					{{ keyword }}
				</label>
				<button
				@click="() => sendTicker(fetchOptions)"
				class="bg-verde-gradient border-none w-full h-8 ms-auto text-white cursor-pointer font-bold p-2 rounded-menu shadow flex justify-center items-center mt-4">
				Enviar
			</button>
			</div>
		</Modal>
	</div>
</template>
<script setup>
import Actividad from "@/assets/images/Actividad.png";
import personwhite from "@/assets/images/UserWhite.svg";
import { onMounted, ref, computed, watch } from "vue";
import { useEventStore } from "@/stores/storedataOff";
import { useAuthStore } from "@/stores/auth";
import { categories as staticCategories } from "@/data/palabrasClaves";
import ticketRegistroActividad from "@/assets/images/ticketRegistroActividad.svg"
import arrowBack from "@/assets/images/arrowBack.svg";
import imgIndicativa1 from "@/assets/images/img-indicativa-casilla-titulo.avif"
import imgIndicativa2 from "@/assets/images/img-indicativa-descripcion.avif"
import imgIndicativa3 from "@/assets/images/img-indicativa-enviar.avif"
import { useResponsive } from "@/composables";
import Modal from "./Modal.vue";

// Variables reactivas
const showSuccessModal = ref(false); // Controla la visibilidad del modal de éxito
const content = ref("");
const title = ref("");
const keyWords = ref("");
const categories = ref(staticCategories);
const authStore = useAuthStore();
const eventStore = useEventStore();
const selectedKeywords = ref([]);
const dataKeyWords = ref([]);
const host = import.meta.env.VITE_HOST;
const { screenSize } = useResponsive()
const showKeyWordsModal = ref(false)

const user = computed(() => authStore.authenticatedUser.user);

const userInfo = ref({
	nombrecompleto: "Juan Pérez García",
	documento: "1234567890"
});

const fetchOptions = {
	url: `${host}:8082/api/v1/victimas/ticket`,
	options: {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	},
};

console.log("Contenido de userInfo:", userInfo);
// Estado para manejar la categoría activa
const activeCategory = ref(null);

// Función para alternar el menú desplegable
const toggleCategory = (index) => {
	activeCategory.value = activeCategory.value === index ? null : index;
};

const toggleKeyword = (keyword) => {
	const index = selectedKeywords.value.indexOf(keyword);
	if (index === -1) {
		selectedKeywords.value.push(keyword);
		console.log(`Palabra clave añadida: ${keyword}`, selectedKeywords.value);
	} else {
		selectedKeywords.value.splice(index, 1);
		console.log(`Palabra clave eliminada: ${keyword}`, selectedKeywords.value);
	}
};

// Función para añadir la palabra clave al campo de descripción
const addToKeywords = (keyword) => {
	keyWords.value += `${keyword},`;
};

// Crear el cuerpo para el fetch
const createBodyFetch = () => {
	return {
		id_ticket: window.Date.now(),
		titulo: title.value,
		contenido: content.value,
		palabras_clave: selectedKeywords.value.join(", "),
		numero_documento: parseInt(userInfo.value.documento),
		id_usuario: authStore.authenticatedUser?.user_id || null,
	};
};

// Función para enviar el ticket y mostrar el modal de éxito
const sendTicker = async (fetchOptions) => {
	const body = createBodyFetch();
	const { url, options } = fetchOptions;
	options.body = JSON.stringify(body);

	try {
		const response = await fetch(url, options);
		const json = await response.json();
		if (!response.ok)
			throw {
				error: true,
				errorStatus: response.status,
				errorMsg: response.statusText,
			};
		console.log(json);
		showSuccessModal.value = true; // Mostrar el modal de éxito
		resetForm(); //reestablecer Formulario
	} catch (error) {
		if (!error.error) error.error = true;
		console.log(error);
	} finally {
		keyWords.value = "";
	}
};

// Cerrar el modal de éxito
const closeSuccessModal = () => {
	showSuccessModal.value = false; // Ocultar el modal
};

const resetForm = () => {
	// Restablecer todas las variables del formulario
	selectedKeywords.value = [];
	title.value = "";
	content.value = "";
	activeCategory.value = null;
};

onMounted(() => {
	authStore.initializeAuth();
	for (let index = 1; index < categories.value.length; index++) {
		for (let j = 0; j < categories.value[index].keywords.length; j++){
			dataKeyWords.value.push(categories.value[index].keywords[j]);
		}
	}
});
</script>

<style scoped>
.arrow {
	transition: transform 0.3s ease-in-out;
}

.arrow.rotate {
	transform: rotate(180deg);
}
</style>
