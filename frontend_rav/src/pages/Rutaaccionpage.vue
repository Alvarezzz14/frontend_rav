<template>
	<div class="space-y-4">
		<!-- Agrega espaciado vertical entre los componentes -->
		<TituloRutaAccion :nombre="nombre" :cedula="cedula" />
		<TicketsRutaAccion
			:groupedEvents="groupedEvents"
			@showEventDetails="showEventDetails" />
	</div>

	<!-- Dialogo para los detalles del evento -->
	<Dialog
		v-model:visible="dialogVisible"
		maximizable
		modal
		header="Detalles del Evento"
		class="!text-customPurple"
		:style="{ width: '50rem' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
		<p class="m-0 text-black">{{ selectedEvent?.description }}</p>
		<template #footer>
			<Button label="Cerrar" @click="closeDialog" class="p-button-text" />
		</template>
	</Dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useEventStore } from "@/stores/storedataOff.js";

import TituloRutaAccion from "@/components/TituloRutaAccion.vue";
import TicketsRutaAccion from "@/components/TicketsRutaAccion.vue";

// Obtén cédula desde los parámetros de la URL
const route = useRoute();
const cedula = route.params.cedula;

// Configura el store
const eventStore = useEventStore();

// Obtén los eventos relacionados con la cédula
const searchResults = ref(eventStore.searchByCedula(cedula));
const citizenName = computed(
	() => searchResults.value[0]?.profile || "Ciudadano"
);

// Agrupación de eventos por fecha
const groupedEvents = computed(() => {
	return searchResults.value.reduce((groups, event) => {
		if (!groups[event.date]) {
			groups[event.date] = [];
		}
		groups[event.date].push(event);
		return groups;
	}, {});
});

// Configuración de modal para detalles
const selectedEvent = ref(null);
const dialogVisible = ref(false);

const showEventDetails = (event) => {
	selectedEvent.value = event;
	dialogVisible.value = true;
};

const closeDialog = () => {
	dialogVisible.value = false;
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados adicionales aquí */
</style>
