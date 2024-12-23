<template>
    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl" @click.stop>
        <!-- Encabezado -->
        <div class="flex items-center bg-gray-100 border-b p-4">
          <img :src="usuario" alt="Logo RAV" class="w-36 h-32 mr-4" />
          <div>
            <h2 class="text-lg font-bold text-black">
              BIENVENIDO A LA RUTA DE ATENCIÓN A VÍCTIMAS
            </h2>
            <p class="text-sm text-black">
              Complete los datos base visualizados a continuación
            </p>
          </div>
        </div>
  
        <!-- Contenido -->
        <div class="p-6">
          <!-- Datos base -->
          <div class="grid grid-cols-3 gap-4 items-start">
            <div class="col-span-2 space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="nombre" class="block text-sm font-bold text-black">Nombre completo:</label>
                  <input id="nombre" type="text" v-model="formData.nombre"
                    class="w-full border border-gray-300 rounded-md p-2 text-black"
                    placeholder="Ingrese su nombre" />
                </div>
                <div>
                  <label for="cedula" class="block text-sm font-bold text-black">Cédula:</label>
                  <input id="cedula" type="text" v-model="formData.cedula"
                    class="w-full border border-gray-300 rounded-md p-2 text-black"
                    placeholder="Ingrese su cédula" />
                </div>
              </div>
  
              <!-- Datos laborales -->
              <div>
                <h3 class="font-bold text-black">DATOS LABORALES</h3>
                <div class="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label for="ubicacion" class="block text-sm font-bold text-black">Ubicación / Sede:</label>
                    <input id="ubicacion" type="text" v-model="formData.ubicacion"
                      class="w-full border border-gray-300 rounded-md p-2 text-black"
                      placeholder="Ingrese su sede" />
                  </div>
                  <div>
                    <label for="regional" class="block text-sm font-bold text-black">Regional:</label>
                    <input id="regional" type="text" v-model="formData.regional"
                      class="w-full border border-gray-300 rounded-md p-2 text-black"
                      placeholder="Ingrese su regional" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label for="rol" class="block text-sm font-bold text-black">Rol:</label>
                    <select id="rol" v-model="formData.rol" class="w-full border border-gray-300 rounded-md p-2 text-black">
                      <option value="administrador">Administrador</option>
                      <option value="usuario">Usuario</option>
                    </select>
                  </div>
                  <div>
                    <label for="correo" class="block text-sm font-bold text-black">Correo SENA:</label>
                    <input id="correo" type="email" v-model="formData.correo"
                      class="w-full border border-gray-300 rounded-md p-2 text-black"
                      placeholder="Correo institucional" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label for="telefono" class="block text-sm font-bold text-black">Teléfono:</label>
                    <input id="telefono" type="tel" v-model="formData.telefono"
                      class="w-full border border-gray-300 rounded-md p-2 text-black"
                      placeholder="Ingrese su teléfono" />
                  </div>
                  <div>
                    <label for="celular" class="block text-sm font-bold text-black">Celular:</label>
                    <input id="celular" type="tel" v-model="formData.celular"
                      class="w-full border border-gray-300 rounded-md p-2 text-black"
                      placeholder="Ingrese su celular" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Imagen -->
            <div class="flex justify-center">
              <div class="bg-customPurple rounded-full w-32 h-32 flex items-center justify-center">
                <img :src="avatar" alt="Avatar" class="w-24 h-24" />
              </div>
            </div>
          </div>
        </div>
  
        <!-- Botones -->
        <div class="flex justify-end space-x-4 p-4 border-t">
          <button @click="closeModal" class="bg-amarillo cursor-pointer border-none hover:bg-yellow-600 text-customPurple font-bold py-2 px-4 rounded-md">
            Cancelar
          </button>
          <button 
            @click="saveData" 
            :disabled="!isFormValid" 
            class="bg-customPurple cursor-pointer border-none hover:bg-purple-700 text-amarillo font-bold py-2 px-4 rounded-md"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import usuario from '@/assets/images/LogoPageRav.svg';
  import avatar from '@/assets/images/UserWhite.svg';
  import { ref, computed } from 'vue';
  
  // Estado reactivo para el modal
  const isModalOpen = ref(true);
  
  // Estado reactivo para los datos del formulario
  const formData = ref({
    nombre: '',
    cedula: '',
    ubicacion: '',
    regional: '',
    rol: '',
    correo: '',
    telefono: '',
    celular: '',
  });
  
  // Función para cerrar el modal
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  // Computed para verificar si el formulario está completo
  const isFormValid = computed(() => {
    return Object.values(formData.value).every(value => value.trim() !== '');
  });
  
  // Función para guardar los datos (puedes agregar lógica para guardar los datos aquí)
  const saveData = () => {
    if (isFormValid.value) {
      console.log('Formulario guardado', formData.value);
      closeModal(); // Cerrar el modal después de guardar
    }
  };
  </script>
  