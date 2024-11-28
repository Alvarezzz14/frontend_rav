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
				<!-- Sección Central (Información del ciudadano) -->
				<div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
					<!-- Ícono -->
					<div class="flex items-center gap-2">
						<div>
							<svg
								width="40"
								height="50"
								viewBox="0 0 50 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M24.0939 0.027541C11.1836 0.766707 4.40665 15.6399 12.4454 25.7735C19.4536 34.6085 33.3544 33.4898 38.9046 23.7258C45.1034 12.8181 36.6423 -0.691648 24.0939 0.027541ZM0.329441 59.9949H49.623C49.8945 59.7252 49.6682 59.2757 49.6582 58.9461C49.5777 56.334 49.7436 54.1815 49.2308 51.5594C47.6171 43.2838 41.554 36.2267 33.5856 33.3699C28.1661 35.967 21.8064 35.962 16.3819 33.3799C8.53917 36.1668 2.51133 43.059 0.802015 51.1699C0.36966 53.2126 0.304304 54.9206 0.294249 56.9883C0.294249 57.9372 0.238948 58.8962 0.243975 59.8401C0.243975 59.93 0.249003 59.94 0.329441 59.9999V59.9949Z"
									fill="#7A1F7E" />
								<path
									d="M0.329118 59.9945C0.24868 59.9345 0.243652 59.9246 0.243652 59.8347C0.243652 58.8907 0.288899 57.9318 0.293926 56.9829C0.303981 54.9152 0.369337 53.2071 0.801692 51.1644C2.511 43.0536 8.53884 36.1663 16.3816 33.3745C21.8061 35.9566 28.1658 35.9616 33.5853 33.3645C41.5537 36.2263 47.6167 43.2783 49.2305 51.554C49.7433 54.176 49.5774 56.3286 49.6579 58.9407C49.6679 59.2753 49.8941 59.7198 49.6227 59.9895H0.329118V59.9945Z"
									fill="#7A1F7E" />
								<path
									d="M24.094 0.027541C36.6423 -0.691648 45.0984 12.8181 38.9046 23.7258C33.3544 33.4898 19.4537 34.6086 12.4454 25.7735C4.40665 15.6399 11.1836 0.766707 24.0939 0.027541Z"
									fill="#7A1F7E" />
							</svg>
						</div>
						<div>
							<h3>Ciudadano: Jhon Doe</h3>
							<h3>Ciudadano: 12345678</h3>
						</div>
					</div>
				</div>
			</div>
			<!-- Botón Crear Ticket (al lado de la información del ciudadano) -->
			<button
				class="bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center"
				style="width: 120px; height: 110px">
				<img :src="personwhite" alt="Persona" class="w-15 h-15 mb-2" />
				<span class="text-sm">Regresar a Perfil del Ciudadano</span>
			</button>
		</div>

		<!-- Contenedor de Lista -->

		<div class="mt-4 bg-white rounded-lg shadow p-4">
			<ul
				class="list-none text-center space-y-4 sm:text-left sm:pl-5 sm:space-y-0">
				<li class="flex flex-col items-center sm:flex-row sm:items-start pb-2">
					<span
						class="bg-customPurple text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mb-2 sm:mb-0 sm:mr-2">
						1
					</span>
					<span
						>Ingrese un nombre en la casilla de
						<span class="font-bold">Título.</span></span
					>
				</li>
				<li class="flex flex-col items-center sm:flex-row sm:items-start pb-2">
					<span
						class="bg-customPurple text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mb-2 sm:mb-0 sm:mr-2">
						2
					</span>
					<span
						>Registre la actividad o información otorgada al ciudadano en la
						sección de <span class="font-bold">Descripción.</span></span
					>
				</li>
				<li class="flex flex-col items-center sm:flex-row sm:items-start pb-2">
					<span
						class="bg-customPurple text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mb-2 sm:mb-0 sm:mr-2">
						3
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

			<!-- Botones de Palabra Clave -->
			<div class="grid grid-cols-2 sm:grid-cols-7 gap-2 w-full">
				<button
					v-for="(keyword, index) in keywords"
					:key="index"
					class="bg-gray-200 text-black py-2 w-full border-none rounded-md text-sm hover:bg-customPurple hover:text-white hover:font-bold focus:bg-customPurple focus:text-white focus:font-bold"
					@click="addToKeywords(keyword)">
					{{ keyword }}
				</button>
				<button
					class="bg-amarillo text-customPurple py-2 w-full border-none rounded-md text-sm hover:bg-yellow-500 focus:bg-yellow-500">
					Ver más +
				</button>
			</div>

			<!-- Campo Título -->
			<input
				type="text"
				class="w-full bg-gray-100 h-10 border-none text-black placeholder-gray-700 rounded-sm p-2 mt-4"
				placeholder="Título:"
				name="titulo"
				v-model="title" />

			<!-- Campo Descripción -->
			<textarea
				v-model="content"
				class="w-full bg-gray-100 h-32 border-none text-black placeholder-gray-700 rounded-sm p-2 mt-2"
				id="descripcion"
				placeholder="Descripción:"></textarea>


			<!-- Botón Enviar -->
			<button
				class="bg-customPurple border-none w-full h-12 text-amarillo font-bold p-2 rounded-sm shadow flex justify-center items-center mt-4"
				@click="() => sendTicker(fetchOptions)">
				Enviar
			</button>
		</div>
	</div>
</template>
<script setup>
import Actividad from "@/assets/images/Actividad.png";
import personwhite from "@/assets/images/UserWhite.svg";
import { computed, ref } from "vue";
import { useEventStore } from "../stores/storedataOff";
import { useAuthStore } from "../stores/auth";

// Lista de palabras clave
const keywords = [
	"Palabra 1",
	"Palabra clave 2",
	"Palabra clave 3",
	"Palabra clave 4",
	"Palabra clave 5",
	"Palabra clave 4",
];

// Variable reactiva para la descripción
const authStore = useAuthStore();
const eventStore = useEventStore();
const content = ref("");
const title = ref("");
const keyWords = ref("");
console.log(authStore.getAuthenticatedUser.user_id);
const user_id = authStore.getAuthenticatedUser.user_id;

const documentNumber = computed(() => eventStore.userInfo.documento);

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

// Función para añadir la palabra clave al campo de descripción
const addToKeywords = (keyword) => {
	keyWords.value += `${keyword},`;
	console.log(keyWords.value);
};

const createBodyFetch = () => {
	return {
		id_ticket: window.Date.now(),
		titulo: title.value,
		contenido: content.value,
		palabras_clave: keyWords.value,
		numero_documento: documentNumber.value,
		id_usuario: user_id,
	};
};

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
	} catch (error) {
		if (!error.error) error.error = true;
		console.log(error);
	} finally {
		keyWords.value = "";
	}
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
