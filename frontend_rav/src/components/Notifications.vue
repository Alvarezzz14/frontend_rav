<template>
	<div class="flex flex-col h-full">
		<!-- Botón para colapsar la barra -->
		<div
			class="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
			<h2 class="text-lg font-semibold">Notificaciones</h2>
			<button
				@click="$emit('toggle')"
				class="text-gray-500 hover:text-gray-800">
				<!-- Ícono de menú hamburguesa para colapsar -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="w-6 h-6">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4 6h16M4 12h16m-7 6h7" />
				</svg>
			</button>
		</div>

		<!-- Lista de notificaciones -->
		<div class="flex-1 overflow-auto p-4 bg-white">
			<ul>
				<li
					v-for="notification in notifications"
					:key="notification.id"
					class="mb-4">
					<div class="flex items-start bg-gray-100 p-3 rounded-lg shadow">
						<div class="mr-3">
							<!-- Ícono de notificación -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-blue-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13 16h-1v-4h-1m1-4h.01M12 8v8m-1-8h.01M15 3h5a2 2 0 012 2v14a2 2 0 01-2 2h-5a2 2 0 01-2-2V5a2 2 0 012-2zM4 6h5a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
							</svg>
						</div>
						<div class="text-gray-800">
							<p class="font-semibold">{{ notification.title }}</p>
							<p class="text-sm">{{ notification.message }}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<!-- Pie de la barra de notificaciones -->
		<div class="p-4 bg-gray-100 border-t border-gray-300">
			<button @click="markAllAsRead" class="text-blue-500 hover:underline">
				Marcar todas como leídas
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

// Simulación de notificaciones
const notifications = ref([
	{
		id: 1,
		title: "Nueva actualización",
		message: "Se ha lanzado una nueva versión del sistema.",
	},
	{
		id: 2,
		title: "Mensaje de soporte",
		message: "Tu solicitud de soporte ha sido resuelta.",
	},
	{ id: 3, title: "Recordatorio", message: "No olvides completar tu perfil." },
]);

// Marcar todas las notificaciones como leídas
const markAllAsRead = () => {
	notifications.value = notifications.value.map((n) => ({ ...n, read: true }));
};
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>
