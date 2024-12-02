<template>
	<Header />
	<div class="min-h-screen bg-customPurple flex">
	  <!-- Columna izquierda con el formulario de login -->
	  <div class="w-1/2 flex flex-col justify-center items-center p-6">
		<!-- Logo -->
		<img :src="Logo" alt="Logo RAV" class="w-64 max-w-sm h-auto mb-6" />
		
		<!-- Título de inicio de sesión -->
		<h2 class="text-2xl sm:text-3xl font-semibold text-white text-center">Iniciar Sesión</h2>
	
		<!-- Formulario de login -->
		<form @submit.prevent="submit" class="space-y-4 w-full max-w-sm mx-auto mt-6">
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
			  placeholder="Contraseña"
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
	  </div>
	
	  <!-- Columna derecha con la imagen -->
	  <div class="w-full relative">
		<img :src="MapaCollage" alt="Mapa de Colombia" class="w-full h-full object-cover" />
	  </div>
	</div>
	<Footer></Footer>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  import axios from 'axios';
  import { useToast } from 'vue-toastification';
  import Logo from '@/assets/images/logorav.svg';
  import MapaCollage from '@/assets/images/CampesinoLogin.png';
  import logoSena from '@/assets/images/logosInstitucionales.svg';
  
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  
  const form = reactive({
	email: '',
	password: '',
  });
  
  const authStore = useAuthStore();
  const errorMessage = ref('');
  const isLoading = ref(false);
  const router = useRouter();
  const toast = useToast();
  
  async function submit() {
	isLoading.value = true;
	try {
	  const response = await axios.post('http://localhost:8080/api/auth/signin', form);
	  console.log(response.data);
	  
	  authStore.setAuthenticatedUser(response.data)
	  toast.success("Inicio de sesión exitoso.");
	  router.push('/');
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
  
