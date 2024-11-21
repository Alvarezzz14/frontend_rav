<template>
  <div class="min-h-screen p-4 flex flex-col items-center justify-stretch">
    <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
    <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-8">
      <!-- Icono y Título -->
      <div class="flex items-center mb-4 md:mb-0">
        <div class="p-6 bg-customPurple rounded-full">
          <!-- Icono SVG -->
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
      <button
        class="bg-customPurple text-white py-4 shadow-lg border-none px-6 rounded-lg flex flex-col items-center justify-center transition duration-300">
        <img :src="RegistroUsuario" alt="Botón de Registrar Usuario" class="w-16 h-16 mb-2" />
        <span class="text-center font-bold text-white">Registrar Usuario</span>
      </button>
    </div>

    <!-- Contenedor de la tabla usando divs con Grid -->
    <div class="overflow-x-auto w-full max-w-full border-red-800 bg-green shadow-lg rounded-lg">
      <div class=" overflow-x-auto w-full max-w-7xl bg-white shadow-lg rounded-lg">
        <!-- Fila de encabezados -->
        <div class="grid grid-cols-5 gap-2 bg-gray-100 font-bold">
          <div class="p-4 text-center border-b border-gray-300">NOMBRE</div>
          <div class="p-4 text-center border-b border-gray-300">ROLL</div>
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
            <!-- Botones de permisos -->
            <button class="bg-white  border-none shadow-md  p-2 rounded-full mr-2">
              <img :src="IconoEditar" alt="Editar" class="w-5 h-5" />
            </button>
            <button class="bg-white border-none shadow-md   p-2 rounded-full mr-2">
              <img :src="IconoEliminar" alt="Eliminar" class="w-5 h-5" />
            </button>
            <button class="bg-white border-none shadow-md p-2 rounded-full">
              <img :src="IconoVisualizar" alt="Ver" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
// Importar las imágenes de los iconos de permisos (editar, eliminar, ver)
import ListaUsuarios from "@/assets/images/ListaUsuarios.svg";
import RegistroUsuario from "@/assets/images/RegistroUsuario.svg";
import IconoEditar from "@/assets/images/IconoEditar.svg";  // Asegúrate de tener los íconos
import IconoEliminar from "@/assets/images/IconoEliminar.svg";
import IconoVisualizar from "@/assets/images/IconoVisualizar.svg";

// Datos de ejemplo para los usuarios
const users = [
  { name: "John Doe", role: "Funcionario", email: "johndoe@gmail.com", document: "1154373590" },
  { name: "Jane Smith", role: "Administrador", email: "janesmith@gmail.com", document: "1154373591" },
  { name: "Mark Johnson", role: "Funcionario", email: "markjohnson@gmail.com", document: "1154373592" },
  { name: "Emily Davis", role: "Funcionario", email: "emilydavis@gmail.com", document: "1154373593" },
  { name: "Michael Brown", role: "Operario", email: "michaelbrown@gmail.com", document: "1154373594" },
];
</script>

<style scoped>
button:hover {
  background-color: #4b286f;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* 5 columnas de igual tamaño */
  gap: 1px;
  /* Separación entre columnas */
}

.grid>div {
  border-bottom: 1px solid #d1d1d1;
  padding: 10px;
  text-align: center;
}



button img {
  display: block;
  margin: 0 auto;
}
</style>
