<template>
	<div
		class="p-5 rounded-lg shadow-lg backdrop-blur-lg backdrop-opacity-50 border border-white/30">
		<table class="w-full border-separate">
			<thead>
				<tr class="text-left text-gray-700">
					<th class="pb-4">Fecha</th>
					<th class="pb-4">Ticket</th>
					<th class="pb-4">Visualizar</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(events, date) in groupedEvents" :key="date">
					<td class="py-4 px-2">
						<div class="flex flex-col items-start">
							<time class="text-lg font-bold text-gray-700">{{ date }}</time>
							<button
								@click="toggleGroup(date)"
								class="text-customPurple font-semibold hover:underline cursor-pointer mt-2">
								{{ openedGroups[date] ? "Cerrar" : "Ver más" }}
							</button>
						</div>
					</td>

					<td v-if="openedGroups[date]" class="py-4 px-2">
						<div v-for="(event, index) in events" :key="index">
							<div class="flex items-center space-x-4 mb-4">
								<img
									:src="event.profileImage"
									alt="Profile"
									class="w-14 h-14 rounded-full" />
								<div>
									<p class="font-semibold text-customPurple">
										{{ event.title }}
									</p>
									<p class="text-gray-600">{{ event.description }}</p>
								</div>
							</div>
						</div>
					</td>

					<td
						v-else
						colspan="2"
						class="text-customPurple py-4 px-2 text-center">
						<button
							@click.prevent="$emit('showEventDetails', event)"
							class="text-customPurple hover:underline">
							Ver más
						</button>
						Haz click para ver más información.
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { ref } from "vue";

const groupedEvents = ref({
	"2024-11-20": [
		{
			title: "Revisión del ticket 12345",
			description: "Pendiente de aprobación",
			profileImage: "https://via.placeholder.com/56",
		},
		{
			title: "Consulta del ticket 12346",
			description: "Ticket cerrado satisfactoriamente",
			profileImage: "https://via.placeholder.com/56",
		},
	],
	"2024-11-21": [
		{
			title: "Actualización del ticket 12347",
			description: "Nuevo comentario agregado",
			profileImage: "https://via.placeholder.com/56",
		},
	],
});

const openedGroups = ref({});
const toggleGroup = (date) => {
	openedGroups.value[date] = !openedGroups.value[date];
};
</script>

<style scoped>
/* Aplicar bordes con espaciado */
table {
	border-collapse: separate;
	border-spacing: 8px; /* Espacio entre celdas */
	width: 100%;
}

th,
td {
	border: 1px solid #ccc; /* Borde individual para cada celda */
	background-color: #fff; /* Fondo blanco para celdas */
	text-align: left; /* Alinear texto a la izquierda */
}

thead th {
	background-color: #f3f4f6; /* Fondo gris claro para encabezados */
	font-weight: bold;
	padding: 12px;
}

tbody tr:hover td {
	background-color: #f9f9f9; /* Fondo más claro al pasar el cursor */
}

tbody td {
	padding: 10px; /* Espaciado interno en las celdas */
}
</style>
