<template>
	<div class="space-y-4">
		<TicketsRutaAccion />
		<Dialog
			v-model:="dialogVisible"
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
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useEventStore } from "@/stores/storedataOff.js";
import TicketsRutaAccion from "@/components/TicketsRutaAccion.vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const route = useRoute();
const cedula = route.params.cedula;
const eventStore = useEventStore();
const searchResults = ref([]);
const selectedEvent = ref(null);
const dialogVisible = ref(false);

const nombre = computed(() => searchResults.value[0]?.profile || "Víctima");

const groupedEvents = computed(() => {
	return searchResults.value.reduce((groups, event) => {
		if (!groups[event.date]) groups[event.date] = [];
		groups[event.date].push(event);
		return groups;
	}, {});
});

const showEventDetails = (event) => {
	selectedEvent.value = event;
	dialogVisible.value = true;
};

const closeDialog = () => {
	dialogVisible.value = false;
};

// Cargar eventos al montar el componente
onMounted(async () => {
	searchResults.value = await eventStore.searchByCedula(cedula);
});
</script>

<style scoped>
/* Puedes agregar estilos personalizados adicionales aquí */
</style>
