<template>
	<!-- Contenedor Glaseado para la Línea de Tiempo -->
	<div
		class="glass-container p-5 rounded-lg shadow-lg backdrop-blur-lg backdrop-opacity-50 border border-white/30 bg-white">
		<div v-for="(events, date) in groupedEvents" :key="date" class="mb-6">
			<div
				class="flex items-center justify-between mb-4 border-b border-gray-300 pb-2">
				<time class="text-lg font-bold text-gray-700">{{ date }}</time>
				<button
					@click="toggleGroup(date)"
					class="text-customPurple font-semibold hover:underline cursor-pointer">
					{{ openedGroups[date] ? "Cerrar" : "Ver" }}
				</button>
			</div>

			<!-- Transición de los eventos de cada grupo -->
			<transition
				name="slide-fade"
				mode="out-in"
				enter-active-class="transition-all ease-out duration-300"
				leave-active-class="transition-all ease-in duration-800"
				leave-from-class="transform translate-x-0 opacity-100"
				leave-to-class="transform translate-x-5 opacity-0">
				<!-- Contenedor de Eventos por Fecha -->
				<div
					v-if="openedGroups[date]"
					class="w-full border-l border-gray-300 pl-4 ml-2">
					<div
						v-for="(event, index) in events"
						:key="index"
						class="flex flex-col md:flex-row gap-6 items-start w-full relative mb-4 border-solid border-b border-gray-300 pb-2">
						<!-- Imagen de Perfil -->
						<div
							class="flex flex-col border-4 items-center md:w-1/4 w-full text-center md:text-right">
							<img
								:src="event.profileImage"
								alt="Profile"
								class="w-14 h-14 rounded-full mt-2 border-2 border-gray-300" />
						</div>

						<!-- Detalles del Evento con Fondo Glaseado -->
						<div class="md:w-3/4 w-full">
							<div class="event-card rounded-lg border border-gray-200">
								<p class="font-semibold text-customPurple">{{ event.title }}</p>
								<p class="text-gray-600">{{ event.description }}</p>
								<a
									href="#"
									@click.prevent="$emit('showEventDetails', event)"
									class="text-customPurple mt-2 inline-block hover:underline">
									Ver más
								</a>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
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
/* Agregar animación para el contenedor de eventos */
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
	transform: translateY(-10px);
	opacity: 0;
}
/* Agregar cualquier estilo adicional aquí si es necesario */
</style>
