<template>
	<div
		class="relative bg-gray-200 flex flex-col h-[calc(100vh-8rem) overflow-y-auto">
		<!-- Botón hamburguesa para mostrar/ocultar el Sidebar -->
		<div class="">
			<button
				@click="isSidebarOpen = !isSidebarOpen"
				class="cursor-pointer focus:outline-none bg-amarillo md:hidden relative rounded-full p-2 top-0 right-0 z-50"
				aria-label="Toggle sidebar">
				<i class="pi pi-bars"></i>
			</button>
		</div>

		<!-- Sidebar Derecho -->
		<div
			:class="{
				'translate-x-0': isSidebarOpen,
				'-translate-x-full': !isSidebarOpen,
			}"
			class="fixed md:relative flex flex-grow w-56 bg-white rounded-r-3xl overflow-hidden transform transition-transform duration-200 z-40 md:translate-x-0">
			<!-- Contenido del Sidebar -->
			<div
				@click="!isSidebarOpen"
				:class="hidden"
				class="flex flex-col bg-white items-center">
				<!-- Sección de Actividad -->
				<h2
					class="text-lg bg-amarillo w-full text-center font-bold text-customPurple py-2">
					Actividad
				</h2>
				<div v-for="(goal, index) in goals" :key="index" class="border-b my-2">
					<div class="relative w-16 h-16 md:w-20 md:h-20">
						<!-- Fondo del medidor vacío -->
						<svg class="w-full h-full" viewBox="0 0 100 100">
							<circle
								cx="50"
								cy="50"
								r="40"
								stroke="lightgray"
								stroke-width="6"
								fill="none" />
							<!-- Círculo animado que muestra el progreso -->
							<circle
								cx="50"
								cy="50"
								r="40"
								stroke="currentColor"
								:stroke-dasharray="circumference"
								:stroke-dashoffset="
									circumference - (circumference * goal.value) / 100
								"
								stroke-width="6"
								fill="none"
								class="text-customPurple transition-all duration-1000 ease-out" />
						</svg>
						<span
							class="absolute inset-0 flex items-center justify-center text-lg font-bold">
							{{ goal.value }}
						</span>
					</div>
					<p class="text-center text-xs font-semibold">{{ goal.label }}</p>
				</div>

				<!-- Sección de Notificaciones -->
				<div class="shadow-top w-full">
					<h2
						class="text-lg font-semibold bg-customPurple mb-2 p-2 flex items-center text-amarillo justify-between">
						Notificaciones
						<button
							v-if="extraNotifications > 0"
							@click="toggleNotifications"
							class="bg-amarillo text-customPurple w-6 h-6 rounded-full flex items-center justify-center text-xs">
							+{{ extraNotifications }}
						</button>
					</h2>

					<!-- Mostrar solo la primera notificación -->
					<div
						v-if="notifications.length > 0"
						class="bg-gray-50 p-3 rounded-lg mx-4 mb-2 shadow">
						<h3 class="font-semibold">{{ notifications[0].title }}</h3>
						<span class="text-xs text-gray-500">{{
							notifications[0].date
						}}</span>
						<p class="text-sm mt-1">{{ notifications[0].message }}</p>
					</div>

					<!-- Mostrar notificaciones adicionales si están desplegadas -->
					<div v-if="showAllNotifications">
						<div
							v-for="(notification, index) in additionalNotifications"
							:key="index"
							class="bg-gray-50 p-3 rounded-lg mb-2 mx-4 shadow">
							<h3 class="font-semibold">{{ notification.title }}</h3>
							<span class="text-xs text-gray-500">{{ notification.date }}</span>
							<p class="text-sm mt-1">{{ notification.message }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const isSidebarOpen = ref(false);
const goals = ref([
	{ label: "META TRIMESTRAL", value: 0 },
	{ label: "META DIARIA", value: 0 },
]);

const circumference = 2 * Math.PI * 40;

onMounted(() => {
	setTimeout(() => {
		goals.value[0].value = 80;
		goals.value[1].value = 50;
	}, 500);
});

const notifications = ref([
	{
		title: "Título de notificación",
		date: "17/07/2024",
		message: "Lorem ipsum dolor sit amet...",
	},
	{
		title: "Título de notificación",
		date: "17/07/2024",
		message: "Lorem ipsum dolor sit amet...",
	},
]);

const additionalNotifications = computed(() => notifications.value.slice(1));

const extraNotifications = computed(() =>
	Math.max(0, notifications.value.length - 1)
);
const showAllNotifications = ref(false);

const toggleNotifications = () => {
	showAllNotifications.value = !showAllNotifications.value;
};
</script>

<style scoped>
.shadow-top {
	box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1),
		0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}
@media (max-width: 768px) {
	/* Ocultar sidebar en pantallas pequeñas */
	.-translate-x-full {
		transform: translateX(-100%);
	}
	/* Mostrar sidebar en pantallas pequeñas cuando está abierto */
	.translate-x-0 {
		transform: translateX(0);
	}
}

a {
	text-decoration: none;
}
</style>
