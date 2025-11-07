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
				<h2 class="text-blue-950 ms-2 text-3xl">Ruta de atención al ciudadano</h2>
			</div>
		</div>

		<div class="flex gap-3 mb-5">
			<!-- Sección Derecha (Botón) -->
			<router-link
				:to="{ name: 'PerfilCiudadanoPage' }"
				class="bg-azulApe h-9 rounded-menu no-underline px-3  flex items-center gap-2">
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

		<div class="mt-4 bg-azul-gradian rounded-lg shadow p-4">
			<div class="border border-yellow-400 flex">
				<div>

				</div>
			</div>
		</div>

		<div class="mt-4 bg-white rounded-lg shadow p-4 mx-auto w-full sm:w-auto">
			<h2 class="text-left font-bold text-lg mb-4">CREAR TICKET</h2>
			<p>Palabras Clave:</p>

			<div class="grid grid-cols-2 sm:grid-cols-7 gap-2 w-full">
				<div
					v-for="(category, index) in categories"
					:key="index"
					class="relative flex flex-col items-center w-full">
					<!-- Botón de Categoría -->
					<button
						class="bg-gray-100 text-black py-2 w-full cursor-pointer border-none rounded-md text-xs"
						@click="toggleCategory(index)">
						{{ category.name }}

						<!-- Flecha indicadora -->
						<svg
							class="w-4 h-4 arrow"
							:class="{ rotate: activeCategory === index }"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="#005DCA">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					<!-- Opciones desplegables -->
					<div
						v-if="activeCategory === index"
						class="absolute bottom-full mb-2 bg-white shadow-md rounded-md p-2 w-full z-10 grid gap-2 transition-all duration-300">
						<button
							v-for="(keyword, keywordIndex) in category.keywords"
							:key="keywordIndex"
							:class="[
								'py-2 w-full border-none rounded-md text-xs cursor-pointer',
								selectedKeywords.includes(keyword)
									? 'bg-customPurple text-white font-bold'
									: 'bg-gray-100 text-black ',
							]"
							@click="toggleKeyword(keyword)">
							{{ keyword }}
						</button>
					</div>
				</div>
			</div>

			<input
				type="text"
				class="w-full bg-gray-100 h-10 border-none text-black placeholder-gray-700 rounded-sm p-2 mt-4"
				placeholder="Título:"
				name="titulo"
				v-model="title" />

			<textarea
				v-model="content"
				class="w-full bg-gray-100 h-32 border-none text-black placeholder-gray-700 rounded-sm p-2 mt-2"
				id="descripcion"
				placeholder="Descripción:"></textarea>

			<button
				class="bg-customPurple border-none w-full h-12 text-amarillo cursor-pointer font-bold p-2 rounded-sm shadow flex justify-center items-center mt-4"
				@click="() => sendTicker(fetchOptions)">
				Enviar
			</button>
		</div>

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
	</div>
</template>
<script setup>
import Actividad from "@/assets/images/Actividad.png";
import personwhite from "@/assets/images/UserWhite.svg";
import { onMounted, ref, computed } from "vue";
import { useEventStore } from "@/stores/storedataOff";
import { useAuthStore } from "@/stores/auth";
import { categories as staticCategories } from "@/data/palabrasClaves";
import ticketRegistroActividad from "@/assets/images/ticketRegistroActividad.svg"
import arrowBack from "@/assets/images/arrowBack.svg";
import imgIndicativa1 from "@/assets/images/img-indicativa-casilla-titulo.avif"

// Variables reactivas
const showSuccessModal = ref(false); // Controla la visibilidad del modal de éxito
const content = ref("");
const title = ref("");
const keyWords = ref("");
const categories = ref(staticCategories);
const authStore = useAuthStore();
const eventStore = useEventStore();
const selectedKeywords = ref([]);
const host = import.meta.env.VITE_HOST;

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
