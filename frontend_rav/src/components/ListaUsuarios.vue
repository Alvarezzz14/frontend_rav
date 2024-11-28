<template>
  <div class="min-h-screen p-4 flex flex-col items-center justify-stretch">
    <!-- Sección Superior -->
    <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-8">
      <div class="flex items-center mb-4 md:mb-0">
        <div class="p-6 bg-customPurple rounded-full">
          <img :src="ListaUsuarios" alt="Icono de Reportes" width="50" height="50" />
        </div>
        <div class="ml-4 text-center md:text-left">
          <p class="text-black mb-0 text-2xl md:text-3xl">Lista de</p>
          <h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">Usuarios</h2>
        </div>
      </div>
      <!-- Botón de Registrar Usuario -->
      <button @click="showRegisterModal = true"
        class="bg-customPurple text-white py-4 shadow-lg border-none px-6 rounded-lg flex flex-col items-center justify-center transition duration-300">
        <img :src="RegistroUsuario" alt="Registrar Usuario" class="w-16 h-16 mb-2" />
        <span class="text-center font-bold text-white">Registrar Usuario</span>
      </button>
    </div>

    <!-- Tabla de usuarios -->
    <div class="overflow-x-auto w-full max-w-7xl bg-white shadow-lg rounded-lg">
      <div class="grid grid-cols-5 gap-2 bg-gray-100 font-bold">
        <div class="p-4 text-center border-b border-gray-300">NOMBRE</div>
        <div class="p-4 text-center border-b border-gray-300">ROL</div>
        <div class="p-4 text-center border-b border-gray-300">CORREO</div>
        <div class="p-4 text-center border-b border-gray-300">DOCUMENTO</div>
        <div class="p-4 text-center border-b border-gray-300">PERMISOS</div>
      </div>
      <div v-for="(user, index) in users" :key="index" class="grid grid-cols-5 gap-2">
        <div class="p-4 text-center border-b border-gray-300">{{ user.nombre }}</div>
        <div class="p-4 text-center border-b border-gray-300">{{ user.rol }}</div>
        <div class="p-4 text-center border-b border-gray-300">{{ user.correo }}</div>
        <div class="p-4 text-center border-b border-gray-300">{{ user.numero_documento }}</div>
        <div class="p-4 text-center border-b border-gray-300">
          <!-- Botón Ver -->
          <button @click="viewUser(user)" class="bg-white border-none shadow-md p-2 rounded-full">
            <img :src="IconoVisualizar" alt="Ver" class="w-5 h-5" />
          </button>
          <!-- Botón Editar -->
          <button @click="editUser(user)" class="bg-white hover:bg-white border-none shadow-md p-2  rounded-full">
            <img :src="IconoEditar" alt="Editar" class="w-5 h-5" />
          </button>
          <!-- Botón Eliminar -->
          <button @click="confirmDeleteUser(user)" class="bg-white border-none shadow-md p-2 rounded-full">
            <img :src="IconoEliminar" alt="Eliminar" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para Registrar Usuario -->

    <div v-if="showRegisterModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">

      <!-- Modal -->
      <div class="relative bg-white shadow-lg rounded-lg w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden">

        <!-- Botón de Cerrar -->
        <button @click="closeRegisterModal"
          class="absolute top-4 right-4 text-customPurple rounded-full hover:text-white border-none text-xl z-10">
          ✕
        </button>

        <!-- Formulario -->
        <div class="relative z-10 bg-white p-8 lg:p-16 w-full lg:w-1/2 mx-auto rounded-lg lg:rounded-none">

          <!-- Logo de RAV -->
          <div class="text-center mb-4">
            <img :src="logoRav" alt="Logo RAV" class="w-36 h-auto mx-auto mb-4 lg:w-48" />
          </div>

          <!-- Título del Formulario -->
          <h2 class="text-2xl lg:text-3xl font-semibold text-black mb-6 text-center">Registrar Usuario</h2>

          <!-- Selección de Roles -->
          <div class="flex justify-between mb-6">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" id="admin" name="role" value="Administrador" v-model="formData.role"
                class="form-radio h-5 w-5 text-customPurple focus:ring-customPurple" />
              <span
                :class="{ 'text-customPurple font-semibold': formData.role === 'Administrador', 'text-gray-700': formData.role !== 'Administrador' }"
                class="text-sm lg:text-lg">
                Administrador
              </span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" id="funcionario" name="role" value="Funcionario" v-model="formData.role"
                class="form-radio h-5 w-5 text-customPurple focus:ring-customPurple" />
              <span
                :class="{ 'text-customPurple font-semibold': formData.role === 'Funcionario', 'text-gray-700': formData.role !== 'Funcionario' }"
                class="text-sm lg:text-lg">
                Funcionario
              </span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" id="operario" name="role" value="Operario" v-model="formData.role"
                class="form-radio h-5 w-5 text-customPurple focus:ring-customPurple" />
              <span
                :class="{ 'text-customPurple font-semibold': formData.role === 'Operario', 'text-gray-700': formData.role !== 'Operario' }"
                class="text-sm lg:text-lg">
                Operario
              </span>
            </label>
          </div>

          <!-- Campos del Formulario -->
          <form @submit.prevent="submitForm" class="space-y-4">
            <input v-model="formData.name" type="text" placeholder="Nombre"
              class="w-full px-4 py-3 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-customPurple"
              required />
            <input v-model="formData.email" type="email" placeholder="Correo SENA"
              class="w-full px-4 py-3 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-customPurple"
              required />
            <input v-model="formData.password" type="password" placeholder="Crear Contraseña"
              class="w-full px-4 py-3 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-customPurple"
              required />
            <input v-model="formData.confirmPassword" type="password" placeholder="Confirmar Contraseña"
              class="w-full px-4 py-3 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-customPurple"
              required />
            <button type="submit"
              class="w-full bg-customPurple text-white font-bold py-3 rounded-lg transition duration-300 hover:bg-purple-700">
              Registrar
            </button>
          </form>

          <!-- Logos Inferiores -->
          <div class="flex justify-center items-center space-x-6 mt-6">
            <img :src="logoSena" alt="Logo SENA" class="w-12 h-auto" />
            <img :src="logoApe" alt="Logo APE" class="w-12 h-auto" />
          </div>
        </div>

        <!-- Imagen de Fondo -->
        <div class="relative hidden lg:block w-1/2 overflow-hidden z-0">
          <img :src="imagenRegistro" alt="Cultura Colombiana" class="w-full h-full object-cover lg:rounded-r-lg" />
        </div>

      </div>
    </div>


    <!-- Modal para Ver Usuario -->
    <!-- Modal para Ver Usuario -->
    <div v-if="showViewModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <!-- Modal Content -->
      <div class="bg-white shadow-lg rounded-lg w-10/12 max-w-xl p-6 relative bg-no-repeat bg-cover bg-center "
        :style="{ backgroundImage: `url(${FondoImagen})`, backgroundSize: '80%', backgroundPosition: 'center' }">



        <!-- Contenedor para el título, imagen y botón de cerrar -->
        <div class="flex items-center justify-between mb-4">
          <!-- Título y Imagen de Usuario -->
          <div class="flex items-center">
            <!-- Imagen de Usuario -->
            <div class="bg-customPurple rounded-full p-2 mr-2">
              <img :src="Usuario" alt="Usuario" class="w-8 h-8" />
            </div>
            <!-- Título -->
            <h2 class="text-xl font-bold text-black">Datos del Usuario</h2>
          </div>

          <!-- Close Button -->
          <button @click="closeViewModal" class="text-customPurple hover:text-white rounded-full border-none text-2xl">
            ✕
          </button>
        </div>

        <!-- Datos Personales (con valores debajo de cada campo) -->
        <div class="mb-6">
          <h3 class="font-semibold text-black">Datos Personales</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Nombre de Usuario -->
            <div class="flex flex-col">
              <span class="font-medium">Nombre de Usuario:</span>
              <span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{ selectedUser.nombre }}</span>
            </div>
            <!-- Cédula -->
            <div class="flex flex-col">
              <span class="font-medium">Cédula:</span>
              <span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{ selectedUser.numero_documento }}</span>
            </div>
            <!-- Nombres -->
            <div class="flex flex-col">
              <span class="font-medium">Nombres:</span>
              <span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{ selectedUser.nombre }}</span>
            </div>
            <!-- Apellidos -->
            <div class="flex flex-col">
              <span class="font-medium">Apellidos:</span>
              <span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{ selectedUser.apellido }}</span>
            </div>
            <!-- Correo -->
            <div class="flex flex-col sm:col-span-2">
              <span class="font-medium">Correo:</span>
              <span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{ selectedUser.correo }}</span>
            </div>
          </div>
        </div>

        <!-- Datos Laborales (con valores debajo de cada campo) -->
        <div>
          <h3 class="font-semibold text-black">Datos Laborales</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Ubicación / Sede -->
            <div class="flex flex-col">
              <span class="font-medium">Ubicación / Sede:</span>
              <span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{ selectedUser.sed_nombre }}</span>
            </div>
            <!-- Regional -->
            <div class="flex flex-col">
              <span class="font-medium">Regional:</span>
              <span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{ selectedUser.regional }}</span>
            </div>
            <!-- Rol -->
            <div class="flex flex-col">
              <span class="font-medium">Rol:</span>
              <span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{ selectedUser.rol }}</span>
            </div>
            <!-- Teléfonos -->
            <div class="flex flex-col sm:col-span-2">
              <span class="font-medium">Teléfono:</span>
              <span class="text-black bg-gray-100/50 rounded-lg p-2 w-64">{{ selectedUser.telefono }}</span>
            </div>
            <!-- Celular -->
            <div class="flex flex-col">
              <span class="font-medium">Celular:</span>
              <span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{ selectedUser.celular }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal para Editar Usuario -->
    <div v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div class="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 relative">
        <div>
          <div class="flex items-center">
            <!-- Imagen de Usuario -->
            <div class="bg-customPurple rounded-full p-2 mr-2">
              <img :src="Usuario" alt="Usuario" class="w-8 h-8" />
            </div>
            <!-- Título -->
            <h2 class="text-xl font-bold text-black">DATOS DE USUARIO</h2>
          </div>
          <button @click="closeEditModal"
            class="absolute top-4 right-4 text-customPurple font-bold hover:text-white border-none rounded-full p-2">
            ✕
          </button>
         
        </div>

        <div>

          <form @submit.prevent="saveUser" class="space-y-3">
            <h3 class="font-semibold text-black ">DATOS BASE</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col">
                <label for="Nombre" class="font-medium">Nombre Completo:</label>
                <input v-model="selectedUser.nombre" type="text"
                  class="w-full px-3 h-11 py-2 bg-gray-100 border-none rounded-lg" required />
              </div>
              <!--cedula-->
              <div class="flex flex-col">
                <label for="Nombre" class="font-medium">Cedula:</label>
                <input v-model="selectedUser.numero_documento" type="cedula"
                  class="w-full px-3 h-11 py-2 bg-gray-100 border-none rounded-lg" required />
              </div>
            </div>

            <h3 class="font-semibold text-black ">DATOS LABORALES</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!--Ubicación / Sede-->
              <div class="flex flex-col">
                <label for="sed_nombre" class="font-medium">Ubicación / Sede:</label>
                <input v-model="selectedUser.sed_nombre" type="text"
                  class="w-full px-3 h-11 py-2 bg-gray-100 border-none rounded-lg" required />
              </div>
              <!--regional-->
              <div class="flex flex-col">
                <label for="regional" class="font-medium">Regional:</label>
                <input v-model="selectedUser.regional" type="text"
                  class="w-full px-3 h-11 py-2 bg-gray-100 border-none rounded-lg" required />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!--rol-->
              <div class="flex flex-col">
                <label for="rol" class="font-medium">Rol:</label>
                <select v-model="selectedUser.rol" id="rol" class="w-full border-none px-3 h-11 bg-gray-100 rounded-lg"
                  required>
                  <option value="Administrador">Administrador</option>
                  <option value="Funcionario">Funcionario</option>
                  <option value="Operario">Operario</option>
                </select>
              </div>
              

              <!--email-->
              <div class="flex flex-col">
                <label for="Correo" class="font-medium">Correo:</label>
                <input v-model="selectedUser.correo" type="email"
                  class="w-full px-3 h-11 py-2 bg-gray-100 border-none rounded-lg" required />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!--telefono-->
            <div class="flex flex-col">
              <label for="Telefono" class="font-medium">Telefono:</label>
              <input v-model="selectedUser.telefono" type="telefono"
                class="w-full px-3 h-11 py-2 bg-gray-100 border-none rounded-lg" required />
            </div>
            <!--celular-->
            <div class="flex flex-col">
              <label for="Celular" class="font-medium">Celular:</label>
              <input v-model="selectedUser.celular" type="celular"
                class="w-full px-3 h-11 py-2 bg-gray-100 border-none rounded-lg" required />
            </div>
            </div>
            
            <!--permisos de usuario-->
            <h3 class="font-semibold text-black ">PERMISOS DE USUARIO</h3>
            <div class="flex flex-row">
              <input type="checkbox" id="inicio" name="inicio" value="Bike">
              <label for="inicio">Inicio</label>

              <input type="checkbox" id="mapa" name="mapa" value="Bike">
              <label for="mapa">Mapa</label>

              <input type="checkbox" id="mapa" name="mapa" value="Bike">
              <label for="mapa">Busqueda del Ciudadano</label>

              <input type="checkbox" id="mapa" name="mapa" value="Bike">
              <label for="mapa">Cargar Archivo</label>

              <input type="checkbox" id="mapa" name="mapa" value="Bike">
              <label for="mapa">Generar Reportes</label>

              <input type="checkbox" id="mapa" name="mapa" value="Bike">
              <label for="mapa">Lista de Usuarios</label>

              <input type="checkbox" id="mapa" name="mapa" class="border border-customPurple font-bold" value="Bike">
              <label for="mapa">Linea de Atención</label>
            </div>

            <button type="submit" class="w-full bg-customPurple text-amarillo border-none font-bold py-2 rounded-lg">
              Guardar Cambios
            </button>
          </form>
        </div>

      </div>
    </div>

    <!-- Modal para Confirmar Eliminación -->
    <div v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">

      <div class="bg-white shadow-lg rounded-lg w-full max-w-lg p-6 relative">

        <button @click="closeDeleteModal"
          class="absolute top-4 right-4 text-customPurple border-none rounded-full p-2 font-bold hover:bg-customPurple hover:text-white">✕</button>
        <div class="text-center">
          <img :src="DeleteSucess" class="" alt="">
          <h2 class="text-xl font-bold mb-0  text-black">¿Estás seguro que</h2>
          <h2 class="text-xl font-bold mb-4 mt-0 text-black">deseas eliminar este usuario?</h2>
          <div class="flex justify-center space-x-4">
            <button @click="deleteUser"
              class="bg-amarillo text-customPurple border-none font-bold py-2 px-6 rounded-lg hover:bg-yellow-600">
              Aceptar
            </button>
            <button @click="closeDeleteModal"
              class="bg-customPurple text-amarillo border-none font-bold py-2 px-6 rounded-lg hover:bg-gray-400">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, reactive } from "vue";
