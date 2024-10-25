<template>
	<aside
		:class="[
			' right-0 top-[8rem] z-40 h-[calc(100vh-8rem)] transition-transform transform backdrop-blur-sm bg-white/70',
			'border-l border-gray-300',
			isCollapsed ? 'w-16' : 'w-64',
			isOpen ? 'translate-x-0' : 'translate-x-full',
			'md:translate-x-0',
		]"
		@click.self="toggleSidebar">
		<!-- Header de la barra de notificaciones -->
		<div
			class="p-4 mt-12 h-10 bg-customPurple text-white flex justify-between items-center">
			<h3 v-if="!isCollapsed" class="font-semibold text-lg">Notificaciones</h3>
			<button @click="toggleSidebar">
				<i :class="isOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-xl"></i>
			</button>
		</div>

		<!-- Sección de medidores -->
		<div class="p-4 space-y-4">
			<!-- Medidor 1 -->
			<div v-if="!isCollapsed" class="bg-white/70 shadow-lg rounded-lg p-4">
				<h4 class="text-gray-700 font-semibold mb-2">Meta 1</h4>
				<p>Interacción con el medidor</p>
			</div>

			<!-- Medidor 2 -->
			<div v-if="!isCollapsed" class="bg-white/70 shadow-lg rounded-lg p-4">
				<h4 class="text-gray-700 font-semibold mb-2">Meta 2</h4>
				<p>Interacción con el medidor</p>
			</div>
		</div>

		<!-- Contenido de las notificaciones -->
		<div class="p-4 overflow-y-auto flex-1">
			<!-- Agrupar y desplegar las notificaciones -->
			<div
				@click="toggleNotificationsGroup"
				class="cursor-pointer h-2 bg-gray-200 p-4 rounded-lg flex justify-between items-center">
				<h4 class="text-gray-700 font-semibold">Notificaciones</h4>
				<i
					:class="
						isNotificationsGrouped
							? 'pi pi-chevron-down'
							: 'pi pi-chevron-right'
					"></i>
			</div>

			<ul
				v-if="isNotificationsGrouped"
				class="space-y-4 list-none mt-4 max-h-[200px] overflow-y-auto">
				<li
					v-for="(notification, index) in notifications"
					:key="index"
					class="p-4 bg-white/70 shadow rounded-lg">
					<p class="text-gray-700">{{ notification }}</p>
				</li>
			</ul>
		</div>
	</aside>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false); // Controla si la barra está abierta o no
const isCollapsed = ref(false); // Controla si está colapsada o no
const isNotificationsGrouped = ref(true); // Controla si las notificaciones están agrupadas o desplegadas

const notifications = ref([
	"Notificación 1: Recordatorio de la reunión",
	"Notificación 2: Progreso de tu proyecto",
	"Notificación 3: Nueva solicitud",
]);

const toggleSidebar = () => {
	isOpen.value = !isOpen.value;
};

const toggleNotificationsGroup = () => {
	isNotificationsGrouped.value = !isNotificationsGrouped.value;
};
</script>

<style scoped>
/* Sombra adicional para darle profundidad a la barra */
aside {
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
</style>
