<template>
	<div
		class="p-5 rounded-lg shadow-lg backdrop-blur-lg backdrop-opacity-50 border border-white/30">
		<table class="w-full border-collapse">
			<thead>
				<tr class="text-left text-gray-700">
					<th class="pb-4">Fecha</th>
					<th class="pb-4">Ticket</th>
					<th class="pb-4">Visualizar</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(events, date) in groupedEvents" :key="date">
					<td
						class="border-t py-4"
						:rowspan="openedGroups[date] ? events.length : 1">
						<div class="flex flex-col items-start">
							<time class="text-lg font-bold text-gray-700">{{ date }}</time>
							<button
								@click="toggleGroup(date)"
								class="text-customPurple font-semibold hover:underline cursor-pointer mt-2">
								{{ openedGroups[date] ? "Cerrar" : "Ver más" }}
							</button>
						</div>
					</td>

					<td v-if="openedGroups[date]" class="border-t py-4">
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
							<button
								@click.prevent="$emit('showEventDetails', event)"
								class="text-customPurple hover:underline">
								Ver más
							</button>
						</div>
					</td>

					<!-- Placeholder if not expanded -->
					<td
						v-else
						colspan="2"
						class="text-customPurple border-t py-4 text-center">
						Haz click para ver más información.
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
	groupedEvents: {
		type: Object,
		required: true,
	},
});

// Controlar la expansión y colapso de los grupos
const openedGroups = ref({});
const toggleGroup = (date) => {
	openedGroups.value[date] = !openedGroups.value[date];
};
</script>

<style scoped>
/* Estilos de tabla y personalización con Tailwind */
.table-container {
	@apply p-5 rounded-lg shadow-lg backdrop-blur-lg backdrop-opacity-50 border border-white/30;
}

table {
	@apply w-full border-collapse;
}

th,
td {
	@apply py-4 text-left border-t;
}

td button {
	@apply text-customPurple font-semibold hover:underline cursor-pointer;
}
</style>