import ListaUsuarios from '@/assets/images/ListaUsuarios.svg';
import IconoEditar from '@/assets/images/IconoEditar.svg';
import IconoEliminar from '@/assets/images/IconoEliminar.svg';
import IconoVisualizar from '@/assets/images/IconoVisualizar.svg';
import RegistroUsuario from '@/assets/images/RegistroUsuario.svg';
import DeleteSucess from '@/assets/images/delete-success.png';
import imagenRegistro from '@/assets/images/imagenRegistro.jpg';
import logoRav from '@/assets/images/LogoPageRav.svg';
import logoSena from '@/assets/images/logosenaverde.svg';
import logoApe from '@/assets/images/logoape.svg';
import Usuario from '@/assets/images/Usuario.svg';
import FondoImagen from '@/assets/images/colombiaCollage1.webp';

// Estados para modales
const showRegisterModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showSuccessModal = ref(false);
const showViewModal = ref(false);

// Usuario seleccionado para ver, editar o eliminar
const selectedUser = reactive({});
const formData = reactive({ name: "", email: "", document: "", role: "" });

// Lista de usuarios
const users = reactive([
  { nombre: "Juan ", apellido: "Perez", correo: "juan.perez@sena.edu.co", numero_documento: "123456", rol: "Funcionario", sed_nombre: "Sede Central", regional: "Regional Norte", telefono: "123-456-7890", celular: "321-654-9870" },
  { nombre: "Maria ", apellido: "Perez", correo: "juan.perez@sena.edu.co", numero_documento: "123456", rol: "Funcionario", sed_nombre: "Sede Central", regional: "Regional Norte", telefono: "123-456-7890", celular: "321-654-9870" },
]);

