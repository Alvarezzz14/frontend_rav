<template>
  <div>

  </div>
  <div class="min-h-screen p-4 flex flex-col items-center justify-stretch">
    <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
    <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-8">
      <!-- Icono y Título -->
      <div class="flex items-center mb-4 md:mb-0">
        <div class="p-6 bg-customPurple rounded-full">
          <img :src="ListaUsuarios" alt="Icono de Reportes" width="50" height="50" />
        </div>
        <div class="ml-4 text-center md:text-left">
          <p class="text-black mb-0 text-2xl md:text-3xl">Lista de</p>
          <h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">
            Usuarios
          </h2>
        </div>
      </div>
      <!-- Botón de Registrar Usuario -->
      <button @click="showModal = true"
        class="bg-customPurple text-white py-4 shadow-lg border-none px-6 rounded-lg flex flex-col items-center justify-center transition duration-300">
        <img :src="RegistroUsuario" alt="Botón de Registrar Usuario" class="w-16 h-16 mb-2" />
        <span class="text-center font-bold text-white">Registrar Usuario</span>
      </button>
    </div>

    <!-- Contenedor de la tabla usando divs con Grid -->
    <div class="overflow-x-auto w-full max-w-full border-red-800 bg-green shadow-lg rounded-lg">
      <div class="overflow-x-auto w-full max-w-7xl bg-white shadow-lg rounded-lg">
        <!-- Fila de encabezados -->
        <div class="grid grid-cols-5 gap-2 bg-gray-100 font-bold">
          <div class="p-4 text-center border-b border-gray-300">NOMBRE</div>
          <div class="p-4 text-center border-b border-gray-300">ROL</div>
          <div class="p-4 text-center border-b border-gray-300">CORREO</div>
          <div class="p-4 text-center border-b border-gray-300">DOCUMENTO</div>
          <div class="p-4 text-center border-b border-gray-300">PERMISOS</div>
        </div>

        <!-- Filas de datos -->
        <div v-for="(user, index) in users" :key="index" class="grid grid-cols-5 gap-2">
          <div class="p-4 text-center border-b border-gray-300">{{ user.name }}</div>
          <div class="p-4 text-center border-b border-gray-300">{{ user.role }}</div>
          <div class="p-4 text-center border-b border-gray-300">{{ user.email }}</div>
          <div class="p-4 text-center border-b border-gray-300">{{ user.document }}</div>
          <div class="p-4 text-center border-b border-gray-300">
            <button class="bg-white border-none shadow-md p-2 rounded-full mr-2">
              <img :src="IconoEditar" alt="Editar" class="w-5 h-5" />
            </button>
            <button class="bg-white border-none shadow-md p-2 rounded-full mr-2">
              <img :src="IconoEliminar" alt="Eliminar" class="w-5 h-5" />
            </button>
            <button class="bg-white border-none shadow-md p-2 rounded-full">
              <img :src="IconoVisualizar" alt="Ver" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para registrar usuario -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white shadow-lg rounded-lg w-full max-w-4xl relative">
        <!-- Botón de Cerrar -->
        <button @click="showModal = false" class="absolute top-4 rounded-full right-4 text-customPurple hover:text-white border-none text-xl">
          ✕
        </button>
        <!-- Contenido del modal -->
        <div class="flex flex-col lg:flex-row">
          <!-- Formulario -->
          <div class="flex-1 justify-center p-16">
            <div class="flex justify-center">
              <img :src="logoRav" alt="Logo RAV" class="w-64 h-auto mb-4" />
            </div>
            <h2 class="text-3xl font-semibold text-black m-2 text-center">Registrar Usuario</h2>
            <!-- Roles -->
            <div class="flex justify-center space-x-6 mb-6 mt-6">
              <label class="flex items-center">
                <input type="radio" id="admin" name="role" value="Administrador" class="mr-2" v-model="selectedRole" />
                Administrador
              </label>
              <label class="flex items-center">
                <input type="radio" id="funcionario" name="role" value="Funcionario" class="mr-2"
                  v-model="selectedRole" />
                Funcionario
              </label>
              <label class="flex items-center">
                <input type="radio" id="operario" name="role" value="Operario" class="mr-2" v-model="selectedRole" />
                Operario
              </label>
            </div>

            <form @submit.prevent="submitForm" class="space-y-3">
              <input v-model="formData.name" type="text" placeholder="Nombre"
                class="w-full px-3 h-11 py-2 bg-gray-100 border-none font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-customPurple"
                required />
              <input v-model="formData.email" type="email" placeholder="Correo SENA"
                class="w-full px-3 h-11 py-2 bg-gray-100 border-none font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-customPurple"
                required />
              <input v-model="formData.password" type="password" placeholder="Crear contraseña"
                class="w-full px-3 h-11 py-2 bg-gray-100 border-none font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-customPurple"
                required />
              <input v-model="formData.confirmPassword" type="password" placeholder="Confirmar contraseña"
                class="w-full px-3 h-11 py-2 bg-gray-100 border-none font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-customPurple"
                required />
              <button type="submit"
                class="w-full bg-customPurple text-white font-bold py-2 rounded-lg cursor-pointer transition duration-200">
                Registrar
              </button>
            </form>
          </div>
          <!-- Imagen -->
          <div class="hidden lg:flex w-1/2">
            <img :src="imagenRegistro" alt="Cultura colombiana" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";

import ListaUsuarios from "@/assets/images/ListaUsuarios.svg";
import RegistroUsuario from "@/assets/images/RegistroUsuario.svg";
import IconoEditar from "@/assets/images/IconoEditar.svg";
import IconoEliminar from "@/assets/images/IconoEliminar.svg";
import IconoVisualizar from "@/assets/images/IconoVisualizar.svg";
import imagenRegistro from "@/assets/images/imagenRegistro.jpg";
import logoRav from "@/assets/images/LogoPageRav.svg";

const users = [
  { name: "John Doe", role: "Funcionario", email: "johndoe@gmail.com", document: "1154373590" },
  { name: "Jane Smith", role: "Administrador", email: "janesmith@gmail.com", document: "1154373591" },
  { name: "Mark Johnson", role: "Funcionario", email: "markjohnson@gmail.com", document: "1154373592" },
  { name: "Emily Davis", role: "Funcionario", email: "emilydavis@gmail.com", document: "1154373593" },
  { name: "Michael Brown", role: "Operario", email: "michaelbrown@gmail.com", document: "1154373594" },
];

const showModal = ref(false);
const selectedRole = ref("");
const formData = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const toast = useToast();

async function submitForm() {
  if (formData.password !== formData.confirmPassword) {
    toast.error("Las contraseñas no coinciden");
    return;
  }

  try {
    await axios.post("http://localhost:8080/api/auth/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: selectedRole.value,
    });
    toast.success("Usuario registrado con éxito");
    showModal.value = false; // Cerrar el modal tras el registro
  } catch (error) {
    toast.error("Error al registrar usuario");
    console.error(error);
  }
}
</script>

<style scoped>
button:hover {
  background-color: #4b286f;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Desenfoque y opacidad del fondo */
.blurred-background {
  filter: blur(5px);
  /* Aplicar desenfoque */
  pointer-events: none;
  /* Evita interacciones con el fondo */
  opacity: 0.5;
  /* Reducir opacidad del fondo */
}

/* Estilo del modal */
.fixed {
  backdrop-filter: blur(5px);
  /* Desenfoque detrás del modal */
}
</style>
