<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <!-- Contenedor principal -->
    <div class="bg-white shadow-lg rounded-lg overflow-flex flex flex-col lg:flex-row-reverse h-full w-full max-w-full relative">
      <!-- Imagen de fondo -->
      <div class="hidden lg:flex w-1/2">
        <img :src="imagenRegistro" alt="Cultura colombiana" class="w-full h-full object-cover" />
      </div>
      <!-- Contenedor para el formulario y logos, centrado y con altura reducida en pantallas pequeñas -->
      <div class="flex-1 flex items-center justify-center h-screen relative z-10 p-4 lg:p-0">
        <div class="bg-white  rounded-lg p-6 w-full max-w-md lg:max-w-lg h-auto flex flex-col items-center max-h-[90vh] space-y-4"> <!-- Se eliminó mt-6 aquí -->
          <!-- Logo -->
          <img :src="logoRav" alt="Logo RAV" class="w-72 h-auto mb-2" />

          <!-- Título -->
          <h2 class="text-3xl  font-semibold text-black m-2 text-center">Registrar Usuario</h2>
          
          <!-- Formulario -->
          <form @submit.prevent="submitForm" class="space-y-3 w-full">
            <div>
              <input
                v-model="formData.name"
                type="text"
                placeholder="Nombre"
                class="w-full px-3 h-11 py-2 bg-grisInput border-none font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-customPurple"
                required
              />
            </div>
            <div>
              <input
                v-model="formData.email"
                type="email"
                placeholder="Correo SENA"
                class="w-full px-3  h-11 py-2 bg-grisInput border-none font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-customPurple"
                required
              />
            </div>
            <div>
              <input
                v-model="formData.password"
                type="password"
                placeholder="Crear contraseña"

                class="w-full px-3 h-11 py-2 bg-grisInput border-none font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-customPurple"
                required
              />
            </div>
            <div>
              <input
                v-model="formData.confirmPassword"
                type="password"
                placeholder="Confirmar contraseña"

                class="w-full px-3 h-11 py-2 bg-grisInput border-none font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-customPurple"
                required
              />
            </div>
            <!-- Botón de Iniciar -->
            <button
              type="submit"
              class="w-full bg-customPurple text-amarillo font-bold py-2 text-lg rounded-lg transition duration-200"
            >

              Registrarse
            </button>
          </form>

          <!-- Enlace para iniciar sesión -->
          <p class="text-black mt-2 text-center text-sm">
            ¿Ya tienes una cuenta? 
            <a @click.prevent="goToLogin" href="#" class="text-azulHeaderFooter no-underline font-normal">Inicia Sesión</a>
          </p>

          <!-- Logos en la parte inferior del contenedor de formulario -->

          <div class="flex items-center space-x-2 mt-4">
            <img :src="logoSena" alt="Logo Sena" class="w-10 h-auto" />
            <img :src="logoApe" alt="Logo Ape" class="w-10 h-auto" />
          </div>
        </div>
      </div>

      <!-- Imagen de fondo en pantallas pequeñas -->
      <div class="lg:hidden absolute inset-0 z-0">
        <img :src="imagenRegistro" alt="Cultura colombiana" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';


// Importa las imágenes
import imagenRegistro from '@/assets/images/imagenRegistro.jpg';
import logoRav from '@/assets/images/LogoPageRav.svg';
import logoSena from '@/assets/images/logosenaverde.svg';
import logoApe from '@/assets/images/logoape.svg';

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});


const router = useRouter();
const toast = useToast();

async function submitForm() {
  if (formData.password !== formData.confirmPassword) {
    toast.error("Las contraseñas no coinciden");
    return;
  }

  try {
    await axios.post('http://localhost:8080/api/auth/signup', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });
    toast.success("Registro exitoso. Ahora puedes iniciar sesión.");
  } catch (error) {
    console.error("Error en el registro:", error.response?.data || error.message);
    toast.error(error.response?.data?.error || "Error en el registro");
  }
}

// Redireccionar al login
function goToLogin() {
  router.push('/login');
}
</script>

