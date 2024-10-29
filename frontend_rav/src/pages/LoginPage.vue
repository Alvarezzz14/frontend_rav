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
					<div>
						<label for="email" class="block text-lg font-semibold"
							>Correo electrónico</label
						>
						<input
							type="email"
							id="email"
							v-model="form.email"
							class="mt-1 block w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple"
							required
							autofocus />
					</div>

					<div>
						<label for="password" class="block text-lg font-semibold"
							>Contraseña</label
						>
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
						class="cursor-pointer border-2 border-moradoSecundario mt-4 w-full py-3 text-lg bg-amarillo text-black font-bold rounded-lg hover:bg-yellow-600 transition transition-colors focus:cursor-wait">
						Iniciar sesión
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
import Logo from "../assets/images/webp/LOGO.svg";
import LogosInstitucionales from "@/assets/images/logosInstitucionales.svg";
import MapaCollage from "../assets/images/colombiaCollage1.webp";
import VectorPlantas from "../assets/images/vectorplantas.svg";

// Formulario de inicio de sesión
const form = ref({
	email: "",
	password: "",
});

// Función de submit
const submit = () => {
	// Lógica para enviar el formulario (ejemplo de uso)
	console.log("Iniciar sesión con", form.value);
};
</script>

<style scoped></style>
