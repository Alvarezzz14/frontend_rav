<template>
    <div class="overflow-x-auto bg-white">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-4 py-2 text-left">Fecha</th>
            <th class="px-4 py-2 text-left">Ticket</th>
            <th class="px-4 py-2 text-center">Visualizar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ticket, index) in tickets" :key="index" class="border-b">
            <!-- Fecha -->
            <td class="px-4 py-2 text-left text-gray-500">
              {{ ticket.fecha }}
            </td>
  
            <!-- Ticket Información -->
            <td class="px-4 py-2">
              <div class="flex items-center space-x-4">
                <img
                  :src="ticket.logo"
                  alt="Logo"
                  class="w-10 h-10 object-contain"
                />
                <div>
                  <h3 class="font-bold">{{ ticket.titulo }}</h3>
                  <p class="text-gray-600">{{ ticket.descripcion }}</p>
                  <button class="mt-2 px-4 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                    Ver más
                  </button>
                </div>
              </div>
            </td>
  
            <!-- Visualizar botón -->
            <td class="px-4 py-2 text-center">
              <button
                @click="ticket.visualizado = !ticket.visualizado"
                :class="ticket.visualizado ? 'bg-customPurple' : 'bg-yellow-400'"
                class="px-4 py-1 text-white rounded"
              >
                {{ ticket.visualizado ? 'Cerrar' : 'Ver' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tickets: [
          {
            fecha: "13/07/2023",
            logo: "https://via.placeholder.com/40x40.png?text=SENA", // Imagen placeholder
            titulo: "Citación a Audiencia",
            descripcion: "Descripción del evento: citación a audiencia para Robert Johnson.",
            visualizado: false
          },
          {
            fecha: "14/07/2024",
            logo: "https://via.placeholder.com/40x40.png?text=SENA",
            titulo: "Notificación de Medidas",
            descripcion: "Descripción del evento: Notificación de Medidas para Robert Johnson.",
            visualizado: false
          },
          // Agregar más tickets aquí
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Añadir aquí estilos personalizados si es necesario */
  </style>
  