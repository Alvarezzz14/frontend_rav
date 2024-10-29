<template>
	<div
		class="flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-100 h-full">
		<!-- Imagen del ciudadano a la izquierda -->
		<div class="lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0">
			<img :src="Ciudadano" alt="Ciudadano" class="w-96 h-fit object-contain" />
		</div>

		<!-- Texto y campo de búsqueda a la derecha -->
		<div class="flex flex-col items-center lg:items-start lg:w-2/3 lg:pl-10">
			<!-- Texto de información -->
			<div class="mb-6">
				<p class="text-xl lg:text-3xl font-medium text-inherit">
					Aquí podrás visualizar información acerca de la
				</p>
				<h2 class="lg:text-5xl font-bold text-customPurple">
					Ruta de Atención al Ciudadano.
				</h2>
			</div>

			<!-- Sección de búsqueda -->
			<div class="w-full lg:w-2/3 bg-white p-5 rounded-2xl shadow-lg">
				<div class="flex flex-col items-center">
					<input
						v-model="searchCedula"
						@keydown.enter="searchUser"
						type="text"
						placeholder="Buscar por número de cédula"
						class="w-full p-4 border text-customPurple border-customPurple rounded-lg" />
					<!-- Botón de búsqueda con PrimeVue -->
					<Button
						type="button"
						label="Buscar"
						icon="pi pi-search"
						:loading="loading"
						class="mt-4 w-full lg:w-auto !hover:bg-purple-600 !border-none !bg-customPurple text-white"
						@click="searchUser" />
				</div>
			</div>
		</div>
		<!-- Modal de no encontrado usando PrimeVue Dialog -->
		<Dialog
			v-model:visible="noResultsModal"
			modal
			header="Búsqueda Fallida"
			:style="{ width: '30rem' }">
			<p class="m-0 text-customPurple">
				{{ modalMessage }}
				<strong>{{ searchCedula }}</strong>
			</p>
			<template #footer>
				<Button
					label="Cerrar"
					@click="noResultsModal = false"
					class="p-button-text" />
			</template>
		</Dialog>
	</div>
</template>

<script setup>
import Ciudadano from "@/assets/images/Ciudadano.svg";
import { ref, computed } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const searchCedula = ref("");
const searchResults = ref(null); // Data para la línea de tiempo
const searching = ref(false); // Flag para mostrar mensaje de no encontrado
const selectedEvent = ref(null);
const dialogVisible = ref(false); // Estado del diálogo para ver más detalles
const noResultsModal = ref(false); // Estado del diálogo para no encontrado
const modalMessage = ref(""); // Guardar mensaje dinámico del modal

