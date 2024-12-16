<template>
	<div>
		<div class="flex flex-col sm:flex-row items-center sm:justify-between p-4">
			<!-- Sección Izquierda (Icono y Título) -->
			<div class="flex items-center mb-4 sm:mb-0">
				<div class="p-4 bg-customPurple rounded-full">
					<img
						:src="Actividad"
						alt="Icono de Actividad"
						width="50"
						height="50" />
				</div>
				<div class="ml-4">
					<p class="text-black mb-0 text-lg sm:text-2xl">Registro de</p>
					<h2 class="text-customPurple text-3xl sm:text-5xl mt-0 font-bold">
						Actividad
					</h2>
				</div>
			</div>

			<!-- Contenedor de la información del ciudadano y el botón Crear Ticket en una misma fila -->
			<div class="flex items-center space-x-4">
				<div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
					<div class="flex items-center gap-2">
						<div>
							<svg
								width="40"
								height="50"
								viewBox="0 0 50 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<!-- Ícono SVG -->
							</svg>
						</div>
						<div>
							<h3>Ciudadano: {{ personFullName }}</h3>
							<h3>Ciudadano: {{ documentNumber }}</h3>
						</div>
					</div>
				</div>
			</div>

			<router-link
				:to="{ name: 'PerfilCiudadanoPage' }"
				class="bg-customPurple border-none no-underline text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center"
				style="width: 120px; height: 110px">
				<img :src="personwhite" alt="Persona" class="w-15 h-15 mb-2" />
				<span class="text-sm">Regresar a Perfil del Ciudadano</span>
			</router-link>
		</div>

		<div class="mt-4 bg-white rounded-lg shadow p-4">
			<ul
				class="list-none text-center space-y-4 sm:text-left sm:pl-5 sm:space-y-0">
				<li class="flex flex-col items-center sm:flex-row sm:items-start pb-2">
					<span
						class="bg-customPurple text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mb-2 sm:mb-0 sm:mr-2">
						1
					</span>
					<span
						>Seleccione las palabras Claves Referente a la Actividad
						<span class="font-bold">Palabras Claves.</span></span
					>
				</li>
				<li class="flex flex-col items-center sm:flex-row sm:items-start pb-2">
					<span
						class="bg-customPurple text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mb-2 sm:mb-0 sm:mr-2">
						2
					</span>
					<span
						>Ingrese un nombre en la casilla de
						<span class="font-bold">Título.</span></span
					>
				</li>
				<li class="flex flex-col items-center sm:flex-row sm:items-start pb-2">
					<span
						class="bg-customPurple text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mb-2 sm:mb-0 sm:mr-2">
						3
					</span>
					<span
						>Registre la actividad o información otorgada al ciudadano en la
						sección de <span class="font-bold">Descripción.</span></span
					>
				</li>
				<li class="flex flex-col items-center sm:flex-row sm:items-start pb-2">
					<span
						class="bg-customPurple text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mb-2 sm:mb-0 sm:mr-2">
						4
					</span>
					<span
						>Una vez completa la información, presiona
						<span class="font-bold">Enviar.</span></span
					>
				</li>
			</ul>
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
					</button>

					<!-- Opciones desplegables -->
					<div
						v-if="activeCategory === index"
						class="absolute bottom-full mb-2 bg-white shadow-md rounded-md p-2 w-full z-10 grid gap-2">
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
				class="bg-customPurple border-none w-full h-12 text-amarillo font-bold p-2 rounded-sm shadow flex justify-center items-center mt-4"
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
					class="absolute top-4 right-4 text-customPurple border-none rounded-full p-2 font-bold hover:bg-customPurple hover:text-white">
					✕
				</button>
				<div class="text-center">
					<h2 class="text-xl font-bold mb-4 text-black">
						¡Ticket creado exitosamente!
					</h2>
					<button
						@click="closeSuccessModal"
						class="bg-customPurple text-white py-2 px-4 rounded-lg">
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
import { onMounted, ref } from "vue";
import { useEventStore } from "../stores/storedataOff";
import { useAuthStore } from "../stores/auth";
import { categories as staticCategories } from "@/data/palabrasClaves";

// Variables reactivas
const showSuccessModal = ref(false); // Controla la visibilidad del modal de éxito
const content = ref("");
const title = ref("");
const keyWords = ref("");
const categories = ref(staticCategories);
let user_id;
const documentNumber = ref("");
const personFullName = ref("");

const authStore = useAuthStore();
const eventStore = useEventStore();
const selectedKeywords = ref([]);

const fetchOptions = {
	url: "http://localhost:8082/api/v1/victimas/ticket",
	options: {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	},
};

// Estado para manejar la categoría activa
const activeCategory = ref(null);

// Función para alternar el menú desplegable
const toggleCategory = (index) => {
	activeCategory.value = activeCategory.value === index ? null : index;
	console.log("Categoría activa:", activeCategory.value);
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
		numero_documento: parseInt(documentNumber.value),
		id_usuario: user_id,
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
	documentNumber.value = eventStore.getUserInfo().documento;
	user_id = authStore.getAuthenticatedUser().user_id;
	personFullName.value = eventStore.getUserInfo().nombrecompleto;
});
</script>
