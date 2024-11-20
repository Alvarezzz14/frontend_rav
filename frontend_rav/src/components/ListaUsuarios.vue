<template>
    <div class="min-h-screen p-4 flex flex-col items-center justify-stretch">
      <!-- Sección Superior (Título, Icono, Información del Ciudadano) -->
      <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-8">
        <!-- Icono y Título -->
        <div class="flex items-center mb-4 md:mb-0">
          <div class="p-6 bg-customPurple rounded-full">
            <!-- Icono SVG -->
            <img
              :src="ListaUsuarios"
              alt="Icono de Reportes"
              width="50"
              height="50" />
          </div>
          <div class="ml-4 text-center md:text-left">
            <p class="text-black mb-0 text-2xl md:text-3xl">Lista de</p>
            <h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">
              Usuarios
            </h2>
          </div>
        </div>
        <!-- Botón de Registrar Usuario -->
        <button class="bg-customPurple text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center hover:bg-purple-700 transition duration-300">
      <!-- Imagen con espacio inferior -->
      <img :src="RegistroUsuario" alt="Botón de Registrar Usuario" class="w-16 h-16 mb-2" />
      <!-- Texto debajo de la imagen -->
      <span class="text-center font-bold text-white">Registrar Usuario</span>
    </button>
      </div>
  
      <!-- Tabla de Usuarios -->
      <div class="overflow-x-auto w-full max-w-7xl">
        <table class="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th class="px-4 py-2 border text-center">NOMBRE</th>
              <th class="px-4 py-2 border text-center">ROLL</th>
              <th class="px-4 py-2 border text-center">CORREO</th>
              <th class="px-4 py-2 border text-center">DOCUMENTO</th>
              <th class="px-4 py-2 border text-center">PERMISOS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td class="px-4 py-2 border text-center">{{ user.name }}</td>
              <td class="px-4 py-2 border text-center">{{ user.role }}</td>
              <td class="px-4 py-2 border text-center">{{ user.email }}</td>
              <td class="px-4 py-2 border text-center">{{ user.document }}</td>
              <td class="px-4 py-2 border text-center">
                <button class="bg-yellow-400 text-white py-1 px-3 rounded-full">Ver</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import ListaUsuarios from "@/assets/images/ListaUsuarios.svg";
  import RegistroUsuario from "@/assets/images/RegistroUsuario.svg";
  
  // Datos de ejemplo para los usuarios
  const users = [
    { name: "John Doe", role: "Funcionario", email: "johndoe@gmail.com", document: "1154373590" },
    { name: "Jane Smith", role: "Administrador", email: "janesmith@gmail.com", document: "1154373591" },
    { name: "Mark Johnson", role: "Funcionario", email: "markjohnson@gmail.com", document: "1154373592" },
    { name: "Emily Davis", role: "Funcionario", email: "emilydavis@gmail.com", document: "1154373593" },
    { name: "Michael Brown", role: "Supervisor", email: "michaelbrown@gmail.com", document: "1154373594" },
  ];
  </script>
  
  <style scoped>
 
  
  button:hover {
    background-color: #4b286f;
  }
  
  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: center;
  }
  

  </style>
  