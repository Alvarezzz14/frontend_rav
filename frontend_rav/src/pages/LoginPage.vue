<template>
	<div>
		<Header />
		<div
			class="min-h-screen bg-customPurple flex"
			:style="{
				backgroundImage: backgroundUrl,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}">
			<!-- Columna izquierda con el formulario de login -->
			<div
				class="md:w-1/2 w-full flex flex-col justify-center items-center p-6 bg-black/70 md:bg-transparent">
				<!-- Logo -->
				<img :src="Logo" alt="Logo RAV" class="w-40 md:w-64 h-auto mb-6" />

				<!-- Título de inicio de sesión -->
				<h2 class="text-xl md:text-3xl font-semibold text-white text-center">
					Iniciar Sesión
				</h2>

				<!-- Formulario de login -->
				<form
					@submit.prevent="submit"
					class="space-y-4 w-full max-w-sm mx-auto mt-6">
					<div>
						<input
							type="email"
							id="correo"
							placeholder="Correo"
							v-model="form.email"
							class="block w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple"
							required />
					</div>

					<div class="relative">
						<input
							:type="showPassword ? 'text' : 'password'"
							id="password"
							placeholder="Contraseña"
							v-model="form.password"
							class="block w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple"
							required />
						<button
							type="button"
							@click="togglePassword"
							class="absolute top-1/4  bg-white right-2.5 border-none transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
						>
							<!-- Íconos de mostrar/ocultar -->
							<svg
								v-if="showPassword"
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8a10.05 10.05 0 01.875-3.825M16.625 4.575A10.05 10.05 0 0112 5c4.418 0 8 3.582 8 8a10.05 10.05 0 01-.875 3.825M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
								/>
							</svg>
							<svg
								v-else
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.273.98-.674 1.887-1.175 2.688M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</button>
					</div>

					<!-- Botón de iniciar sesión -->
					<button
						type="submit"
						class="w-full py-3 text-lg bg-amarillo border-none text-customPurple font-bold cursor-pointer rounded-lg"
						:disabled="isLoading">
						<span v-if="!isLoading">Iniciar</span>
						<span v-else>Cargando...</span>
					</button>
				</form>

				<!-- Logos institucionales -->
				<div class="flex justify-center space-x-8 mt-6">
					<img :src="logoSena" alt="Logo SENA" class="w-24 md:w-36 h-auto" />
				</div>
			</div>

			<!-- Right column with background image -->
			<div class="hidden md:block md:w-1/2"></div>
		</div>
		<Footer />
	</div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import axios from "axios";
import { useToast } from "vue-toastification";
import Logo from "@/assets/images/logorav.svg";
import logoSena from "@/assets/images/logosInstitucionales.svg";
import loginFinal from "@/assets/images/loginFinal.png";
import smallScreenLogin from "@/assets/images/pantallaspequeñaslogin.png";

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const form = reactive({
	email: "",
	password: "",
});

const host = import.meta.env.VITE_HOST;

const authStore = useAuthStore();
const errorMessage = ref("");
const isLoading = ref(false);
const backgroundUrl = ref(""); // Variable para almacenar la URL de fondo
const router = useRouter();
const toast = useToast();
const showPassword = ref(false); // Estado para mostrar u ocultar la contraseña

const togglePassword = () => {
	showPassword.value = !showPassword.value;
};

onMounted(() => {
	const screenWidth = window.innerWidth;
	backgroundUrl.value =
		screenWidth <= 640 ? `url(${smallScreenLogin})` : `url(${loginFinal})`;

	window.addEventListener("resize", () => {
		const newScreenWidth = window.innerWidth;
		backgroundUrl.value =
			newScreenWidth <= 640 ? `url(${smallScreenLogin})` : `url(${loginFinal})`;
	});
});

async function submit() {
	isLoading.value = true;
	try {
		const response = await axios.post(`${host}:8080/login`, form);
		console.log(response.data);

		authStore.setAuthenticatedUser(response.data);
		toast.success("Inicio de sesión exitoso.");
		router.push("/");
	} catch (error) {
		errorMessage.value =
			error.response?.data?.error || "Error en el inicio de sesión.";
	} finally {
		isLoading.value = false;
	}
}
</script>



<style scoped>
button {
	transition: background-color 0.3s ease;
}

input {
	border: none;
	/* Quitar bordes visibles */
}

input:focus {
	outline: none;
}
</style>
