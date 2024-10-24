<template>
	<aside
		:class="[
			'fixed right-0 top-[4rem] z-40 h-[calc(100vh-8rem)] transition-transform transform backdrop-blur-sm bg-white/70 shadow-lg',
			isCollapsed ? 'w-16' : 'w-[300px]', // Usamos un ancho relativo para mejor control
			isOpen ? 'translate-x-0' : 'translate-x-full', // Controlamos la visibilidad
		]"
		@click.self="toggleSidebar">
		<!-- Header de la barra de notificaciones -->
		<div class="p-4 bg-gray-900 text-white flex justify-between items-center">
			<h3 v-if="!isCollapsed" class="font-semibold text-lg">Notificaciones</h3>
			<button @click="toggleSidebar">
				<i :class="isOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-xl"></i>
			</button>
		</div>

		<!-- Contenido de las notificaciones -->
		<div class="p-4 overflow-y-auto">
			<ul class="space-y-4">
				<li
					v-for="(notification, index) in notifications"
					:key="index"
					class="p-4 bg-white shadow rounded-lg">
					<p class="text-gray-700">{{ notification }}</p>
				</li>
			</ul>

			<!-- Sección de medidores -->
			<div class="mt-6 space-y-4">
				<!-- Medidor 1 -->
				<div v-if="!isCollapsed" class="bg-white shadow-lg rounded-lg p-4">
					<h4 class="text-gray-700 font-semibold mb-2">Meta 1</h4>
					<p>Interacción con el medidor</p>
				</div>

				<!-- Medidor 2 -->
				<div v-if="!isCollapsed" class="bg-white shadow-lg rounded-lg p-4">
					<h4 class="text-gray-700 font-semibold mb-2">Meta 2</h4>
					<p>Interacción con el medidor</p>
				</div>
			</div>
		</div>
	</aside>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false); // Controla si la barra está abierta o no
const isCollapsed = ref(false); // Controla si está colapsada o no

const notifications = ref([
	"Notificación 1: Recordatorio de la reunión",
	"Notificación 2: Progreso de tu proyecto",
	"Notificación 3: Nueva solicitud",
]);

const toggleSidebar = () => {
	isOpen.value = !isOpen.value;
};
</script>

<style scoped>
aside {
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
</style>
