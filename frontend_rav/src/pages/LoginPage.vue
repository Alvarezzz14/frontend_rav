<template>
	<!-- Contenedor principal con el fondo CustomPurple -->
	<div class="min-h-screen bg-customPurple text-white flex flex-col">

	  <!-- Header (barra superior) -->
	  <Header></Header>
  
	  <!-- Contenedor del grid -->
	  <div class="flex-1 grid grid-cols-1 md:grid-cols-2 items-center gap-4 px-4 sm:px-8 md:px-16">
		<!-- Columna izquierda: Logo, formulario y logos institucionales -->
		<div class="flex flex-col justify-center items-center space-y-6">
		  <!-- Logo con el mismo ancho que el título -->
		  <div class="flex justify-center">
			<img :src="Logo" alt="Logo RAV" class="w-64 max-w-sm h-auto" />
		  </div>
  
		  <!-- Título de inicio de sesión -->
		  <h2 class="text-2xl sm:text-3xl font-semibold text-center">Iniciar Sesión</h2>
  
		  <!-- Formulario de login -->
		  <form @submit.prevent="submit" class="space-y-4 w-full max-w-sm mx-auto">
			<div>
			  <input
				type="email"
				id="correo"
				placeholder="Correo"
				v-model="form.email"
				class="block w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple"
				required
			  />
			</div>
  
			<div>
			  <input
				type="password"
				id="password"
				placeholder="Contraseña"
				v-model="form.password"
				class="block w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple"
				required
			  />

			</div>
  
			<!-- Botón de iniciar sesión -->
			<button
			  type="submit"
			  class="w-full py-3 text-lg bg-amarillo border-none text-customPurple font-bold rounded-lg"
			  :disabled="isLoading"
			>
			  <span v-if="!isLoading">Iniciar</span>
			  <span v-else>Cargando...</span>
			</button>
		  </form>
  
		  <!-- Logos institucionales -->
		  <div class="flex justify-center space-x-8 mt-6">
			<img :src="logoSena" alt="Logo SENA" class="w-36 h-auto" />
			
		  </div>
  
		  <!-- Mapa para pantallas menores o iguales a 768px -->
		  <div class="block md:hidden mt-6">
			<img :src="MapaCollage" alt="Mapa de Colombia" class="w-full h-auto" />
		  </div>
		</div>

  
		<!-- Mapa para pantallas mayores a 768px -->
		<div class="hidden md:flex items-center justify-center">
		  <img :src="MapaCollage" alt="Mapa de Colombia" class="w-2/3 md:w-3/4 lg:w-[85%] h-auto" />
		</div>
	  </div>
  
	  <!-- Footer -->
	  <Footer></Footer>
	</div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { useToast } from 'vue-toastification';
  import Logo from '@/assets/images/logorav.svg';
  import MapaCollage from '@/assets/images/colombiaCollage1.webp';
  import logoSena from '@/assets/images/logosInstitucionales.svg';

  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  
  const form = reactive({
	nombre: '',
	email: '',
  });
  
  const errorMessage = ref('');
  const isLoading = ref(false);
  const router = useRouter();
  const toast = useToast();
  
  async function submit() {
	isLoading.value = true;
	try {
	  await axios.post('http://localhost:8080/api/auth/login', form);
	  toast.success("Inicio de sesión exitoso.");
	  router.push('/dashboard');
	} catch (error) {
	  errorMessage.value = error.response?.data?.error || "Error en el inicio de sesión.";
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
	border: none; /* Quitar bordes visibles */
  }
  
  input:focus {
	outline: none;
  }
  </style>
  
>>>>>>> c464dfdbf340a423be31c3d3d62f2ecd084daea7
