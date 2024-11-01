<template>
	<!-- Contenedor principal con el fondo CustomPurple -->
	<div class="min-h-screen bg-customPurple text-white m flex flex-col">
		<!-- Contenedor del grid -->
		<div
			class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-x-6 p-8 lg:p-16">
			<!-- Columna izquierda: Logo, formulario y iconos -->
			<div class="flex flex-col justify-center space-y-6">
				<!-- Logo grande -->
				<div class="flex justify-center">
					<img :src="Logo" alt="Logo" class="w-3/4 lg:w-2/3 h-auto" />
				</div>

				<!-- Formulario de login -->
				<form @submit.prevent="submit" class="space-y-4 w-96 mx-auto z-10">
					<div v-if="errorMessage" class="bg-red-100 text-red-700 p-3 rounded-md">
						{{ errorMessage }}
					</div>

					<div>
						<label for="email" class="block text-lg font-semibold">Correo electrónico</label>
						<input
							type="email"
							id="email"
							v-model="form.email"
							class="mt-1 block w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple"
							required
							autofocus />
					</div>

					<div>
						<label for="password" class="block text-lg font-semibold">Contraseña</label>
						<input
							type="password"
							id="password"
							v-model="form.password"
							class="mt-1 block w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple"
							required />
					</div>

					<!-- Botón de iniciar sesión -->
					<button
						type="submit"
						:class="['cursor-pointer', isLoading ? 'cursor-wait bg-yellow-600' : 'bg-amarillo hover:bg-yellow-600']"
						:disabled="isLoading"
						class="border-2 border-moradoSecundario mt-4 w-full py-3 text-lg text-black font-bold rounded-lg transition transition-colors">
						<span v-if="!isLoading">Iniciar sesión</span>
						<span v-else>Cargando...</span>
					</button>
				</form>

				<!-- Iconos institucionales -->
				<div class="flex justify-center space-x-4 mt-8">
					<img
						:src="LogosInstitucionales"
						alt="Logos Institucionales"
						class="" />
				</div>
			</div>

			<!-- Columna derecha: Mapa en .webp -->
			<div class="lg:flex justify-center">
				<img :src="MapaCollage" alt="Mapa" class="h-full w-full z-10" />
			</div>
		</div>

		<!-- Vector planta en el footer, cubriendo todo el ancho -->
		<div class="">
			<img
				:src="VectorPlantas"
				alt="Vector Plantas"
				class="absolute bottom-0 left-0 w-full h-auto z-0" />
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Logo from "@/assets/images/webp/LOGO.svg";
import LogosInstitucionales from "@/assets/images/logosInstitucionales.svg";
import MapaCollage from "@/assets/images/colombiaCollage1.webp";
import VectorPlantas from "@/assets/images/vectorplantas.svg";
import axios from 'axios';
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

// Formulario de inicio de sesión
const form = ref({
	email: "",
	password: "",
});

// Función de submit
const errorMessage = ref("");
const isLoading = ref(false); // Estado de carga

const submit = async () => {
    isLoading.value = true;
    try {
        // Llamada a la API
        const response = await axios.post('http://localhost:8080/api/auth/signin', form.value);

        // Redirigir si el login es exitoso y mostrar un mensaje de éxito
        router.push({ name: "HomePage" });
        toast.success("Inicio de sesión exitoso.");
    } catch (error) {
        // Mostrar un mensaje de error usando toast
        if (error.response && error.response.data) {
            toast.error(error.response.data.error || "Credenciales incorrectas");
        } else {
            toast.error("Error en la conexión con el servidor");
        }
    } finally {
        isLoading.value = false;
    }
};



</script>

<style scoped></style>