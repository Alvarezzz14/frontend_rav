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
			</div>
			<div class="flex gap-3">
				<!-- Recuadro Blanco (Información del ciudadano) -->
				<div class="bg-white p-4 rounded-lg shadow-custom flex items-center">
					<svg
						width="50"
						height="60"
						viewBox="0 0 50 60"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M24.0939 0.027541C11.1836 0.766707 4.40665 15.6399 12.4454 25.7735C19.4536 34.6085 33.3544 33.4898 38.9046 23.7258C45.1034 12.8181 36.6423 -0.691648 24.0939 0.027541ZM0.329441 59.9949H49.623C49.8945 59.7252 49.6682 59.2757 49.6582 58.9461C49.5777 56.334 49.7436 54.1815 49.2308 51.5594C47.6171 43.2838 41.554 36.2267 33.5856 33.3699C28.1661 35.967 21.8064 35.962 16.3819 33.3799C8.53917 36.1668 2.51133 43.059 0.802015 51.1699C0.36966 53.2126 0.304304 54.9206 0.294249 56.9883C0.294249 57.9372 0.238948 58.8962 0.243975 59.8401C0.243975 59.93 0.249003 59.94 0.329441 59.9999V59.9949Z"
							fill="#005DCA" />
						<path
							d="M0.329118 59.9945C0.24868 59.9345 0.243652 59.9246 0.243652 59.8347C0.243652 58.8907 0.288899 57.9318 0.293926 56.9829C0.303981 54.9152 0.369337 53.2071 0.801692 51.1644C2.511 43.0536 8.53884 36.1663 16.3816 33.3745C21.8061 35.9566 28.1658 35.9616 33.5853 33.3645C41.5537 36.2263 47.6167 43.2783 49.2305 51.554C49.7433 54.176 49.5774 56.3286 49.6579 58.9407C49.6679 59.2753 49.8941 59.7198 49.6227 59.9895H0.329118V59.9945Z"
							fill="#005DCA" />
						<path
							d="M24.094 0.027541C36.6423 -0.691648 45.0984 12.8181 38.9046 23.7258C33.3544 33.4898 19.4537 34.6086 12.4455 25.7735C4.40671 15.6399 11.1887 0.766707 24.094 0.027541Z"
							fill="#005DCA" />
					</svg>

					<div class="w-82 h-20 ml-2 flex flex-col justify-center">
						<div class="">
							<span class="text-gray-800 font-semibold">Nombre: </span>
							<span>{{ userInfo.nombrecompleto }}</span>
						</div>
						<div class="">
							<span class="text-gray-600 font-semibold"> Cédula: </span>
							<span>{{ userInfo.documento }}</span>
						</div>
					</div>
				</div>

				<!-- Sección Derecha (Botón) -->

				<router-link
					:to="{ name: 'PerfilCiudadanoPage' }"
					class="flex flex-col justify-center w-32 h-28 bg-customPurple items-center rounded-md shadow-custom">
					<svg
						width="20"
						height="26"
						viewBox="0 0 20 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.63126 13.8217C14.859 14.1235 18.3818 8.45451 15.8015 3.87741C13.4892 -0.21976 7.6981 -0.689206 4.77847 3.01816C1.42947 7.27041 4.25486 13.5115 9.63126 13.8217Z"
							fill="white" />
						<path
							d="M19.9655 25.4999C19.998 25.4737 20 25.4693 20 25.4299C20 25.0164 19.9817 24.5963 19.9797 24.1805C19.9756 23.2747 19.9492 22.5264 19.7746 21.6315C19.0841 18.0781 16.6492 15.0607 13.4812 13.8376C11.29 14.9688 8.7211 14.971 6.53193 13.8333C3.31315 15.087 0.864044 18.1765 0.212165 21.8021C0.00502697 22.9508 0.0720416 23.8939 0.0395479 25.0382C0.0354871 25.1848 -0.0558978 25.3796 0.0537633 25.4977L19.9655 25.4977L19.9655 25.4999Z"
							fill="white" />
					</svg>
					<span class="text-white font-bold text-sm text-center"
						>Regresar a Perfil de la Víctima</span
					>
				</router-link>
			</div>
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
						>Registre la actividad o información otorgada a la Víctima en la
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

const userInfo = computed(() => eventStore.getUserInfo());

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
