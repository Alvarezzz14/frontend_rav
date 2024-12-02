<template>
    <div>
      <!-- Sección superior: Icono y título -->
      <div class="flex flex-col sm:flex-row items-center sm:justify-between p-4">
        <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl">
          <!-- Icono y Título -->
          <div class="flex items-center -mb-8">
            <div class="p-5 bg-customPurple rounded-full mb-5">
              <img :src="Rol" alt="Icono de Roles y Permisos" width="50" height="50" />
            </div>
            <div class="ml-3 text-center md:text-left">
              <p class="text-black mb-0 text-6xl md:text-2xl">Roles y</p>
              <h2 class="text-customPurple text-5xl md:text-5xl mt-0 font-bold">Permisos</h2>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Contenedores principales -->
      <div class="mt-4 bg-white rounded-lg shadow p-4 space-y-6">
        <!-- Primer contenedor -->
        <div class="flex flex-wrap items-center gap-4">
          <!-- Icono y texto de Roles -->
          <div class="flex items-center gap-40">
            <!-- Icono y texto de Roles -->
            <div class="flex items-center gap-2">
                <div class="p-2 bg-customPurple rounded-full">
                <img src="@/assets/images/rol1.svg" alt="Roles Icon" class="w-8 h-8" />
                </div>
                <span class="font-bold text-black">ROLES</span>
            </div>
            
            <!-- Contenedor de los campos input y select -->
            <div class="flex flex-wrap gap-4 text-right">
                <!-- Campo de input -->
                <input
                    type="text"
                    placeholder="Escribe un rol"
                    class="border rounded-md p-2 w-full sm:w-96 lg:w-450 focus:outline-none focus:ring"
                />

                <!-- Campo de select -->
                <select
                    v-model="selectedRole"
                    class="border rounded-md p-2 w-full sm:w-96 lg:w-450 focus:outline-none focus:ring"
                >
                    <option value="" disabled>Seleccione el Rol</option>
                    <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
                </select>
                </div>
            </div>
        </div>
  
        <!-- Segundo contenedor -->
        <div class="flex flex-wrap items-center gap-4">
          <!-- Icono y texto de Módulos -->
          <div class="flex items-center gap-2">
            <div class="p-2 bg-customPurple rounded-full">
              <img src="@/assets/images/rol.svg" alt="Modules Icon" class="w-8 h-8" />
            </div>
            <span class="font-bold text-black">MODULOS</span>
          </div>
          <!-- Icono y texto de Permisos -->
          <div class="flex items-center gap-2">
            <div class="p-2 bg-customPurple rounded-full">
              <img src="@/assets/images/rol1.svg" alt="Permissions Icon" class="w-8 h-8" />
            </div>
            <span class="font-bold text-black">PERMISOS</span>
          </div>
          <!-- Botones -->
          <div class="flex gap-4 ml-auto">    
            <Button
                type="button"
                label="Cancelar"
                :loading="loading"
                class="mt-3 w-50 h-10 text-base !hover:bg-yellow-600 !border-none !bg-customPurple !text-amarillo"
                @click="cancelAction" />
  
            <Button
                type="button"
                label="Guardar"
                :loading="loading"
                class="mt-3 w-50 h-10 text-base !hover:bg-purple-600 !border-none !bg-customPurple !text-amarillo"
                @click="saveAction" />   
          </div>
        </div>
  
       
  
        <div class="overflow-x-auto">
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-customPurple text-white">
        <th class="border border-gray-300 p-2 text-left">
          <div class="flex items-center gap-2">
            <img src="@/assets/images/nombrerol.svg" alt="Module Icon" class="w-4 h-4" />
            NOMBRE DEL MODULO
          </div>
        </th>
        <th class="border border-gray-300 p-2">
          <div class="flex items-center gap-2">
            <img src="@/assets/images/verol.svg" alt="Module Icon" class="w-4 h-4" />
            VER
          </div>
        </th>
        <th class="border border-gray-300 p-2">
          <div class="flex items-center gap-2">
            <img src="@/assets/images/crearrol.svg" alt="Module Icon" class="w-4 h-4" />
            CREAR / EDITAR
          </div>
        </th>
        <th class="border border-gray-300 p-2">
          <div class="flex items-center gap-2">
            <img src="@/assets/images/exportarrol.svg" alt="Module Icon" class="w-4 h-4" />
            EXPORTAR
          </div>
        </th>
        <th class="border border-gray-300 p-2">
          <div class="flex items-center gap-2">
            <img src="@/assets/images/eliminarrol.svg" alt="Module Icon" class="w-4 h-4" />
            ELIMINAR
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(module, index) in modules" :key="index">
        <td class="border border-gray-300 p-2">
          <div class="flex items-center gap-2">
            <input type="checkbox" class="mr-2" v-model="module.selected" />
            <span>{{ module.name }}</span>
          </div>
        </td>
        <td class="border border-gray-300 text-center">
          <input type="checkbox" v-model="module.permissions.view" />
        </td>
        <td class="border border-gray-300 text-center">
          <input type="checkbox" v-model="module.permissions.edit" />
        </td>
        <td class="border border-gray-300 text-center">
          <input type="checkbox" v-model="module.permissions.export" />
        </td>
        <td class="border border-gray-300 text-center">
          <input type="checkbox" v-model="module.permissions.delete" />
        </td>
      </tr>
    </tbody>
  </table>
</div>

        </div>
      </div>    
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Rol from "@/assets/images/Rol.svg";
  import Rol1 from "@/assets/images/verol.svg";
  import Rol2 from "@/assets/images/crearrol.svg";
  import Rol3 from "@/assets/images/exportarrol.svg";
  import Rol4 from "@/assets/images/eliminarrol.svg";
  
  // Variables y datos ficticios
  const roles = ref(["Administrador", "Usuario", "Supervisor"]);
  const selectedRole = ref("");
  
  // Datos de módulos y permisos
  const modules = ref([
    {
      name: "Inicio",
      selected: false,
      permissions: {
        view: true,
        edit: false,
        export: false,
        delete: false,
      },
    },
    {
      name: "Mapa",
      selected: false,
      permissions: {
        view: false,
        edit: true,
        export: false,
        delete: false,
      },
    },
    {
      name: "Búsqueda del Ciudadano",
      selected: false,
      permissions: {
        view: false,
        edit: false,
        export: true,
        delete: false,
      },
    },
    {
      name: "Cargar Archivo",
      selected: false,
      permissions: {
        view: true,
        edit: false,
        export: true,
        delete: false,
      },
    },
    {
      name: "Generar Reportes",
      selected: false,
      permissions: {
        view: false,
        edit: false,
        export: false,
        delete: true,
      },
    },
    {
      name: "Lista de Usuarios",
      selected: false,
      permissions: {
        view: false,
        edit: false,
        export: false,
        delete: false,
      },
    },
    {
      name: "Línea de Atención",
      selected: true,
      permissions: {
        view: true,
        edit: true,
        export: false,
        delete: true,
      },
    },
    {
      name: "Roles y Permisos",
      selected: true,
      permissions: {
        view: true,
        edit: true,
        export: true,
        delete: true,
      },
    },
  ]);
  
  // Funciones
  const cancelAction = () => {
    alert("Acción cancelada");
  };
  
  const saveAction = () => {
    alert("Cambios guardados");
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales */
  .bg-customPurple {
    background-color: #71277A; /* Color púrpura personalizado */
  }
  
  .bg-customYellow {
    background-color: #FDC300; /* Color amarillo personalizado */
    
  }
  </style>
  