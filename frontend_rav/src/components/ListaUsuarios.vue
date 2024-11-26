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
      <button
        @click="showRegisterModal = true"
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
        <div class="p-4 text-center border-b border-gray-300">{{ user.name }}</div>
        <div class="p-4 text-center border-b border-gray-300">{{ user.role }}</div>
        <div class="p-4 text-center border-b border-gray-300">{{ user.email }}</div>
        <div class="p-4 text-center border-b border-gray-300">{{ user.document }}</div>
        <div class="p-4 text-center border-b border-gray-300">
          <!-- Botón Ver -->
          <button
            @click="viewUser(user)"
            class="bg-white border-none shadow-md p-2 rounded-full">
            <img :src="IconoVisualizar" alt="Ver" class="w-5 h-5" />
          </button>
          <!-- Botón Editar -->
          <button
            @click="editUser(user)"
            class="bg-white border-none shadow-md p-2 rounded-full">
            <img :src="IconoEditar" alt="Editar" class="w-5 h-5" />
          </button>
          <!-- Botón Eliminar -->
          <button
            @click="confirmDeleteUser(user)"
            class="bg-white border-none shadow-md p-2 rounded-full">
            <img :src="IconoEliminar" alt="Eliminar" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para Registrar Usuario -->
    <div
      v-if="showRegisterModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div class="bg-white shadow-lg rounded-lg w-full max-w-4xl relative">
        <button
          @click="closeRegisterModal"
          class="absolute top-4 right-4 text-customPurple hover:text-white border-none text-xl">
          ✕
        </button>
        <h2 class="text-3xl font-semibold text-black m-2 text-center">Registrar Usuario</h2>
        <form @submit.prevent="submitForm" class="space-y-3 p-8">
          <input v-model="formData.name" type="text" placeholder="Nombre" class="w-full px-3 h-11 py-2 bg-gray-100 rounded-lg" required />
          <input v-model="formData.email" type="email" placeholder="Correo SENA" class="w-full px-3 h-11 py-2 bg-gray-100 rounded-lg" required />
          <input v-model="formData.document" type="text" placeholder="Documento" class="w-full px-3 h-11 py-2 bg-gray-100 rounded-lg" required />
          <select v-model="formData.role" class="w-full px-3 h-11 bg-gray-100 rounded-lg" required>
            <option value="" disabled>Seleccionar Rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Funcionario">Funcionario</option>
            <option value="Operario">Operario</option>
          </select>
          <button type="submit" class="w-full bg-customPurple text-white font-bold py-2 rounded-lg">
            Registrar
          </button>
        </form>
      </div>
    </div>

    <!-- Modal para Ver Usuario -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div class="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 relative">
        <button
          @click="closeViewModal"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          ✕
        </button>
        <h2 class="text-xl font-bold mb-4 text-customPurple text-center">📄 Datos del Usuario</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold text-gray-700">Datos Base</h3>
            <p>Nombre: <span class="font-medium">{{ selectedUser.name }}</span></p>
            <p>Cédula: <span class="font-medium">{{ selectedUser.document }}</span></p>
            <p>Correo: <span class="font-medium">{{ selectedUser.email }}</span></p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-700">Datos Laborales</h3>
            <p>Rol: <span class="font-medium">{{ selectedUser.role }}</span></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Editar Usuario -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div class="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 relative">
        <button
          @click="closeEditModal"
          class="absolute top-4 right-4 text-customPurple font-bold hover:text-white border-none rounded-full p-2">
          ✕
        </button>
        <h2 class="text-xl font-bold mb-4 text-customPurple text-center">✏️ Editar Usuario</h2>
        <form @submit.prevent="saveUser" class="space-y-3">
          <input v-model="selectedUser.name" type="text" placeholder="Nombre" class="w-full px-3 h-11 py-2 bg-gray-100 rounded-lg" required />
          <input v-model="selectedUser.email" type="email" placeholder="Correo" class="w-full px-3 h-11 py-2 bg-gray-100 rounded-lg" required />
          <select v-model="selectedUser.role" class="w-full px-3 h-11 bg-gray-100 rounded-lg" required>
            <option value="Administrador">Administrador</option>
            <option value="Funcionario">Funcionario</option>
            <option value="Operario">Operario</option>
          </select>
          <button type="submit" class="w-full bg-customPurple text-white font-bold py-2 rounded-lg">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>

    <!-- Modal para Confirmar Eliminación -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      
      <div class="bg-white shadow-lg rounded-lg w-full max-w-lg p-6 relative">
     
        <button @click="closeDeleteModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-800">✕</button>
        <div class="text-center">
          <img :src="DeleteSucess" class="" alt="">
          <h2 class="text-xl font-bold mb-0  text-black">¿Estás seguro que</h2>
          <h2 class="text-xl font-bold mb-4 mt-0 text-black">deseas eliminar este usuario?</h2>
          <div class="flex justify-center space-x-4">
            <button @click="deleteUser" class="bg-amarillo text-customPurple border-none font-bold py-2 px-6 rounded-lg hover:bg-yellow-600">
              Aceptar
            </button>
            <button @click="closeDeleteModal" class="bg-customPurple text-amarillo border-none font-bold py-2 px-6 rounded-lg hover:bg-gray-400">
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
import  IconoEditar from '@/assets/images/IconoEditar.svg';
import  IconoEliminar from '@/assets/images/IconoEliminar.svg';
import  IconoVisualizar from '@/assets/images/IconoVisualizar.svg';
import  RegistroUsuario from '@/assets/images/RegistroUsuario.svg';
import DeleteSucess from '@/assets/images/delete-success.png';

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
  { name: "Juan Perez", email: "juan.perez@sena.edu.co", document: "123456", role: "Funcionario" },
  { name: "Ana Lopez", email: "ana.lopez@sena.edu.co", document: "789012", role: "Administrador" },
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
  z-index: 50; /* Asegura que las modales estén encima */
}

.table-container {
  z-index: 10; /* Tabla siempre visible */
}
</style>


