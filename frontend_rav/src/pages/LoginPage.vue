<template>
	<!-- Contenedor principal con el fondo CustomPurple -->
	<div class="min-h-screen bg-customPurple text-white flex flex-col">
		<!-- Header (barra superior) -->
		<Header></Header>

		<!-- Contenedor del grid -->
		<div
			class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 sm:p-8 z-50 lg:p-16">
			<!-- Columna izquierda: Logo, formulario y iconos -->
			<div class="flex flex-col justify-center items-center space-y-6">
				<!-- Logo responsive -->
				<div class="flex justify-center">
					<img
						:src="Logo"
						alt="Logo RAV"
						class="w-2/3 sm:w-1/2 md:w-1/3 lg:w-2/3 h-auto" />
				</div>

				<!-- Título de inicio de sesión -->
				<h2 class="text-2xl sm:text-3xl font-semibold text-center">
					Iniciar Sesión
				</h2>

				<!-- Formulario de login -->
				<form
					@submit.prevent="submit"
					class="space-y-4 w-full max-w-xs sm:max-w-sm mx-auto">
					<div
						v-if="errorMessage"
						class="bg-red-100 text-red-700 p-3 rounded-md">
						{{ errorMessage }}
					</div>

					<div>
						<label for="nombre" class="sr-only">Nombre</label>
						<input
							type="text"
							id="nombre"
							placeholder="Nombre"
							v-model="form.nombre"
							class="mt-1 block w-full border-none bg-white text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple"
							required
							autofocus />
					</div>

					<div>
						<label for="email" class="sr-only">Correo SENA</label>
						<input
							type="email"
							id="email"
							placeholder="Correo SENA"
							v-model="form.email"
							class="mt-1 block w-full border-none bg-white text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple"
							required />
					</div>

					<!-- Botón de iniciar sesión -->
					<button
						type="submit"
						:class="[
							'cursor-pointer',
							isLoading
								? 'cursor-wait bg-yellow-600'
								: 'bg-amarillo hover:bg-yellow-600',
						]"
						:disabled="isLoading"
						class="w-full py-3 text-lg text-black font-bold rounded-lg transition transition-colors">
						<span v-if="!isLoading">Iniciar</span>
						<span v-else>Cargando...</span>
					</button>
				</form>

				<!-- Enlace de registro -->
				<p class="text-center text-sm mt-2">
					¿No tienes cuenta aún?
					<a
						@click.prevent="goToRegister"
						href="#"
						class="text-blue-400 underline"
						>Regístrate</a
					>
				</p>

				<!-- Iconos institucionales -->
				<div class="flex justify-center space-x-4 mt-4">
					<img :src="logoSena" alt="Logo SENA" class="w-10 h-auto" />
				</div>
			</div>

			<!-- Columna derecha: Imagen del mapa como fondo en pantallas grandes -->
			<div class="hidden lg:flex items-center justify-center">
				<img :src="MapaCollage" alt="Mapa" class="w-full h-auto" />
			</div>
		</div>

		<!-- Vector planta en el footer, cubriendo todo el ancho -->

		<div>
			<img
				:src="VectorPlantas"
				alt="Vector Plantas"
				class="fixed bottom-0 left-0 w-full h-auto z-0" />
		</div>

		<Footer></Footer>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification";
import Logo from "@/assets/images/logorav.svg";
import MapaCollage from "@/assets/images/colombiaCollage1.webp";
import VectorPlantas from "@/assets/images/vectorplantas.svg";
import logoSena from "@/assets/images/logosInstitucionales.svg";

const form = reactive({
	nombre: "",
	email: "",
	password: "",
});

const errorMessage = ref("");
const isLoading = ref(false);
const router = useRouter();
const toast = useToast();

async function submit() {
	isLoading.value = true;
	try {
		await axios.post("http://localhost:8080/api/auth/login", form);
		toast.success("Inicio de sesión exitoso.");
		router.push("/dashboard");
	} catch (error) {
		errorMessage.value =
			error.response?.data?.error || "Error en el inicio de sesión.";
	} finally {
		isLoading.value = false;
	}
}

function goToRegister() {
	router.push("/register");
}
</script>

<style>
/* Personalización del fondo y colores */
</style>
