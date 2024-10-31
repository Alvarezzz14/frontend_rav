<template>
	<!-- Contenedor principal con el fondo CustomPurple -->
	<div class="min-h-screen bg-customPurple fixed text-white flex flex-col">
		<!-- Contenedor del grid -->
		<div
			class="flex-1 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 lg:mx-36 p-8 lg:p-16">
			<!-- Columna izquierda: Logo, formulario y iconos -->
			<div class="flex flex-col space-y-6 mt-10">
				<!-- Logo grande -->
				<div class="flex justify-center">
					<img :src="Logo" alt="Logo" class="sm:w-2/4 w-3/4 lg:w-72 h-auto" />
				</div>
				<div>
					<p class="text-center text-4xl font-bold">Iniciar Sesión</p>
				</div>

				<!-- Formulario de login -->
				<form
					@submit.prevent="submit"
					class="space-y-4 lg:w-[35rem] w-full mx-auto sm:m-5 z-10">
					<div>
						<input
							type="email"
							id="email"
							placeholder="Correo Sena "
							v-model="form.email"
							class="mt-1 block w-full h-16 text-xl pl-8 bg-white text-gray-800 p-3 rounded-xl"
							required
							autofocus />
					</div>

					<div>
						<input
							type="password"
							id="password"
							placeholder="Contraseña "
							v-model="form.password"
							class="mt-1 block w-full h-16 text-xl pl-8 bg-white text-gray-800 p-3 rounded-xl"
							required />
					</div>

					<!-- Botón de iniciar sesión -->
					<button
						type="submit"
						class="cursor-pointer border-2 h-16 border-moradoSecundario mt-4 w-full py-3 text-2xl bg-amarillo text-customPurple font-semibold rounded-xl hover:bg-yellow-400 transition-colors focus:cursor-wait">
						Iniciar
					</button>
				</form>

				<!-- Iconos institucionales -->
				<div
					class="lg:absolute lg:bottom-32 w-full flex sm:justify-center lg:left-1/4">
					<img
						:src="LogosInstitucionales"
						alt="Logos Institucionales"
						class="lg:w-72 lg:h-16 sm:w-48 h-auto w-40" />
				</div>
			</div>

			<!-- Columna derecha: Mapa en .webp -->
			<div class="flex justify-center">
				<img
					:src="MapaCollage"
					alt="Mapa"
					class="object-cover lg:h-[55rem] lg:w-[58rem] z-10 min-[1650px]:w-[50rem]" />
			</div>
		</div>

		<!-- Vector planta en el footer, cubriendo todo el ancho -->
		<div class="">
			<img
				:src="VectorPlantas"
				alt="Vector Plantas"
				class="absolute bottom-0 w-full h-auto z-0" />
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Logo from "@/assets/images/webp/LOGO.svg";
import LogosInstitucionales from "@/assets/images/logosInstitucionales.svg";
import MapaCollage from "@/assets/images/colombiaCollage1.webp";
import VectorPlantas from "@/assets/images/vectorplantas.svg";
import axios from "axios";

// Formulario de inicio de sesión
const form = ref({
	email: "",
	password: "",
});

// Función de submit
const submit = async () => {
	// Lógica para enviar el formulario (ejemplo de uso)
	console.log("Iniciar sesión con", form.value);
	const response = await axios.post(
		"http://localhost:8080/api/auth/signin",
		form.value
	);
	alert(JSON.stringify(response));
};
</script>

<style scoped></style>