const loading = ref(false);
// Simulación de datos de la línea de tiempo
const timelineData = ref([
	{
		date: "13-jul-2024",
		profile: "John Doe",
		profileImage: "/images/logoape.svg",
		cedula: "12345678",
		title: "Evento 1: Revisión médica",
		description: "Descripción del evento: Revisión médica para John Doe",
	},
	{
		date: "13-jul-2024",
		profile: "John Doe",
		profileImage: "/images/logosenaverde.svg",
		cedula: "12345678",
		title: "Evento 2: Consulta jurídica",
		description: "Descripción del evento: Consulta jurídica para John Doe",
	},
	{
		date: "13-jul-2024",
		profile: "John Doe",
		profileImage: "/images/logosenaverde.svg",
		cedula: "12345678",
		title: "Evento 3: Seguimiento social",
		description: "Descripción del evento: Seguimiento social para John Doe",
	},
	{
		date: "13-jul-2024",
		profile: "Jane Smith",
		profileImage: "/images/logosenaverde.svg",
		cedula: "87654321",
		title: "Evento 4: Entrevista psicológica",
		description:
			"Descripción del evento: Entrevista psicológica para Jane Smith",
	},
	{
		date: "13-jul-2024",
		profile: "Jane Smith",
		profileImage: "/images/logosenaverde.svg",
		cedula: "87654321",
		title: "Evento 5: Entrega de documentos",
		description:
			"Descripción del evento: Entrega de documentos para Jane Smith",
	},
	{
		date: "14-jul-2024",
		profile: "Robert Johnson",
		profileImage: "/images/logosenaverde.svg",
		cedula: "11223344",
		title: "Evento 6: Citación a audiencia",
		description:
			"Descripción del evento: Citación a audiencia para Robert Johnson",
	},
	{
		date: "14-jul-2024",
		profile: "Robert Johnson",
		profileImage: "/images/logosenaverde.svg",
		cedula: "11223344",
		title: "Evento 7: Notificación de medidas",
		description:
			"Descripción del evento: Notificación de medidas para Robert Johnson",
	},
	{
		date: "15-jul-2024",
		profile: "Laura Romero",
		profileImage: "/images/logosenaverde.svg",
		cedula: "55667788",
		title: "Evento 8: Informe final de caso",
		description:
			"Descripción del evento: Informe final de caso para Laura Romero",
	},
	{
		date: "15-jul-2024",
		profile: "Laura Romero",
		profileImage: "/images/logosenaverde.svg",
		cedula: "55667788",
		title: "Evento 9: Seguimiento social",
		description: "Descripción del evento: Seguimiento social para Laura Romero",
	},
	{
		date: "16-jul-2024",
		profile: "John Doe",
		profileImage: "/images/logoape.svg",
		cedula: "12345678",
		title: "Evento 10: Entrega de documentos",
		description: "Descripción del evento: Entrega de documentos para John Doe",
	},
	{
		date: "17-jul-2024",
		profile: "Jane Smith",
		profileImage: "/images/logosenaverde.svg",
		cedula: "87654321",
		title: "Evento 11: Revisión médica",
		description: "Descripción del evento: Revisión médica para Jane Smith",
	},
	{
		date: "18-jul-2024",
		profile: "Robert Johnson",
		profileImage: "/images/logosenaverde.svg",
		cedula: "11223344",
		title: "Evento 12: Consulta jurídica",
		description:
			"Descripción del evento: Consulta jurídica para Robert Johnson",
	},
	{
		date: "19-jul-2024",
		profile: "Laura Romero",
		profileImage: "/images/logosenaverde.svg",
		cedula: "55667788",
		title: "Evento 13: Entrevista psicológica",
		description:
			"Descripción del evento: Entrevista psicológica para Laura Romero",
	},
	{
		date: "20-jul-2024",
		profile: "John Doe",
		profileImage: "/images/logosenaverde.svg",
		cedula: "12345678",
		title: "Evento 14: Informe final de caso",
		description: "Descripción del evento: Informe final de caso para John Doe",
	},
	{
		date: "21-jul-2024",
		profile: "Jane Smith",
		profileImage: "/images/logosenaverde.svg",
		cedula: "87654321",
		title: "Evento 15: Citación a audiencia",
		description: "Descripción del evento: Citación a audiencia para Jane Smith",
	},
]);

// Simulación de búsqueda por número de cédula
const searchUser = () => {
	if (!searchCedula.value.trim()) {
		noResultsModal.value = true; // Mostrar modal si el campo está vacío
		modalMessage.value = "Por favor, ingrese un número de cédula.";
		return; // Detener el flujo si no se ha ingresado una cédula
	}

	loading.value = true; // Iniciar carga
	searching.value = true;

	setTimeout(() => {
		const filteredResults = timelineData.value.filter(
			(event) => event.cedula === searchCedula.value
		);

		if (filteredResults.length > 0) {
			searchResults.value = filteredResults;
		} else {
			searchResults.value = null; // No encontrado
			noResultsModal.value = true; // Mostrar modal de no encontrado
			modalMessage.value = `No se encontraron resultados con la cédula:`;
		}

		loading.value = false; // Finalizar carga
		searching.value = false;
	}, 700); // Simula el tiempo de búsqueda
};

// Función para mostrar más detalles y abrir el modal
const showEventDetails = (event) => {
	selectedEvent.value = event;
	dialogVisible.value = true;
};

// Función para cerrar el modal de detalles
const closeDialog = () => {
	dialogVisible.value = false;
};

// Agrupar los eventos por fecha
const groupedEvents = computed(() => {
	return timelineData.value.reduce((groups, event) => {
		if (!groups[event.date]) {
			groups[event.date] = [];
		}
		groups[event.date].push(event);
		return groups;
	}, {});
});

// Controlar la expansión y colapso de los grupos
const openedGroups = ref({});
const toggleGroup = (date) => {
	openedGroups.value[date] = !openedGroups.value[date];
};
</script>
