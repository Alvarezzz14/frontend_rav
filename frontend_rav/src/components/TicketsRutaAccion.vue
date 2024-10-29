<template>
  <img :src='LogoSena' alt="">
  <div class="overflow-x-auto">
    <table class="min-w-full table-auto border-separate" style="border-spacing: 0 8px;">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-4 py-2 text-left border-r border-gray-300">Fecha</th>
          <th class="px-4 py-2 text-left border-r border-gray-300">Ticket</th>
          <th class="px-4 py-2 text-center">Visualizar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ticket, index) in tickets" :key="index" class="bg-white shadow border border-gray-200">
          <!-- Fecha -->
          <td class="px-4 py-2 text-left text-gray-500 border-r border-gray-300">
            {{ ticket.fecha }}
          </td>

          <!-- Ticket Información -->
          <td class="px-4 py-2 border-r border-gray-300">
            <div class="flex items-center space-x-4">
              <img
                :src="imagenLogo"
                alt="Logo"
                class="w-10 h-10 object-contain"
              />
              <div>
                <h3 class="font-bold">{{ ticket.titulo }}</h3>
                <p class="text-gray-600">{{ ticket.descripcion }}</p>
                <button class="mt-2 px-4 py-1 bg-amarillo text-white rounded-lg border-solid  cursor-pointer hover:bg-customPurple">
                  Ver más
                </button>
              </div>
            </div>
          </td>

          <!-- Visualizar botón -->
          <td class="px-4 py-2 text-center">
            <button
              @click="ticket.visualizado = !ticket.visualizado"
              :class="ticket.visualizado ? 'bg-customPurple' :  'bg-amarillo rounded-lg border-solid  cursor-pointer '"
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
import LogoSena from '../assets/logosenaverde.svg';

export default {
  data() {
    return {
      imagenLogo:  LogoSena,
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
/* Estilos adicionales */
thead th {
  border-bottom: 2px solid #e5e7eb; /* Agrega un borde inferior en el encabezado */
}

tbody tr {
  transition: background-color 0.2s ease-in-out;
}

tbody tr:hover {
  background-color: #f9fafb; /* Cambia el fondo al pasar el ratón por encima */
}
</style>