// Funciones para Registrar Usuario
function submitForm() {
  // Agregar el nuevo usuario a la lista
  users.push({ ...formData });
  closeRegisterModal(); // Cerrar la modal después de registrar
}


function closeRegisterModal() {
  // Limpiar los campos del formulario
  formData.name = "";
  formData.email = "";
  formData.document = "";
  formData.role = "";
  showRegisterModal.value = false;
}

// Funciones para Ver Usuario
function viewUser(user) {
  Object.assign(selectedUser, user); // Copiar datos del usuario seleccionado
  showViewModal.value = true;
}

function closeViewModal() {
  showViewModal.value = false;
}

// Funciones para Editar Usuario
function editUser(user) {
  Object.assign(selectedUser, user); // Copiar datos del usuario seleccionado
  showEditModal.value = true;
}

function closeEditModal() {
  showEditModal.value = false;
}

function saveUser() {
  // Buscar al usuario y actualizar sus datos
  const index = users.findIndex((u) => u.document === selectedUser.document);
  if (index !== -1) {
    users[index] = { ...selectedUser };
  }
  closeEditModal(); // Cerrar la modal después de guardar
}

// Funciones para Eliminar Usuario
function confirmDeleteUser(user) {
  Object.assign(selectedUser, user); // Copiar datos del usuario seleccionado
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
}

function deleteUser() {
  // Eliminar al usuario de la lista
  const index = users.findIndex((u) => u.document === selectedUser.document);
  if (index !== -1) users.splice(index, 1);

  closeDeleteModal(); // Cerrar la modal de confirmación
  showSuccessModal.value = true; // Mostrar la modal de éxito
}

function closeSuccessModal() {
  showSuccessModal.value = false;
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

/* Fondo oscuro y desenfoque */
.fixed {
  backdrop-filter: blur(5px);
  z-index: 50;
  /* Asegura que las modales estén encima */
}

.table-container {
  z-index: 10;
  /* Tabla siempre visible */
}


/* Desenfoque del fondo */
.backdrop-blur {
  backdrop-filter: blur(5px);
}

/* Estilo para los roles (botones radio) */
</style>
